<template>
	<div id="vRow">
		<!-- <v-card outlined  id="vRow"> -->
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<Badge color="green" :class-name="'title'" text="托管列表"></Badge>
				<span style="width: 120px;">
					<v-menu transition="scroll-y-transition">
						<template v-slot:activator="{ on }">
							<v-btn tile outlined small color="success" class="ma-0" v-on="on">
								设置/操作
								<v-icon right>mdi-menu-down</v-icon>
							</v-btn>
						</template>
						<v-list>
						  <v-list-item  v-ripple="{ class: 'green--text' }"
							v-for="n in actionList" link @click="toFunction(n.id)">
							<v-list-item-title>{{n.text}}</v-list-item-title>
						  </v-list-item>
						</v-list>
					</v-menu>
				</span>
		
			</div>
			
			 <v-divider></v-divider>
		
			<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
				<v-skeleton-loader
				v-if="loading"
				type="article"
				>
				</v-skeleton-loader>
				
				<div v-else>
					<v-list-item three-line class="xy-borderB" v-if="items.length<1">
						<p class="text-center" style="width: 100%;">{{tips}}</p>
					</v-list-item>
					
					<div v-for="(item,index) in items" :key="index" v-else >
						<v-list-item three-line class="xy-borderB">
							<v-list-item-content class="align-self-start">
								<v-list-item-title class=" mb-2">
									<div class="d-flex align-center">

										<span class=" font-weight-bold">{{item.symbol}} </span>
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
										：{{item.range=='-'?'-':item.range}}
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
										：{{item.profit=='-'?'-':item.profit}}
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
					<v-fab-transition>
						<Avatar :src="upIcon" v-if="items.length>=5" class="xy-suspend" @click.stop.native="$vuetify.goTo(target, options)">
						</Avatar>
					
					</v-fab-transition>
				</div>
				
				  
			</component>
		
			
			
		<!-- </v-card> -->
		
		<v-dialog v-model="showAddRule" fullscreen hide-overlay transition="dialog-bottom-transition">
			<coll-edit v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="true" class="ma-0"></coll-edit>
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
									:items="rulesList"
									color="green"
									item-color="green"
									item-text="name"
									item-value="id"
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
								 	:items="accountList"
									color="green"
									item-color="green"
								 	item-text="remark"
								 	item-value="id"
								 	label="账户"
									style="max-width: 250px;"
									class="pr-2"
								 	single-line>
								 	<template v-slot:label>
								 		<span style="font-size: 14px;">选择账户</span>
								 	</template>
								  
								  </v-select>

								  <v-select
								  	v-model="condition.currency"
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
						<v-card outlined v-if="show">
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
								  :color="neighborhoods.indexOf(index)>-1?'green':'grey'"
								  text-color="white"
								  v-for="(item,index) in ruleData" :key="index"
								  @click="addSelect(item,index)"
								>
								  <v-avatar left v-if="neighborhoods.indexOf(index)>-1">
									<v-icon>mdi-checkbox-marked-circle</v-icon>
								  </v-avatar>
								  {{item}}
								</v-chip>
								 
							</v-card-text>
							<v-card-text class="d-flex align-baseline justify-end ">
								<span class="font-weight-regular pr-2">已选 {{neighborhoods.length}} 个</span>
								<v-btn color="green" class="ma-0" text v-if="neighborhoods.length>0" @click="addTo">添加至托管</v-btn>
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
		
		<setting-dialog v-if="showSetDialog" :list="settingData" :settingModal="showSetDialog" @closeSetting="closeSetting"></setting-dialog>

	</div>
</template>

