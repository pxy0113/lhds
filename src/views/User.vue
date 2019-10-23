<template>
	<v-container  fluid grid-list-xl>
		<v-layout justify-center wrap  >
			<v-flex xs12 md11 lg11 sm11 cols="12" class="py-0">

				<v-card class="mx-auto" style="border: 1px solid #BDBDBD;" outlined id="vRow">
					<v-card outlined :img="bannerImg" style="border: none;">
						<v-list-item three-line>
								<v-list-item-avatar tile :size="100" class="white  d-none d-sm-flex" >
									<v-img :src="bg" />
								</v-list-item-avatar>
							
								<v-list-item-content>
									<v-list-item-title class="display-1 mb-4 white--text">{{userData.name}}</v-list-item-title>
									<v-list-item-subtitle class="d-flex align-center">
										<v-icon size='14' color="white">mdi-email</v-icon>
										<span class="white--text pl-2">{{userData.email}}</span>
									</v-list-item-subtitle>
									<v-list-item-subtitle class="d-flex flex-wrap">
										<span class="py-2 white--text">
										<v-icon size='16' color="white" class="pr-1">
											mdi-av-timer
										</v-icon>
										{{changeTime(userData.endTime)}} 到期
										</span>
										<span class="red--text py-2 pl-2" style="cursor:pointer" @click="renew">续期</span>
									</v-list-item-subtitle>
									
								</v-list-item-content>
						
						</v-list-item>
						<v-btn fab color="error" class="font-weight-light" 
						style="position: absolute;right: 8px;top: 2px;"
						@click="exit" x-small>
							<v-icon size="20">mdi-power</v-icon>
						</v-btn>
					</v-card>
					<p class="px-2 mb-0" style="border:1px solid #ccc"><v-btn color="green"  outlined @click="addDialog= true" small>添加API</v-btn></p>
					<!-- <v-card outlined> -->
						
						
						<component :is="transition !== 'None' ? `v-${transition}` : 'div'"  hide-on-leave>
							<v-skeleton-loader
							v-if="loading"
							type="article"
							>
							</v-skeleton-loader>
							
							<div v-else>
								<v-list-item three-line class="xy-tableItem" v-if="apiList.length<1">
									<p class="text-center" style="width: 100%;">暂无数据</p>
								</v-list-item>
								
								<div v-for="(item,index) in apiList" :key="index" v-else>
									<v-list-item three-line style="border-bottom: 1px solid #ccc;">
									  <v-list-item-content class="align-self-start">
										<v-list-item-title
										  class=" mb-2">
								
											<div class="d-flex align-center justify-space-between">
												<span class=" font-weight-bold">{{transUpperCase(item.exchange)}}
												<span style="font-size: 12px;" class="font-weight-light">/交易所</span> </span>
												<v-btn color="primary" text small  @click="delApi(item)">删除</v-btn>
											</div>
										</v-list-item-title>
								
										<div class='font-weight-regular body-2'>
											<div class="d-flex justify-space-between flex-wrap align-center ">
								
												<div class="pr-3 py-1 d-flex flex-wrap align-center justify-space-between">
													<span>名称：</span>
													<span>{{item.remark}}</span>
												</div>
												
												<div class="pr-3 py-1 d-flex flex-wrap align-center justify-space-between">
													<span>买入费率(%)：</span>
													<span>{{item.buy}}</span>
												</div>
												
												<div class="pr-3 py-1 d-flex flex-wrap align-center justify-space-between">
													<span>卖出费率(%)：</span>
													<span>{{item.sell}}</span>
												</div>
												
											</div>
											<div class="d-flex justify-space-between flex-wrap align-center">
												<div class="pr-3 py-1 d-flex flex-wrap align-center justify-space-between">
													<span>API_KEY：</span>
													<span>{{item.key}}</span>
												</div>
												<div class="pr-3 py-1 d-flex flex-wrap align-center justify-space-between">
													<span>API_SECRET：</span>
													<span>{{item.secret}}</span>
												</div>
											</div>
								
											
										</div>
									  </v-list-item-content>
									 
									</v-list-item>
								</div>
								<div class="text-center my-2">
									<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="5"></v-pagination>
								</div>
								
								
							</div>
						
						</component>
						
					</v-card>
					
					<Avatar :src="upIcon" 
					v-if="apiList.length>=5"
					class="xy-suspend"
					@click.stop.native="$vuetify.goTo(target, options)"
					>
					</Avatar>
		
			</v-flex>
		</v-layout>
		
		<v-dialog v-model="addDialog" width="500" persistent>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					添加账户
				</v-card-title>
		
				<v-card-text>
						<v-form    
						ref="form"
						v-model="valid"
						lazy-validation>
							<v-select
								v-model="place"
								:rules="[v => !!v || '必填']"
								:items="items"
								item-text="exc"
								item-value="exc"
								color="green"
								item-color="green"
								label="交易所"
								single-line>
								<template v-slot:label>
									<span style="font-size: 14px;">交易所</span>
								</template>
							 
							 </v-select>
							 
							<v-text-field
							   v-model="news.A1"
							   label="账户备注名称"
							   :rules="[rules.required,rules.isEmpty]"
							   required
							   color="green"
							 ></v-text-field>
							 
							<v-text-field
							v-model="news.A2"
							:rules="[rules.required,rules.isEmpty,rules.not]"
							required
							color="green"
							label="API_KEY"
							></v-text-field>
							  
							<v-text-field
							 v-model="news.A3"
							 :rules="[rules.required,rules.isEmpty,rules.not,rules.length]"
							 required
							 color="green"
							 label="API_SECRET"
							></v-text-field>
								
							<v-row>
								<v-col cols="6">
									<v-text-field
									   v-model="news.A4"
									   label="买入费率(%)"
									   min="0"
									   step="0.1"
									   :rules="[v => (!!v&&v>=0) || '必填且不是负数']"
									   required
									   color="green"
									   type="number"
									 ></v-text-field>
								</v-col>
								<v-col cols="6">
									<v-text-field
									   v-model="news.A5"
									   label="卖出费率(%)"
									   min="0"
									   step="0.1"
									   color="green"
									   :rules="[v => (!!v&&v>=0) || '必填且不是负数']"
									   required
									   type="number"
									 ></v-text-field>
								</v-col>
							</v-row>
							
							<v-text-field
								v-if="place=='OKEx'"
							   v-model="newsPassword"
							   :rules="[rules.required,rules.isEmpty,rules.not]"
							   required
							   color="green"
							   label="PASSPHPASE"
							   type="password"
							 ></v-text-field>
						</v-form>
					 
				</v-card-text>
		
				<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn color="green" text @click="closeAccount">
						关闭
					</v-btn>
					<v-btn color="green" text @click="addOneAccount">
						确定
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		
		<v-dialog v-model="dialog" width="500" persistent>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					激活账号
				</v-card-title>

				<v-card-text>
					<v-text-field v-model="code" label="激活码"></v-text-field>
				</v-card-text>

				<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn color="primary" text @click="cancelDialog">
						关闭
					</v-btn>
					<v-btn color="primary" text @click="postCode">
						确定
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</v-container>
</template>

