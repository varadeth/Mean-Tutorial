const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createUser = (req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(hash=>{
    const user = new User({
      name: req.body.name,
      dob: req.body.dob,
      email: req.body.email,
      password: hash
    });
    user.save().then(result=>{
      res.status(201).json({
        message: 'Successfully Added User',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
          message: 'E-mail already taken!!'
      });
    });
  });
}

exports.userLogin = (req,res,next)=>{
  let fetchedUser;
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(!user) {
      return res.status(401).json({
        message: 'Invalid Authentication Credentials'
      })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password,user.password);
  }).then(result => {
    if( !result ) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id},process.env.JWT_KEY,{ expiresIn: '1h' });
    console.log(fetchedUser+"\n"+token);
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    })
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth Failed'
    });
  });
}
