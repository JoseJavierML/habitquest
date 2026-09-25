const UserModel = require('./userModel');

describe('Gestión de Usuarios (Lógica en memoria)', () => {
    
    test('1. Permite registrar un usuario nuevo', () => {
        const user = UserModel.create('test@correo.com', 'usuario', 'pendiente');
        expect(user.email).toBe('test@correo.com');
        expect(user.role).toBe('usuario');
    });

    test('2. Comprueba caso de error: falla al registrar un email ya existente', () => {
        expect(() => {
            UserModel.create('test@correo.com', 'usuario', 'pendiente');
        }).toThrow('El email ya está registrado');
    });

    test('3. Permite listar a los usuarios registrados', () => {
        const users = UserModel.getAll();
        expect(users.length).toBeGreaterThan(0);
    });

    test('4. Comprueba correctamente si un usuario está activo', () => {
        UserModel.create('activo@correo.com', 'usuario', 'activo');
        
        const esActivo = UserModel.isActive('activo@correo.com');
        const esPendiente = UserModel.isActive('test@correo.com'); 
        
        expect(esActivo).toBe(true);
        expect(esPendiente).toBe(false);
    });

    test('5. Permite eliminar un usuario y lanza error si no existe', () => {
        const resultado = UserModel.delete('activo@correo.com');
        expect(resultado).toBe(true);
        
        expect(() => {
            UserModel.delete('activo@correo.com');
        }).toThrow('Usuario no encontrado');
    });
});