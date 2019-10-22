<template>
	<v-container fluid grid-list-xl flat>
		
		<v-flex class="d-flex flex-column">
			<div class=" px-5 py-2 my-0 green white--text d-flex justify-space-between align-center flex-wrap xy-border-circle">
				<span style="font-size: 18px;" v-once>托管列表</span>
				<span style="min-width: 260px;">
					<v-btn small color="white" outlined @click="showSetting">设置</v-btn>
					<v-btn small color="white" outlined @click="addCollocation=true">添加托管</v-btn>
					<v-btn small color="white" outlined @click="allStart">全部启动</v-btn>
					<v-btn small color="white" outlined @click="allEnd">全部停止</v-btn>	
				</span>

			</div>
			
			
		   <component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
				<v-skeleton-loader
				v-if="loading"
				type="article"
				>
				</v-skeleton-loader>
				
				<div v-else>
					<v-list-item three-line style="border: 1px solid #ccc;text-align: center;" v-if="items.length<1">
						<p class="text-center" style="width: 100%;">{{tips}}</p>
					</v-list-item>
					
					<div v-for="(item,index) in items" :key="index" v-else>
						<v-list-item three-line class="xy-tableItem">
							<v-list-item-content class="align-self-start">
								<v-list-item-title class=" mb-2">
									<div class="d-flex align-center">
										<span class=" font-weight-bold">{{transUpperCase(item.symbol)}} </span>
										<span 
										:style="{color:item.isRun==0?'#E53935':item.isRun==1?'#43A047':item.isRun==2?'orange':'blue',fontSize:'14px'}" 
										class="font-weight-bold pl-2">
										{{item.isRun==0?'待启动':item.isRun==1?'运行中':item.isRun==2?'建仓中':'平仓中'}}</span>
									</div>
								</v-list-item-title>
					
								<v-list-item-subtitle class="font-weight-regular">{{item.exc}}</v-list-item-subtitle>
					
								<div class="font-weight-regular">
									<Row>
					
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span class="textAlign">参考价格</span>：{{item.referPrice}}
										</Col>
					
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span>最新价格</span>
										：{{item.newPrice}}
										</Col>
					
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span class="textAlign">涨跌幅</span>
										：{{item.range=='-'?'-':item.range+' %'}}
										</Col>
					
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span class="textAlign">持仓均价</span>
										：{{item.holdPrice}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="24" class="py-1">
										<span class="textAlign">持仓数量</span>
										：{{item.holdAmount}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										<span class="textAlign">利润百分比</span>
										：{{item.profit=='-'?'-':item.profit+' %'}}
										</Col>
										<Col :lg="6" :md="6" :sm="12" :xs="12" class="py-1">
										<span class="textAlign">补仓次数</span>
										：{{item.other}}
										</Col>
									</Row>
					
								</div>
								
								<div>
									<v-btn tile outlined small color="success" class="ma-0" @click.prevent.stop="showChip(item)">
										操作
										<v-icon right>{{item.show?'mdi-menu-up':'mdi-menu-down'}}</v-icon>
									</v-btn>
								</div>
					
								<v-expand-transition v-if="item.show">
									<v-chip-group active-class="green--text "column class="font-weight-regular">
										<v-chip  @click="onOperation(item)">{{item.isRun==0?'启动':'停止'}}</v-chip>
										<v-chip  @click="onRemove(item)" :disabled="item.isRun>=1">删除</v-chip>
										<v-chip  @click="onEdit(item)" :disabled="item.isRun>=1">修改</v-chip>
										<v-chip  @click="onPosition(item)" :disabled="item.isRun==0">{{item.isBuy==0?'建仓':'平仓'}}</v-chip>
									</v-chip-group>
								</v-expand-transition>
					
							</v-list-item-content>
					
						</v-list-item>
					
					</div>
				</div>
				
				  
			</component>

		</v-flex>
		
		<v-dialog v-model="showAddRule" fullscreen hide-overlay transition="dialog-bottom-transition">
			<add-rule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="true" class="ma-0"></add-rule>
		</v-dialog>
		
		<v-dialog v-model="addCollocation" width="800" persistent>
			<v-card>
				<v-card-title class="title grey lighten-2" primary-title>
					添加托管
				</v-card-title>
		
				<v-card-text>
						<v-form
						ref="form"
						v-model="valid"
						lazy-validation>
							<div class="d-flex flex-wrap">
								<v-select
									v-model="condition.rule"
									:rules="[v => !!v || '必填']"
									:items="datas"
									color="green"
									item-color="green"
									item-text="exc"
									item-value="exc"
									label="规则"
									style="max-width: 250px;"
									class="pr-2"
									single-line>
									<template v-slot:label>
										<span style="font-size: 14px;">选择规则</span>
									</template>

								 </v-select>
								 
								 <v-select
								 	v-model="condition.account"
								 	:rules="[v => !!v || '必填']"
								 	:items="datas"
									color="green"
									item-color="green"
								 	item-text="exc"
								 	item-value="exc"
								 	label="账户"
									style="max-width: 250px;"
									class="pr-2"
								 	single-line>
								 	<template v-slot:label>
								 		<span style="font-size: 14px;">选择账户</span>
								 	</template>
								  
								  </v-select>

								  <v-select
								  	v-model="condition.type"
								  	:rules="[v => !!v || '必填']"
								  	:items="currency"
								  	item-text="value"
								  	item-value="id"
								  	label="法币"
									color="green"
									item-color="green"
									style="max-width: 250px;"
									class="pr-2"
								  	single-line>
								  	<template v-slot:label>
								  		<span style="font-size: 14px;">法币类型</span>
								  	</template>
								   
								   </v-select>
									
							</div>
						</v-form>
						<v-card outlined>
						    <v-card-title style="max-width:250px">
								  <v-text-field
									 v-model="search"
									 :append-icon="search==''?'':'mdi-close'"
									 label="搜索"
									 color="green"
									 @click:append="cancelSearch"
									 @input="debounce"
									 single-line
									 hide-details
								  ></v-text-field>
						    </v-card-title>
						    <v-card-text style="height: 250px;overflow-y: auto;">
								<v-chip
								  class="ma-2"
								  v-if="ruleData.length==0"
								>
								  无结果
								</v-chip>
								<v-chip
								  class="ma-2"
								  :color="neighborhoods.indexOf(item.id)>-1?'green':'grey'"
								  text-color="white"
								  v-for="(item,index) in ruleData" :key="index"
								  @click="addSelect(item.id)"
								>
								  <v-avatar left v-if="neighborhoods.indexOf(item.id)>-1">
									<v-icon>mdi-checkbox-marked-circle</v-icon>
								  </v-avatar>
								  {{item.name}}
								</v-chip>
								 
							</v-card-text>
							<v-card-text class="d-flex align-baseline justify-end ">
								<span class="font-weight-regular pr-2">已选 {{neighborhoods.length}} 个</span>
								<v-btn color="green" text v-if="neighborhoods.length>0" @click="addTo">添加至托管</v-btn>
							</v-card-text>
						  </v-card>
					 
				</v-card-text>
		
				<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn color="primary" text @click="closeAddColl">
						关闭
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<setting-dialog v-if="showSetDialog" :settingModal="showSetDialog" @closeSetting="closeSetting"></setting-dialog>
		
	</v-container>
</template>

<script>
	import settingDialog from '@/components/settingDialog.vue'
	import addRule from '@/components/addRule.vue'
	import upSvg from '@/img/up.svg'
	export default {
		inject: ['theme'],
		
		compoments: {
			addRule,
			settingDialog
		},
		data() {
			return {
				tips:'暂无数据',
				
				showSetDialog:false,//显示设置对话框
				
				transition: 'scale-transition',
				
				loading:true,//控制骨架屏 true表示显示
				
				currency: [//货币类型
				  { id: 1, value: 'USDT' },
				  { id: 2, value: 'ETH' },
				  { id: 3, value: 'BTC' },
				],
				
				names2:[
					{
						id:1,
						name:'Sno'
					},
					{
						id:2,
						name:'Hon'
					},
					{
						id:3,
						name:'Don'
					},
					{
						id:4,
						name:'Elaine Street'
					},
					{
						id:5,
						name:'Court Street'
					},
					{	
						id:6,
						name:'oub'
					},
					{
						id:7,
						name:'VA'
					},
					{
						id:8,
						name:'AJKJK V'
					}
					
				],
				
				neighborhoods:[1,4],//已选择的
				
				search:'',
				
				valid:true,//表格验证
				
				datas:{},
				
				condition:{//搜索条件
					type:'',
					account:'',
					rule:''
				},
				
				addCollocation:false,//添加托管对话框
				
				currentRule: null,//当前规则

				showAddRule: false,//修改规则对话框

				upIcon: upSvg,

				target: '#vRow',
				options: {
					duration: 1000,
					offset: 0,
					easing: 'easeInOutCubic'
				},
				
				ruleData:[],
				
				items: []
			}
		},

		methods: {
			closeSetting(){
				
				this.showSetDialog = false;
				
			},
			
			showSetting(){//打开设置
				this.showSetDialog = true;
			},
			
			addSelect(id){//选中一个交易对
				let index = this.neighborhoods.indexOf(id);
				if(index>-1){
					this.neighborhoods.splice(index,1);
				}else{
					this.neighborhoods.push(id);
				}
			},
			
			closeAddColl(){//添加托管对话框-关闭
				this.addCollocation = false;
				this.neighborhoods = [];
				this.$refs.form.resetValidation();
			},

			debounce(){//节流
				var t;
				clearTimeout(this.t);
				
				this.t = setTimeout(() => {
					let that = this;
					if (!that.isEmpty(this.search)) {

						let obj = this.fuzzyQuery(this.search);

						this.ruleData = obj;
					}else{

						this.ruleData = this.names2;
					}
				}, 3000);
			},
			
			fuzzyQuery(keyWord) {//模糊查询
			    var reg =  new RegExp(keyWord);
			    var arr = [];
				this.names2.forEach(item =>{
					if (reg.test(item.name)) {
						arr.push(item);
					}
				})
			    return arr;
			},
			  
			  
			isEmpty(obj) {//判断字符是否为空的方法
				if (typeof obj == 'undefined' || obj == null || obj == '' || (obj.length > 0 && obj.trim().length == 0)) {
					return true;
				} else {
					return false;
				}
			},
			
			cancelSearch(){//取消搜索
				this.search = '';
				this.ruleData = this.names2;
			},
			
			transUpperCase(data) { //交易对转大写
				return data.toUpperCase();
			},
			
			showChip(item) { //显示操作面板
				this.$set(item,'show',!item.show); //取反
				this.currentRule = item;
			},

			onOperation(item){ //改变托管的状态-启动/暂停
				let send = {
					data:[{id:item.id}],
					code:item.isRun==0?1004:1005
				};
				
				this.websocketsend(JSON.stringify(send));
			},

			onPosition(item){ //平仓/建仓-单个
				let send = {
					data:[{id:item.id}],
					code:item.isHas==0?1011:1012
				};
				
				this.websocketsend(JSON.stringify(send));
			},

			onRemove(item){//删除单个托管
				let send = {
					data:[{id:item.id}],
					code:1010
				};
				
				this.websocketsend(JSON.stringify(send));
			},

			onEdit(item) { //编辑规则
				//用某id得到对应的规则 传递给组件
				this.showAddRule = true;
			},

			hideRule() { //隐藏规则输入框
				this.showAddRule = false;
			},
			
			allEnd(){//全部停止
				this.$Modal.confirm({
					title: '交易托管',
					content: '<p>是否全部停止?</p>',
					onOk: () => {
						let json = JSON.stringify({code:1003});
						this.websocketsend(json);
					}
				});
			},
			
			allStart(){//全部启动
				this.$Modal.confirm({
					title: '交易托管',
					content: '<p>是否全部启动?</p>',
					onOk: () => {
						let code = JSON.stringify({code:1002});
						this.websocketsend(code);
					}
				});
			},
			
			addTo(){//添加至托管
				if (this.$refs.form.validate()) {
					
				}else{
					
				}
			},
			

		},
		destroyed() {
			clearTimeout(this.t);
		},
		mounted() {
			this.ruleData = this.names2;
			
			this.$sock.initWebSocket();

			if(sessionStorage.apiPublic){
				this.datas = JSON.parse(sessionStorage.apiPublic);
			}else{
				$ax.getTestData('/EasWebUser/getAPIData',{},(res)=> {
					if(res.code == 1){				
						sessionStorage.apiPublic = JSON.stringify(res.data);
						this.datas = JSON.parse(sessionStorage.apiPublic);
					}
				});
			}
			//请求数据
			
			this.loading = false;
			
			
		},
		beforeRouteLeave(to,from,next){//路由离开前断开
			this.$sock.close();
			next();
		}
	}
</script>

<style scoped="scoped">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity .5s
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}
	
	
	::-webkit-scrollbar{
		width: 10px;
	}
	::-webkit-scrollbar-track{
		background: #E8F5E9;
	}
	::-webkit-scrollbar-thumb{
		background: linear-gradient(#B3E5FC,#81C784);
		border-radius: 10px;
	}
</style>
