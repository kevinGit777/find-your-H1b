var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.170.249.231',
                user: 'root',
                password: 'h1b123',
                database: 'findh1b'
});

connection.connect;


var app = express();

// set up ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Mark Attendance' });
});

app.get('/update_success', function(req, res) {
      res.send({'message': 'Password updated successfully!'});
});

app.get('/delete_success', function(req, res) {
      res.send({'message': 'Favorite deleted successfully!'});
});

// this code is executed when a user clicks the form submit button

// update
app.post('/', function(req, res) {
    var userid = req.body.userid;
    var new_password = req.body.password;

    var sql = 'UPDATE UserInfos SET Password = '${new_password}' WHERE UserId = '${userid}' ';

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/update_success');
  });

});

// delete
app.post('/', function(req, res) {
    var favid = req.body.favid;

    var sql = 'DELTE FROM Favorites  WHERE FavoriteId = '${favid}' ';

console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/delete_success');
  });

});


// advanced query II
app.post('/', function(req, res) {
    var keyword = req.body.key;

    var sql = 'select CompanyId, CompanyName, count(JobTitle) as numbers ' +
        'from CompanyInfos natural join Releases natural join Jobs ' +
        'where JobTitle like '${keyword}' ' +
        'group by CompanyId' ;


console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }

    // show the result of sql
    app.get('/search_success', function(req, res) {
      res.send(result);
    });

    res.redirect('/search_success');
    // console.log(result);
  });

});


app.listen(80, function () {
    console.log('Node app is running on port 80');
});
