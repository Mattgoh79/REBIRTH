import Joi from "joi";

const validatePostInstitution = (req, res, next) => {
  const institutionSchema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
      "any.required": "name is required",
    }),
    region: Joi.string().min(3).max(100).required().messages({
      "string.base": "region should be a string",
      "string.empty": "region cannot be empty",
      "string.min": "region should have a minimum length of {#limit}",
      "string.max": "region should have a maximum length of {#limit}",
      "any.required": "region is required",
    }),
    country: Joi.string().min(3).max(100).required().messages({
      "string.base": "country should be a string",
      "string.empty": "country cannot be empty",
      "string.min": "country should have a minimum length of {#limit}",
      "string.max": "country should have a maximum length of {#limit}",
      "any.required": "country is required",
    }),
  });

  const { name, region, country } = req.body;
  const { error } = institutionSchema.validate(
    { name, region, country },
    {
      abortEarly: false, // Collect all errors, not just the first
      convert: false, // Disable type coercion
    },
  );

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};
const validatePutInstitution = (req, res, next) => {
  const institutionSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      "string.base": "name should be a string",
      "string.empty": "name cannot be empty",
      "string.min": "name should have a minimum length of {#limit}",
      "string.max": "name should have a maximum length of {#limit}",
    }),
    region: Joi.string().min(3).max(100).optional().messages({
      "string.base": "region should be a string",
      "string.empty": "region cannot be empty",
      "string.min": "region should have a minimum length of {#limit}",
      "string.max": "region should have a maximum length of {#limit}",
    }),
    country: Joi.string().min(3).max(100).optional().messages({
      "string.base": "country should be a string",
      "string.empty": "country cannot be empty",
      "string.min": "country should have a minimum length of {#limit}",
      "string.max": "country should have a maximum length of {#limit}",
    }),
  }).min(1); // At least one field must be provided

  const { error } = institutionSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};

export { validatePostInstitution, validatePutInstitution };
const someSchema = Joi.object({
  numberField: Joi.number().integer().min(1).max(100).required().messages({
    "number.base": "numberField should be a number",
    "number.integer": "numberField should be an integer",
    "number.min": "numberField should be at least {#limit}",
    "number.max": "numberField should be at most {#limit}",
    "any.required": "numberField is required",
  }),
  booleanField: Joi.boolean().required().messages({
    "boolean.base": "booleanField should be a boolean",
    "any.required": "booleanField is required",
  }),
  dateField: Joi.date().iso().required().messages({
    "date.base": "dateField should be a valid date",
    "date.format": "dateField should be in ISO 8601 format",
    "any.required": "dateField is required",
  }),
  arrayField: Joi.array()
    .items(Joi.string().min(3).max(100))
    .required()
    .messages({
      "array.base": "arrayField should be an array",
      "array.includes": "arrayField should only contain strings",
      "any.required": "arrayField is required",
    }),
  objectField: Joi.object({
    key1: Joi.string().min(3).max(100).required().messages({
      "string.base": "key1 should be a string",
      "string.empty": "key1 cannot be empty",
      "string.min": "key1 should have a minimum length of {#limit}",
      "string.max": "key1 should have a maximum length of {#limit}",
      "any.required": "key1 is required",
    }),
    key2: Joi.number().integer().min(1).max(100).required().messages({
      "number.base": "key2 should be a number",
      "number.integer": "key2 should be an integer",
      "number.min": "key2 should be at least {#limit}",
      "number.max": "key2 should be at most {#limit}",
      "any.required": "key2 is required",
    }),
  })
    .required()
    .messages({
      "object.base": "objectField should be an object",
      "any.required": "objectField is required",
    }),
  uuidField: Joi.string().uuid().required().messages({
    "string.base": "uuidField should be a string",
    "string.guid": "uuidField should be a valid UUID",
    "any.required": "uuidField is required",
  }),
});