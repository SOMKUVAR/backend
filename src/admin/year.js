const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.get('/year',(req,res) => {
    const query = SQL`select * from year_master`;
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

router.post('/year',(req,res) => {
    console.log(req.body);
    const {year} = req.body;
    const query = SQL`insert into year_master(year) values(?)`;
    pool.getConnection((err,connection) => {
        if(err) res.status(500).send(err);
        connection.query(query,[year],(err,rows) => {
             if(err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/year',(req,res) => {
    const {year,year_id} = req.body;
    const query = SQL`update year_master set year = ? where year_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err);
        connection.query(query,[year,year_id],(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;