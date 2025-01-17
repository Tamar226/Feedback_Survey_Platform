
const managerService = require('../services/managersService');
const bcrypt = require('bcrypt');

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
        const hashPassword = await bcrypt.hash(newManager.password, 10);
        newManager.password = hashPassword;
        const addedManager = await managerService.addManager(newManager);
        const token = jwt.sign({ id: addedManager.id, username: addedManager.username, role: 'manager' }, JWT_SECRET);

        res.status(200).send({ user: addedManager, role: 'manager', token });
    } catch (error) {
        console.error('Error adding manager in controllers:', error);
        res.status(500).send('Internal Server Error');
    }
};

const addCorrentManagers = async (req, res) =>{
    try{
        const hadasManager =  {
            name: 'hadas katz',
            username: 'hadas',
            email: 'hadaskatz613@gmail.com',
            password: 'hadas1570'
        };
        const hadasHashPass= await bcrypt.hash(hadasManager.password, 10);
        hadasManager.password = hadasHashPass;

        const tamarManager = {
            name: 'tamar licht',
            username: 'tamar',
            email: 'tamarlicht3@gmail.com',
            password: '0583250226'
        };
        const tamarHashPass= await bcrypt.hash(tamarManager.password, 10);
        tamarManager.password = tamarHashPass;

        const addedTamarManager = await managerService.addManager(tamarManager);
        const addedHadasManager = await managerService.addManager(hadasManager);

        res.status(200).json({addedTamarManager, addedHadasManager});
    } catch (err) {
        console.error('Error adding specific managers:');
        res.status(500).send('Internal Server Error');
    }
}

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

// const loginManager = async (req, res) => {
//     const userName = req.body.username;
//     const password = req.body.password;
//     try {
//         const result = await managerService.getManagerDetails(userName, password);
//         if (result.hasError) {
//             res.status(404).send('Error');
//         } else {
//             res.status(200).send(JSON.stringify(result));
//         }
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// };

const loginManager = async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    try {
        const result = await managerService.getManagerDetails(userName, password);
        if (result.hasError) {
            res.status(401).send('Authentication failed');
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
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
    loginManager,
    deleteManager,
    addCorrentManagers,
};
