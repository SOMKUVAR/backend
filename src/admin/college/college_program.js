const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../../db_connection');


router.get('/college_program_id/:college_id/:program_id',(req,res) => {
    const college_id = req.params.college_id;
    const program_id = req.params.program_id;
    const query = SQL`SELECT college_program.college_program_id from college_program where college_id = ? and program_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
        {
            res.sendStatus(500,err);
        }
        connection.query(query,[college_id,program_id],(err,rows) => {
            if(err) {
                res.sendStatus(500,err);
                
            }
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/college_program',(req,res) => {
    const query = SQL`SELECT college_program.*, college.college_name,college.university_id,university.university_name,program_master.program_name
                      FROM college_program INNER JOIN college ON college_program.college_id = college.college_id
                      INNER JOIN university ON college.university_id = university.university_id
                      INNER JOIN program_master ON college_program.program_id = program_master.program_id`;
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


router.post('/college_program',(req,res) => {
    const {program_id,college_id } = req.body;
    const query = SQL`insert into college_program (program_id,college_id ) values (?,?)`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err)
        connection.query(query,[program_id,college_id ],(err,rows) => {
            if(err)res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/college_program',(req,res) => {
    const {program_id,college_id,college_program_id} = req.body;
    const query = SQL`update college_program set program_id = ?,college_id = ? where college_program_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err)
        connection.query(query,[program_id,college_id,college_program_id],(err,rows) => {
            if(err)res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/university/college_program/:university_id',(req,res) => {
    const university_id = req.params.university_id;
    const query = SQL`SELECT college_program.*, college.college_name,college.university_id,university.university_name,
                      program_master.program_name
                      FROM college_program INNER JOIN college ON college_program.college_id = college.college_id
                      INNER JOIN university ON college.university_id = university.university_id
                      INNER JOIN program_master ON college_program.program_id = program_master.program_id
                      where college.university_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err);
        connection.query(query,[university_id],(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/college_program/:college_id',(req,res) => {
    const college_id = req.params.college_id;
    const query = SQL`SELECT college_program.*,program_master.program_name FROM college_program  
                      INNER JOIN program_master ON college_program.program_id = program_master.program_id
                      where college_program.college_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err);
        connection.query(query,[college_id],(err,rows) => {
            if(err) res.sendStatus(400,err);
            connection.release();
            res.send(rows);
        })
    })
})


module.exports = router;