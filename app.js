const inquirer = require('inquirer');
const mysql = require('mysql');
require("dotenv").config();
// inquirer
//   .prompt({
//     name: "item",
//     type: "input",
//     message: "What item would you like to buy?",
//   })
//   .then(answers => {
//     // Use user feedback for... whatever!!
//   });

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.password,
  database : 'bamazon'
});
 
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });