var React = require('react/addons');
var ContextMixin = require('./ContextMixin.js');
var List = require('./List.jsx');
var Page = require('./Page.jsx');
var TodoList = require('./TodoList.jsx');
var Menu = require('./Menu.jsx');


var App = React.createClass({
  mixins: [ContextMixin],
  cursors: {
    list: ['list']
  },
  render: function () {
    return (
      <div>
        <TodoList/>
        <Menu/>
      </div>
    );
  }
});

module.exports = App;
