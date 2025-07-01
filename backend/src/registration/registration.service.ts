import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './dto/registration.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(registrationDto: RegistrationDto): Promise<User> {
    const { login, password, wallet, encrypted_private_key } = registrationDto;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      login,
      password: hashedPassword,
      wallet,
      encrypted_private_key,
    });

    return this.usersRepository.save(user);
  }

  async validateUser(registrationDto: RegistrationDto): Promise<{
    token: string;
    login: string;
    wallet?: string;
  }> {
    const { login, password } = registrationDto;
    const user = await this.usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      } else {
        const payload = { login: user.login, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
          token,
          login: user.login,
          wallet: user.wallet,
        };
      }
    }


  }
}
