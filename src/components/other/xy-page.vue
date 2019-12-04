<template>
      <div>
		  <div class="d-flex align-center justify-center">
			  <v-icon size="30" :disabled="current_page==1" @click="page--">mdi-chevron-left</v-icon>
			  <div class="page-grid mx-2">
				  <input type="number" :value="page" @blur="watchInput"
				  style="outline: none; border: 1px solid #66BB6A; border-radius: 3px;text-align: center;">
				  <span>/</span>
				  <span>{{page_total}}</span>
			  </div>
			  <v-icon size="30" :disabled="current_page==page_total" @click="page++">mdi-chevron-right</v-icon>
		  </div>

	  </div>
</template>

<script>
export default{
	data() {
		return {

		}
	},
	props:{
		page_total:{
			type:[Number,String],
			default:30
		},
		current_page:{
			type:[Number,String],
			default:1
		}
		
	},
	computed: {
	  page: {
		get () {
		  return this.current_page
		},
		set (val) {
			this.$emit('changePage',val);
		}
	  },
	},
	methods:{
		watchInput(val){
			let data = Number(val.target.value);
			if(typeof(data)=='number'){
				if(data!=this.page){
					this.page = data<=this.page_total?data:this.page_total;
				}
			}else{
				this.page = 1;
			}
		}
	}

}
</script>

<style scoped="scoped">
	.page-grid{
		display: grid;
		grid-template-columns: 50px 13px auto;
		grid-template-rows: 24px;
		grid-gap:5px;
		line-height: 24px;
		font-size: 14px;
	}
</style>