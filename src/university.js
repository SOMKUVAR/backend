const express = require('express');
const router = express.Router();
const { pool } = require('./db_connection');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'select * from university where password= ? and email = ?';
    pool.getConnection((err, connection) => {
        if (err) res.errored(err);
        connection.query(query, [password, username], (err, rows) => {
            if (err) res.errored(err);
            connection.release();
            if(rows.length > 0)
             res.send(true);
            else
             res.send(false);
        });
    })
})

router.get('/:id/colleges',(req,res) => {
    const {id} = req.params;
    const query = 'select * from college where university_id = ?';
    pool.getConnection((err,connection) => {
        if(err) res.errored(err);
        connection.query(query,[id],(err,rows) => {
            if(err) res.errored(err);
            connection.release();
            res.send(rows);
        })
    })
})

module.exports = router;