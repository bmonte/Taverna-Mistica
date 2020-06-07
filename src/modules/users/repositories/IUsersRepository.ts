import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import Users from '@modules/users/infra/typeorm/entities/Users';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Users>;
  findByEmail(email: string): Promise<Users | undefined>;
  findById(id: string): Promise<Users | undefined>;
  save(user: Users): Promise<Users>;
}
