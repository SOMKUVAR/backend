const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.get('/program_type',(req,res) => {
    const query = SQL `select * from program_type`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err);
        
        connection.query(query, (err, rows) => {
            if (err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/program_type',(req,res) => {
    const {program_type} = req.body;
    const query = SQL `insert into program_type (program_type) values (?)`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err);
        
        connection.query(query,[program_type], (err, rows) => {
            if (err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/program_type',(req,res) => {
    const {program_type,program_type_id} = req.body;
    const query = SQL `update program_type set program_type = ? where program_type_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400,err);
        
        connection.query(query,[program_type,program_type_id], (err, rows) => {
            if (err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})


module.exports = router;