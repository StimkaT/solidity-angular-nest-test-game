import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller('api/auth')
export class RegistrationController {
  constructor(
    private registrationService: RegistrationService
  ) {}

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    const user = await this.registrationService.createUser(registrationDto);
  }

  @Post('login')
  async login(@Body() registrationDto: RegistrationDto) {
    const token = await this.registrationService.validateUser(registrationDto);
    return { token };
  }

  @Post('userList')
  async getUsers() {
    return this.registrationService.getUsers();
  }
}
