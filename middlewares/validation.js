// middleware/validation.js

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required(),
  }),
});

const validateuserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).message({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateloginAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex(),
  }),
});

// const validateUpdateCurrentUser = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30),
//     avatar: Joi.string().required().custom(validateURL).message({
//       "string.uri": 'the "imageUrl" field must be a valid url',
//     }),
//     email: Joi.string().required().messages({
//       "string.empty": 'The "email" field must be filled in',
//       "string.email": 'The "email" field must be a valid email',
//     }),
//   }),
// });

module.exports = {
  validateClothingItem,
  validateuserInfo,
  validateloginAuth,
  validateUserId,
};
