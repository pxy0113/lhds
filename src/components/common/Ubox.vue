<template>
	<!-- <v-container  fluid grid-list-xl> -->
		<div>
				<v-card outlined id="vRow">
					
					<p class="pa-2 ma-0 green lighten-5 d-flex justify-space-between align-center" >
						<span class="green--text">API列表</span>
						<v-btn color="green" small
						outlined @click="addDialog= true">添加API</v-btn>
					</p>
					<v-divider></v-divider>
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
												<span class=" font-weight-bold">{{transUpperCase(item.remark)}}
												<span style="font-size: 12px;" class="font-weight-light">/{{item.exchange}}</span> </span>
												<!-- <v-btn color="success" text small  @click="delApi(item)">删除</v-btn> -->
												<v-icon color="error" @click="delApi(item)">mdi-delete</v-icon>
											</div>
										</v-list-item-title>
								
										<div class='font-weight-regular body-2'>
											<div class="d-flex justify-space-between flex-wrap align-center ">
												
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
												   max="100"
												   step="0.1"
												   :rules="[v => (!!v&&v>=0&&v<=100) || '必填,不是负数且不能大于100']"
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
												   max="100"
												   color="green"
												   :rules="[v => (!!v&&v>=0&&v<=100) || '必填,不是负数且不能大于100']"
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
					
					
			
		</div>
</template>

<script>
	import Utils from '@/plugins/cryAes.js'
	import {
		mapActions
	} from 'vuex';
	import upSvg from '@/img/up.svg'
	import { scrollMixins } from '@/mixins/scroll.js'
	export default {
		mixins:[scrollMixins],
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

			rules: {
				required: v => !!v || '必填',
				length: v =>  (v&&v.length <= 68) || '超出长度',
				size: v => v > 0 || '必须大于0',
				isEmpty: v => /\S/.test(v) || '不可为空',
				not: v => !/[\u4E00-\u9FA5]/g.test(v) || '不能是中文'
			},
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
			},
			addDialog:{
				handler(nV,oV){
					nV&&this.afterOpen();//mixins不允许滚动
					!nV&&this.beforeClose();
				},
				immediate:true
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
				this.$vuetify.goTo(this.target, this.options);//平滑滚动到表头
				this.getApiList();
			},

			changeTime(time) {
				return this.$utils.timestampToTime(Number(time));
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
				this.$xyDialog({
					title:'删除API',
				    content: '确定删除吗? 该操作不可撤销',
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
				        				type: 'success',
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
				    				type:'success',
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

					} else {
				
						console.log('错误错误')
					}
				}, {
					hasToken: true
				});

			},

		}
	}
</script>
<style scoped="scoped">
	.d{
		font-size: 14px!important;
	}
</style>
