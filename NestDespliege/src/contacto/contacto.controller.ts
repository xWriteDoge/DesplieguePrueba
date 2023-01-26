import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoDto } from './dto/contacto-dto/contacto-dto';

@Controller('contacto')
export class ContactoController {
    constructor(private readonly contactoService: ContactoService) {}
    
    // GET /contacto
    @Get()
    async listar() {
        return this.contactoService.listar();
    }

    // GET /contacto/buscar/:id
    @Get('buscar/:id')
    async buscarPorId(@Param('id') id: string) {
        try {
            let resultado = await this.contactoService.buscarPorId(id);
            if (resultado) return {resultado: resultado};
            throw new Error();
        } catch(Error) {
            return { error: 'Error buscando al contacto' };
        }
    }

    // POST /contacto
    @Post()
    async crear(@Body() crearContactoDto: ContactoDto) {
        return this.contactoService.insertar(crearContactoDto);
    }
    
    // PUT /contacto/:id
    @Put(':id')
    actualizar(@Param('id') id: string, @Body() actualizarContactoDto: ContactoDto) {
        return this.contactoService.actualizar(id, actualizarContactoDto);
    }

    // DELETE /contacto/:id
    @Delete(':id')
    borrar(@Param('id') id: string) {
        return this.contactoService.borrar(id);
    }   
}
