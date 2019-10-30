<template>
	<!--fill-height-->
	<v-container fluid grid-list-xl flat>
		<v-layout justify-center wrap flex-column>
			
			
			
			<div class="d-flex flex-column" v-resize="draw" id="vRow">
				<div class="my-0 green white--text d-flex flex-column justify-start align-start">
					<div class="d-flex align-center justify-space-between px-4" style="width: 100%;">
						<span v-once>全部记录</span>
						<v-btn small dark outlined @click="search" >查询</v-btn>
					</div>
					<div class="dateTemplate" ref="dateTemplate">
						<date-pickers :value="startTime" @changeTime="startTimeChange"></date-pickers>
						<canvas id="canvas" :style="{'width':'50px','height':size+'px'}"></canvas>
						<date-pickers :value="endTime"  @changeTime="endTimeChange"></date-pickers>
					</div>
				
				</div>
				
				
				<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
					<v-skeleton-loader
					v-if="loading"
					type="article"
					>
					</v-skeleton-loader>
					
					<div v-else>
						<v-list-item three-line class="xy-tableItem" v-if="items.length<1">
							<p class="text-center" style="width: 100%;">暂无数据</p>
						</v-list-item>
						
						<div v-for="(item,index) in items" :key="index" v-else>
							<v-list-item three-line class="xy-tableItem">
							  <v-list-item-content class="align-self-start">
								<v-list-item-title
								  class=" mb-2">
						
									<div class="d-flex align-center">
										<Tag :color="(item.operate==0||item.operate==2)?'#70c68e':'#f1837f'" class="px-1">{{stateArr[item.operate]}}</Tag>
										<span class=" font-weight-bold">{{transUpperCase(item.symbol)}} </span>/
										<span style="font-size: 12px;">{{item.exchange}}</span>
									</div>
								</v-list-item-title>
							
								<v-list-item-subtitle class="font-weight-regular">{{item.placeTime}}</v-list-item-subtitle>
								<div class="font-weight-regular">
									<Row class="d-flex flex-wrap">
						
										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
											<span class="textAlign">法币</span>：{{item.currency}}
										</Col>	

										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
											<span class="textAlign">数量</span>
											：{{item.num}}
										</Col>
										
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
											<span>价格</span>
											：{{item.price}}
										</Col>
										
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
											<span class="textAlign">手续费</span>
											：{{item.fee}}
										</Col>
									</Row>
									
								</div>
							  </v-list-item-content>
							 
							</v-list-item>
						</div>
						
					</div>
				</component>
				
				<v-fab-transition>

				  <Avatar :src="upIcon" 
				  v-if="items.length>=5"
				  class="xy-suspend"
				  @click.stop.native="$vuetify.goTo(target, options)"
				  >
				  </Avatar>
				</v-fab-transition>
			</div>
			
			
		</v-layout>
		<div class="text-center my-4">
			<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
		</div>
	</v-container>
</template>

<script>
	import upSvg from '@/img/up.svg'
	import datePickers from '@/components/datePickers.vue'
	import {
		mapActions
	} from 'vuex';
	export default {
		components: {
			datePickers
		},
		data: () => ({
			timeOptions:{ //时间选择器的限制
				disabledDate (date) {
					return date && date.valueOf() > Date.now();
				}
			},
			
			size:50,
			
			transition: 'scale-transition',
			
			loading:true,//控制骨架屏 true表示显示
			
			stateArr:['买','卖','补','止'],
			
			upIcon:upSvg,
			
			step: 1,
			
			curPage: {
				page: 1,
				size: 0
			},
			target: '#vRow',
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},

			startTime: '',
			endTime: '',
			searchStartTime:'',
			searchEndTime:'',
			
			items: []//下单记录列表
		}),
		methods: {
			transUpperCase(data){ //交易对转大写
				return data.toUpperCase();
			},
			
			inputShow(number) {
				this.curPage.page = number;
				let start = this.$moment(this.searchStartTime).format('x');
				let end = this.$moment(this.searchEndTime).format('x');
				let list = {
					"beginTime": start,
					"endTime": end,
					"pageSize": 10,
					"pageIndex": this.curPage.page ? this.curPage.page : 0
				}
				this.$vuetify.goTo(this.target, this.options);//平滑滚动到表头
				this.getPlaceData(list);
			},

			...mapActions(['changeSnack']),

			startTimeChange(time){
				this.startTime = time;
			},
			
			endTimeChange(time) {
				this.endTime = time;
			},

			search() { //搜索下单列表
				
				if (this.startTime && this.endTime) {
					
					let start = this.$moment(this.startTime).valueOf();
					
					let end = this.$moment(this.endTime).valueOf();
					
					if (end > start) {
						let list = {
							"beginTime": this.$moment(this.startTime).format('x'),
							"endTime": Number(this.$moment(this.endTime).format('x'))+59000+"",//到23：59：59
							"pageSize": 10,
							"pageIndex": 1
						}
						
						this.searchStartTime = this.startTime;
						this.searchEndTime = this.endTime;
						
						this.getPlaceData(list);
					} else {
						
						let msg = {
							state: true,
							errorText: {
								type: 'error',
								text: '开始时间不能大于结束时间'
							}
						}
						this.searchStartTime = '';
						this.searchEndTime = '';
						this.changeSnack(msg);
					}
				} else {
					let msg = {
						state: true,
						errorText: {
							type: 'error',
							text: '请填写时间再搜索'
						}
					}
					this.changeSnack(msg);
				}
			},

			draw(){//画箭头
				this.size = this.$refs.dateTemplate.offsetHeight;
				let canvas = document.getElementById('canvas');
				// canvas.width = 50;
				// canvas.height = 50;
				// let ctx = canvas.getContext('2d');
				// ctx.beginPath();
				// ctx.moveTo(18.75,0);
				// ctx.lineTo(31.25,25);
				// ctx.lineTo(18.75,50);
				// ctx.lineWidth=1;
				// ctx.strokeStyle='#66BB6A';
				// ctx.stroke();
				
				console.log(this.size)
				canvas.width = this.size; 
				canvas.height = this.size;
				let ctx = canvas.getContext('2d');
				ctx.beginPath();
				ctx.moveTo(this.size/4+6.25,0);
				ctx.lineTo(this.size/2+6.25,this.size/2);
				ctx.lineTo(this.size/4+6.25,this.size);
				ctx.lineWidth=1;
				ctx.strokeStyle='#66BB6A';
				ctx.stroke();
				
			},

			getPlaceData(list) { //获取下单数据
				this.loading = true;
				$ax.getAjaxData('/EasWebUser/getPlace', list, (res) => {
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
						this.step = 1;
						
					} else {

						console.log('错误错误')
					}
					
					this.loading = false;
					
				}, {
					hasToken: true
				});
			}


		},
		computed: {

		},
		mounted() {
			this.draw();//画箭头
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
			this.getPlaceData(list);
		}
	}
</script>
<style scoped="scoped">
	.bg {
		background: #C5E1A5;
	}
	.dateTemplate{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border:1px solid #66BB6A;
		text-align: center;
		padding:0 16px;
		width: 100%;
		color: #37474F;
		background: #f8f9f8;
	}
/* 	.dateTemplate{
		display: grid;
		grid-template-columns:auto 50px auto;
		grid-template-rows:auto;
		border:1px solid #66BB6A;
		text-align: center;
		padding:0 16px;
		width: 100%;
		color: #37474F;
		background: #f8f9f8;
		line-height: 50px;
		vertical-align: middle;
	} */
</style>