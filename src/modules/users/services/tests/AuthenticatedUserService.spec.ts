import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let authService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com';
    const password = '123456';

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password,
    });

    const response = await authService.execute({ email, password });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const email = 'johndoe@example.com';
    const password = '123456';

    await expect(
      authService.execute({ email, password }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.com';

    await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(
      authService.execute({ email, password: 'wrong-pass' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
