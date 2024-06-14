import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome de usuário', example: 'user' })
  @IsNotEmpty({ message: 'O campo "username" não pode estar vazio' })
  @IsString({ message: 'O username deve ser uma string' })
  username: string;

  @ApiProperty({ description: 'Endereço de e-mail', example: 'exemplo@email.com' })
  @IsNotEmpty({ message: 'O campo "email" não pode estar vazio' })
  @IsEmail({}, { message: 'O email deve ser um endereço de email válido' })
  email: string;

  @ApiProperty({ description: 'Senha', example: 'userpassword' })
  @IsNotEmpty({ message: 'O campo "password" não pode estar vazio' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
