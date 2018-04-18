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

// Get all possible friends listing
app.get('/friends/:userId', function(req, res) {
    let userID = req.params.userId;
   
    let possibleChoicesQuery = `SELECT * FROM users WHERE id != ${userID}` ;
    let finalQuery = `SELECT * FROM user_friends WHERE user_id = ${userID}`

    let possibilities = [];
    let friends = [];
    connection.query(possibleChoicesQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
            possibilities.push(results[friend]);
        }

        connection.query(finalQuery, function(error, results, fields) {
            if (error) throw error;
            for(friend_id in results) {
                friends.push(results[friend_id]);
            }

            for(let i = 0; i < possibilities.length; i++) {
                for(let j = 0; j < friends.length; j++) {
                    if(possibilities[i].id === friends[j].friend_id) {
                        possibilities[i] = null;
                        break;
                    } 
                }
            }
            res.json(possibilities); 
        });

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

// returns the users information
app.get('/userInfo/:userId', function(req, res) {
    let userID = req.params.userId;
    let friendQuery = `SELECT fname,lname,DOB,age,username,toggle_status,toggle_posts,toggle_friends,toggle_dob FROM users WHERE id=${userID}` ;

    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
    //    console.log(results)
        res.json(results); 
    });
});

// adds a friend
app.post('/addAFriend/:userId', function(req, res) {

    let userID = req.body.userID;
    let friendID = req.body.id;

    let friendQuery = `INSERT INTO user_friends VALUES(NULL, ${userID}, ${friendID})`;
    console.log(friendQuery)
    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
});

// deletes a friend
app.post('/deleteAFriend/:userId', function(req, res) {

    console.log(req.body)

    let userID = req.body.userID;
    let friendID = req.body.id;

    let friendQuery = `DELETE FROM user_friends WHERE user_id = ${userID} AND friend_id = ${friendID}`;
    console.log(friendQuery)
    let friends = [];
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        for(friend in results) {
          friends.push(results[friend]);
        }
        res.json(friends); 
    });
    
});

// toggle friends list
app.put('/toggleFriendPreview/:userId', function(req, res) {

    let userID = req.params.userId;

    let friendQuery = `UPDATE users SET toggle_friends=${req.body.status} WHERE id = ${userID}`;
    connection.query(friendQuery, function(error, results, fields) {
        if (error) throw error;
        res.json({msg:'success'}); 
    });
    
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));