<template>
	<div>
		<div class="d-flex flex-column" v-resize="draw" id="vRow">
			<div><!--style="border: 1px solid #66BB6A;"-->
				<div class=" green lighten-5 dateTemplate" ref="dateTemplate">
					<common-datepick :value="startTime" @changeTime="startTimeChange"></common-datepick>
					<canvas id="canvas" :style="{'width':'50px','height':size+'px'}"></canvas>
					<common-datepick :value="endTime" @changeTime="endTimeChange"></common-datepick>
				</div>
			</div>

			<div class="d-flex align-center flex-wrap my-1 px-2">
				<div style="max-width: 150px;">
					<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
					 item-color="green" item-value="id" single-line outlined></v-select>
				</div>
				<v-btn color="green" depressed outlined class="ml-1" @click="search">
					<v-icon>mdi-magnify</v-icon>
					查询
				</v-btn>
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
