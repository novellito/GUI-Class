var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fblite"
});

connection.connect();

// Get all possible friends listing
app.get("/friends/:userId", function(req, res) {
  let userID = req.params.userId;

  let possibleChoicesQuery = `SELECT * FROM users WHERE id != ${userID}`;
  let finalQuery = `SELECT * FROM user_friends WHERE user_id = ${userID}`;

  let possibilities = [];
  let friends = [];
  connection.query(possibleChoicesQuery, function(error, results, fields) {
    if (error) throw error;
    for (friend in results) {
      possibilities.push(results[friend]);
    }

    connection.query(finalQuery, function(error, results, fields) {
      if (error) throw error;
      for (friend_id in results) {
        friends.push(results[friend_id]);
      }

      for (let i = 0; i < possibilities.length; i++) {
        for (let j = 0; j < friends.length; j++) {
          if (possibilities[i].id === friends[j].friend_id) {
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
app.get("/friendsList/:userId", function(req, res) {
  let userID = req.params.userId;
  let friendQuery = `SELECT * FROM users INNER JOIN 
    user_friends ON users.id = user_friends.friend_id WHERE user_friends.user_id=${userID}`;

  let friends = [];
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    for (friend in results) {
      friends.push(results[friend]);
    }
    res.json(friends);
  });
});

// returns the users information
app.get("/userInfo/:userId", function(req, res) {
  let userID = req.params.userId;
  let friendQuery = `SELECT fname,lname,DOB,status,age,username,toggle_status,toggle_posts,toggle_friends,toggle_dob FROM users WHERE id=${userID}`;

  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    //    console.log(results)
    res.json(results);
  });
});

// update the user's date of birth
app.post('/updateDOB/:userId', function(req, res) {
  let userID = req.params.userId;
  let dob = JSON.stringify(req.body.dob);

  let updateDOBQuery = `UPDATE users SET DOB=${dob} WHERE id=${userID}`;
  connection.query(updateDOBQuery, function(error, results, fields) {
      if(error) throw error;
      res.json(dob);
  });
});

app.get('/login/:userName/:password', function(req, res) {
    let userName = JSON.stringify(req.params.userName);
    let password = JSON.stringify(req.params.password);
    console.log(userName);
    console.log(password);
    let accountQuery = `SELECT id FROM users WHERE username=${userName} AND password=${password}`;

     connection.query(accountQuery, function(error, results, fields) {
         if (error) throw error;
         res.json(results); 
    });
});

// updates the user's status
app.post("/updateStatus/:userId", function(req, res) {
  let userID = req.params.userId;
  let status = JSON.stringify(req.body.status);

  let updateStatusQuery = `UPDATE users SET status=${status} WHERE id=${userID}`;
  connection.query(updateStatusQuery, function(error, results, fields) {
    if (error) throw error;
    res.json(status);
  });
});

// adds a user
app.post("/addUser", function(req, res) {
  let fname = JSON.stringify(req.body.fname);
  let lname = JSON.stringify(req.body.lname);
  let dob = JSON.stringify(req.body.DOB);
  let username = JSON.stringify(req.body.username);
  let email = JSON.stringify(req.body.email);
  let password = JSON.stringify(req.body.password);
  let addUserQuery = `INSERT INTO users (fname,lname, age, DOB, status, username, toggle_status, toggle_posts, toggle_friends, toggle_dob, password, email) VALUES(${fname},${lname},${
    req.body.age
  },${dob},NULL,${username},1,1,1,1,${password},${email})`;

  console.log(addUserQuery);
  connection.query(addUserQuery, function(error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

// adds a friend
app.post("/addAFriend/:userId", function(req, res) {
  let userID = req.body.userID;
  let friendID = req.body.id;

  let friendQuery = `INSERT INTO user_friends VALUES(NULL, ${userID}, ${friendID})`;
  console.log(friendQuery);
  let friends = [];
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    for (friend in results) {
      friends.push(results[friend]);
    }
    res.json(friends);
  });
});

// deletes a friend
app.post("/deleteAFriend/:userId", function(req, res) {
  console.log(req.body);

  let userID = req.body.userID;
  let friendID = req.body.id;

  let friendQuery = `DELETE FROM user_friends WHERE user_id = ${userID} AND friend_id = ${friendID}`;
  console.log(friendQuery);
  let friends = [];
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    for (friend in results) {
      friends.push(results[friend]);
    }
    res.json(friends);
  });
});

// Get Posts Listing
app.get("/posts/:userId", function(req, res) {
  let userID = req.params.userId;
  let getPostsQuery = `SELECT * FROM posts WHERE user_id=${userID}`;

  let posts = [];
  connection.query(getPostsQuery, function(error, results, fields) {
    if (error) throw error;
    for (post in results) {
      posts.push(results[post]);
    }
    res.json(posts);
  });
});

// Add a Post
app.post("/addPost/:userId", function(req, res) {
  let userID = req.params.userId;
  let post = JSON.stringify(req.body.post);

  let addPostQuery = `INSERT INTO posts (user_id, post) VALUES (${userID}, ${post})`;

  let posts = [];
  connection.query(addPostQuery, function(error, results, fields) {
    if (error) throw error;
    for (post in results) {
      posts.push(results[post]);
    }
    res.json(posts);
  });
});

// Delete a Post
app.post("/deletePost/:postId", function(req, res) {
  console.log(req.body);

  let postID = req.body.p_id;

  let friendQuery = `DELETE FROM posts WHERE id= ${postID}`;

  let posts = [];
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    for (post in posts) {
      posts.push(results[post]);
    }
    res.json(posts);
  });
});
// toggle friends list
app.put("/toggleFriendPreview/:userId", function(req, res) {
  let userID = req.params.userId;

  let friendQuery = `UPDATE users SET toggle_friends=${
    req.body.status
  } WHERE id = ${userID}`;
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    res.json({ msg: "success" });
  });
});
// toggle posts
app.put("/togglePosts/:userId", function(req, res) {
  let userID = req.params.userId;

  let friendQuery = `UPDATE users SET toggle_posts=${
    req.body.status
  } WHERE id = ${userID}`;
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    res.json({ msg: "success" });
  });
});
// toggle status
app.put("/status/:userId", function(req, res) {
  let userID = req.params.userId;

  let friendQuery = `UPDATE users SET toggle_status=${
    req.body.status
  } WHERE id = ${userID}`;
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    res.json({ msg: "success" });
  });
});
// toggle DOB
app.put("/dob/:userId", function(req, res) {
  let userID = req.params.userId;

  let friendQuery = `UPDATE users SET toggle_dob=${
    req.body.status
  } WHERE id = ${userID}`;
  connection.query(friendQuery, function(error, results, fields) {
    if (error) throw error;
    res.json({ msg: "success" });
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
