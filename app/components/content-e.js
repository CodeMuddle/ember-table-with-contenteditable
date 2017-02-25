import Ember from 'ember';

export default Ember.Component.extend({
	attributeBindings:["contenteditable"],
	contenteditable:true,
	value:"",
	row:{},
	column:{},
	sendEvent(event){
		// leadId and columnName
		console.log("event",event);
		let target = event.target
		let value = Ember.$(target).html();
		this.sendAction('updateValue',value,this.get('row'),this.get('column'));
	},
	handleEnter:Ember.on('keyDown',function(event){
		// console.log("event",event);
		let keyCode = event.keyCode || event.which;
		if(keyCode === 13){
			event.preventDefault();
		}
		// console.log('event',$(event.target).html());
	}),
	updateNew:Ember.on('keyUp',function(event){
		let keyCode = event.keyCode || event.which;
		if(keyCode === 13){
			this.sendEvent(event);
		}
	})

});
