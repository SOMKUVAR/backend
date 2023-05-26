const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const university = require('./university');
const super_admin = require('./admin/admin');
const super_admin_branch = require('./admin/branch');
const super_admin_college = require('./admin/college/college');
const super_admin_program_master = require('./admin/program_master');
const super_admin_program_type = require('./admin/program_type');
const super_admin_university = require('./admin/university');
const super_admin_semester = require('./admin/semester');
const super_admin_college_program = require('./admin/college/college_program');
const super_admin_college_branch = require('./admin/college/college_branch');
const super_admin_program_semester = require('./admin/program_semester');
const super_admin_program_year = require('./admin/program_year');
const super_admin_year = require('./admin/year');
const super_admin_subject = require('./admin/college/subject');
const student = require('./admin/student/student');
const grade_system = require('./admin/grade_system');
const student_marks = require('./admin/student/student_marks');
const student_admin = require('./studentAdmin');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/university',university);
app.use('/api/admin',super_admin,super_admin_branch,super_admin_college,super_admin_semester,
super_admin_program_master,super_admin_university,super_admin_university,super_admin_program_type,
super_admin_college_program,super_admin_college_branch,super_admin_program_semester,super_admin_year,
super_admin_program_year,super_admin_subject,student,grade_system,student_marks);
app.use('/api/student',student_admin);


app.listen(5001,()=>console.log('Server is running at 5001 port'));