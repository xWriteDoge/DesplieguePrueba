import { Injectable } from '@nestjs/common';
import { Contacto } from './interfaces/contacto/contacto.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ContactoDto } from './dto/contacto-dto/contacto-dto';

@Injectable()
export class ContactoService {
    
    constructor(@InjectModel('Contacto') private readonly contactoModel: Model<Contacto>) {}
    
    async listar(): Promise<Contacto[]> {
        return await this.contactoModel.find().exec();
    }

    async buscarPorId(id: string): Promise<Contacto> {
        return await this.contactoModel.findById(id).exec();
    }


    async insertar(crearContactoDto: ContactoDto): Promise<Contacto> {
        const nuevoContacto = new this.contactoModel(crearContactoDto);
        return await nuevoContacto.save();
    }

    async borrar(id: string): Promise<Contacto> {
        return await this.contactoModel.findByIdAndRemove(id).exec();
    }

    async actualizar(id: string, actualizarTareaDto: ContactoDto): Promise<Contacto> {
        return await this.contactoModel.findByIdAndUpdate(id, 
            {$set: {
                nombre: actualizarTareaDto.nombre,
                edad: actualizarTareaDto.edad,
                telefono: actualizarTareaDto.telefono
            }}, { new: true, runValidators: true } ).exec();
    }    
}
