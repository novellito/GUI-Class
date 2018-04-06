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

let userID = '123456'
let userQuery = `SELECT * FROM users WHERE id=${userID}`;
let friendQuery = `SELECT * FROM users INNER JOIN user_friends ON users.id = user_friends.friend_id WHERE user_friends.user_id=${userID}`;

// app.get('/', function(req, res) {
    connection.query(userQuery, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        // res.send(results);
        // for(let i = 0; i<results.length; i++) {
        //     userDetails.innerHTML += `<p><strong>First Name:</strong> ${results[i].fname}, <strong>Age:</strong> ${results[i].age}</p>`;
        // }
    });
// });

connection.query(friendQuery, function(error, results, fields) {
    console.log(results);
    // for(let i = 0; i<results.length; i++) {
    // friends.innerHTML += `<p><strong>Name: </strong> ${results[i].fname} ${results[i].lname}, <strong>Age: </strong> ${results[i].age}`;
    // }
});

connection.end();

// module.exports = app;