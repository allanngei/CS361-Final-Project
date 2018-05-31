// var express = require('express');
// // var bodyParser = require('body-parser');
// // var path = require('path');
// var app = express();

// var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

// app.set('port', process.env.PORT || 6541);
// // var handlebars = require('express-handlebars').create(
// //   {
// //     defaultLayout:'main',
// //     helpers: {
// //       equalsTo: function(v1, v2, options) {
// //           if(v1 == v2) { return options.fn(this); } 
// //           else { return options.inverse(this); } 
// //       }
// //     }
// //   });

// // var mysql = require('mysql');

// // app.engine('handlebars', handlebars.engine);
// // app.use(bodyParser.urlencoded({extended:true}));
// // app.use('/static', express.static('public'));
// // app.set('view engine', 'handlebars');
// // app.set('port', process.argv[2]);

// // var con = mysql.createConnection({
// // 	connectionLimit : 10,
// // 	multipleStatements: true,
// //   	host: "cs361.c2hl143b9t25.us-east-1.rds.amazonaws.com",
// //   	user: "cs361_root",
// //   	password: "tt86siY63QvuyVl"
// // });

// // app.set('mysql', mysql);
// // // app.use(express.static(path.join(__dirname, '/views')));

// // app.set('port', 6541);

// // // app.use('/', require('./script.js'));

// // app.use('/', require('./index.html'));

// app.get('/', function(req, res){
// 	res.render('home');
// })

// app.use(function(req,res){
//   res.status(404);
//   res.render('404');
// });


// app.use(function(err, req, res, next){
//   console.error(err.stack);
//   res.type('plain/text');
//   res.status(500);
//   res.render('500');
// });



// app.listen(app.get('port'), function(){
//   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
// });


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
app.use('/img', express.static('img'));


app.set('mysql', mysql);
app.use(express.static(path.join(__dirname, '/views')));


app.set('port', 6541);


//app.use('/', require('./script.js'));


app.get('/', function(req, res){
	res.render('home');
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