export const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.status) return res.status(err.status).json({ message: err.message });
  res.status(500).json({ message: err.message || 'Internal Server Error' });
};

export class ApiError extends Error {
  constructor(message, status=500) {
    super(message);
    this.status = status;
  }
}
