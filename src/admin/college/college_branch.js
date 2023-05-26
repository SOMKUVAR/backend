const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../../db_connection');


router.get('/college_branch',(req,res) => {
    const query = SQL`SELECT college_branch.college_branch_id,college_branch.college_program_id,college_branch.branch_id,
                      college_program.program_id,program_master.program_name,
                      college_program.college_id,college.college_name,college.university_id,university.university_name,
                      branch_master.branch_name FROM college_branch INNER JOIN college_program ON 
                      college_branch.college_program_id = college_program.college_program_id
                      INNER JOIN program_master ON college_program.program_id = program_master.program_id
                      INNER JOIN college ON college_program.college_id = college.college_id
                      INNER JOIN university ON college.university_id = university.university_id
                      INNER JOIN branch_master ON college_branch.branch_id = branch_master.branch_id`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err)
        connection.query(query,(err,rows) => {
            if(err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/university/college_branch/:university_id',(req,res) => {
    const university_id = req.params.university_id;
    const query = SQL`SELECT college_branch.college_branch_id,college_branch.college_program_id,college_branch.branch_id,
                      college_program.program_id,program_master.program_name,
                      college_program.college_id,college.college_name,college.university_id,university.university_name,
                      branch_master.branch_name FROM college_branch INNER JOIN college_program ON 
                      college_branch.college_program_id = college_program.college_program_id
                      INNER JOIN program_master ON college_program.program_id = program_master.program_id
                      INNER JOIN college ON college_program.college_id = college.college_id
                      INNER JOIN university ON college.university_id = university.university_id
                      INNER JOIN branch_master ON college_branch.branch_id = branch_master.branch_id
                      where college.university_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err)
        connection.query(query,[university_id],(err,rows) => {
            if(err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})


router.post('/college_branch',(req,res) => {
    const {college_id,program_id,branch_id } = req.body;
    const query = SQL`insert into college_branch (college_program_id,branch_id) values 
                     ((SELECT college_program.college_program_id from college_program where college_id = ? and program_id = ?),?)`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(500,err)
        connection.query(query,[college_id,program_id,branch_id ],(err,rows) => {
            if(err){
                res.sendStatus(500,err)
                console.log(err);
            }
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/college_branch',(req,res) => {
    const {college_program_id,branch_id,college_branch_id} = req.body;
    const query = SQL`update college_branch set college_program_id = ?,branch_id = ? where college_branch_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err)
        connection.query(query,[college_program_id,branch_id,college_branch_id],(err,rows) => {
            if(err)res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/college_branch/:college_program_id',(req,res) => {
    const college_program_id = req.params.college_program_id;
    const query = SQL`SELECT college_branch.*, branch_master.branch_name FROM college_branch
                    INNER JOIN branch_master ON college_branch.branch_id =branch_master.branch_id
                    where college_branch.college_program_id = ?`;
    pool.getConnection((err,connection) => {
        if(err)
         res.sendStatus(400,err)
        connection.query(query,[college_program_id],(err,rows) => {
            if(err) res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;