require('node-jsx').install({
  extension: '.jsx'
});


var page = {
  title : 'home',
  content : [
    { 
      componentClass : 'Row',
      content : [
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'title 1'
            },
            { 
              componentClass : 'Text',
              text : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis quod adipisci suscipit asperiores? Minus consectetur, nostrum ipsam repellendus quam pariatur, quia cum veritatis ipsa, obcaecati laborum alias omnis eligendi eveniet.'
            }
          ]
        },
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'titl 2'
            }
          ]
        },
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'title 3'
            }
          ]
        }
      ]
    },
    { 
      componentClass : 'Row',
      content : [
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'title 1'
            }
          ]
        },
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'titl 2'
            }
          ]
        },
        {
          componentClass : 'Col',
          xs : 4,
          content : [
            { 
              componentClass : 'Title',
              text : 'title 3'
            }
          ]
        }
      ]
    }
  ]
}

var site = { menu : [
          { title : 'page1', menu : []},
          { title : 'page2', menu : []},
          { 
            title : 'page3', 
            menu : [
              { title : 'page4', menu : []},
              { title : 'page5', menu : [{ title : 'page6', menu : []}]}
            ]
          }
        ]
}

var todos =  [{ id : 1, title : 'learn isormorphic app', completed : false }, { id : 2, title : 'test', completed : true }]

var express = require('express');
var httpProxy = require('http-proxy');
var config = require('./webpack.config.js');
var path = require('path');
var fs = require('fs');
var React = require('react');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var AppWrapper = React.createFactory(require('./app/AppWrapper.jsx'));
var Page = React.createFactory(require('./app/Page.jsx'));
var App = React.createFactory(require('./app/App.jsx'));

var app = express();
var index = fs.readFileSync(path.resolve(__dirname, 'index.html')).toString();

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});


app.get('/', function (req, res) {
  var store = {
    list: ['foo', 'bar'],
    page : page,
    site : site,
    todos : todos
  };
  var app = React.renderToString(AppWrapper({store: store}));
  var html = index.replace('{{APP}}', app).replace('{{STORE}}', JSON.stringify(store));
  res.type('html');
  res.send(html);
});




app.get('/render', function (req, res) {
  var store = {
    page : page
  };
  React.withContext({store : store }, function(){
    var pageHtml = React.renderToString(Page());
    res.type('html');
    res.send('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"> ' + pageHtml);
  })

});



app.all('*', function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:9000/'
  });
});

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, 'build'),
  hot: false,
  quiet: false,
  noInfo: false,
  publicPath: '/',
  stats: {
    colors: true
  },
  historyApiFallback: true
});

app.listen(3000, function () {
  console.log('App listening at localhost:3000');
  server.listen(9000, 'localhost', function () {
    console.log('Bundler listening at localhost:9000');
  });
});
