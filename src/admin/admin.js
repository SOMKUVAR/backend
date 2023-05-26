const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.post('/email_contains', (req, res) => {
    const {username} = req.body;
    const query = SQL`select * from admin_user where email = ?`;
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        }
        connection.query(query, [username], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            if(rows.length > 0)
            res.send(true);
            else
            res.send(false);
        });
    })
})


router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const query = SQL`select * from admin_user where password= ? and email = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(500,err)
        connection.query(query, [password, username], (err, rows) => {
            if (err) res.sendStatus(500,err)
            connection.release();
            res.send(rows);
        });
    })
})


router.get('/status',(req,res) => {
    const query = SQL `select * from status_master`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(500,err)
        
        connection.query(query, (err, rows) => {
            if (err) res.sendStatus(500,err)
            connection.release();
            res.send(rows);
        })
    })
})



router.post('/admin_user',(req,res) => {
    const {user_type_id,university_id,email,password} = req.body;
    const query = SQL`insert into admin_user (user_type_id,university_id,email,password) values (?,?,?,?)`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(500,err)
        
        connection.query(query,[user_type_id,university_id,email,password], (err, rows) => {
            if (err) res.sendStatus(500,err)
            connection.release();
            res.send(rows);
        })
    })
})



module.exports = router;
