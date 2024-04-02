// Use mysql2 to fix auth error: ER_NOT_SUPPORTED_AUTH_MODE
// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const mysql = require('mysql2');
const express = require('express');
const path = require ('path');


const app = express();
app.use(express.static(__dirname));
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    port: 3306,
});
  
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all users
app.get('/users', (req, res) => {
    res.json({users: [ {userid: 1, username: "mzuber"}, {userid: 2, username: "airin"} ]});
});

// Get all employees
app.get('/employees', (req, res) => {
  //db.query('SELECT employee_id, team_name, email, years_worked,ROUND(employees_mean_polarity, 2) as employees_mean_polarity,ROUND(teams_mean_polarity, 2) as teams_mean_polarity,ROUND(z_score_relative_to_team, 2) as z_score_relative_to_team,ROUND(mean_polarity_of_all_employees_in_organization, 2) as mean_polarity_of_all_employees_in_organization,ROUND(z_score_relative_to_org, 2) as z_score_relative_to_org FROM culture_db.employees', (err, results) => {
  
    db.query('SELECT * FROM culture_db.employees', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

// Get all employees
app.get('/teams', (req, res) => {
  db.query('SELECT * FROM culture_db.teams', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get all employees
app.get('/messages', (req, res) => {
  db.query('SELECT * FROM culture_db.messages', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("SELECT * FROM sql_store.customers", function (err, result) {
//         if (err) throw err;
//         console.log(result);
//         customers = result.map(row => {
//             return {
//                 customer_id: row.customer_id,
//                 first_name: row.first_name,
//             };
//         });
//         console.log(customers);
//         console.log("Closed")
//         con.end();
//     });
// });


console.log("end")

