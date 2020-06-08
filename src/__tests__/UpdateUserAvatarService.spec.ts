import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/provider/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to change user avatar', async () => {
    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('sould be able to update user avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');

    await updateUserAvatar.execute({
      user_id: user.id,
      filename: 'new-avatar.png',
    });

    expect(deleteFile).toBeCalledWith('avatar.png');
    expect(user.avatar).toBe('new-avatar.png');
  });

  it('should not be able to change avatar of a non authenticated user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-authenticated-user',
        filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
