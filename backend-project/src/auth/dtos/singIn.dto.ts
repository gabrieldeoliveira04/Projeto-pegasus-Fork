import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ description: 'Endereço de email', example: 'exemplo@email.com' })
  @IsNotEmpty({ message: 'O campo "email" não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: 'userpassword' })
  @IsNotEmpty({ message: 'O campo "senha" não pode estar vazio' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
