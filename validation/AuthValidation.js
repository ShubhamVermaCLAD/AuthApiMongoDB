const Joi = require('joi');

const registerValidate = (params) => {
	const schema = Joi.object({
		name: Joi.string().min(6).required(),
		email: Joi.string().email().min(6).required(),
		password: Joi.string().min(6).required()
	});
	const result = schema.validate(params);
	if (result.error) {
		const errorMessage = result.error.details[0].message;
		throw { errorMessage, errorStatus: 401 };
	}
	return result;
};

const loginValidate = (params) => {
	const schema = Joi.object({
		email: Joi.string().email().min(6).required(),
		password: Joi.string().min(6).required()
	});
	const result = schema.validate(params);
	if (result.error) {
		const errorMessage = result.error.details[0].message;
		throw { errorMessage, errorStatus: 401 };
	}
	return result;
};
module.exports = {
	registerValidate,
	loginValidate
};