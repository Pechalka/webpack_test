var React = require('react');
var Baobab = require('baobab');
var AppWrapper = require('./AppWrapper.jsx');
var store = require('./store.js');
var actions = require('./actions.js');
require('./style.css');

React.render(<AppWrapper store={store} actions={actions}/>, document.body);
