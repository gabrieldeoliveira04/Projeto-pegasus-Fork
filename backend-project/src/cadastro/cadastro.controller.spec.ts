import { Test, TestingModule } from '@nestjs/testing';
import { CadastroController } from './cadastro.controller';

describe('CadastroController', () => {
  let controller: CadastroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastroController],
    }).compile();

    controller = module.get<CadastroController>(CadastroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
