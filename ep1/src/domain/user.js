const { v4: uuid } = require('uuid');

class User {
  #id = null;
  #name = '';
  #email = '';
  #password = '';

  constructor(name, email, password) {
    this.#id = uuid();
    this.#name = name;
    this.#email = email;
    this.#password = password;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getEmail() {
    return this.#email;
  }

  getPassword() {
    return this.#password;
  }
}

const userContract = {
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'email',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
    lengthRange: {
      min: 8,
      max: 32,
    },
  },
  passwordConfirmation: {
    type: 'string',
    required: true,
    lengthRange: {
      min: 8,
      max: 32,
    },
  },
};

module.exports = { User, userContract };
