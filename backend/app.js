const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')


const app = express();

mongoose.connect("mongodb://localhost/node-angular")
  .then(()=>{
    console.log('Connected to Database');
  }).catch((error)=>{
    console.log(error);
  });

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/api/posts",(req,res,next)=>{
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  });
  post.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Post Added Successfully!",
      postId : result._id
    });
  });
  console.log(post);

});

app.get('/api/posts',(req,res,next)=>{
  Post.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched Successfully',
        posts: documents
      });
    });

});

app.delete('/api/posts/:id',(req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(()=>{
    console.log('Deleted');
    res.status(200).json({message: "Post Deleted"})
  }).catch((error)=>{
    console.log(error);
  });

});

module.exports = app;

