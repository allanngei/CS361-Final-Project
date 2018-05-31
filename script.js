module.exports = function(){
  var express = require('express');
  var router = express.Router();
  
  function sayHi(){
  console.log("Hello");
}

  return router;

}();