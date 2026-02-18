var express = require('express');
var router = express.Router();
var pool = require('./pool');

alert("Hello! I am an alert box!!");
router.post('/login', function (req, res) {
  var data = req.body;
  console.log(data);

  pool.query("select * from users where email=? and password=?",[data.email, data.password], function (err, res1) {
  
    if (err) {
      console.log('ERROR', err)
      res.render('login', {error: err});
    }
    else {
        if (res1.length) {
            res.render('home' , {response:res1});            
        }
      else{
    console.log(res1);
    res.render('login', {error: 'Invalid Login'});
}
        
    }
  })
});

module.exports = router;
