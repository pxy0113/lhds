<template>
	<div class="d-flex flex-column align-center py-2 mx-auto" style="width: 100px;" v-if="show">
		<p>加载中...</p>
		<v-progress-linear
		color="green accent-4"
		indeterminate
		rounded
		height="6"
		></v-progress-linear>
	
	</div>
</template>

<script>
	export default{
		props:{
			show:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>
</style>
