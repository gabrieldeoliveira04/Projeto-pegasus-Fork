import { Controller, Post, Body, HttpStatus, InternalServerErrorException, HttpCode, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dtos/singIn.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Route to authenticate a user.
   * @param signInDto User authentication data.
   * @returns JWT token if authentication is successful.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({ type: SignInDto, description: 'User authentication data' })
  @ApiOkResponse({ description: 'Successful authentication - JWT token generated' })
  @ApiBadRequestResponse({ description: 'Invalid or incomplete input data' })
  @ApiUnauthorizedResponse({ description: 'User not found or incorrect password' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error during user authentication' })
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const { email, password } = signInDto;

      const token = await this.authService.signIn(email, password);

      return { token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('User not found or incorrect password', error.getResponse());
      } else {
        throw new InternalServerErrorException('Internal server error during user authentication', error.getResponse());
      }
    }
  }
}
