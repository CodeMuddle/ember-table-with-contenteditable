import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Route.extend({
	queryParams: {
		s: {
			refreshModel: true
		}
	},
	model() {
		return Ember.A();
	},
	setupController(controller, model) {
		this._super(...arguments);
		controller.set('currentRowNumber', 1);
		if(controller.get('s')!==controller.get('search')){
			controller.set('search',controller.get('search'));
		}
		/*controller.set('rows2.show', false);
		controller.set('rows3.show', false);
		controller.set('rows4.show', false);
		controller.set('rows5.show', false);
		controller.set('rows6.show', false);*/
		console.time('addDataToRow');
		controller.addDataToRow();
		console.timeEnd('addDataToRow');
		console.time('handlingCustomContentEditableEvents');
		this.handlingCustomContentEditableEvents();
		console.timeEnd('handlingCustomContentEditableEvents');

	},
	rv:{},
	registerValue:function(keyname,value,isEnter) {
		this.get('rv')[keyname] = {value:value,isEnter:isEnter};
	},
	updateTask:task(function * (value,row,column) {
		console.log("getValue",value,row,column);
	}).enqueue(),
	getValue:function(keyname){
		let rv = this.get('rv');
		if(keyname in rv){
			return rv[keyname];
		}
		return null;
	},
	unregisterValue:function(keyname){
		if(keyname in this.get('rv')){
			delete this.get('rv')[keyname];
		}
	},
	handlePreventEnter(){
		Ember.$('[contenteditable="true"]').off('keydown');
		Ember.$('[contenteditable="true"]').on('keydown', function(e) {
			let key = e.keyCode || e.which;
			if(key === 13){
				e.preventDefault();
			}
		});
	},
	actionOnEnter(){
		let route = this;
		Ember.$('[contenteditable="true"]').off('keyup');
		Ember.$('[contenteditable="true"]').on('keyup', function(e) {
			console.log("called keyup");
			let key = e.keyCode || e.which;
			let dataId = Ember.$(this).data('id');
			let value = Ember.$(this).html();
			if(key === 13){
				// add to evented list
				route.registerValue(dataId,value,true);
			} else {
				route.registerValue(dataId,value,false);
			}
		});
	},
	actionOnBlur(){
		let route = this;
		Ember.$('[contenteditable="true"]').off('focusout');
		Ember.$('[contenteditable="true"]').on('focusout',function(){
			console.log("called focusout");
			let dataId = Ember.$(this).data('id');
			let value = Ember.$(this).html();
			route.registerValue(dataId,value,true);
		});
	},
	handlingCustomContentEditableEvents() {
		var controller = this.controller;
		Ember.run.scheduleOnce('afterRender', () => {
			this.handlePreventEnter();
			this.actionOnEnter();
			this.actionOnBlur();
			let w = window;
			Ember.$(w).off('scroll');
			Ember.$(w).on('scroll', function() {
				console.log("called window scroll");
				if ($(w).scrollTop() == $(document).height() - $(w).height()) {
					let v = controller.get('currentRowNumber');
					if (v < 6) {
						console.log("here", v + 1);
						controller.set('rows' + (v + 1) + '.show', true);
						controller.incrementProperty('currentRowNumber');
					}
				}
			});
		});
	},
	actions:{
		updateValue:function(row,column){
			// console.log("columnId",row,column,arguments);
			let rowId = row.get('id');
			let colId = column.id;
			Ember.run.later(() => {
				let checkvalue = this.getValue(`${rowId}-${colId}`);
				// console.log("",this.get('updateTask'))
				if(checkvalue.isEnter){
					this.unregisterValue(`${rowId}-${colId}`);
					this.get('updateTask').perform(checkvalue.value,row,column);
				}
			},0);
		},
		searchValue(value,event){
			/*var key = event.keyCode || event.which;
			if(key!==13){
				return;
			}*/
			if(this.controller.get('search') !== this.controller.get('s')){
				this.controller.set('s',value);
			}
		}
	}
});
