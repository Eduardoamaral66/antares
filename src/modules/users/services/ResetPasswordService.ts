import IUsersRepositories from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepositories from '@modules/users/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import { differenceInHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const diffHours = differenceInHours(Date.now(), userToken.created_at);
    if (diffHours >= 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
