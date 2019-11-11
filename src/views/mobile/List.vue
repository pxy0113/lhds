<template>
	<div>
		<div class="d-flex flex-column" v-resize="draw" id="vRow">
			<div class=" px-5 py-2 green lighten-5">
				
				<v-menu transition="scroll-y-transition">
					<template v-slot:activator="{ on }">
						<Avatar style="background-color: #66BB6A" size="10"></Avatar>
						<!-- <v-btn tile outlined small  class="ma-0 px-1" style="border: none;font-size: 14px;" v-on="on">
							{{typeArr[tabIndex].value}}
							<v-icon right>mdi-menu-down</v-icon>
						</v-btn> -->
						 <v-chip
							 class="pl-2"
						      outlined
						      label
							  v-on="on"
							   style="border: none;"
						    >
							{{typeArr[tabIndex].value}}
							<v-icon right>mdi-menu-down</v-icon>
						
						</v-chip>
					</template>
					<v-list class="pa-0">
					  <v-list-item dense  v-ripple="{ class: 'green--text' }"
						v-for="n in typeArr" link @click="transTab(n.id)"
						:class="[tabIndex==n.id?'green lighten-5':'']">
						<v-list-item-title>{{n.value}}</v-list-item-title>
					  </v-list-item>
					</v-list>
				</v-menu>
					
			</div>
			
			<div class="pa-2 mt-1">
				<div class="d-flex flex-column">
					<div class="dateTemplate" ref="dateTemplate"
					style="border: 1px solid #66BB6A;border-bottom: none;">
						<common-datepick :value="startTime" @changeTime="startTimeChange"></common-datepick>
						<canvas id="canvas" :style="{'width':'50px','height':size+'px'}"></canvas>
						<common-datepick :value="endTime" @changeTime="endTimeChange"></common-datepick>
					</div>
					<v-btn  block tile color="green" depressed  outlined @click="search">
						<v-icon>mdi-magnify</v-icon>
						查询
					</v-btn>
				</div>
			</div>

			

			<component  :is="transition !== 'None' ? `v-${transition}` : 'div'" hide-on-leave>
				<v-skeleton-loader v-if="loading" type="article" class="pa-2">
				</v-skeleton-loader>

				<div v-else class="pa-2">
					<v-list-item three-line v-if="items.length<1" class="xy-tableItem">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
					
					<component v-else :is="componentArr[tabIndex]" ref="componentType" :items="items" @hook:mounted="doSomething"></component>
					
					
					<div class="text-center mt-4 mb-8" v-if="items.length>0">
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
	import orderList from '@/views/mobile/Order.vue'
	import tableList from '@/views/mobile/TableList.vue'
	import { listData } from '@/mixins/listData.js' 
	export default {
		components: {
			orderList,
			tableList
		},
		mixins:[listData],
		
		methods: {
			transTab(id){
				this.tabIndex = id;
				this.changeTab();
			},
			
			draw() { //画箭头
				this.size = this.$refs.dateTemplate.offsetHeight;
				let canvas = document.getElementById('canvas');
				canvas.width = this.size;
				canvas.height = this.size;
				let ctx = canvas.getContext('2d');
				ctx.beginPath();
				ctx.moveTo(this.size / 4 + 6.25, 0);
				ctx.lineTo(this.size / 2 + 6.25, this.size / 2);
				ctx.lineTo(this.size / 4 + 6.25, this.size);
				ctx.lineWidth = 1;
				ctx.strokeStyle = '#66BB6A';
				ctx.stroke();

			},


		},
		mounted() {
			this.draw(); //画箭头
		}
	}
</script>

<style scoped="scoped">
	.dateTemplate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		padding: 0 16px;
		width: 100%;
		color: #37474F;
	}
</style>
