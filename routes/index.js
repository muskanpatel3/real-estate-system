var express = require('express');
var router = express.Router();
var pool = require('./pool');

router.get('/admin', function (req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.get('/all_reviews', function (req, res, next) {
  res.render('review', { title: 'Express' });
});

router.get('/properties', function (req, res, next) {
  res.render('properties', { title: 'Express' });
});

router.get('/all_property', function (req, res, next) {
  res.render('all_property', { title: 'Express' });
});
/* GET home page. */
router.get('/', function (req, res, next) {
    pool.query("Delete from user_login", function (err, res1) {
    })
    res.render('index', { title: 'Express' });      
});

router.get('/listing', function (req, res, next) {
  res.render('listing', { title: 'Express' });
  var data = req.body;
  console.log(data);
});

router.get('/property', function (req, res, next) {
  res.render('property', { title: 'Express' });
});

router.post('/registration', function (req, res) {
  var data = req.body;
  console.log(data);

  pool.query("insert into users (fullName, email, phoneNumber, password) values(?,?,?,?)", [data.name, data.email, data.phone, data.password], function (err, res1) {

    if (err) {
      console.log('ERROR', err)
      res.render('sign-up', { error: err });
    }
    else {       
        pool.query("insert into user_login(email, password) values(?,?)", [data.email, data.password], function (err, res1) {
          if (err){
            console.log('ERROR', err)
            res.render('sign-up', { error: err });
          }else{
            res.render('home');          
          }
        })
    }
  })
});

router.post('/listing', function (req, res) {
  var data = req.body;
  pool.query("insert into listing (Owner_no, Owner_email, Property_type, Property_location, Property_price, Property_discribe, Property_image) values(?,?,?,?,?,?,?)", [data.phone, data.email, data.propertyName, data.propertyLocation, data.propertyPrice, data.propertyDescription, data.propertyImage], function (err, res1) {
    if (err) {
      console.log('ERROR', err)
      res.render('listing', { error: err });
    }
    else {
      console.log(res1);
      res.render('home');
    }
  })
})

router.post('/login', function (req, res) {
  var data = req.body;
  console.log(data);

  pool.query("select * from users where email=? and password=?", [data.email, data.password], function (err, res1) {
    if (err) {
      console.log('ERROR', err)
      res.render('login', { error: err });
    }
    else {
      if (res1.length) {
        pool.query("insert into user_login(email, password) values(?,?)", [data.email, data.password], function (err, res1) {         
        })
        res.render('home');        
      }
      else {
        console.log(res1);
        res.render('login', { error: 'Invalid Login' });
      }      
    }
  })
});

// Admin router
router.get('/admin', function(req, res) {
  try {
    pool.query('SELECT * FROM listing', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/allproperty', function (req, res) {
  try {
    pool.query('SELECT * FROM listing where Property_status=1 ', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/allowproperty', function (req, res) {
  try {
    pool.query('SELECT * FROM listing where Property_status=0', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/allusers', function (req, res) {
  try {
    pool.query('SELECT * FROM users', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/current_users', function (req, res) {
  try {
    pool.query('SELECT * FROM user_login', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/permitt_property/:id', function (req, res) {
  try {
    pool.query(`UPDATE listing SET Property_status=1 WHERE Owner_no = ${req.params.id}`);
    res.send(req.params.id);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/delete_property/:id', function (req, res) {
  try {
    pool.query(`DELETE FROM listing WHERE Owner_no = ${req.params.id}`);
    res.send(req.params.id);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/feedback', function (req, res) {
  var data = req.body;
  console.log(data);
  try {
    pool.query("insert into feedback (email, user_review) values(?,?)", [data.email, data.user_review])
    res.render('home');
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }      
      }         
);

router.get('/all_review', function (req, res) {
  try {
    pool.query('SELECT * FROM feedback', (error, results, fields) => {
          if (error) throw error;
          res.send(results);
        });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;

// Set the alert in the following place 
// Correct the path from feedback to dashboard
// Solve the problem for send the image in the listing page 
// Customize the UI for the property cart
// Made the listing table also in admin form