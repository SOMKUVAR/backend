const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../../db_connection');


router.get('/student_marks/:student_id/:program_semester_id',(req,res) => {
    const student_id = req.params.student_id;
    const program_semester_id = req.params.program_semester_id;
    const query = SQL`SELECT student_marks.*, subject.subject_code, subject.subject_name, subject.theory_marks AS total_theory_marks,
    subject.practical_marks AS total_practical_marks
    FROM student_marks INNER JOIN subject ON student_marks.subject_id = subject.subject_id
    WHERE student_marks.student_id = ? and subject.program_semester_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query,[student_id,program_semester_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/student_marks/:student_id/:program_year_id',(req,res) => {
    const student_id = req.params.student_id;
    const program_year_id = req.params.program_year_id;
    const query = SQL`SELECT student_marks.*, subject.subject_code, subject.subject_name, subject.theory_marks AS total_theory_marks,
    subject.practical_marks AS total_practical_marks
    FROM student_marks INNER JOIN subject ON student_marks.subject_id = subject.subject_id
    WHERE student_marks.student_id = ? and subject.program_year_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query,[student_id,program_year_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/student_marks', (req, res) => {
    const { student_id,subjects} = req.body;
    const query = SQL`insert into student_marks (student_id,subject_id,theory_marks,practical_marks)
                        values (?,?,?,?)`
    res.send(subjects);
    pool.getConnection(async(err, connection) => {
        if (err) res.status(500).send(err);
       for(let i = 0;i < subjects.length;i++){
        connection.query(query, [student_id,subjects[i].subject_id,subjects[i].theory_marks,subjects[i].practical_marks], 
            (err, rows) => {
            if (err) res.status(500).send(err);
        })
     }

     setTimeout(()=>{
        connection.release();
     },[10000])
    })
})

module.exports = router;