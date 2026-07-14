import FormSchema from "../models/FormSchema.model.js";

export async function listFormSchemas(req, res, next) {
  try {
    const schemas = await FormSchema.find({ isActive: true }).select("name version description");
    res.json(schemas);
  } catch (err) {
    next(err);
  }
}

export async function getFormSchema(req, res, next) {
  try {
    const schema = await FormSchema.findById(req.params.id);
    if (!schema) return res.status(404).json({ message: "Form schema not found" });
    res.json(schema);
  } catch (err) {
    next(err);
  }
}

export async function createFormSchema(req, res, next) {
  try {
    const schema = await FormSchema.create(req.body);
    res.status(201).json(schema);
  } catch (err) {
    next(err);
  }
}

export async function updateFormSchema(req, res, next) {
  try {
    const schema = await FormSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schema) return res.status(404).json({ message: "Form schema not found" });
    res.json(schema);
  } catch (err) {
    next(err);
  }
}

export async function deleteFormSchema(req, res, next) {
  try {
    await FormSchema.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
