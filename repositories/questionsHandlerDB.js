const mysql = require('mysql2');


var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();


async function getAllTodos() {
    const result = await pool.query('SELECT * FROM todos');
    return prepareResult(false, 0, 0, result);
}

async function getTodoById(userId) {
    try {
        const result = await pool.query('SELECT * FROM todos WHERE userId = ?', [userId]);
        if (result.length === 0) {
            throw new Error(`Todo with ID ${userId} not found`);
        }
        return prepareResult(false, 0, 0, result[0]);

    } catch (error) {
        throw error;
    }
}

async function addTodo(newTodo) {
    try {
        if (newTodo.completed) {
            newTodo.completed = 1;
        }
        else
            newTodo.completed = 0;
        const result = await pool.query(`INSERT INTO todos (userID, title,completed) VALUES ('${newTodo.userId}', '${newTodo.title}','${newTodo.completed}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateTodo(todoId, updatedTodoData) {
    try {
        const result = await pool.query('UPDATE todos SET ? WHERE id = ?', [updatedTodoData, todoId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)
        }
        else {
            return prepareResult(true, 0, 0);
        }

    } catch (error) {
        throw error;
    }
}

async function deleteTodo(todoId) {
    try {
        const result = await pool.query('DELETE FROM todos WHERE id = ?', todoId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}
function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
    const resultdata = {
        hasError: hasErrorT,
        affectedRows: affectedRowsT,
        insertId: insertIdT,
        data: dataT
    }
    return resultdata;
}
module.exports = {
    getAllTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo
};