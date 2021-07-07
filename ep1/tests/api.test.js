// External libraries
const request = require('supertest');

// API module
const API = require('../src/api');

describe('The project', () => {
  let api, mockColl, mockDb, mongoClient, stanConn;
  const corsOptions = { origin: '*' };

  const secret = 'SUPERSECRET';

  beforeEach(() => {
    mockColl = {
      insertOne: jest.fn(),
      findOne: jest.fn(),
      deleteOne: jest.fn(),
    };

    mockDb = { collection: () => mockColl };

    mongoClient = { db: () => mockDb };

    stanConn = { publish: jest.fn() };

    api = API(corsOptions, { mongoClient, stanConn, secret });
  });

  it('can use Jest', () => {
    expect(true).toBe(true);
  });

  it('can use Supertest', async () => {
    const response = await request(api).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toBe('Hello, World!');
  });

  it('can use CORS', async () => {
    const response = await request(api).get('/');
    const cors_header = response.header['access-control-allow-origin'];
    expect(cors_header).toBe('*');
  });

  it('creates an user', async () => {
    const pw = '123456foo';
    const newUser = {
      name: 'Foo',
      email: 'foo@example.com',
      password: pw,
      passwordConfirmation: pw,
    };

    const response = await request(api).post('/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();
    expect(stanConn.publish).toHaveBeenCalled();
    expect(mockColl.findOne).toHaveBeenCalled();
    expect(mockColl.insertOne).not.toHaveBeenCalled();
  });

  it('should throw a validation error if there is an user with the same email', async () => {
    const pw = '123456foo';
    const newUser = {
      name: 'Foo',
      email: 'foo@example.com',
      password: pw,
      passwordConfirmation: pw,
    };

    jest.spyOn(mongoClient.db().collection(), 'findOne').mockImplementation(() => {
      return {
        _id: 'abcde',
        ...newUser,
      };
    });

    const response = await request(api).post('/users').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('There is another user with the same email');
  });

  it('should throw a missing field error if there are any null or empty field', async () => {
    const pw = '123456foo';
    const newUser = {
      name: '',
      password: pw,
      passwordConfirmation: pw,
    };

    const response = await request(api).post('/users').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Request body had missing field name,email');
  });

  it('should throw a malformed field error if there are any field with different type from user contract', async () => {
    const pw = '123456foo';
    const newUser = {
      name: 123,
      email: 'foo@example',
      password: pw,
      passwordConfirmation: pw,
    };

    const response = await request(api).post('/users').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Request body had malformed field name,email');
  });

  it('should throw a semantic error if there password is different from passwordConfirmation on request body', async () => {
    const pw = '123456foo';
    const newUser = {
      name: 'Foo',
      email: 'foo@example.com',
      password: pw,
      passwordConfirmation: pw + 'bar',
    };

    const response = await request(api).post('/users').send(newUser);

    expect(response.status).toBe(422);
    expect(response.body.error).toBeDefined();
    expect(response.body.error).toBe('Password confirmation did not match');
  });

  it('allows a registered user to delete its account', async () => {
    const uid = '608ef5cc069020a1d61d5380';
    const correctToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGVmNWNjMDY5MDIwYTFkNjFkNTM4MCJ9.DU55f1y8dGSJPWYXrHUUwU0zGc-N8FixQqontudI4RE';

    const response = await request(api).delete(`/users/${uid}`).set('Authorization', `Bearer ${correctToken}`);

    expect(response.status).toBe(200);
    expect(stanConn.publish).toHaveBeenCalled();
    expect(mockColl.deleteOne).not.toHaveBeenCalled();
  });

  it('blocks a registered user to delete anothers account', async () => {
    const uid = '608ef5cc069020a1d61d5380';
    const wrongToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGZmNWNjMDY5MDIwYTFkNjFkNTM4MCJ9.J7xckIJZlqkmZBomOG8CIBJPYYen7I8Mx3hUn1rVnWc';

    const response = await request(api).delete(`/users/${uid}`).set('Authorization', `Bearer ${wrongToken}`);

    expect(response.status).toBe(403);
    expect(mockColl.findOne).not.toHaveBeenCalled();
    expect(stanConn.publish).not.toHaveBeenCalled();
    expect(mockColl.deleteOne).not.toHaveBeenCalled();
  });
});