<script>
	import Utils from '@/plugins/cryAes.js'
	import settingDialog from '@/components/settingDialog.vue'
	import collEdit from '@/components/collEdit.vue'
	import upSvg from '@/img/up.svg'
	import {
		mapActions
	} from 'vuex';
	export default {
		inject: ['theme'],
		
		compoments: {
			collEdit,
			settingDialog
		},
		data() {
			return {
				actionList: [ //设置与操作列表
					{ id:1,text: '设置' },
					{ id:2,text: '添加托管' },
					{ id:3,text: '全部启动' },
					{ id:4,text: '全部停止' }
				],
				
				settingData:{},//传递给设置Dialog的数据
				
				usable:false,//可以设置/全启动/新增/全暂停
				
				show:false,//添加托管没满足搜索条件
				
				tips:'暂无数据',
				
				showSetDialog:false,//显示设置对话框
				
				transition: 'fade-transition',
				
				loading:true,//控制骨架屏 true表示显示
				
				accountList:[],//选择账户
				
				rulesList:[],//选择规则

				neighborhoods:[],//已选择的
				
				search:'',
				
				valid:true,//表格验证

				currency: [//货币类型
				  { id: 1, value: 'USDT' },
				  { id: 2, value: 'ETH' },
				  { id: 3, value: 'BTC' },
				],
				
				condition:{//新增托管-搜索条件
					currency:'',
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
				
				names2:[],
				
				ruleData:[],//货币数据
				
				items: [] ,//托管列表
				
				testArr:[]
			}
		},

		watch:{
			'condition.currency'(newV, oldV) {
				if((!this.isEmpty(newV))&&(!this.isEmpty(this.condition.account))){
					
					this.show = true;
					this.getExchange();
				
				}else{
					this.show = false;
					this.ruleData = [];
				}
			}, 
			
			'condition.account'(newV, oldV) {
				if((!this.isEmpty(newV))&&(!this.isEmpty(this.condition.currency))){
					
					this.show = true;
					this.getExchange();
				
				}else{
					this.show = false;
					this.ruleData = [];
				}
			}, 
				
			wssData:{
				handler(nV,oV){
					this.getMessage();
				},
				deep:true
			},
			ruleData(nV){
				this.neighborhoods = [];
				this.testArr.forEach(item =>{
					let idx = nV.indexOf(item);
					if(idx>-1){
						this.neighborhoods.push(idx);
					}
				});
			}
			
		},

		computed:{
			wssData(){//wss传递的消息
				return this.$store.state.collocationList;
			}
		},

		methods: {
			...mapActions(['changeLay']),
			
			toFunction(id){//点击操作列表的项
				(id==1)&&this.showSetting();
				(id==2)&&this.addColl();
				(id==3)&&this.allStart();
				(id==4)&&this.allEnd();
			},
			
			getExchange(){//获取货币数据
				this.testArr = [];
				
				this.neighborhoods = [];
				
				let json = {
					code:1015,
					data:{
						account:this.condition.account,
						currency:this.condition.currency
					}
				}
				
				this.$sock.websocketsend(JSON.stringify(json));
			},
			
			closeSetting(obj){ //设置对话框关闭
			
				if(obj.state){
					let json = {
						code:1014,
						data:obj.data
					}
					this.$sock.websocketsend(JSON.stringify(json));

				};
				this.showSetDialog = false;
				
			},
			
			showSetting(){//打开设置
			
				this.$sock.websocketsend(JSON.stringify({code:1013}));
			},
			
			addSelect(name,index){//选中一个交易对
				let idx = this.neighborhoods.indexOf(index);

				if(idx==-1){//不存在则添加
					this.testArr.push(name);
					
					this.testArr = Array.from(new Set(this.testArr));
					
					this.neighborhoods.push(index);
				}else{
					let i =this.testArr.indexOf(name);

					if(i>-1){
						this.testArr.splice(this.testArr.indexOf(name),1);
					}
					
					this.neighborhoods.splice(idx,1);

				}

			},
			
			addColl(){//打开添加托管对话框
				this.addCollocation = true;

				if(sessionStorage.collocation){
					let d = JSON.parse(sessionStorage.collocation);
					this.accountList = d.accounts;
					this.rulesList = d.rule;
					if((!this.isEmpty(this.condition.currency))&&(!this.isEmpty(this.condition.account))&&(!this.isEmpty(this.condition.rule))){
						this.getExchange();
					}
					
				}else{
					let promiseAll = [this.getApiId(),this.getRuleId()];
					
					this.changeLay(true);
					
					Promise.all(promiseAll).then(results => {
						this.changeLay(false);
						let i = 0;
						results.forEach(item =>{
							if(item.account){
								this.accountList = item.account;
								i++;
							}
							if(item.rule){
								this.rulesList = item.rule;
								i++;
							}
						});
						if(i==2){
							let sess = {
								accounts:this.accountList,
								rule:this.rulesList
							}
							sessionStorage.collocation = JSON.stringify(sess)
						}
					});

				}
			},
			
			getApiId(){//获取账户列表
				return new Promise(resolve =>{
					$ax.getAjaxData('/EasWebUser/getAPIID',{}, (res) =>{
						if(res.code == 1){
							resolve({account:res.data});
						}else{
							resolve();
						}
					},{hasToken:true});
				});
			},
			
			getRuleId(){//获取规则列表
				return new Promise(resolve =>{
					$ax.getAjaxData('/EasWebUser/getRuleID',{}, (res) =>{
						if(res.code == 1){
							resolve({rule:res.data});
						}else{
							resolve();
						}
					},{hasToken:true});
				});
			},
			
			closeAddColl(){//添加托管对话框-关闭
				this.addCollocation = false;
				this.testArr = [];
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
				}, 500);
			},
			
			fuzzyQuery(keyWord) {//模糊查询
			    var reg =  new RegExp(keyWord);
			    var arr = [];
				this.names2.forEach(item =>{
					if (reg.test(item)) {
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
				
				this.$sock.websocketsend(JSON.stringify(send));
			},

			onPosition(item){ //平仓/建仓-单个
				this.$Modal.confirm({
					render: (h) => {
						return h('div', [
							h('p',{
								style:{
									fontWeight:'700'
								}
							},item.isBuy==0?'确定建仓吗?':'确定平仓吗?'),
						])
					},
					onOk: () => {
						let send = {
							data:[{id:item.id}],
							code:item.isBuy==0?1011:1012
						};
						
						this.$sock.websocketsend(JSON.stringify(send));
					}
				});
			},
			
			getColRuleData(list){//托管规则数据
				let data = list[0].data;
				
				console.log(data);
				
				this.currentRule = JSON.parse(Utils.decrypt(data));
				
				this.currentRule.id = list[0].id;
				
				this.showAddRule = true;
				
			},
			
			onRemove(item){//删除单个托管			

				this.$Modal.confirm({
					render: (h) => {
						return h('div', [
							h('p',{
								style:{
									fontWeight:'700'
								}
							},item.isBuy==1?'交易对有持仓,确定要删除吗?':'确定删除吗?'),
						])
					},
					onOk: () => {
						let send = {
							data:[{id:item.id}],
							code:1010
						};	
						
						this.$sock.websocketsend(JSON.stringify(send));
					}
				});
			},

			onEdit(item) { //编辑规则 用某id得到对应的规则 传递给组件
				let json = JSON.stringify({code:1016,data:[{id:item.id}]});
				
				this.$sock.websocketsend(json);

			},

			hideRule() { //隐藏规则输入框
				this.showAddRule = false;
			},
			
			allEnd(){//全部停止
				if(this.items.length>0){
					this.$Modal.confirm({
						render: (h) => {
							return h('div', [
								h('p',{
									style:{
										fontWeight:'700'
									}
								},'是否全部停止?'),
							])
						},
						onOk: () => {
							let json = JSON.stringify({code:1003});
							this.$sock.websocketsend(json);
						}
					});
				}

			},
			
			allStart(){//全部启动
				if(this.items.length>0){
					this.$Modal.confirm({
						render: (h) => {
							return h('div', [
								h('p',{
									style:{
										fontWeight:'700'
									}
								},'是否全部启动?'),
							])
						},
						onOk: () => {
							let code = JSON.stringify({code:1002});
							this.$sock.websocketsend(code);
						}
					});
				}

			},
			
			addTo(){//添加至托管
				if (this.$refs.form.validate()) {
					let arr = [];
					this.neighborhoods.forEach(item =>{
						let list = Object.assign({},{symbol:this.names2[item]},this.condition);
						arr.push(list);
					});
					
					let code = JSON.stringify({code:1009,data:arr});
					
					this.$sock.websocketsend(code);
					
					this.closeAddColl();
				}
			},
			initData(item){//初次收到数据
				this.items = item;
				
				if(this.items.length ==0){
					this.tips = '暂无数据';
				}
			},
			
			delData(obj){//删除数据时
				obj.forEach(item =>{

					this.items.forEach((fil,index) =>{
						if(fil.id == item.id ){							
							this.items.splice(index,1);
						}
					});
				
				});
				
				if(this.items.length ==0){
					this.tips = '暂无数据';
				}
			},
			
			addData(obj){//数据新增时
				this.addCollocation = false;
			
				obj.forEach(item =>{
					this.items.splice(0,0,item);
				});
			},
			
			changeData(obj){//数据变化时
				obj.forEach(item =>{//变化的数组
					let demo = this.items.find(fil =>fil.id == item.id);
					
					if(this.items.indexOf(demo)>-1){
						let newData = Object.assign({},demo,item);
						this.$set(this.items,this.items.indexOf(demo),newData);
					}
				
				});
				
				if(this.items.length ==0){
					this.tips = '暂无数据';
				}
			},
			
			getMessage(){//wss传递的消息
				let result = this.wssData;
				switch (result.code){
					case 1000:
					this.initData(result.data);
						break;
						
					case 1001:
					this.changeData(result.data);
						break;
					
					case 1009:
					this.neighborhoods = [];//取消选中
				
					this.addData(result.data);
						break;
					
					case 1010:
					this.delData(result.data);
						break;
					
					case 1013://获取设置参数
					this.settingData = result.data;
					this.showSetDialog = true;
						break;
					
					case 1015://获取货币数据
					this.names2 = result.data;
					this.ruleData = this.names2;
						break;
						
					case 1016://获取托管规则数据
					this.getColRuleData(result.data);
						break;
						
					case 20012:
					this.items = [];
					this.usable = false;
					this.tips = '软件已离线';
					this.loading = false;
					this.showSetDialog = false;
						break;
						
					case 20013://客户端在线
					this.usable = true;
					this.loading = false;
					let json = JSON.stringify({code:1000});
					this.$sock.websocketsend(json);
						break;	
						
					default:
						break;
				}
					
			}
			

		},
		
		destroyed() {
			console.log('销毁')
			clearTimeout(this.t);
			this.$sock.close();
		},
		mounted() {
			
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

		},
		beforeRouteLeave(to,from,next){//路由离开前断开
			this.$sock.close();
			this.$store.state.collocationList = [];
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
