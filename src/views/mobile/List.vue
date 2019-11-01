<template>
	<div class="pa-2">
		<!-- <v-tabs v-model="tabIndex" color="green" @change="changeTab">
			<v-tab>收益数据</v-tab>
			<v-tab>下单数据</v-tab>
		</v-tabs> -->
		<div class="d-flex flex-column mt-1" v-resize="draw" id="vRow">
			<div style="border: 1px solid #66BB6A;">
				<div class=" green lighten-5 dateTemplate" ref="dateTemplate">
					<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
					<canvas id="canvas" :style="{'width':'50px','height':size+'px'}"></canvas>
					<date-pickers :value="endTime" @changeTime="endTimeChange"></date-pickers>
				</div>
			</div>

			<div class="d-flex align-center justify-space-between flex-wrap my-1">
				<div style="max-width: 200px;">
					<v-select v-model="tabIndex" @change="changeTab" dense hide-details color="green" :items="typeArr" item-text="value"
					 item-color="green" item-value="id" single-line></v-select>
				</div>
				<v-btn color="green" depressed outlined class="ml-1" @click="search">
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
	import {
		mapActions
	} from 'vuex';
	import upSvg from '@/img/up.svg'
	import datePickers from '@/components/datePickers.vue'
	import orderList from '@/views/mobile/Order.vue'
	import tableList from '@/views/mobile/TableList.vue'
	export default {
		components: {
			orderList,
			tableList,
			datePickers
		},
		data: () => ({
			typeArr: [{
					id: 0,
					value: '收益数据'
				},
				{
					id: 1,
					value: '下单数据'
				},
			],

			loading: true, //控制骨架屏 true表示显示

			transition: 'fade-transition',

			upIcon: upSvg,

			urls: ['/EasWebUser/getPlace', '/EasWebUser/getClose'],

			target: '#vRow',
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},

			startTime: '',
			endTime: '',

			items: [], //下单记录列表

			tabIndex: 0, //当前下标

			size: 50,

			componentArr: ['orderList', 'tableList'], //组件数组

		}),
		methods: {
			init() { //初始化
				this.draw(); //画箭头
				let day1 = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');;
				let day2 = this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

				this.startTime = day1;
				this.endTime = day2;

				let list = {
					"beginTime": this.$moment(day1).format('x'),
					"endTime": this.$moment(day2).format('x'),
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
			},

			doSomething() {
				console.log('渲染了' + this.componentArr[this.tabIndex])
				// this.$refs.componentType.init();
			},
			changeTab() {
				let list = {
					"beginTime": this.$moment(this.startTime).format('x'),
					"endTime": Number(this.$moment(this.endTime).format('x')) + 59000 + "",
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
			},

			inputShow(number) {
				this.curPage.page = number;
				let start = this.$moment(this.startTime).format('x');
				let end = this.$moment(this.endTime).format('x');
				let list = {
					"beginTime": start,
					"endTime": end,
					"pageSize": 10,
					"pageIndex": this.curPage.page ? this.curPage.page : 0
				}
				this.$vuetify.goTo(this.target, this.options); //平滑滚动到表头
				this.getListData(list);
			},

			...mapActions(['changeSnack']),

			startTimeChange(time) {
				this.startTime = time;
			},

			endTimeChange(time) {
				this.endTime = time;
			},

			search() { //搜索列表

				if (this.startTime && this.endTime) {
					let start = this.$moment(this.startTime).valueOf();
					let end = this.$moment(this.endTime).valueOf();
					if (end > start) {
						let list = {
							"beginTime": this.$moment(this.startTime).format('x'),
							"endTime": Number(this.$moment(this.endTime).format('x')) + 59000 + "",
							"pageSize": 10,
							"pageIndex": 1
						}

						this.getListData(list);
					} else {

						let msg = {
							state: true,
							errorText: {
								type: 'info',
								text: '开始时间不能大于结束时间'
							}
						}
						this.changeSnack(msg);
					}
				} else {
					let msg = {
						state: true,
						errorText: {
							type: 'info',
							text: '请填写时间再搜索'
						}
					}
					this.changeSnack(msg);
				}
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

			getListData(list) { //获取下单数据
				this.loading = true;
				$ax.getAjaxData(this.urls[this.tabIndex], list, (res) => {
					if (res.code == 1) {
						let data = res.data;
						this.curPage = {
							page: res.pageIndex,
							size: res.pageMaxPage
						};
						data.forEach(item => {
							item.placeTime = this.$utils.timestampToTime(Number(item.placeTime));
						});
						this.items = data;

					} else {

						console.log('错误错误')
					}

					this.loading = false;

				}, {
					hasToken: true
				});
			}

		},
		mounted() {
			this.init();
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
