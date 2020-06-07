import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let showProfile: ShowProfileService;
let userRepository: FakeUsersRepository;

describe('ShowProfile', () => {
  beforeEach(() => {
    userRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(userRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await userRepository.create({
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.username).toBe('johndoe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show a profile of a non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
