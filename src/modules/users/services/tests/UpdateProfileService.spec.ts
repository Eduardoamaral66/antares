import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'old-password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe2',
      email: 'johndoe2@example.com',
    });

    expect(updatedUser.name).toBe('John Doe2');
    expect(updatedUser.email).toBe('johndoe2@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non_existing_user_id',
        name: 'non_name',
        email: 'non_email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Eduardo',
      email: 'eduardo@example.com',
      password: 'pass',
    });

    const anotherUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'pass2',
    });

    await expect(
      updateProfile.execute({
        user_id: anotherUser.id,
        name: 'John Doe2',
        email: user.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'old_password',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe2',
      email: 'johndoe2@example.com',
      old_password: 'old_password',
      password: 'new_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'old_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe2',
        email: 'johndoe2@example.com',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'old_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe2',
        email: 'johndoe2@example.com',
        old_password: 'wrong-password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
