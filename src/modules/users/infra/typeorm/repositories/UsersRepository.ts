import { Repository, EntityRepository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import Users from '../entities/Users';

@EntityRepository(Users)
class UsersRepository implements IUsersRepository {
  ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<Users> {
    const user = this.ormRepository.create({
      username,
      email,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public async save(user: Users): Promise<Users> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
