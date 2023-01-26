import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactoModule } from './contacto/contacto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WebModule } from './web/web.module';

@Module({
  imports: [ContactoModule, MongooseModule.forRoot('mongodb://127.0.0.1/contactos'), WebModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
