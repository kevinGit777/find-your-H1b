//import fetch from 'node-fetch';
//var fetch  = require("node-fetch");
var cors = require("cors");
var cur_host = '34.170.249.231';
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
/*
var connection = mysql.createConnection({
                host: cur_host,
                port:'3306',
                password:'h1b123',
                user: 'root',
                database: 'test1'
});
*/

var localconnection = mysql.createConnection({
  host: "34.170.249.231",
  port:'3306',
  user: 'root',
  password: 'h1b123',
  database: 'test1'
});
connection = localconnection;

connection.connect;


var app = express();
app.use(cors({
  origin: ["http://34.122.221.120/", "http://localhost:80/"]
}))


// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('index', { title: 'Find your h1B!' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'Attendance marked successfully!'});
});

app.get('/update_success', function(req, res) {
  res.send({'message': 'Password updated successfully!'});
});

app.get('/delete_success', function(req, res) {
  res.send({'message': 'Favorite deleted successfully!'});
});

app.get('/insert_success', function(req, res) {
  res.send({'message': 'Favorite insert successfully!'});
});

app.get('/signup_success', function(req, res) {
  res.send({'message': 'Signup successfully!'});
});

app.get('/delete_success', function(req, res) {
  res.send({'message': 'Favorite deleted successfully!'});
});

// show the result of sql
app.get('/search_success', function(req, res) {
    res.send(result);
});

app.post('/login', function(req,res){
  var Email = req.body.email  == null ? 1 : req.body.email;
  var Password = req.body.password  == null ? 1 : req.body.password;
  console.log(Email);
  
  var sql = `select * from UserInfos where Email = "${Email}" and Password = "${Password}"`;
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
      }
      var sql_res = result;
      if (sql_res.length != 0) 
      {
        res.send(sql_res); 
      }else{
        res.send("");
      }
    })
  });

app.post('/signup', function(req,res){

    var Name  = req.body.Name  == null ? 1 : req.body.Name;
    var Gender  = req.body.Gender  == null ? 1 : req.body.Gender;
    var Birth_date  = req.body.BirthDate == null? 1: req.body.BirthDate;
    var Phone_Number   = req.body.PhoneNumber  == null ? 1 : req.body.PhoneNumber;
    var Email   = req.body.email  == null ? 1 : req.body.email;
    var Password   = req.body.password  == null ? 1 : req.body.password ;
    console.log(Name);
    console.log(Gender);
    console.log(Birth_date);
    console.log(Phone_Number);
    console.log(Email);
    console.log(Password);


    var sql = `insert into UserInfos (Name ,Gender , Birth_date,Phone_Number, Email, Password ) values ( "${Name}" , "${Gender}" , "${Birth_date}", "${Phone_Number}", "${Email}", "${Password}");`;
    console.log(sql);
    connection.query(sql, function(err, result) {
      // console.log(err);

      if (err) {
        res.send(err)
        return;
        }
        res.redirect("/signup_success")
        // res.send( Object.assign({}, results[0]); )
      })
    });

app.get('/getFav', function (req, res) {
  var UserId = req.query.UserId  == null ? 1 : decodeURIComponent(req.query.UserId );
  var sql =` select FavoriteId, UserId, CompanyId 
  from Favorites 
  where UserId = ${UserId}
  order by FavoriteId
  `

  connection.query(sql, function(err, result){
    if (err) {
      res.send(err)
      return;
      }
    res.send(Object.assign({}, result ));
  })
})


app.post('/insertFav', function(req,res){
  var user_id = req.query.UserId  == null ? 1 : decodeURIComponent(req.query.UserId) ;
  var company_id = req.query.CompanyId  == null? 1: decodeURIComponent(req.query.CompanyId) ;
  var sql = `insert into Favorites (UserId ,  CompanyId) values ( ${user_id} , ${company_id});`;
  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
      }
      //res.send( Object.assign({}, results[0]); )
    })
  });

