import { Joi } from 'celebrate';

const signup = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string().min(6),
  email: Joi.string().email().required(),
  gender: Joi.string().required().valid('Male', 'Female'),
  birthDate: Joi.date(),
  geozone: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string(),
};

const login = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6),
};

export default {
  login,
  signup,
};
