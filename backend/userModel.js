const users = [];

const UserModel = {
    create: (email, role, state) => {
        // Regla: No registrar un email ya existente
        if (users.find(u => u.email === email)) {
            throw new Error('El email ya está registrado');
        }
        const newUser = { id: Date.now().toString(), email, role, state };
        users.push(newUser);
        return newUser;
    },

    getAll: () => {
        return users;
    },

    isActive: (email) => {
        const user = users.find(u => u.email === email);
        return user ? user.state === 'activo' : false;
    },
    
    delete: (email) => {
        const index = users.findIndex(u => u.email === email);
        if (index === -1) {
             throw new Error('Usuario no encontrado');
        }
        users.splice(index, 1);
        return true;
    }
};

module.exports = UserModel;