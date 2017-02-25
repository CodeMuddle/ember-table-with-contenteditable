import Ember from 'ember';
let Lead = Ember.Object.extend({});
let Column = Ember.Object.extend({
	editable:true,
	type:'default',// "select" "default" // default is contentEditable Div
	errors:true
});
export default Ember.Controller.extend({
	queryParams:['s'],
	s:'',
	init(){
		this._super(...arguments);
		let totalRows = 6;
		let size = 50;
		let rows = Ember.A();
		for(let i=1; i<=totalRows; i++){
			this.set('row'+i,new Ember.ArrayProxy({
				show:false,
				disabled:true,
				content:Ember.A()
			}));
		}
	},
	rows: Ember.computed(function () {
		let rows = Ember.A();
		console.time("Building Rows");
		for (let i = 0; i < 300; i++) {
			let row = new Lead({
				id: i,
				date: new Date(),
				col1: "col1",
				col2: "col2",
				col3: "col3",
				col4: "col4",
				col5: "col5",
				col6: "col6",
				col7: "col7",
				col8: "col8",
				col9: "col9",
				col10: "col10",
				col11: "col11",
				col12: "col12",
				col13: "col13",
				col14: "col14",
				col15: "col15",
				col16: "col16",
				col17: "col17",
				col18: "col18",
				col19: "col19",
				col20: "col20",
				col21: "col21",
				col22: "col22",
				col23: "col23",
				col24: "col24",
				col25: "col25",
				col26: "col26",
				col27: "col27",
				col28: "col28",
				col29: "col29",
				col30: "col30",
				col31: "col31",
				col32: "col32",
				col33: "col33",
				col34: "col34",
				col35: "col35",
				col36: "col36",
				col37: "col37",
				col38: "col38",
				col39: "col39",
				col40: "col40",/*
				col41: "col41",
				col42: "col42",
				col43: "col43",
				col44: "col44",
				col45: "col45",
				col46: "col46",
				col47: "col47",
				col48: "col48",
				col49: "col49",
				col50: "col50",*//*
				col51: "col51",
				col52: "col52",
				col53: "col53",
				col54: "col54",
				col55: "col55",
				col56: "col56",
				col57: "col57",
				col58: "col58",
				col59: "col59",
				col60: "col60",*/
				col61: "col61",
				col62: "col62",
				col63: "col63",
				col64: "col64",
				col65: "col65",
				col66: "col66",
				col67: "col67",
				col68: "col68",
				col69: "col69",
				col70: "col70",
				col71: "col71",
				col72: "col72",
				col73: "col73"
			});
			rows.pushObject(row);
		}
		console.timeEnd("Building Rows");
		return rows;
	}),
	currentRowNumber:1,
	columns:Ember.computed(function(){
		let columns = Ember.A();
		console.time("col");
		for(let i=1;i<=40;i++){
			let column = new Column({
				id:"col"+i
			});
			columns.pushObject(column);
		}
		for(let i=61;i<67;i++){
			let column = new Column({
				id:"col"+i,
				editable:false,
				errors:false
			});
			columns.pushObject(column);
		}
		for(let i=67;i<74;i++){
			let column = new Column({
				id:"col"+i,
				type:'select'
			});
			columns.pushObject(column);
		}
		console.timeEnd("col");
		return columns;
	}),
	addDataToRow(){
		let totalRows = 6;
		let size = 50;
		let rows = Ember.A();
		for(let i=1; i<=totalRows; i++){
			if(this.get('rows.length') > (i-1)*size){
				let initial = (i-1)*50
				rows = new Ember.ArrayProxy({
					show: i==1?true:false,
					disabled:false,
					content:this.get('rows').slice( (i-1)*50, i*50 )
				});
			} else {
				rows = new Ember.ArrayProxy({
					show:false,
					disabled:true,
					content:Ember.A()
				});
			}
			this.set('rows'+i,rows);
		}
	}
});
1