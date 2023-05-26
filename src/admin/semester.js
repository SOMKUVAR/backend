const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.get('/semester',(req,res) => {
    const query = SQL`select * from semester_master`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err);
        connection.query(query,(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/semester',(req,res) => {
    const {semester} = req.body;
    const query = SQL`insert into semester_master(semester) values(?)`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err);
        connection.query(query,[semester],(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/semester',(req,res) => {
    const {semester,semester_id} = req.body;
    const query = SQL`update semester_master set semester = ? where semester_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err);
        connection.query(query,[semester,semester_id],(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;