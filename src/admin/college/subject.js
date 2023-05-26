const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../../db_connection');


router.get('/subject/:university_id',(req,res) => {
    const university_id = req.params.university_id;
    const query = SQL`SELECT subject.*,branch_master.branch_name,program_master.program_name,college.college_name,
    status_master.status,college_program.college_program_id,subject_subtype.subject_subtype,subject_type.subject_type,
    college.college_id,semester_master.semester,year_master.year
    FROM subject INNER JOIN college_branch ON subject.college_branch_id =college_branch.college_branch_id
    INNER JOIN branch_master ON college_branch.branch_id = branch_master.branch_id
    INNER JOIN program_master ON branch_master.program_id = program_master.program_id
    INNER JOIN college_program ON college_branch.college_program_id =college_program.college_program_id
    INNER JOIN college ON college.college_id = college_program.college_id
    LEFT JOIN program_semester ON subject.program_semester_id = program_semester.program_semester_id
    LEFT JOIN semester_master ON program_semester.semester_id = semester_master.semester_id
    LEFT JOIN program_year ON subject.program_year_id = program_year.program_year_id
    LEFT JOIN year_master ON program_year.year_id = year_master.year_id
    LEFT JOIN status_master ON status_master.status_id = subject.status_id
    INNER JOIN subject_subtype ON subject_subtype.subject_subtype_id = subject.subject_subtype_id
    INNER JOIN subject_type ON subject_subtype.subject_type_id = subject_type.subject_type_id
    WHERE college.university_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [university_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/subject', (req, res) => {
    const { college_branch_id,practical_marks,practical_passing_marks,theory_passing_marks,subject_subtype_id,
           program_semester_id,program_year_id,subject_code,subject_name,theory_marks,status_id} = req.body;
      const query = SQL`insert into subject (subject_code,subject_name,program_year_id,program_semester_id,subject_subtype_id,
                      theory_marks,practical_marks,theory_passing_marks,practical_passing_marks,status_id,college_branch_id)
                      values (?,?,?,?,?,?,?,?,?,?,?)`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [subject_code,subject_name,program_year_id,program_semester_id,subject_subtype_id,
        theory_marks,practical_marks,theory_passing_marks,practical_passing_marks,status_id,college_branch_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/subject', (req, res) => {
    const {subject_id,college_branch_id,practical_passing_marks,theory_passing_marks,practical_marks, subject_subtype_id,
           program_semester_id,program_year_id,subject_code,subject_name,theory_marks,status_id} = req.body;
    const query = SQL`update subject set subject_code = ? ,subject_name = ? ,program_year_id = ?,program_semester_id = ?,
                      theory_marks = ? ,practical_marks = ?,practical_passing_marks = ?,theory_passing_marks = ?,status_id=?,
                      subject_subtype_id = ?,college_branch_id = ? where subject_id = ?`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [subject_code,subject_name,program_year_id,program_semester_id,
        theory_marks,practical_marks,practical_passing_marks,theory_passing_marks,status_id,subject_subtype_id,
        college_branch_id,subject_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/subject_type',(req,res) => {
   
    const query = SQL`SELECT subject_subtype.*,subject_type.subject_type from subject_subtype 
                      inner join subject_type on subject_subtype.subject_type_id = subject_type.subject_type_id`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/subject/:college_branch_id/:program_semester_id',(req,res) => {
    const {college_branch_id,program_semester_id} = req.params;
    const query = SQL`SELECT subject_subtype.subject_subtype,subject_type.subject_type,subject.*
    FROM subject INNER JOIN subject_subtype ON subject_subtype.subject_subtype_id = subject.subject_subtype_id
    INNER JOIN subject_type ON subject_type.subject_type_id = subject_subtype.subject_type_id
    where subject.college_branch_id = ? and program_semester_id =?;`  
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [college_branch_id,program_semester_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/subject/:college_branch_id/:program_year_id',(req,res) => {
    const {college_branch_id,program_year_id} = req.params;
    const query = SQL`SELECT subject_subtype.subject_subtype,subject_type.subject_type,subject.*
    FROM subject INNER JOIN subject_subtype ON subject_subtype.subject_subtype_id = subject.subject_subtype_id
    INNER JOIN subject_type ON subject_type.subject_type_id = subject_subtype.subject_type_id
    where subject.college_branch_id = ? and  program_year_id = ?;`  
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [college_branch_id,program_year_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})


module.exports = router;
