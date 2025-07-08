import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from '../services/registration.service';
import { RegistrationDto } from '../dto/registration.dto';

@Controller('api/auth')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.registrationService.createUser(registrationDto);
  }

  @Post('login')
  async login(@Body() registrationDto: RegistrationDto) {
    return await this.registrationService.validateUser(registrationDto);
  }
}
