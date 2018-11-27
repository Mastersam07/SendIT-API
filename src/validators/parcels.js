import { Joi } from 'celebrate';

const create = {
  userId: Joi.string(),
  fromGeoZone: Joi.string().required(),
  fromState: Joi.string().required(),
  toGeoZone: Joi.string().required(),
  toState: Joi.string().required(),
  toCity: Joi.string(),
  receiverPhone: Joi.string().required(),
  receiverNames: Joi.string().required(),
  receiverAddress: Joi.string().required(),
  weight: Joi.number().positive().required(),
};

const cancel = {
  userId: Joi.string(),
};


export default {
  create,
  cancel,
};
