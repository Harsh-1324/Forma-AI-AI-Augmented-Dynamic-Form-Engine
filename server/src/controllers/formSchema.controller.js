import prisma from "../config/prisma.js";

export async function listFormSchemas(req, res, next) {
  try {
    const schemas = await prisma.formSchema.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        version: true,
        description: true,
      },
    });

    res.json(schemas);
  } catch (err) {
    next(err);
  }
}

export async function getFormSchema(req, res, next) {
  try {
    const schema = await prisma.formSchema.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        sections: {
          include: {
            fields: true,
          },
        },
      },
    });

    if (!schema) {
      return res.status(404).json({
        message: "Form schema not found",
      });
    }

    res.json(schema);
  } catch (err) {
    next(err);
  }
}

export async function createFormSchema(req, res, next) {
  try {
    const schema = await prisma.formSchema.create({
      data: req.body,
    });

    res.status(201).json(schema);
  } catch (err) {
    next(err);
  }
}

export async function updateFormSchema(req, res, next) {
  try {
    const schema = await prisma.formSchema.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json(schema);
  } catch (err) {
    next(err);
  }
}

export async function deleteFormSchema(req, res, next) {
  try {
    await prisma.formSchema.update({
      where: {
        id: req.params.id,
      },
      data: {
        isActive: false,
      },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}