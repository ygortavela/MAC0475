const { MissingFieldError, MalformedFieldError, SemanticError, ValidationError } = require('../exception/exception');
const validate = require('../utils/validators');
const { User, userContract } = require('../domain/user');

const createUserService = async (request, response, { mongoClient, stanConn }) => {
  try {
    const db = mongoClient.db('ep1-mac475');
    let body = request.body;

    await validateUserDTO(body, db);

    let newUser = new User(body.name, body.email, body.password);

    stanConn.publish(
      'users',
      JSON.stringify({
        eventType: 'UserCreated',
        entityId: newUser.getId(),
        entityAggregate: {
          name: newUser.getName(),
          email: newUser.getEmail(),
          password: newUser.getPassword(),
        },
      }),
    );

    response.status(201).send({
      user: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
      },
    });
  } catch (err) {
    if (err instanceof ValidationError) response.status(err.status).send({ error: err.message });
    else response.status(500).send({ error: 'Internal Server Error' });
  }
};

const validateUserDTO = async (userDTO, db) => {
  let getUserByEmail = await db.collection('users').findOne({ email: userDTO.email });

  if (getUserByEmail) throw new ValidationError('There is another user with the same email');

  let notValidFields = validate(userContract, userDTO);

  if (notValidFields.required.length > 0) throw new MissingFieldError(notValidFields.required);

  if (notValidFields.type.length > 0 || notValidFields.lengthRange.length)
    throw new MalformedFieldError([...new Set([...notValidFields.type, ...notValidFields.lengthRange])]);

  if (userDTO.password !== userDTO.passwordConfirmation) throw new SemanticError('Password confirmation did not match');
};

module.exports = createUserService;
