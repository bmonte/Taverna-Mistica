import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let userRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      userRepository,
      hashProvider,
    );

    userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });
  });

  it('should be able to authenticate user', async () => {
    const session = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(session).toHaveProperty('token');
  });

  it('should not be able to authenticate with a invalid email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-existing-email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a invalid password', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'non-existing-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
