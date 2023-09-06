import Joi from "joi";

export const registerValidate = (data: string) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo nome deve ser uma string",
      "string.empty": "O campo nome não pode estar vazio",
      "any.required": "O campo nome é obrigatório",
      "string.min": "O campo nome deve ter no mínimo {#limit} caracteres",
      "string.max": "O campo nome deve ter no máximo {#limit} caracteres",
    }),
    email: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo e-mail deve ser uma string",
      "string.empty": "O campo e-mail não pode estar vazio",
      "any.required": "O campo e-mail é obrigatório",
      "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
      "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
    }),
    group: Joi.string().required().messages({
      "any.base": "O campo grupo deve ser uma lista",
      "any.empty": "O campo grupo não pode estar vazio",
      "any.required": "O campo grupo é obrigatório",
    }),
    password: Joi.string().required().min(6).max(250).messages({
      "string.base": "O campo senha deve ser uma string",
      "string.empty": "O campo senha não pode estar vazio",
      "any.required": "O campo senha é obrigatório",
      "string.min": "A senha deve ter no mínimo {#limit} caracteres",
      "string.max": "A senha deve ter no máximo {#limit} caracteres",
    }),
  });

  return schema.validate(data);
};

export const loginValidate = (data: string) => {
  const schema = Joi.object({
    email: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo e-mail deve ser uma string",
      "string.empty": "O campo e-mail não pode estar vazio",
      "any.required": "O campo e-mail é obrigatório",
      "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
      "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
    }),
    password: Joi.string().required().min(6).max(250).messages({
      "string.base": "O campo senha deve ser uma string",
      "string.empty": "O campo senha não pode estar vazio",
      "any.required": "O campo senha é obrigatório",
      "string.min": "A senha deve ter no mínimo {#limit} caracteres",
      "string.max": "A senha deve ter no máximo {#limit} caracteres",
    }),
  });

  return schema.validate(data);
};

export const recoveryPasswordValidate = (data: string) => {
  const schema = Joi.object({
    token: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo token deve ser uma string",
      "string.empty": "O campo token não pode estar vazio",
      "any.required": "O campo token é obrigatório",
      "string.min": "O token deve ter no mínimo {#limit} caracteres",
      "string.max": "O token deve ter no máximo {#limit} caracteres",
    }),
    password: Joi.string().required().min(6).max(250).messages({
      "string.base": "O campo senha deve ser uma string",
      "string.empty": "O campo senha não pode estar vazio",
      "any.required": "O campo senha é obrigatório",
      "string.min": "A senha deve ter no mínimo {#limit} caracteres",
      "string.max": "A senha deve ter no máximo {#limit} caracteres",
    }),
  });

  return schema.validate(data);
};

const addressSchema = Joi.object({
  cep: Joi.string()
    .required()
    .pattern(/^\d{8,}$/)
    .message("O cep deve conter apenas dígitos e ter no mínimo 8 dígitos."),
  state: Joi.string().required(),
  neighborhood: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  number: Joi.string().required(),
  complement: Joi.any(),
});

export const storageCreateValidate = (data: string) => {
  const schema = Joi.object().keys({
    address: addressSchema,
    name: Joi.string().required(),
    phone: Joi.string()
      .required()
      .pattern(/^\d{10,}$/)
      .message("O celular deve conter apenas dígitos e ter no mínimo 11 dígitos."),
    cnpj: Joi.string()
      .required()
      .pattern(/^\d{10,}$/)
      .message("O cnpj deve conter apenas dígitos e ter no mínimo 14 dígitos."),
    telephone: Joi.string()
      .required()
      .pattern(/^\d{10,}$/)
      .message("O telefone deve conter apenas dígitos e ter no mínimo 10 dígitos."),
  });

  return schema.validate(data);
};

export const registerAdminValidate = (data: string) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo nome deve ser uma string",
      "string.empty": "O campo nome não pode estar vazio",
      "any.required": "O campo nome é obrigatório",
      "string.min": "O campo nome deve ter no mínimo {#limit} caracteres",
      "string.max": "O campo nome deve ter no máximo {#limit} caracteres",
    }),
    email: Joi.string().required().min(3).max(50).messages({
      "string.base": "O campo e-mail deve ser uma string",
      "string.empty": "O campo e-mail não pode estar vazio",
      "any.required": "O campo e-mail é obrigatório",
      "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
      "string.max": "O campo e-mail deve ter no máximo {#limit} caracteres",
    }),

    phone: Joi.string()
      .required()
      .pattern(/^\d{10,}$/)
      .min(11)
      .messages({
        "string.base": "O campo phone deve ser uma string",
        "string.empty": "O campo phone não pode estar vazio",
        "any.required": "O campo phone é obrigatório",
        "string.min": "O campo e-mail deve ter no mínimo {#limit} caracteres",
      }),

    password: Joi.string().required().min(6).max(250).messages({
      "string.base": "O campo senha deve ser uma string",
      "string.empty": "O campo senha não pode estar vazio",
      "any.required": "O campo senha é obrigatório",
      "string.min": "A senha deve ter no mínimo {#limit} caracteres",
      "string.max": "A senha deve ter no máximo {#limit} caracteres",
    }),
  });

  return schema.validate(data);
};
