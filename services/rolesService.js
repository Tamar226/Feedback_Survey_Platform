const roleRepository = require('../repositories/rolesHandlerDB');
const dotenv = require('dotenv');
dotenv.config();

const getAllRoles = async () => {
    const result = await roleRepository.getAllRoles();
    if (result.hasError) {
        throw new Error('Error fetching roles');
    }
    return result.data;
};

const getRoleByName = async (roleName) => {
    const result = await roleRepository.getRoleByName(roleName);
    if (result.hasError) {
        throw new Error('Error fetching roles');
    }
    return result.data;
};

const addRole = async (newRole) => {
    const result = await roleRepository.addRole(newRole);
    if (result.insertId >= 0) {
        const insertRole = await roleRepository.getRoleByName(result.insertId);
        return insertRole.data;
    } else {
        throw new Error('Error adding role');
    }
};

const updateRole = async (roleName, updateRoleData) => {
    const result = await roleRepository.updateRole(roleName, updateRoleData);
    if (result.affectedRows > 0) {
        return 'Role updated successfully';
    } else {
        throw new Error('Error updating role');
    }
};

const deleteRole = async (roleName) => {
    const result = await roleRepository.deleteRole(roleName);
    if (result.affectedRows > 0) {
        return 'Role deleted successfully';
    } else {
        throw new Error('Error deleting role');
    }
};

module.exports = {
    getAllRoles,
    getRoleByName,
    addRole,
    updateRole,
    deleteRole
}