var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');  // log requests to the console (express4)
var app = express();
var mongoose = require('mongoose');
var methodOverride = require('method-override');

// configuration ================================

app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));  // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect("mongodb://localhost/doist");

var Todo = mongoose.model('Todo', {
        text : String
    });

app.get('/api/todos', function(req, res){

  Todo.find(function(err, todos){
    if (err)
      res.send(err);

    res.json(todos);
  });
});

app.post('/api/todos', function(req, res){

  //create a todo, information comes from AJAX request
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo){
    if (err)
      res.send(err);

      //get and return all the todos after you create another
      Todo.find(function(err, todos){
        if (err)
          res.send(err);
        res.json(todos);
      });
  });
});

app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });


app.get('*', function(req, res){
    res.sendfile('./client/index.html'); //load the single file that angular will handle the front end
});

app.listen(8000, function(){
  console.log("Listening on port 8000");
});
