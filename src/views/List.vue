<template>
	<div class="ma-2">
		<div class="d-flex flex-column mt-1"id="vRow">
			 <div class="d-flex justify-start align-center flex-wrap py-2">
				 <v-divider
				   class="my-1"
				 	vertical
				   ></v-divider>
				 <div class="d-flex flex-column justify-start align-start px-2" 
				 style="width: 200px;">
				 	<span class="mb-1">开始时间</span>
				 	<v-chip>
				 		<common-datepick :value="startTime" :showIcon="true" @changeTime="startTimeChange"></common-datepick>
				 	</v-chip>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 
				 <div class="d-flex flex-column justify-start align-start px-2" 
				 style="width: 200px;">
				 	<span class="mb-1">结束时间</span>
				 	<v-chip>
				 		<common-datepick :value="endTime" :showIcon="true" @changeTime="endTimeChange"></common-datepick>
				 	</v-chip>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 <div class="d-flex flex-column justify-start align-start px-2 py-1" 
				 style="width: 200px;">
				 	<span>类别</span>
				 	<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
				 	 item-color="green" item-value="id" single-line></v-select>
				 </div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 <v-btn color="green" depressed outlined class="mx-2 my-1"  @click="search">
				 	<v-icon>mdi-magnify</v-icon>
				 	查询
				 </v-btn>
			 </div>

			
<!-- 			<div  class="d-flex justify-start align-center">
				<v-chip class="my-1 mr-1">
					<v-icon left>mdi-weather-sunny</v-icon>
					<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
				</v-chip>
				-
				<v-chip  class="my-1 mr-1">
					<v-icon left>mdi-weather-night</v-icon>
					<date-pickers :value="endTime" @changeTime="endTimeChange"></date-pickers>
				</v-chip>
			</div>
		
			<div class="d-flex align-center justify-space-between justify-lg-start flex-wrap my-1">
				<div style="max-width: 200px;">
					<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
					 item-color="green" item-value="id" single-line></v-select>
				</div>
				<v-btn color="green" depressed outlined class="ml-1" @click="search">
					<v-icon>mdi-magnify</v-icon>
					查询
				</v-btn>
			</div> -->
			
			
		
			<component :is="transition !== 'None' ? `v-${transition}` : 'div'" hide-on-leave>
				<v-skeleton-loader v-if="loading" type="article">
				</v-skeleton-loader>
		
				<div v-else>
					<v-list-item three-line v-if="items.length<1" class="xy-tableItem">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
		
					<component v-else :is="componentArr[tabIndex]" ref="componentType" :items="items" @hook:mounted="doSomething"></component>
					<div class="text-center my-4" v-if="items.length>0">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
				</div>
			</component>
		
			<v-fab-transition>
		
				<Avatar :src="upIcon" v-if="items.length>=5" class="xy-suspend" @click.stop.native="$vuetify.goTo(target, options)">
				</Avatar>
			</v-fab-transition>
		</div>
		
	</div>

</template>

<script>
	import orderList from '@/views/OrderList.vue'
	import tableList from '@/views/TableList.vue'
	import { listData } from '@/mixins/listData.js' 
	export default {
		mixins: [listData],//混入，先执行混入的钩子再执行本页面钩子
		components: {
			orderList,
			tableList
		},
	}
</script>

<style>
</style>
