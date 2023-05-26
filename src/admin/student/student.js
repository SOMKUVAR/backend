const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../../db_connection');


router.get('/student/:university_id',(req,res) => {
    const university_id = req.params.university_id;
    const query = SQL`SELECT student.*,college_branch.branch_id,college_program.*,branch_master.branch_name,college.college_name,
    program_master.program_name,status_master.status FROM student
    INNER JOIN college_branch ON student.college_branch_id = college_branch.college_branch_id
    INNER JOIN branch_master ON college_branch.branch_id = branch_master.branch_id
    INNER JOIN college_program ON college_branch.college_program_id = college_program.college_program_id
    INNER JOIN college ON college.college_id = college_program.college_id
    INNER JOIN program_master ON program_master.program_id = college_program.program_id
    INNER JOIN status_master ON student.status_id = status_master.status_id
    WHERE college.university_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query,[university_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);9
        })
    })
})

router.get('/studentDetail/:student_id',(req,res) => {
    const student_id = req.params.student_id;
    const query = SQL`SELECT student.student_name, student.father_name, student.roll_number, status_master.status, branch_master.branch_name, program_master.program_name,
    college.college_name,university.university_name FROM student INNER JOIN status_master ON student.status_id =
   status_master.status_id INNER JOIN college_branch ON student.college_branch_id =
   college_branch.college_branch_id  INNER JOIN branch_master ON college_branch.branch_id =
   branch_master.branch_id  INNER JOIN college_program ON college_branch.college_program_id =
   college_program.college_program_id  INNER JOIN program_master ON college_program.program_id =
   program_master.program_id INNER JOIN college ON college_program.college_id =
   college.college_id INNER JOIN university ON college.university_id =
   university.university_id where student.student_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query,[student_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);9
        })
    })
})

router.post('/student', (req, res) => {
    const {student_name,father_name,college_branch_id,
    roll_number,email,password,status_id} = req.body;
      const query = SQL`insert into student (student_name,father_name,
                       roll_number,email,password,status_id,college_branch_id)
                      values (?,?,?,?,?,?,?)`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [student_name,father_name,
            roll_number,email,password,status_id,college_branch_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/student', (req, res) => {
    const { student_id,college_branch_id,student_name,father_name,
    roll_number,email,password,status_id} = req.body;
    const query = SQL`update student set student_name = ?,father_name = ?,roll_number = ?,
    email = ?,password = ?,status_id = ?,college_branch_id = ?
    where student.student_id = ?`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [student_name,father_name,roll_number,email,password,status_id,
            college_branch_id,student_id], (err, rows) => {
            if (err) res.status(500).send(err);
            console.log(err);
            connection.release();
            res.send(rows);
        })
    })
})


router.get('/student/:college_branch_id',(req,res) => {
    const college_branch_id = req.params.college_branch_id;
    const query = "Select * from student where college_branch_id = ?";
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [college_branch_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;