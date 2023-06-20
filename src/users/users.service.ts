import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  checkUser(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
  create(user: CreateUserDto,hash:string): Promise<User> {
   
    const newUser = this.usersRepository.create({
      ...user,
      hash,
      role:"user",
    })
    return this.usersRepository.save(newUser);
  }
}