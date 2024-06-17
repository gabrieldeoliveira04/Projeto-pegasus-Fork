import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidatePasswordUseCase {
  async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(plainTextPassword, hashedPassword);
      return match;
    } catch (error) {
      console.error('Error occurred during password validation:', error);
      throw new InternalServerErrorException('Internal server error during password validation');
    }
  }
}
