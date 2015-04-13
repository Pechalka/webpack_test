var React = require('react');
var ContextMixin = require('./ContextMixin.js');

var Draggable = require('react-draggable');




var Grid = React.createClass({
	mixins: [ContextMixin],
  	cursors: {
    	rows : ['page', 'content']
  	},
  	removeComponent : function(a, b, c){
  		this.actions.removeComponent(a, b, c);
  	},

  	removeCol : function(a,b, col){
  		this.actions.removeCol(a, b, col);
  	},

	render : function(){
		var rows = this.state.rows.map(function(row, rowIndex)  {
			var cols = [];

			var n = 0;

			row.content.forEach(function(col, colIndex)  {
				var components = [];

				col.content.forEach(function(control, controlIndex)  {
			  		components.push(<div style={{  padding: 10, border: '1px solid #ccc', marginTop: 5}}>
			  			{control.text}
			  			<button onClick={this.removeComponent.bind(this, rowIndex, colIndex, controlIndex)}>X</button>
			  		</div>)
				  	
							  		
			  	}.bind(this));

		  		if (components.length == 0){
		  			components = <div><button onClick={this.removeCol.bind(this, rowIndex, colIndex, col)}>remove col</button></div>
		  		}
		  		cols.push(<div className={"col-xs-" + col.xs}>
		  			{components}
		  		</div>)

		  		n += col.xs;

		  		var s = {
				  		  position: 'absolute',
						  top: 0,
						  left : ( n / 12 * 100)  + '%',
						  bottom: 0,
						  width: 5,
						  background: 'red',
						  cursor: 'w-resize'
				  	}
				cols.push(<div style={s}>
				</div>)

		  	}.bind(this))
		  	

	

		  	return <div className="row" style={{position : 'relative', marginBottom : 10, borderTop : '1px solid #000' }}>
	  			{cols}
	  		</div>
	  	}.bind(this));

		return <div className="container-fluid">
		{rows}
		<div className="row">
			<div className="cox-xs-12">
				last row
			</div>
		</div>
		</div>
	}
})

var Page = React.createClass({
	mixins: [ContextMixin],
  	cursors: {
    	page : ['page']
  	},
  	add : function(){
  		this.actions.addCol();
  	},
  	addRow : function(){
  		this.actions.addRow();

  	},
	render: function() {
		return (
			<div>
				<Grid/>
			</div>
		);
	}

});

module.exports = Page;