const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../db_connection');

router.post('/program_semester', (req, res) => {
    const { program_id, year } = req.body;
    const semester = 2 * year;
    const query = SQL`insert into program_semester (semester_id)
    SELECT semester_master.semester_id from semester_master where semester_master.semester <= ?;
    update program_semester set program_id = ? where program_id = 0;`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [semester,program_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/program_semester/:program_id', (req, res) => {
    const program_id = req.params.program_id;
    console.log(program_id);
    const query = SQL`SELECT program_semester.*,semester_master.semester FROM
                     semester_master INNER JOIN program_semester ON program_semester.semester_id =
                     semester_master.semester_id where program_semester.program_id = ?;`
   
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);
        connection.query(query, [program_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;
