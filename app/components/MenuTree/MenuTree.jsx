var React = require('react/addons');
var ContextMixin = require('../../ContextMixin.js');

var none = function(e){ return false; }

var Node = React.createClass({
	getInitialState: function() {
		return {
			drag : false  ,
			x : 0,
			y : 0
		};
	},
	mousedown : function(e){
		document.addEventListener('mousemove', this.moveAt);
		document.addEventListener('mouseup', this.mouseup);
		this.setState({
			drag : true
		})
		return false;
	},
	mouseup : function(e){
		document.removeEventListener('mouseup', this.mouseup);
		document.removeEventListener('mousemove', this.moveAt);
		this.setState({
			drag : false
		})
		return false;
	},
	moveAt : function(e){
		var x = e.pageX;
 		var y = e.pageY;
 		
 		this.setState({
 			x : x,
 			y : y
 		})
	},
	render : function(){
		var log = this.state.drag && <div>x={this.state.x} y={this.state.y}</div>
		return <li onMouseDown={this.mousedown} onDragStart={none}><div className="menu-tree__node">{this.props.node.title}</div>{log}{this.props.children}</li> 
	}
})

var MenuTree = React.createClass({
	mixins : [ContextMixin],
	cursors: {
	    menu: ['site', 'menu']
	},
	renderItem : function(node){
		var child;
		if (node.menu && node.menu.length > 0){	
			child = <ul className="menu-tree">{node.menu.map(this.renderItem)}</ul>
		}
		return <Node node={node}>{child}</Node> 
	},
	render : function(){
		var child = this.state.menu.map(this.renderItem)
		return <ul className="menu-tree">
			{child}
		</ul>
	}
})

module.exports = MenuTree;