var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

});
startup()
// buyStuff()
//   upon loadup, load list of items in stock, then asks user what they would like to buy
function startup() {
    // query bamazon database for the products table, then displays the results
    var ID = []
    var names = [];
    var prices = [];
    connection.query('SELECT * FROM products', function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
            ID.push(rows[i].ID)
            names.push(rows[i].product_name)
            prices.push (rows[i].price)
        };
        for (i=0; i<names.length; i++) {
        console.log("ID: "+ID[i]+", Product: "+names[i]+": $"+prices[i])
        };
    })
    buyStuff()
};
function buyStuff() {
    // inquirer prompt for what they want to buy and how many items
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: "what is the ID of the item you would like to buy?",
                name: 'itemID'
            },
            {
                type: 'input',
                message: 'how many would you like to buy?',
                name: 'purchaseQuant'
            }
        ]).then(function(answer) {
            var chosenItem
            for (var i = 0; i<results.length; i++) {
                if (results[i].ID === answer.itemID) {
                    chosenItem = results[i];
                    console.log(chosenItem)
                }
            }

            // if (chosenItem.stock_quantity > parseInt(answer.purchaseQuant)) {
            // show the amount of money it will cost to buy parseInt(purchaseQuant) amount of chosenItem;
            // update database with now reduced stock_quantity
            // }
            // else {
            //     console.log("Oops! It seems we don't have enough items in stock! Please try again...");
            //     startup();
            // }
        })
    })
}




