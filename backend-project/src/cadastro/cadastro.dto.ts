import { ApiProperty } from '@nestjs/swagger';

export class CadastroDto {
  @ApiProperty({ example: 'Gabriel Oliveira' })
  nome: string;

  @ApiProperty({ example: 'gabriel@email.com' })
  email: string;

  @ApiProperty({ example: '12345678901' })
  CPF: string;

  @ApiProperty({ example: 'senha123' })
  senha: string;
}
