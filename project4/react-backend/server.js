var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fblite'
});

connection.connect();

// Get Friends listing
app.get('/friends', function(req, res) {
    let userID = '123456';
    let friendQuery = `SELECT * FROM users INNER JOIN user_friends ON users.id = user_friends.friend_id WHERE user_friends.user_id=${userID}`;

    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));