const express = require('express');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req,file,callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let err = new Error("Invalid MIME Type");
    if(isValid) {
      err = null;
    }
    callback(err,"backend/images");
  },
  filename: (req,file,callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null,name+'-'+Date.now()+'.'+ext);
  }
});

const Post = require('../models/post')

router.post("", multer({storage:storage}).single("image"),(req,res,next)=>{
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    imagePath : url + "/images/" + req.file.filename
  });
  post.save().then(result => {
    res.status(201).json({
      message: "Post Added Successfully!",
      post: {
        id: result._id,
        title: result.title,
        content: result.content,
        imagePath: result.imagePath
      }
    });
  });
});

router.get('',(req,res,next)=>{
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage) {
    postQuery.skip(pageSize*(currentPage - 1)).limit(pageSize);
  }
  postQuery.then(documents=>{
      fetchedPosts = documents
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched Successfully',
        posts: fetchedPosts,
        maxPosts: count
      });
    });
});

router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then((post)=>{
    if( post ) {
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
    res.status(200).json({message: "Post Deleted"})
  }).catch((error)=>{
    console.log(error);
  });

});

router.put('/:id',multer({storage: storage}).single("image"),(req,res,next)=>{
  let imagePath = req.body.imagePath;
  if ( req.file ) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url+"/images/"+req.file.filename;
  }
  const post = new Post({
    _id : req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id: req.params.id},post).then(()=>{
    res.status(200).json({
      message: 'Update Successful'
    })
  })
})


module.exports = router;
