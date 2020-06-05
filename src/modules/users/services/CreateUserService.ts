import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Users from '../infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  username: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    username,
    email,
    password,
  }: IRequest): Promise<Users> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) throw new AppError('Email address already used!');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
