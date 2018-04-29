var inquirer = require('inquirer');
var mysql = require('mysql');

// connect to database
var connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,

    user: 'root',

    password: '',
	database: 'Bamazon'
});

// check that user input is a positive integer
function inputCheck(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive integer.';
	}
}

function purchase() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: inputCheck,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?',
			validate: inputCheck,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				inventory();

			} else {
				var productData = data[0];

				if (quantity <= productData.quantity) {
					console.log('Placing order...');

					var updateQueryStr = 'UPDATE products SET quantity = ' + (productData.quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Order placed. Your total is $' + productData.price * quantity);
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
				} else {
					console.log('Insufficient inventory. Only ' + productData.quantity + ' available');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

					inventory();
				}
			}
		})
	})
}

function inventory() {

	queryStr = 'SELECT * FROM products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Available Inventory: ');
		console.log('-----------------------------------------------------------------------\n');

		var output = '';
		for (var i = 0; i < data.length; i++) {
			output = '';
			output += 'Item ID: ' + data[i].item_id + '  ||  ';
			output += 'Product Name: ' + data[i].product + '  ||  ';
			output += 'Department: ' + data[i].department + '  ||  ';
			output += 'Price: $' + data[i].price + '\n';

			console.log(output);
		}

	  	console.log("-----------------------------------------------------------------------\n");

	  	purchase();
	})
}

inventory();