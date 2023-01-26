import { Module } from '@nestjs/common';
import { ContactoModule } from 'src/contacto/contacto.module';
import { WebController } from './web.controller';

@Module({
  imports: [ContactoModule],
  controllers: [WebController]
})
export class WebModule {}

