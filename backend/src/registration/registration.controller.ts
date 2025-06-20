import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    const user = await this.registrationService.createUser(registrationDto);
    return { user };
  }

  @Post('login')
  async login(@Body() registrationDto: RegistrationDto) {
    const token = await this.registrationService.validateUser(registrationDto);
    return { token };
  }
}
