
const managerService = require('../services/managersService');

const getAllManagers = async (req, res) => {
    try {
        const managers = await managerService.getAllManagers();
        res.status(200).send(['success get all managers', managers]);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

const getManagerById = async (req, res) => {
    const id = req.params.id;
    try {
        const manager = await managerService.getManagerById(id);
        res.status(200).send(manager);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const addManager = async (req, res) => {
    const newManager = req.body;
    try {
        const addedManager = await managerService.addManager(newManager);
        res.status(200).send(addedManager);
    } catch (error) {
        console.error('Error adding manager:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateManager = async (req, res) => {
    const managerId = req.params.managerId;
    const updatedManagerData = req.body;
    try {
        const updateMessage = await managerService.updateManager(managerId, updatedManagerData);
        res.status(200).send(updateMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

const deleteManager = async (req, res) => {
    const managerId = req.params.managerId;
    try {
        const deleteMessage = await managerService.deleteManager(managerId);
        res.status(200).send(deleteMessage);
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {
    getAllManagers,
    getManagerById,
    addManager,
    updateManager,
    deleteManager,
};
