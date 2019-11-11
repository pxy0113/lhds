<template>
<!-- 	<v-dialog v-model="dialog" persistent max-width="290">
	      <v-card>
	        <v-card-title class="headline">Use Google's location service?</v-card-title>
	        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn color="green darken-1" text @click="clickCancel">Disagree</v-btn>
	          <v-btn color="green darken-1" text @click="clickOk">Agree</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
		 -->
		 <div v-if="dialog" style="z-index: 1200;">
			 {{message}}
			 
			 <p @click="clickCancel">取消</p>
		 </div>
</template>

<script>
	export default {
		props:['message','visible'],
		data:() => ({
			dialog:false
		}),
		watch: {
			visible: {
				handler: function (data) {
					this.dialog = data;
				},
				immediate: true
			}
		},
		methods:{
			clickOk(){
				this.$emit('onOk');
			},
			clickCancel(){
				this.$emit('onCancel');
			},
		}
	}
</script>

<style>
</style>
