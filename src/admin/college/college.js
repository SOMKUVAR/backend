const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const { pool } = require('../../db_connection');

router.get('/colleges', (req, res) => {
    const query = SQL`select college.*,university.university_name ,status_master.* from college inner join 
                       university on university.university_id = college.university_id inner join 
                       status_master on college.status_id = status_master.status_id`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400, err)

        connection.query(query, (err, rows) => {
            if (err) res.sendStatus(400, err)
            connection.release();
            res.send(rows);
        })
    })
})

router.get('/colleges/:university_id', (req, res) => {
    const university_id = req.params.university_id;
    const query = SQL`select college.*,university.university_name ,status_master.* from college inner join 
                      university on university.university_id = college.university_id inner join 
                      status_master on college.status_id = status_master.status_id
                      where college.university_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.status(500).send(err);

        connection.query(query, [university_id], (err, rows) => {
            if (err) res.status(500).send(err);
            connection.release();
            res.send(rows);
        })
    })
})

router.post('/college', (req, res) => {
    const { university_id, email, registration_number, contact_number, address, college_name, status_id } = req.body;
    const query = SQL`insert into college (university_id,email,registration_number,contact_number,address,college_name,status_id) 
                       values (?,?,?,?,?,?,?)`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400, err)
        connection.query(query, [university_id, email, registration_number, contact_number, address, college_name, status_id], (err, rows) => {
            if (err) res.sendStatus(400, err)
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/college', (req, res) => {
    const { college_id, university_id, email, registration_number, contact_number, address, college_name, status_id } = req.body;
    const query = SQL`update college set university_id = ? ,email = ? ,registration_number = ?,contact_number = ?,
                       address = ?,college_name = ?,status_id = ? where college_id = ?`;
    pool.getConnection((err, connection) => {
        if (err) res.sendStatus(400, err)
        connection.query(query, [university_id, email, registration_number, contact_number, address, college_name, status_id, college_id], (err, rows) => {
            if (err) res.sendStatus(400, err)
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;