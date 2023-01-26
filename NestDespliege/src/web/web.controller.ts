import { Controller, Get, Param, Post, Body, Req, Res, Put, Session } from '@nestjs/common';
import { ContactoService } from 'src/contacto/contacto.service';
const aUsuarios = [
    { usuario: 'rosa', password: 'rosa', rol: 'admin' },
    { usuario: 'may', password: 'may', rol: 'normal' }
];

@Controller('web')
export class WebController {
    constructor(private readonly contactoService: ContactoService) { }
    
// Página inicial, lista de contactos
@Get('contactos')
async listar(@Res() res) {
    const resultado = await this.contactoService.listar();
    return res.render('contactos_listado', { contactos: resultado });
}

// Redirigir al formulario de crear contacto en el caso de estar logueado
@Get('contactos/nuevo')
async crearContacto(@Res() res, @Session() session) {
    if(!session.usuario) return res.render('login', {error: "El usuario debe estar logueado"});
    return res.render('contactos_nuevo');
}
// Redirigir al formulario de login
@Get('contactos/iniciarSesion')
async formularioIniciarSesion(@Res() res) {
    return res.render('iniciarSesion');
}
// Redirigir al formulario de modificar contacto 
@Get('contactos/editar/:id')
async editarContacto(@Res() res, @Param('id') id: string, @Session() session) {
    if(!session.usuario) return res.render('login', {error: "El usuario debe estar logueado"});
    const resultado = await this.contactoService.buscarPorId(id);
    return res.render('contactos_editar', { contacto: resultado });
}
// Formulario de login
@Post('login')
async login(@Res() res, @Req() req, @Body() body) {
    let usu = body.usuario;
    let pass = body.password;
    let existe = aUsuarios.filter(usuario => usuario.usuario == usu && usuario.password == pass);
    
    if (existe.length > 0) {
        console.log("logued");
        req.session.usuario = existe[0].usuario;
        this.listar(res);
    } else {
        res.render('iniciarSesion', { error: "Error usuario o contraseña incorrecta" });
    }
}
// input de búsqueda - lista de contactos
@Post('contactos/buscar')
async buscarContacto(@Res() res, @Body() body) {
    try {
        const resultado = await (await this.contactoService.listar()).filter(c => c.nombre.includes(body.textoBusqueda));
        return res.render('contactos_listado', { contactos: resultado });
    } catch (error) {
        res.render('error', { error: "Se ha producido un error en la búsqueda" });
    }

}
// Modificamos el contacto desde el formulario
@Post('contactos')
async insertarContacto(@Res() res, @Body() body, @Session() session) {
    try {
        if(!session.usuario) return res.render('login', {error: "El usuario debe estar logueado"});
        const resultado = await this.contactoService.insertar(body);
        return res.render('contactos_ficha', { contacto: resultado });
    } catch (error) {
        res.render('error', { error: "Error al insertar el contacto" });
    }

}
// Modificar contacto - formulario
@Post('contactos/:id')
async modificarContacto(@Res() res, @Param('id') id: string, @Body() body, @Session() session) {
    try {
        if(!session.usuario) return res.render('login', {error: "El usuario debe estar logueado"});
        const resultado = await this.contactoService.actualizar(id, body);
        return res.render('contactos_ficha', { contacto: resultado });
    } catch (error) {
        res.render('error', { error: "Error al modificar el contacto" });
    }
}

// Buscar contacto por id - ver ficha
@Get('contactos/:id')
async buscarPorId(@Res() res, @Param('id') id: string) {
    const resultado = await this.contactoService.buscarPorId(id);
    return res.render('contactos_ficha', { contacto: resultado });
}
// Borrar contacto - botón de borrar
@Post('contactos/borrar/:id')
async borrarContacto(@Res() res, @Param('id') id: string, @Session() session) {
    if(!session.usuario) return res.render('login', {error: "El usuario debe estar logueado"});
    const resultado = await this.contactoService.borrar(id);
    this.listar(res);
}
// Cerrar sesión - botón del menú
@Get('logout')
async cerrarSession(@Res() res, @Req() req) {
    req.session.destroy();
    this.listar(res);
}
}