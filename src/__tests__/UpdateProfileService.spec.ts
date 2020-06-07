import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let userRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(async () => {
    userRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(userRepository, hashProvider);
  });

  it('should be able update the profile', async () => {
    const user = await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedProfile = await updateProfile.execute({
      user_id: user.id,
      username: 'doejohn',
      email: 'johndoe@example.com',
    });

    expect(updatedProfile.id).toBe(user.id);
    expect(updatedProfile.username).toBe('doejohn');
  });

  it('should be able change the password', async () => {
    const user = await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      username: 'johndoe',
      email: 'johndoe@example.com',
      old_password: '123456',
      password: '123321',
    });

    expect(user.password).toBe('123321');
  });

  it('should not be able update the profile of an non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        username: 'johndoe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change the email to an already used by another user', async () => {
    await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { id } = await userRepository.create({
      username: 'test',
      email: 'test@test.com',
      password: 'test',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        username: 'test',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change password without inform old password', async () => {
    const { id } = await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able change password with wrong old password', async () => {
    const { id } = await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        username: 'johndoe',
        email: 'johndoe@example.com',
        old_password: 'wrong-password',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
