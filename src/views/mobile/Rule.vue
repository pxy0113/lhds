<template>
	<div>
		<!-- <v-card v-if="!showAddRule" outlined  id="vRow"> -->
		<div id="vRow" v-if="!showAddRule">
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<Badge color="green" class="grey--text" text="规则列表"></Badge>
				<v-btn small  outlined color="green"  @click="newRule" class="ma-1">新增规则</v-btn>

			</div>
			
			 <!-- <v-divider></v-divider> -->

			<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
				<v-skeleton-loader
				v-if="loading"
				type="article"
				>
				</v-skeleton-loader>
				
				<div v-else>
					<v-list-item three-line class="xy-borderB" v-if="ruleList.length<1">
						<p class="text-center" style="width: 100%;">暂无数据</p>
					</v-list-item>
					
					<div v-else >
						<div  v-for="(item,i) in ruleList"
					      :key="i">
							<v-list-item three-line>
								<v-list-item-content>
								<div class="d-flex flex-column px-1">
								  <div class="my-1 d-flex justify-space-between align-center flex-wrap">
									<div class="d-flex align-center">
										<div class="font-weight-bold demo">
										{{item.R0}}
										</div>/<span style="font-size: 12px;">规则名称</span></div>
										<v-btn text small color="green" @click="testDemo(i)">查看</v-btn>
								  </div>
								  <Row class="font-weight-regular body-2">
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">计价货币：{{item.R54==1?'USDT':item.R54==2?'ETH':'BTC'}}</Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">买入跌幅：{{item.R1}}% </Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">跌幅回调：{{item.R2}}% </Col>
									  <Col :lg="6" :md="12" :xs="24" :sm="12" class="py-2">建仓金额：{{item.R3}} </Col>
								  </Row>
								  <div class="d-flex justify-end align-center ">
								    <v-btn outlined class="mr-1"  x-small color="error" @click.prevent.stop="delRule(item.id,i)">
								  	删除
								    </v-btn>
								    <v-btn outlined x-small color="primary" @click="editRule(item)">
								  	编辑
								    </v-btn>
								  </div>
								</div>
								</v-list-item-content>
								
							</v-list-item>
							
							<v-scroll-y-transition >
								<Row style="font-size: 14px;" class="font-weight-regular grey lighten-3 px-4" v-if="showIndex==i">
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>涨幅回调</span>
										<span>{{item.R5}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>卖出涨幅</span>
										<span>{{item.R4}}%</span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>止损跌幅</span>
										<span>{{item.R6}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>补仓跌幅</span>
										<span>{{item.R7}}% </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>补仓总额</span>
										<span>{{item.R8*item.R9}} </span>
									</Col>
									<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
										<span>补仓回调</span>
										<span>{{item.R10}}% </span>
									</Col>
								</Row>
								<v-divider v-else class="mx-2"></v-divider>
							</v-scroll-y-transition>
							
						</div>
					</div>

					<div class="text-center mt-5">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
					
					
				</div>
			</component>

		</div>
		
		<v-fab-transition>
			<Avatar :src="upIcon" 
			v-if="(!showAddRule)&&(ruleList.length>=5)"
			class="xy-suspend" 
			@click.stop.native="$vuetify.goTo(target, options)"
			>
			</Avatar>

		</v-fab-transition>
		<add-rule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="editType"></add-rule>
	</div>
</template>

<script>
	import upSvg from '@/img/up.svg'
	import Utils from '@/plugins/cryAes.js'
	import addRule from '@/components/addRule.vue'
	import {
		mapActions
	} from 'vuex';

	export default {
		compoments: {
			addRule
		},
		data() {
			return {
				showIndex:-1,//当前显示的折叠菜单的下标
				
				transition: 'fade-transition',
				
				loading:true,//控制骨架屏 true表示显示
				
				upIcon:upSvg,
				
				editType:false,//新增
				
				step: 1,

				target: '#vRow',
				options: {
					duration: 1000,
					offset: 0,
					easing: 'easeInOutCubic'
				},

				curPage: {
					page: 1,
					size: 0
				},

				currentRule: {}, //当前的规则

				showAddRule: false,

				ruleList: [],
			}
		},
		watch: {
			wssData:{
				handler(nV,oV){
					this.getMessage();
				},
				deep:true
			}
		},
		
		computed:{
			wssData(){//wss传递的消息
				return this.$store.state.collocationList;
			}
		},
		
		methods: {
			testDemo(i){
				this.showIndex == i?this.showIndex = -1:this.showIndex = i;
			},
			
			...mapActions(['changeLay', 'changeSnack']),
			
			changeTime(time) {
				return this.$utils.timestampToTime(Number(time));
			},

			newRule(){
				this.showAddRule = true;
				this.editType = false;
			},
			
			getMessage(){//wss传递的消息
				let result = this.wssData;
				switch (result.code){
					case 20013://客户端在线
					let json = JSON.stringify({code:1006});
					
					this.$sock.websocketsend(json);
						break;	
						
					default:
						break;
				}
					
			},
			
			delRule(id, index) { //删除规则
				this.$Modal.confirm({
					render: (h) => {
						return h('div', [
							h('p',{
								style:{
									fontWeight:'700'
								}
							},'确定删除吗? 该操作不可撤销'),
						])
					},
					onOk: () => {
						this.changeLay(true);
						
						let state = this.$sock.lookState();

						$ax.getAjaxData('/EasWebUser/delRule', {
							id: id
						}, (res) => {
							this.changeLay(false);
							if (res.code == 1) {
								let msg = {
									state: true,
									errorText: {
										type: 'success',
										text: '删除成功'
									}
								}
								this.changeSnack(msg);
								
								let json = JSON.stringify({code:1006});
									
								state==-1?this.$sock.initWebSocket():this.$sock.websocketsend(json);
								
								sessionStorage.removeItem('collocation');//清空缓存里的rule/api

								this.ruleList.splice(index, 1);
							}
						
						}, {
							hasToken: true
						});
					}
				});
				
			},

			hideRule() { //隐藏规则输入框
				this.showAddRule = false;
				this.getRuleList();
			},

			editRule(item) { //编辑规则
				this.showAddRule = true;
							
				this.editType = true;

				this.currentRule = item;
			},

			inputShow(number) {
				this.curPage.page = number;
				this.$vuetify.goTo(this.target, this.options);//平滑滚动到表头
				this.getRuleList();
			},

			unescapeF(str){//unicode=>文字
				return unescape(str.replace(/\\/g, "%"))
			},

			getRuleList() { //规则列表
				this.loading = true;

				$ax.getAjaxData('/EasWebUser/getRule', {
					code: this.code,
					pageSize: 10,
					pageIndex: this.curPage.page ? this.curPage.page : 0
				}, (res) => {
					this.loading = false;
					if (res.code == 1) {
						let list = res.data;
						let arr = [];

						list.forEach((item, index) => {
							let a = JSON.parse(Utils.decrypt(item.data));
							
							a.id = item.id;
							
							a.R0 = this.unescapeF(a.R0);
							
							arr.push(a);
							
						});
						
						this.ruleList = arr;
						this.curPage = {
							page: res.pageIndex,
							size: res.pageMaxPage
						};
						this.step = 1;

					}
					
					

				}, {
					hasToken: true
				});

			}
		},
		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

			(async () => { //执行异步函数

				next(vm => {
					vm.getRuleList();
				});

			})();

		},
		beforeRouteLeave(to,from,next){//路由离开前断开
			this.$sock.close();

			next();
		},
	}
</script>
<style scoped="scoped">
	::-webkit-input-placeholder {
		/* WebKit browsers */
		color: white;
	}

	:-moz-placeholder {
		/* Mozilla Firefox 4 to 18 */
		color: white;
	}

	::-moz-placeholder {
		/* Mozilla Firefox 19+ */
		color: white;
	}

	:-ms-input-placeholder {
		/* Internet Explorer 10+ */
		color: white;
	}

</style>
<style>
	.v-expansion-panel:before{
		box-shadow:none!important;
	}
	.demo{
		max-width: 150px;
		overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
	}
</style>
