const API = 'http://localhost:3000/api/cats/';

let catApp = new Vue({
	el:'#catApp',
	data:{
		cats:[],
		cat:{
			id:'',
			name:'',
			age:'',
			gender:'',
			breed:''
		}
	},
	created:function() {
		this.getCats();
	},
	methods:{
		handleInfo:function(index, row) {
			console.log('index', index);
			console.log('row', row);
		},
		getCats:function() {
			fetch(API)
			.then(res => res.json())
			.then(res => this.cats = res);	
		},
		storeCat:function() {
			let method;
			console.log('storeCat', this.cat);
			// Handle new vs old
			if(this.cat.id === '') {
				delete this.cat.id;
				method = 'POST';
			} else {
				method = 'PUT';
			}
			fetch(API, {
				headers:{
					'Content-Type':'application/json'
				},
				method:method,
				body:JSON.stringify(this.cat)
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
				this.successNotice(this.cat);
				this.reset();
			});
		},
		deleteCat:function(row) {
			fetch(API + row.id, {
				headers:{
					'Content-Type':'application/json'
				},
				method:'DELETE'
			})
			.then(res => res.json())
			.then(res => {
				this.getCats();
			});

			// call reset cuz the cat could be 'active'
			this.reset();
			delete row;
		},
		editCat:function(row) {
			/*
			This line was bad as it made a reference, and as you typed, it updated
			the list. A user may think they don't need to click save.
			this.cat = c;
			*/
			this.cat.id = row.id;
			this.cat.name = row.name;
			this.cat.age = row.age;
			this.cat.breed = row.breed;
			this.cat.gender = row.gender;
		},
		reset:function() {
			this.cat.id = '';
			this.cat.name = '';
			this.cat.age = '';
			this.cat.breed = '';
			this.cat.gender = '';
		},
		successNotice:function(cat) {
			this.$notify({
				title: 'Success',
				message: 'Added  ' + cat.name,
				type: 'success'
			});
		}
	}
});