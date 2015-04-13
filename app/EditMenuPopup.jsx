var React = require('react/addons');

var B = require('react-bootstrap')
var Modal = B.Modal;
var Button = B.Button;

var OverlayMixin = B.OverlayMixin;
var ContextMixin = require('./ContextMixin.js');

var MenuTree = require('./components/MenuTree/MenuTree.jsx');


var Wrapper = React.createClass({
	childContextTypes: {
    store: React.PropTypes.object,
    actions: React.PropTypes.object
  },
  getChildContext: function () {
    return {
      store: this.props.store,
      actions: this.props.actions
    };
  },
  render : function(){
  	return React.addons.cloneWithProps(React.Children.only(this.props.children), {});

  }
})


var EditMenuPopup = React.createClass({

	mixins: [OverlayMixin],

	render: function() {
		return null
	},
	save : function(){
		this.props.onClose()
	},
	renderOverlay : function(){
		return <Modal title="edit menu" onRequestHide={this.props.onClose}>
			<div className='modal-body'>
		        <Wrapper store={this.props.context.store} actions={this.props.context.actions}>
	        		<MenuTree/>
	        	</Wrapper>	
	        </div>
	        <div className='modal-footer'>
	          <Button onClick={this.save}>Save</Button>
	          <Button onClick={this.props.onClose}>Cancel</Button>
	        </div>
		</Modal>	
	}
	

});

module.exports = EditMenuPopup;