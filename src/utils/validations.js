export const login = {
  phoneNumber: {
    required: 'Phone number is required',
    pattern: {
      value: /^[+]+([0-9]{11,13})$/,
      message: 'Phone number must include country code eg. +250',
    },
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[!@#$%^&*?])[0-9a-zA-Z!@#$%^&*?]{6,20}$/,
      message: 'Password length must be between 6 and 20, with at least one number and a symbol',
    },
  },
};
