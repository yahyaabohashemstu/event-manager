import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.checkUser(username);
    console.log(user)
    if (await bcrypt.compare(pass, user.hash)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(createUserDto:CreateUserDto) {
    //check if user already exists
    const user = await this.usersService.checkUser(createUserDto.username);
    if (user) {
      throw new UnauthorizedException("User already exists");
    }
    console.log(createUserDto)
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const userResult = await this.usersService.create(createUserDto,hash);
    const payload = { sub: userResult.id, username: userResult.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}