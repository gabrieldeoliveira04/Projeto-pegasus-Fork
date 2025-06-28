import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cors from "cors"
import { CadastroModule } from './cadastro/cadastro.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o CORS para permitir solicitações apenas do front-end em localhost:3000
  app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://ecommerce-pegasus.vercel.app',
        'https://pegasus-shop-felipes-projects-0b62107b.vercel.app'
      ];
      
      if (allowedOrigins.includes(origin) || !origin) {
        // Permitir origens permitidas ou chamadas sem origem (como chamadas diretas)
        callback(null, true);
      } else {
        callback(new Error('Origem não permitida'), false);
      }
    },
    credentials: true, // Permitir que o navegador envie cookies
  }));

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
