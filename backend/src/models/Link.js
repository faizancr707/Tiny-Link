import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastClickedAt: { type: Date }
});

export default mongoose.model('Link', linkSchema);
