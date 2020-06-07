import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let createUser: CreateUserService;
let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    createUser = new CreateUserService(usersRepository, hashProvider);
  });

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with an email already in use', async () => {
    await createUser.execute({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        username: 'doejohn',
        email: 'johndoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
