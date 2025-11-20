import Link from '../models/Link.js';
import { createLinkSchema } from '../utils/validators.js';
import { customAlphabet } from 'nanoid';
import { ApiError } from '../utils/errorHandler.js';

const nano = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7);

export const createLink = async (req, res, next) => {
  try {
    const { error, value } = createLinkSchema.validate(req.body);
    if (error) throw new ApiError(error.message, 400);
    const { url, code } = value;
    const finalCode = code && code.length ? code : nano();
    // check uniqueness
    const exists = await Link.findOne({ code: finalCode });
    if (exists) throw new ApiError('Code already exists', 409);
    const link = new Link({ code: finalCode, url });
    await link.save();
    return res.status(201).json({ code: finalCode, shortUrl: (process.env.APP_URL || '') + finalCode });
  } catch (err) { next(err); }
};

export const listLinks = async (req, res, next) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 }).lean();
    res.json({ links });
  } catch (err) { next(err); }
};

export const getLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) return next(new ApiError('Not found', 404));
    res.json({
      code: link.code,
      url: link.url,
      clicks: link.clicks,
      lastClickedAt: link.lastClickedAt,
      createdAt: link.createdAt
    });
  } catch (err) { next(err); }
};

export const deleteLink = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOneAndDelete({ code });
    if (!link) return next(new ApiError('Not found', 404));
    res.status(204).end();
  } catch (err) { next(err); }
};

// redirect handler for GET /:code
export const redirectHandler = async (req, res, next) => {
  try {
    const { code } = req.params;
    const link = await Link.findOneAndUpdate({ code }, { $inc: { clicks: 1 }, $set: { lastClickedAt: new Date() } }, { new: true });
    if (!link) return res.status(404).send('Not found');
    // 302 redirect
    return res.redirect(302, link.url);
  } catch (err) { next(err); }
};
