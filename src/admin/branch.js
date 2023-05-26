const SQL = require('sql-string-template');
const express = require('express');
const router = express.Router();
const {pool} = require('../db_connection');


router.get('/branch',(req,res) => {
    const query = SQL`select branch_master.*,program_master.program_name from branch_master 
                      inner join program_master on program_master.program_id = branch_master.program_id`;
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


router.post('/branch',(req,res) => {
    const {program_id,branch_name } = req.body;
    const query = SQL`insert into branch_master (program_id,branch_name) values (?,?)`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err)
        connection.query(query,[program_id,branch_name],(err,rows) => {
            if(err)res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})

router.put('/branch',(req,res) => {
    const {program_id,branch_name,branch_id} = req.body;
    const query = SQL`update branch_master set program_id = ?,branch_name = ? where branch_id = ?`;
    pool.getConnection((err,connection) => {
        if(err) res.sendStatus(400,err)
        connection.query(query,[program_id,branch_name,branch_id],(err,rows) => {
            if(err)res.sendStatus(400,err)
            connection.release();
            res.send(rows);
        })
    })
})



module.exports = router;