const inquirer = require('inquirer');
const mysql = require('mysql');
require("dotenv").config();

function updateProduct(quantity, id) {
    console.log("Updating quantities...\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: quantity
        },
        {
          id: id
        }
      ],
      function(err, res) {
        if (err) throw err;
        // console.log(res.affectedRows + " products updated!\n");
        // console.log(res)
        
        // Call deleteProduct AFTER the UPDATE completes
        // deleteProduct();
      }
    );
  
    // logs the actual query being run
    // console.log(query.sql);
  }

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
inquirer
  .prompt([
    {
    name: "item",
    type: "input",
    message: "What item would you like to buy?",
    },
    {
    name: "amount",
    type: "input",
    message: "Houw many units would you like to buy?",
    },

])
  .then(answers => {
    const amountOrder = answers.amount;
    var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['products', 'product_name', answers.item];
    sql = mysql.format(sql, inserts);
      connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    if(amountOrder <= results[0].stock_quantity){
        const total = results[0].price * amountOrder;
        const quantity = results[0].stock_quantity - amountOrder;
        const id = results[0].ID;
        console.log(results[0].ID)
        updateProduct(quantity, id)
        console.log(`at ${results[0].price} per unit, your total is : $${total}`)

    } else {
        console.log('INSUFFICIENT QUANTITY!')
    }
    
    });

   
  });
// connection.connect();