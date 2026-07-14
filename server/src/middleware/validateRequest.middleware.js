export function validateRequest(zodSchema) {
  return (req, res, next) => {
    const result = zodSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Validation failed", errors: result.error.flatten() });
    }
    req.body = result.data;
    next();
  };
}
