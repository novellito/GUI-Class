var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'fblite'
});

connection.connect();

// Get all friends listing
app.get('/friends/:userId', function(req, res) {
    let userID = req.params.userId;
   
    let friendQuery = `SELECT * FROM users LEFT JOIN user_friends ON users.id = user_friends.friend_id WHERE users.id != ${userID} AND (user_friends.user_id != ${userID} )
    `;

    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
});

//get the current users friends list (correct)
app.get('/friendsList/:userId', function(req, res) {
    let userID = req.params.userId;
    let friendQuery = `SELECT * FROM users INNER JOIN 
    user_friends ON users.id = user_friends.friend_id WHERE user_friends.user_id=${userID}` ;

    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
});

app.post('/addAFriend/:userId', function(req, res) {

    console.log(req.body);

    let userID = req.body.userId;
    let friendId = req.body.id;

    let friendQuery = `INSERT INTO user_friends VALUES(${userID},${friendId})`;

    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
    // res.json({msg:'success'});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));