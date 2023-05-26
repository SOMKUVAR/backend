const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');

router.get('/program_master',(req,res) => {
    const query = SQL `select program_master.*,program_type.program_type from program_master 
                       inner join program_type on program_type.program_type_id = program_master.program_type_id`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);
        
        connection.query(query, (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/exam_system/:college_program_id',(req,res) => {
    const college_program_id = req.params.college_program_id;
    const query = SQL`SELECT program_master.* FROM college_program   
    INNER JOIN program_master ON college_program.program_id = program_master.program_id where college_program_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);
        
        connection.query(query,[college_program_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/program_master',(req,res) => {
    const {program_type_id,program_name,duration,semester} = req.body;
    const query = SQL `insert into program_master (program_type_id,program_name,duration,semester) values (?,?,?,?)`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);
        
        connection.query(query,[program_type_id,program_name,duration,semester], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/program_master',(req,res) => {
    const {program_id,program_type_id,program_name,duration,semester} = req.body;
    const query = SQL `update program_master set program_type_id = ? ,program_name = ?,duration = ?,semester = ? where program_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);
        
        connection.query(query,[program_type_id,program_name,duration,semester,program_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;
