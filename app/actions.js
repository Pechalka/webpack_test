var store = require('./store.js');

module.exports = {
  addItem: function (item) {
    store.select('list').push(item);
  },
  addCol : function(){
  	alert(1)
  },
  removeComponent : function(a, b, c){
//  	alert(a + ' ' + b + ' ' + c)

  	store.select(['page', 'content', a , 'content', b, 'content', c]).remove();
  },

  removeCol : function(a, b, col){
  	store.select(['page', 'content', a , 'content', b]).remove();

  },

  addTodo : function(title){
  	store.select(['todos']).push({ title : title, id : new Date(), completed : false })
  },

  removeTodo : function(todo, index){
  	store.select(['todos', index]).remove();  	
  },


	toogleState : function(todo, index){
		store.select(['todos', index]).set('completed', !todo.completed )
	},

  addRow : function(){
  	//alert(1)
  	//var arr = store.select(['page', 'content']).get()

  	//arr.splice(0, 1);
//debugger
//debugger
 //	store.select(['page']).remove('content', 1);
//debugger
 //	store.select('page', 'content', 1).remove();

 	//set('content', arr)

  	store.select(['page', 'content']).push({ 
  		componentClass : 'Row', 
  		content : [
  		{ 
  			componentClass : 'Col', xs : 12,  content : [{ componentClass : 'Title', text : 'sdf'}]
  		}
  		]
  	});

  }
};
