import { Module } from '@nestjs/common';
import { ContactoController } from './contacto.controller';
import { ContactoService } from './contacto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactoSchema } from './schema/contacto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contacto', schema: ContactoSchema }])],
  controllers: [ContactoController],
  providers: [ContactoService],
  exports: [ContactoService]
})
export class ContactoModule {}
