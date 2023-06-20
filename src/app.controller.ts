import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import {  Public } from './auth/auth.decorator';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('panel')
  @Public()
  root() {
    return {};
  }
  @Get('login')
  @Render('login')
  @Public()
  login() {
    return {};
  }
  @Get('calendar')
  @Render('calendar')
  @Public()
  calender() {
    return {};
  }
}
