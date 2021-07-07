const jwt = require('jsonwebtoken');
const { ValidationError, AuthorizationError, AccessTokenDidNotMatchError } = require('../exception/exception');

const deleteUserService = (request, response, { stanConn, secret }) => {
  try {
    let uuid = request.params.uuid;
    let authorizationHeader = request.headers.authorization?.split(' ');

    if (!authorizationHeader || authorizationHeader.length !== 2)
      throw new AuthorizationError('Access Token not found');

    let decodedToken = jwt.verify(authorizationHeader[1], secret);

    if (uuid !== decodedToken.id) throw new AccessTokenDidNotMatchError('Access Token did not match User ID');

    stanConn.publish(
      'users',
      JSON.stringify({
        eventType: 'UserDeleted',
        entityId: uuid,
        entityAggregate: {},
      }),
    );

    response.status(200).send({
      id: uuid,
    });
  } catch (err) {
    if (err instanceof ValidationError) response.status(err.status).send({ error: err.message });
    else response.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = deleteUserService;