<script>
	import Utils from '@/plugins/cryAes.js'
	import {
		mapActions
	} from 'vuex';
	import upSvg from '@/img/up.svg'
	import logo from '@/img/logo.png'
	import banner from '@/img/user.jpg'
	export default {
		data: () => ({
			transition: 'scale-transition',
			
			loading:true,//控制骨架屏 true表示显示
			
			upIcon:upSvg,
			
			target: '#vRow',
			
			options: {
				duration: 1000,
				offset: 0,
				easing: 'easeInOutCubic'
			},
			
			detailStep : 1,
			
			curPage: {
				page: 1,
				size: 0
			},
			
			valid:true,

			news:{
				A1:'',
				A2:'',
				A3:'',
				A4:0.1,
				A5:0
			},
			
			newsPassword:'',//交易所为OKex时特定字段
			
			place:'',//当前选中的交易所
			
			items:[],//交易所对应的买入/卖出费率数据
			
			addDialog:false,
			apiColumns:[
				  {
					text: '名称',
					align: 'center',
					sortable: false,
					value: 'exchange',
				  },
				  {
					text: '备注',
					align: 'center',
					sortable: false,
					value: 'remark',
				  },
				  {
					text: 'API KEY',
					align: 'center',
					sortable: false,
					value: 'key',
				  },
				  {
					text: 'API SECRET',
					align: 'center',
					sortable: false,
					value: 'secret',
				  },
				  {
					text: '买入费率(%)',
					align: 'center',
					sortable: false,
					value: 'buy',
				  },
				  {
					text: '卖出费率(%)',
					align: 'center',
					sortable: false,
					value: 'sell',
				  },
				  {
					text: '操作',
					align:'center',
					sortable: false,
					value: 'del'
				  }
			],
			apiList:[],
			
		   nameRules: [
				v => !!v || '必填',
				v => (v && v.length <= 68) || '超出长度',
			],
			
			rules: {
				required: v => !!v || '必填',
				length: v =>  (v&&v.length <= 68) || '超出长度',
				isEmpty: v => /\S/.test(v) || '不可为空',
				not: v => !/[\u4E00-\u9FA5]/g.test(v) || '不能是中文'
			},
			
			bannerImg:banner,
			dialog: false,
			code: '', //鸡和马
			userData: sessionStorage.userData ? JSON.parse(sessionStorage.userData) : {},
			bg: logo
		}),
		watch:{
			
			place:{
				handler(newV,oldV){
					this.items.forEach(item =>{
						if(item.exc == newV){
							this.news.A4 = item.buy;
							this.news.A5 = item.sell;
						}
					});
				},
				immediate:true
			},
			
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
		mounted() {
			if(sessionStorage.apiPublic){
				this.items = JSON.parse(sessionStorage.apiPublic);
				this.place = this.items.length>0?this.items[0].exc:'';
			}else{
				$ax.getTestData('/EasWebUser/getAPIData',{},(res)=> {
					if(res.code == 1){				
						sessionStorage.apiPublic = JSON.stringify(res.data);
						this.items = res.data;
						this.place = this.items.length>0?this.items[0].exc:'';
					}
				});
			}
			this.getApiList();
		},
		
		beforeRouteLeave(to,from,next){//路由离开前断开

			this.$sock.close();
			
			next();//跳转路由
			
		},
		
		methods: {
			
			...mapActions(['changeLay', 'changeSnack']),
			
			transUpperCase(data){ //交易对转大写
				return data.toUpperCase();
			},
			
			inputShow(number) { //点击野马
				this.curPage.page = number;
				this.detailStep = 1;
				this.$vuetify.goTo(this.target, this.options);//平滑滚动到表头
				this.getApiList();
			},

			changeTime(time) {
				return this.$utils.timestampToTime(Number(time));
			},

			renew() {
				this.dialog = true;
			},

			cancelDialog() {
				this.code = '';
				this.dialog = false;
			},

			getMessage(){//wss传递的消息
				let result = this.wssData;
				switch (result.code){
					case 20013://客户端在线
					this.sendMsgToClient();
						break;	
						
					default:
						break;
				}
					
			},

			delApi(item){
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
						
						$ax.getAjaxData('/EasWebUser/delAPI', {
							id: item.id
						}, (res) => {
							this.changeLay(false);
							if (res.code == 1) {
								let msg = {
									state: true,
									errorText: {
										type: 'green',
										text: '删除成功'
									}
								}
								this.changeSnack(msg);
								
								let state = this.$sock.lookState();
								
								state==-1?this.$sock.initWebSocket():this.sendMsgToClient();
								
								let index = this.apiList.indexOf(item);

								sessionStorage.removeItem('collocation');//删除api/rule的时候把存储的旧数据清空
								
								this.apiList.splice(index, 1);
							}
						
						}, {
							hasToken: true
						});
					}
				});
				
			},

			closeAccount(){
				this.$refs.form.resetValidation();
				this.addDialog = false;
				this.news = this.$options.data().news;
				this.newsPassword = '';
				this.place = this.items.length>0?this.items[0].exc:'';
			},
			
			addOneAccount(){//添加新账户
				if (this.$refs.form.validate()) {
				    let other = {
				    	A0:this.place,
				    	A6:this.newsPassword,
				    	A7:0,
				    	A8:0,
				    	A9:0,
				    	A10:0
				    };
					
				    let obj = {
				    	exc:this.place,
				    	remark:this.news.A1,
				    	data:Utils.encrypt(JSON.stringify(Object.assign({},this.news,other)))
				    }
					
					this.changeLay(true);//loading
				    $ax.getAjaxData('/EasWebUser/addAPI', obj, (res) => {			
				    	this.changeLay(false);
				    	if (res.code == 1) {
				    		let msg = {
				    			state:true,
				    			errorText:{
				    				type:'green',
				    				text:'添加成功'
				    			}
				    		}
				    		this.changeSnack(msg);
							
							let state = this.$sock.lookState();
							
							state==-1?this.$sock.initWebSocket():this.sendMsgToClient();
							
				    		this.addDialog = false;
							
							this.$refs.form.resetValidation();
							
							this.news = this.$options.data().news;
							
							sessionStorage.removeItem('collocation');
							
							this.getApiList();
				    	}
				    
				    }, {
				    	hasToken: true
				    });
				}
				
			},

			sendMsgToClient(){
				
				this.$sock.websocketsend(JSON.stringify({code:1006}));
				
			},

			getApiList(){//获取api列表
				this.loading = true;
				$ax.getAjaxData('/EasWebUser/getAPI', {
					pageSize:10,
					pageIndex:this.curPage.page
				}, (res) => {
					this.loading = false;
					if (res.code == 1) {
						this.apiList = res.data;
						this.curPage = {
							page: res.pageIndex,
							size: res.pageMaxPage
						};
						this.detailStep = 1;
					} else {
				
						console.log('错误错误')
					}
				}, {
					hasToken: true
				});

			},

			postCode() {
				if (this.code !== '') {
					this.changeLay(true);
					$ax.getAjaxData('/EasWebUser/recharge', {
						code: this.code
					}, (res) => {

						this.changeLay(false);
						if (res.code == 1) {
							let data = JSON.parse(sessionStorage.userData);
							data.endTime = res.endTime;
							sessionStorage.userData = JSON.stringify(data);
							this.userData = data;

							let msg = {
								state: true,
								errorText: {
									type: 'green',
									text: '续期成功！'
								}
							}
							this.changeSnack(msg);
							this.dialog = false;
							this.news = {
								A1:'',
								A2:'',
								A3:'',
								A4:0.1,
								A5:0
							},
							//
							this.code = '';
						}


					}, {
						hasToken: true
					});
				} else {
					let msg = {
						state: true,
						errorText: {
							type: 'error',
							text: '激活码不可为空'
						}
					}
					this.changeSnack(msg);
				}
			},

			exit() {
				this.$Modal.confirm({
                    render: (h) => {
                    	return h('div', [
                    		h('p',{
                    			style:{
                    				fontWeight:'700'
                    			}
                    		},'确定退出吗 ?'),
                    	])
                    },
                    onOk: () => {
						sessionStorage.clear();
						this.$store.state.showBar = false;
						this.$router.push({
							path: '/login'
						});
                    }
                });

			}
		}
	}
</script>
<style scoped="scoped">
	.d{
		font-size: 14px!important;
	}
</style>
