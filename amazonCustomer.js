var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(" ");
    displayItems();
});

var displayItems = function() {

    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Id: " + res[i].item_id + "  || Product Name: " + res[i].product_name +
                " || Price: " + res[i].price);
        };
        console.log(" ");
        // connection.end();
        purchase(res.length);
    })

    var purchase = function(itemIDCount) {
        inquirer.prompt([{
            name: "itemID",
            type: "input",
            message: "Enter the ID of the item you would like to purchase: ",
            validate: function(value) {
                if (isNaN(value) === false && value > 0 && value <= itemIDCount) {
                    return true;
                }
                return false;
            }
        }, {
            name: "quantity",
            type: "input",
            message: "How many units would you like to purchase? ",
            validate: function(value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        }, ]).then(function(answer) {
            var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
            connection.query(query, { item_id: answer.itemID }, function(err, res) {
                if (err) throw err;
                if (answer.quantity > res[0].stock_quantity) {
                    console.log("Insufficient Quantity!");
                } else {
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    var itemID = answer.itemID;
                    var productName = res[0].product_name;
                    var price = res[0].price;
                    var amount = res[0].price * answer.quantity;
                    var query = "UPDATE products SET ? WHERE ?";
                    connection.query(query, [{ stock_quantity: newQuantity }, { item_id: itemID }], function(err, res) {
                        console.log("\n" + "Purchase Summary" + "\n" +
                            "================" + "\n" +
                            "Item: " + productName + "\n" +
                            "Price: " + price + "\n" +
                            "Total Cost of Purchase: $" + amount);
                    });
                    connection.end();
                }
            });
        });

    };
}
