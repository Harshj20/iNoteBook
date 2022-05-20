const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
var JWT_SECURE = 'harshIsAwesome';
var success = false;
const message = 'please enter valid credentials';


router.post('/createUser', [
  body('email', 'please enter a valid email').isEmail(),
  body('password', 'please enter a strong password').isLength({ min: 5 }),
  body('name', 'please enter a valid name').isLength({ min: 2 }),
], async (req, res) => {
  const errors = validationResult(req);
  success=false;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  var user = await User.findOne({ email: req.body.email });
  if (user) {
    success = false;
    return res.status(400).json({success, error: 'A user with this email already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const securePass = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: securePass,
  }).catch((err) => { res.status(500).json({ error: "some error occured", message: err.message }) });

  const data = {
    user: {
      id: user.id
    }
  };

  const authToken = jwt.sign(data, JWT_SECURE);
success = true;  
  res.json({ success,authToken });

});

// to Authenticate user via login
router.post('/login', [
  body('email', 'please enter a valid email').isEmail(),
  body('password', 'please enter your password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  success = false;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({success,message});
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({success, message});
    }
    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data, JWT_SECURE);
    success = true;
    console.log(authToken);
    res.json({success,authToken});
  }
  catch(err){ res.status(500).json({ error: 'some error occured', message: err.message });}
});


// fetching user data
router.post('/getUser',fetchuser, async (req, res) => {
  try {

    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.json(user);

  } catch (err) {
    res.status(500).json({ error: 'some error occured', message: err.message });
  }

})
module.exports = router;