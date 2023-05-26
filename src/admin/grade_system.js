const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.get('/grade/:university_id',(req,res) => {
    const university_id = req.params.university_id;
    const query = SQL`select * from grade_system where grade_system.university_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
         res.status(500).send(err);
        connection.query(query,[university_id],(err,rows) => {
            if(err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})


router.post('/grade',(req,res) => {
    const {grade,description,university_id,minPercentage,maxPercentage } = req.body;
    const query = SQL`insert into grade_system (grade,description,university_id,minPercentage,maxPercentage) values (?,?,?,?,?)`;
    pool.getConnection((err,connection) => {
        if(err) res.status(500).send(err);
        connection.query(query,[grade,description,university_id,minPercentage,maxPercentage],(err,rows) => {
            if(err)res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/grade',(req,res) => {
    const {grade_id,grade,description,minPercentage,maxPercentage} = req.body;
    const query = SQL`update grade_system set grade = ?,description= ?, minPercentage= ?,maxPercentage = ?  where grade_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.status(500).send(err);
        connection.query(query,[grade,description,minPercentage,maxPercentage,grade_id],(err,rows) => {
            if(err)res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})



module.exports = router;