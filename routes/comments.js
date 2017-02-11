var express = require('express');
var Comment = require('./../model/commentModel');
var router = express.Router();
var fs = require('fs');
var comments = require('./../data/comments.js');
var bodyParser = require('body-parser');

router
    .get('/:name/', function (req, res, next) {
        var topic = topics.find(function (elem) {
            return elem.name == req.params.name;
        });
        if(topic) {
            res.json(topic);
        } else {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    })
    .post('/', function (req, res, next) {
        var body = req.body;
        console.log("text", body);
        comments.push(new Comment(body.name, body.comment, body.date));
        res.send(200);
    })
    .put('/:name/', function (req, res, next) {
        var body = req.body;
        topics = topics.filter(function (el) {
            return el.name !== req.params.name
        });
        topics.push(new Topic(body.name, body.author, body.text, body.date));
        res.send(200);
    })
    .delete('/:name', function (req, res, next) {
        var name = req.params.name;
        if(name == undefined || name.length == 0) throw new Error("Name should be request parameter");
        topics = topics.filter(function (el) {
            return el.name !== name
        });
        res.send(200);
    });


module.exports = router;