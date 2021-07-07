class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

class MissingFieldError extends ValidationError {
  constructor(field) {
    super(`Request body had missing field ${field}`);
    this.name = 'MissingFieldError';
    this.field = field;
  }
}

class MalformedFieldError extends ValidationError {
  constructor(field) {
    super(`Request body had malformed field ${field}`);
    this.name = 'MalformedFieldError';
    this.field = field;
  }
}

class SemanticError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'SemanticError';
    this.status = 422;
  }
}

class AuthorizationError extends ValidationError {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.status = 401;
  }
}

class AccessTokenDidNotMatchError extends AuthorizationError {
  constructor(message) {
    super(message);
    this.name = 'AccessTokenDidNotMatchError';
    this.status = 403;
  }
}

module.exports = {
  ValidationError,
  MissingFieldError,
  MalformedFieldError,
  SemanticError,
  AuthorizationError,
  AccessTokenDidNotMatchError,
};
