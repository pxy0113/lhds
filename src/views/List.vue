<template>
	<div class="ma-2">
		<v-tabs v-model="tabIndex" color="green">
			<v-tab>收益数据</v-tab>
			<v-tab>下单数据</v-tab>
		</v-tabs>
		<component :is="componentArr[tabIndex]" ref="componentType"  @hook:mounted="doSomething"></component>
	</div>

</template>

<script>
	import orderList from '@/views/OrderList.vue'
	import tableList from '@/views/TableList.vue'
	export default {
		components: {
			orderList,
			tableList
		},
		data: () => ({
			tabIndex:0,//当前下标

			componentArr:['orderList','tableList'],//组件数组

		}),
		methods:{
			doSomething(){
				console.log('渲染了'+this.componentArr[this.tabIndex])
				// this.$refs.componentType.init();
			},
		}
	}
</script>

<style>
</style>
