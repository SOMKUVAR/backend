const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../db_connection');

router.post('/program_year', (req, res) => {
    const { program_id, year } = req.body;
    const query = SQL`insert into program_year (year_id)
                 SELECT year_master.year_id from year_master where year_master.year <= ?;
             update program_year set program_id = ? where program_id = 0;`
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [year,program_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/program_year/:program_id', (req, res) => {
    const program_id = req.params.program_id;
    const query = SQL`select * from program_year 
             INNER JOIN year_master ON year_master.year_id =
             program_year.year_id where program_year.program_id = ?`
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
