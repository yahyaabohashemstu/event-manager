import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from './auth.decorator';
import { UsersService } from 'src/users/users.service';
  
@Public()
@Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService,userService:UsersService) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
    @HttpCode(HttpStatus.OK)
    @Post('register')
    @Public()
    register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

  
    @UseGuards(AuthGuard)
    @Get('profile')
    
    getProfile(@Request() req) {
      console.log(req.user)
      return req.user;
    }
  }