app.get('/search_company', function(req, res) {
  var CompanyName = req.query.CompanyName == undefined ? 'apple' : decodeURIComponent (req.query.CompanyName) ;  

  var sql = `select companyname, companyid , state , city , street , zipcode, JobTitle  
  	from (CompanyInfos natural join Locations) natural join Releases natural join Jobs
  	where CompanyName like '%${CompanyName}%' 
    limit 100`;
console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send( Object.assign({}, result) )
    
  });
});

app.get('/search_zipcode', function(req, res) {
  var zipcode  = req.query.zipcode == undefined? 61801: decodeURIComponent(req.query.zipcode ) ;   

    var sql = `call SP_ZIP(${zipcode})`;

  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    
    res.send( Object.assign({}, result))
  
  });
});


// update
app.post('/update_password', function(req, res) {
  var userid = req.query.UserId == null ? 2000 : decodeURIComponent(req.query.UserId);
  var new_password = req.query.NewPassword == null ? "after change" : decodeURIComponent(req.query.NewPassword);

  var sql = `UPDATE UserInfos SET Password = '${new_password}' WHERE UserId = '${userid}' `;

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
app.get('/delete_fav', function(req, res) {
  var companyid = req.query.CompanyId == null? 5002 : decodeURIComponent(req.query.CompanyId);
  var userid = req.query.UserId == null? 5002 : decodeURIComponent(req.query.UserId);

  var sql = `DELETE FROM Favorites WHERE UserId = '${userid}' AND CompanyId = '${companyid}'  `;
 
console.log(sql);
connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }
  res.redirect('/delete_success');
});

});

// delete
app.post('/delete_company', function(req, res) {
  var CompanyId = req.query.CompanyId == null? 5002 : decodeURIComponent(req.query.CompanyId);

  var sql = `DELETE FROM CompanyInfos WHERE CompanyId = '${CompanyId}' `;
 
console.log(sql);
connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }
  res.redirect('/delete_success');
});

});

app.get('/search', function(req, res) {
  var CompanyName = req.query.CompanyName == undefined ? '' : decodeURIComponent (req.query.CompanyName) ;  
  var zipcode = req.query.zipcode ? 'apple' : decodeURIComponent (req.query.zipcode ) ;  
  var jobtitle= req.query.jobtitle == undefined ? 'apple' : decodeURIComponent (req.query.jobtitle) ;  
  var procedure  = false;
  if (CompanyName  != undefined)
  {
    var sql = `select companyname, companyid , state , city , street , zipcode, JobTitle  
  	from (CompanyInfos natural join Locations) natural join Releases natural join Jobs
  	where CompanyName like '%${CompanyName}%' 
    limit 100`;
  }

  if ( zipcode != undefined)
  {
     var sql = `call SP_ZIP(${zipcode})`;
     procedure = true;
  }

  if ( jobtitle != undefined)
  {
    var sql = `call SP_JOB(${jobtitle})` ;
    procedure = true;
  }


  // var sql = `select companyname, companyid , state , city , street , zipcode, JobTitle  
  // from (CompanyInfos natural join Locations) natural join Releases natural join Jobs
  // where CompanyName like '%${CompanyName}%' 
  // limit 100`

  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res_data = Object.assign({}, result);
    res_data['procedure'] = procedure;
    res.send(res_data )
    
  });
});



// store procedure II
app.get('/search_keyword', function(req, res) {

  var jobtitle = req.query.jobtitle == null? "software" : decodeURIComponent(req.query.jobtitle);

  var sql = `call SP_JOB(${jobtitle})` ;

  console.log(sql);
  connection.query(sql, function(err, result) {
  if (err) {
    res.send(err)
    return;
  }
  res.send( Object.assign({}, result));
  });

});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
/*
async function test() {
  const myBody = {'user_id': 1, 'company_id':1}
  const response = await fetch('http://localhost/insertFav', {
    method: 'POST',
    body: myBody, 
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response;
  console.log(myJson);
};
*/