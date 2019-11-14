
<template>
	<div>
		    <v-toolbar  dark class="elevation-0">
		      <v-toolbar-title class="d-flex align-center">
				    <v-img
				      :src="logo"
				      height="34"
				  		 width="34"
				      style="background: none;margin-right: 15px;"
				    />
				      <span>量化大师</span>
			  </v-toolbar-title>
			  
		      <v-spacer></v-spacer>
		
		      <v-toolbar-items v-if="$vuetify.breakpoint.mdAndUp" v-for="item in links" :to="item.to">
		        <v-btn text v-ripple="{ class: 'green--text' }" :class="[$route.path==item.to?'defaultGreen':'']"
				 @click="toRouter(item.to)">{{item.text}}</v-btn>
		      </v-toolbar-items>
				<v-menu transition="scroll-y-transition" v-if="!$vuetify.breakpoint.mdAndUp">
					<template v-slot:activator="{ on }">
						<v-btn icon text v-on="on">
							<v-icon>mdi-format-list-bulleted-square</v-icon>
						</v-btn>
					  <!-- <v-app-bar-nav-icon  v-on="on"></v-app-bar-nav-icon> -->
					</template>
					<v-list>
					  <v-list-item  v-ripple="{ class: 'green--text' }"
						v-for="n in links" link @click="toRouter(n.to)">
						<v-list-item-title>{{n.text}}</v-list-item-title>
					  </v-list-item>
					</v-list>
				</v-menu>
				<v-menu
				      offset-y
				    >
				      <template v-slot:activator="{ on }">
						<v-btn icon text v-on="on">
							<v-icon>mdi-account</v-icon>
						</v-btn>
				      </template>
				
				      <v-card outlined style="border: none;"  tile>
				      	<v-list-item dense>
							<v-list-item-avatar tile size="24">
								<v-img :src="logo"/>
							</v-list-item-avatar>
						
							<v-list-item-content>
								<v-list-item-title class="subtitle-1">{{userData.name}}</v-list-item-title>
							</v-list-item-content>
				      	
				      	</v-list-item>
						 <v-divider></v-divider>
						 
						 <v-list-item dense>
							 <v-list-item-avatar tile size="24">
							 	<v-icon>mdi-email</v-icon>
							 </v-list-item-avatar>
					 
							 <v-list-item-content>
							   <v-list-item-title>{{userData.email}}</v-list-item-title>
							 </v-list-item-content>

						</v-list-item>
						
						
						<v-list-item dense>
							 <v-list-item-avatar tile size="24">
							 	<v-icon>mdi-av-timer</v-icon>
							 </v-list-item-avatar>
											 
							 <v-list-item-content>
							   <v-list-item-title>{{changeTime(userData.endTime)}} 到期</v-list-item-title>
							 </v-list-item-content>
						
						</v-list-item>
						<v-divider></v-divider>
						<v-list-item dense>
							 <v-list-item-content>
								 <div  class="ma-0 d-flex align-center justify-space-between">
									<v-btn small text color="error" @click="renew">续期</v-btn>
									<v-btn small text color="primary" @click="exit">退出</v-btn>
								 </div>
	
							 </v-list-item-content>
						
						</v-list-item>
						
				      </v-card>
					  
				    </v-menu>
		    </v-toolbar>
			<v-dialog v-model="dialog" width="500" persistent>
				<v-card>
					<v-card-title class="headline grey lighten-2" primary-title>
						激活账号
					</v-card-title>
						
					<v-card-text>
						<v-form ref="codeForm" v-model="codeValid" lazy-validation>
							<v-text-field v-model="code" label="激活码" :rules="[rules.not,rules.required,rules.isEmpty]"></v-text-field>
						</v-form>
						
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
	</div>
</template>

<script>
import { scrollMixins } from '@/mixins/scroll.js'
import img from '@/img/logo.png'
import {
		mapActions
	} from 'vuex';

    export default {
		mixins:[scrollMixins],
        data: () => ({
			rules: {
				required: v => !!v || '必填',
				length: v =>  (v&&v.length <= 68) || '超出长度',
				size: v => v > 0 || '必须大于0',
				isEmpty: v => /\S/.test(v) || '不可为空',
				not: v => !/[\u4E00-\u9FA5]/g.test(v) || '不能是中文'
			},
			
			codeValid:true,//激活码校验
			
			code:'',//鸡和马
			
			dialog:false,

			userData: sessionStorage.userData ? JSON.parse(sessionStorage.userData) : {},
			
			logo: img,

			links: [
			  {
			    to: '/dashboard',
			    icon: 0,
			    text: '首页'
			  },
			  {
			    to: '/list',
			    icon: 1,
			    text: '详细数据'
			  },
			  {
			    to: '/rule',
			    icon: 2,
			    text: '规则策略'
			  },
			  {
				to: '/dem',
				icon: 3,
				text:'托管数据'
			  }
			],

            title: null,
            responsive: false,
            responsiveInput: false
        }),

        watch: {
            '$route'(val) {
                this.title = val.name
            },
			dialog:{
				handler(nV,oV){
					nV&&this.afterOpen();//mixins不允许滚动
					!nV&&this.beforeClose();
				},
				immediate:true
			}
			
        },

        mounted() {
            this.onResponsiveInverted()
            window.addEventListener('resize', this.onResponsiveInverted)
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.onResponsiveInverted)
        },

        methods: {
			...mapActions(['changeLay']),
			renew() {//显示续费对话框
				this.dialog = true;
			},
			
			cancelDialog() {
				this.code = '';
				this.dialog = false;
			},
			
			postCode() {//提交激活码
				if (this.$refs.codeForm.validate()) {
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
									type: 'success',
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
				}
			},
			
			changeTime(time) {
				return this.$utils.timestampToTime(Number(time));
			},
			
			toRouter(name){//路由
				if(this.$route.path!==name){
					this.$router.push({ path:name});
				}
				
			},
			
            onClickBtn() {
                this.$store.state.showBar = !this.$store.state.showBar;
				console.log(this.$store.state.showBar)
            },

            onResponsiveInverted() {
                if (window.innerWidth < 991) {
                    this.responsive = true
                    this.responsiveInput = false
                } else {
                    this.responsive = false
                    this.responsiveInput = true
                }
            },
			
			exit() {
				this.$xyDialog({
					title:'退出登录',
				    content: '确定退出吗?',
				    onOk: () => {
						sessionStorage.clear();
						this.$store.state.showBar = false;
						this.$router.replace({
							path: '/login'
						});
					},
				});

			},
			
        }
    }
</script>

<style>
    #core-toolbar a {
        text-decoration: none;
    }
</style>
