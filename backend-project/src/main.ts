import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CadastroModule } from './cadastro/cadastro.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o CORS para permitir solicitações apenas do front-end em localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Pegasus Shop')
    .setDescription('Pegasus Shop description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
