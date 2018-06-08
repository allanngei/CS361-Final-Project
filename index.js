var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var mysql = require('mysql');
var handlebars = require('express-handlebars').create(
  {
    defaultLayout:'main',
    helpers: {
      equalsTo: function(v1, v2, options) {
          if(v1 == v2) { return options.fn(this); } 
          else { return options.inverse(this); } 
      }
    }
  });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));


mysql.pool = mysql.createPool({
  connectionLimit : 10,
  multipleStatements: true,
  host: "cs361.c2hl143b9t25.us-east-1.rds.amazonaws.com",
  user: "cs361_root",
  password: "tt86siY63QvuyVl",
  database: "cs361"
});


app.use(express.static(path.join(__dirname, '/views')));


app.set('port', 6544);





app.get('/', function(req, res){
	res.render('home');
});

app.get('/registerFamily', function(req, res){
  res.render('registerFamily', {layout: 'register.handlebars'});
});

app.get('/registerSponsor', function(req, res){
  res.render('registerSponsor', {layout: 'register.handlebars'});
});

app.get('/registerVendor', function(req, res){
  res.render('registerVendor', {layout: 'register.handlebars'});
});

app.get('/registerLeague', function(req, res){
  res.render('registerLeague', {layout: 'register.handlebars'});
});

app.get('/login', function(req, res){
  res.render('login');
});





app.post('/account', function(req, res){
  var context = {};
  var mysql = req.app.get('mysql');
  var x = "testUserName";
  console.log(req.body);
  mysql.pool.query("SELECT userName, password, first_name, last_name, street, city, state, zip_code, phoneNumber, email FROM family WHERE userName=? and password = MD5(?)", [req.body.userName, req.body.password], function(error, results, fields){
      if(error){
        alert("Username and Password do not match. Please try again.");
      }
      else{
        context.family = results[0];
        console.log(results);
        res.render('accountPage', context);
      }
  })
});









app.post('/family', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO family (\
              userName,\
              password,\
              first_name,\
              last_name,\
              street,\
              city,\
              state,\
              zip_code,\
              phoneNumber,\
              email,\
              sport)\
              VALUES (?, MD5(?), ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    var inserts = [req.body.username,
                   req.body.password,
                   req.body.firstName,
                   req.body.lastName,
                   req.body.street,
                   req.body.city,
                   req.body.state,
                   req.body.zipCode,
                   req.body.phoneNumber,
                   req.body.email,
                   req.body.sport];

    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/');
        }
    });
});


app.post('/league', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO league (\
              user_name,\
              password,\
              league_name,\
              street,\
              city,\
              state,\
              zip_code,\
              sport,\
              phone_number,\
              email) VALUES (?, MD5(?), ?, ?, ?, ?, ?, ?, ?, ?)";
  var inserts = [req.body.user_name,
                 req.body.password,
                 req.body.league_name,
                 req.body.street,
                 req.body.city,
                 req.body.state,
                 req.body.zip_code,
                 req.body.sport,
                 req.body.phone_number,
                 req.body.email];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.redirect('/');
      }
  });
});



app.post('/sponsor', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO sponsor (\
              user_name,\
              password,\
              first_name,\
              last_name,\
              street,\
              city,\
              state,\
              zip_code,\
              phone_number,\
              email) VALUES (?, MD5(?), ?, ?, ?, ?, ?, ?, ?, ?)";
  var inserts = [req.body.user_name,
                 req.body.password,
                 req.body.first_name,
                 req.body.last_name,
                 req.body.street,
                 req.body.city,
                 req.body.state,
                 req.body.zip_code,
                 req.body.phone_number,
                 req.body.email];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.redirect('/');
      }
  });
});


app.post('/vendor', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO business (\
              user_name,\
              password,\
              business_name,\
              street,\
              city,\
              state,\
              zip_code,\
              phone_number,\
              email,\
              sunday_open, sunday_close,\
              monday_open, monday_close,\
              tuesday_open, tuesday_close,\
              wednesday_open, wednesday_close,\
              thursday_open, thursday_close,\
              friday_open, friday_close,\
              saturday_open, saturday_close) VALUES (?, MD5(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var inserts = [req.body.user_name,
                 req.body.password,
                 req.body.business_name,
                 req.body.street,
                 req.body.city,
                 req.body.state,
                 req.body.zip_code,
                 req.body.phone_number,
                 req.body.email,
                 req.body.sunday_open, req.body.sunday_close,
                 req.body.monday_open, req.body.monday_close,
                 req.body.tuesday_open, req.body.tuesday_close,
                 req.body.wednesday_open, req.body.wednesday_close,
                 req.body.thursday_open, req.body.thursday_close,
                 req.body.friday_open, req.body.friday_close,
                 req.body.saturday_open, req.body.saturday_close ];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.redirect('/');
      }
  });
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});