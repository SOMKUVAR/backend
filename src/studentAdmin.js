const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('./db_connection');



router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const query = SQL`select * from student where password= ? and roll_number = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(500,err)
        connection.query(query, [password, username], (err, rows) => {
            if (err) res.sendStatus(500,err)
            connection.release();
            res.send(rows);
        });
    })
})






module.exports = router;
