var React = require('react');

var B = require('react-bootstrap')
var Button = B.Button;

var EditMenuPopup = require('./EditMenuPopup.jsx');
var ContextMixin = require('./ContextMixin.js');

var Menu = React.createClass({
	mixins: [ContextMixin],

	getInitialState: function() {
		return {
			popupOpen : false 
		};
	},
	tooglePopup : function(){
		this.setState({
			popupOpen : !this.state.popupOpen
		})
	},
	
	render: function() {
	
		return (
			<div>
				<Button onClick={this.tooglePopup}>edit menu</Button>
				{this.state.popupOpen && <EditMenuPopup context={this.context}  onClose={this.tooglePopup}/>}
			</div>
		);
	}

});

module.exports = Menu;