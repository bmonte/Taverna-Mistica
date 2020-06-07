import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Users from '@modules/users/infra/typeorm/entities/Users';

class FakeUsersRepository implements IUsersRepository {
  users: Users[] = [];

  public async create({
    username,
    email,
    password,
  }: ICreateUserDTO): Promise<Users> {
    const user = new Users();

    Object.assign(user, { id: uuid(), username, email, password });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async save(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
