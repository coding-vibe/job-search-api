const loginSchema = {
  email: { isEmail: true, notEmpty: true },
  password: { notEmpty: true },
};

export default loginSchema;
