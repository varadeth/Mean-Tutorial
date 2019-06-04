const express = require('express');

const router = express.Router();

const Post = require('../models/post')

router.post("",(req,res,next)=>{
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

router.get('',(req,res,next)=>{
  Post.find()
    .then(documents=>{
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched Successfully',
        posts: documents
      });
    });
});

router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then((post)=>{
    if( post ) {
      console.log(post);
      res.status(200).json(post);
    }
    else {
      res.status(404).json({
        message : "Post not found",
      })
    }
  })
});

router.delete('/:id',(req,res,next)=>{
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(()=>{
    console.log('Deleted');
    res.status(200).json({message: "Post Deleted"})
  }).catch((error)=>{
    console.log(error);
  });

});

router.patch('/:id',(req,res,next)=>{
  const post = new Post({
    _id : req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id},post).then(()=>{
    res.status(200).json({
      message: 'Update Successful'
    })
  })
})


module.exports = router;
