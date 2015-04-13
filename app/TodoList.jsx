var React = require('react/addons');
var ContextMixin = require('./ContextMixin.js');


var TodoList = React.createClass({
	mixins: [ContextMixin, React.addons.LinkedStateMixin],
	cursors: {
	    todos: ['todos']
	},
	getInitialState: function() {
		return {
			title : '' 
		};
	},
	renderItem : function(todo, index){
		var s = {
			cursor : 'pointer'
		}
		
		if (todo.completed) s.textDecoration = 'line-through';

		return <div className="clearfix" style={{ paddingBottom : 10 }}>
			<span style={s} onClick={this.toogleState.bind(this, todo, index)} className="pull-left">{todo.title}</span>
			<button onClick={this.remove.bind(this, todo, index)} className="pull-right">remove</button>
		</div>
	},
	toogleState : function(todo, index){
		this.actions.toogleState(todo, index);
	},
	remove : function(todo, index){
		this.actions.removeTodo(todo, index);
	},
	add : function(){
		this.actions.addTodo(this.state.title);
		this.setState({
			title : ''
		})
	},
	renderAddForm : function(){
		return <div>
			<input valueLink={this.linkState('title')} type="text"/>
			<button onClick={this.add}>add</button>
		</div>
	},
	render: function() {
		var items = this.state.todos.map(this.renderItem);
		return (
			<div style={{ width : 300 }}>
				{items}
				{this.renderAddForm()}
			</div>
		);
	}

});

module.exports = TodoList;