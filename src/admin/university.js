const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');

router.get('/universities', (req, res) => {
    const query = SQL `select * from university`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err)
        
        connection.query(query, (err, rows) => {
            if (err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/university_name', (req, res) => {
    const query = SQL `select university.university_id,university.university_name from university`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err)
        
        connection.query(query, (err, rows) => {
            if (err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})


router.post('/university', (req, res) => {
    const {university_name,email,registration_number,contact_number,address,password} = req.body;
    const query = SQL `insert into university (university_name,registration_number,email,contact_number,address,password) values (?,?,?,?,?,?)`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err)
        
        connection.query(query, [university_name,registration_number,email,contact_number,address,password], (err, rows) => {
            if (err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})


router.put('/university', (req, res) => {
    const {university_id,university_name,email,registration_number,contact_number,address,password} = req.body;
    const query = SQL `update university set university_name = ? ,registration_number = ? ,email = ?,
                      contact_number = ? ,address = ? ,password = ? WHERE university_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err)
        
        connection.query(query, [university_name,registration_number,email,contact_number,address,password,university_id], (err, rows) => {
            if (err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;
