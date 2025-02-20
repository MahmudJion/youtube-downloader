var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get('/:id', function(req, res, next) {
  const userId = req.params.id;
  res.send(`User profile for user with ID: ${userId}`);
});

/* POST create new user. */
router.post('/', function(req, res, next) {
  const newUser = req.body;
  // Add logic to create a new user
  res.status(201).send(`User created with name: ${newUser.name}`);
});

module.exports = router;
