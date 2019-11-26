<template>
	<div class="ma-2">
		<div class="d-flex flex-column mt-1" id="vRow">
			
			 <div class="d-flex justify-start align-center flex-wrap py-2 px-3">
				 <v-divider
				   class="my-1"
				 	vertical
				   ></v-divider>
				<div style="max-width: 400px;" class='px-2 '>
					<v-menu
					ref="menu"
					v-model="menu"
					  bottom
					  origin="center center"
					  :close-on-content-click="false"
					  :return-value.sync="shortStart"
					  transition="scale-transition"
					  min-width="290px"
					>
					      <template v-slot:activator="{ on }">
					        <v-text-field hide-details color="green"
							 v-model="startTime" label="开始时间" readonly v-on="on">
							</v-text-field>
					      </template>
						 <v-date-picker v-model="shortStart" no-title scrollable locale="zh-cn" color="green" :day-format="dateF">
						  <v-spacer></v-spacer>
						  <v-btn text color="green" outlined @click="startTimeOk">确定</v-btn>
						</v-date-picker>
					</v-menu>
				</div>
				<v-divider
				  class="my-1"
					vertical
				  ></v-divider>
				<div style="max-width: 400px;" class='px-2 '>
					<v-menu
					v-model="menu1"
					ref="menu1"
					  bottom
					  origin="center center"
					  :close-on-content-click="false"
					  :return-value.sync="shortEnd"
					  transition="scale-transition"
					  min-width="290px"
					>
					      <template v-slot:activator="{ on }">
					        <v-text-field hide-details color="green"
							 v-model="endTime" label="结束时间" readonly v-on="on" >
							</v-text-field>
					      </template>
						 <v-date-picker v-model="shortEnd" no-title scrollable locale="zh-cn" color="green" :day-format="dateF">
						  <v-spacer></v-spacer>
						  <v-btn text color="green" outlined @click="endTimeOk">确定</v-btn>
						</v-date-picker>
					</v-menu>
				</div>
				 <v-divider
				 class="my-1"
				 vertical
				 ></v-divider>
				 <div class="px-2" 
				 style="width: 200px;">
				 	<!-- <span>类别</span> -->
				 	<v-select v-model="tabIndex" @change="changeTab"  hide-details color="green" 
					label="类别"
					:items="typeArr" item-text="value"
				 	 item-color="green" item-value="id"></v-select>
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
		data: () =>({
			menu:false,
			menu1:false,
		}),
		methods:{
			dateF(e){
				let arr = e.split('-');
				return arr[2];
			},
			startTimeOk(){//开始时间选择器-确定
				this.menu = false;
				this.$refs.menu.save(this.shortStart);
				this.startTime = this.$moment(this.shortStart).format('YYYY-MM-DD HH:mm:ss');
			},
			endTimeOk(){//结束时间选择器-确定
				this.endTime = this.$moment(this.shortEnd).set('hour',23).set('minutes', 59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss');
				this.$refs.menu1.save(this.shortEnd)
				this.menu1= false;
				
			},
		}
	}
</script>

<style>
</style>
