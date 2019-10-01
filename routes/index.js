var express = require('express');
var router = express.Router();
var url = require("url"); 

var Board = require('../models/board');

/* GET home page. */
var mysort = {DAY: 1};
router.get('/admin', function(req, res, next) {
  Board.find({}, function (err, board) {
      res.render('admin', { title: '영락큐티봇관리자', board: board });
  }).sort(mysort);
});

var mysort = {DAY: 1};
router.get('/message', function(req, res, next) {
  Board.find({}, function (err, board) {
      
        var urlParse = url.parse(req.url, true); 
        var queryString = urlParse.query; 

          res.render('message', { title: '영락큐티',BOOKTYPE : queryString.BOOKTYPE , board: board });
  }).sort(mysort);
});

var mysort = {DAY: 1};
router.get('/messageadmin', function(req, res, next) {
  Board.find({}, function (err, board) {
      
        var urlParse = url.parse(req.url, true); 
        var queryString = urlParse.query; 

          res.render('messageadmin', { title: '영락큐티',BOOKTYPE : queryString.BOOKTYPE , board: board });
  }).sort(mysort);
});

var mysort = {DAY: 1};
router.get('/messageadmin', function(req, res, next) {
  Board.find({}, function (err, board) {
      
        var urlParse = url.parse(req.url, true); 
        var queryString = urlParse.query; 

          res.render('messageadmin', { title: '영락큐티',BOOKTYPE : queryString.BOOKTYPE , board: board });
  }).sort(mysort);
});

var mysort = {DAY: 1};
router.get('/board', function(req, res, next) {
  Board.find({}, function (err, board) {
      
        var urlParse = url.parse(req.url, true); 
        var queryString = urlParse.query; 

          res.render('board', { title: '영락큐티',BOOKTYPE : queryString.BOOKTYPE , board: board });
  }).sort(mysort);
});

router.get('/', function(req, res, next) {
    Board.find({}, function (err, board) {
        res.render('index', { title: '영락큐티 메인', board: board });
    }).sort(mysort);
  });

/* Write board page */
router.get('/write', function(req, res, next) {
    res.render('write', { title: '등록' });
});

/* board insert mongo */
router.post('/board/write', function (req, res) {
  var board = new Board();
  board.SUBJECT = req.body.SUBJECT;
  board.CONTENT = req.body.CONTENT;
  board.BOOK = req.body.BOOK;

  board.save(function (err) {
    if(err){
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/');
  });
});


/* board edit mongo */
router.post('/board/edit', function (req, res) {
    var board = new Board();
    board.CONTENT = req.body.modcontents;
    
    Board.findOneAndUpdate({_id : req.body.id}, {$set:{CONTENT:req.body.modcontents}} , function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/board/'+req.body.id);
    });

});

/* board find by id */
router.get('/board/:id', function (req, res) {
    Board.findOne({_id: req.params.id}, function (err, board) {
        res.render('board', { title: '영락큐티', board: board });
    })
});

router.get('/messagedetail/:id', function (req, res) {
    Board.findOne({_id: req.params.id}, function (err, board) {
        res.render('messagedetail', { title: '영락큐티내용보기', board: board });
    })
});


/* comment insert mongo*/
router.post('/comment/write', function (req, res){
    var comment = new Comment();
    comment.contents = req.body.contents;
    comment.author = req.body.author;

    Board.findOneAndUpdate({_id : req.body.id}, { $push: { comments : comment}}, function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/board/'+req.body.id);
    });
});

module.exports = router;
