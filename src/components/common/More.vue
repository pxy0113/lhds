<template>
	<v-overlay
		:value="hover" @click.stop.native="clickOut">
		<div class="font-weight-regular box" @click.stop>
			<p class="d-flex justify-space-between align-center">
				<span class="font-weight-bold">涨幅回调：</span>
				<span>{{item.R5}}% </span>
			</p>
			<p class="d-flex justify-space-between align-center">
				<span class="font-weight-bold">卖出涨幅：</span>
				<span>{{item.R4}}%</span>
			</p>
			<p class="d-flex justify-space-between align-center">
				<span class="font-weight-bold">止损跌幅：</span>
				<span>{{item.R6}}% </span>
			</p>
			<p class="d-flex justify-space-between align-center">
				<span class="font-weight-bold">补仓跌幅：</span>
				<span>{{item.R7}}% </span>
			</p>
			<p class="d-flex justify-space-between align-center flex-wrap">
				<span class="font-weight-bold">补仓总额：</span>
				<span>{{item.R8*item.R9}}</span>
			</p>
			<p class="d-flex justify-space-between align-center mb-0">
				<span class="font-weight-bold">补仓回调：</span>
				<span>{{item.R10}}% </span>
			</p>


		</div>
	</v-overlay>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default:() =>[{}]
			},
			hover:{
				type:Boolean,
				default:false
			}
		},
		
		methods:{
			clickOut(){
				this.$emit('closeLay');
			}
		}
	}
</script>

<style scoped="scoped">
	.box{
		min-width: 200px;
		padding: 10px;
		border-radius: 3px;
		background:rgba(0,0,0,0.6);
	}
</style>
