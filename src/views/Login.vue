<template>

	<!-- <v-container class="mx-auto xy-height"> -->
	<v-img :src='bg' lazy-src height="100vh" position="left bottom">

		<v-container class="mx-auto xy-height">
			<v-row align="start" justify="center" style="height: 100%;">
				<v-col :lg="3" :md="6" :sm="6" :xs="6">
					<v-card flat outlined style="background:#FFFFFF;border: 1px solid #FFFFFF;">
						<div class=" fill-height loginTitle py-5">
							<v-avatar>
								<img :src="logo">
							</v-avatar>
							<span style="font-size: 1.5rem;margin-left: 3px;">量化大师</span>

						</div>
						<v-card-text v-if="type==1">
							<v-form ref="loginForm" v-model="loginValid" lazy-validation>
								<v-text-field outlined v-model="name" :rules="nameRules" label="用户名" required dense prepend-inner-icon="mdi-account"
								 color="grey darken-3"></v-text-field>
								<v-text-field outlined v-model="password" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
								 prepend-inner-icon="mdi-key" dense label="密码" color="grey darken-3">
								</v-text-field>
								<template v-slot:append>
									<v-fade-transition leave-absolute>
										<img width="24" height="24" :src="show1?show_icon:hide_icon" alt="" style="cursor: pointer;" @click="show1 = !show1">
									</v-fade-transition>
								</template>
								</v-text-field>
								<div class="d-flex justify-end py-3">
									<div class="grey--text lighten-4 pointer" @click="type=2">我要注册</div>
								</div>

								<v-btn color="grey darken-3" @click.native.stop="login" dark block>
									登陆
								</v-btn>

							</v-form>
						</v-card-text>

						<!--注册-->
						<v-card-text v-if="type==2">
							<v-form ref="registForm" v-model="registerValid" lazy-validation>
								<v-text-field outlined dense v-model="name" :rules="nameRules" label="用户名" required prepend-inner-icon="mdi-account"
								 color="grey darken-3"></v-text-field>
								<v-text-field outlined dense v-model="password" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
								 prepend-inner-icon="mdi-key" color="grey darken-3" label="密码">
									</>
									<template v-slot:append>
										<v-fade-transition leave-absolute>
											<img width="24" height="24" :src="show1?show_icon:hide_icon" alt="" style="cursor: pointer;" @click="show1 = !show1">
										</v-fade-transition>
									</template>
								</v-text-field>
								<v-text-field prepend-inner-icon="mdi-email" outlined dense v-model="email" :rules="[rules.email]" label="邮箱"
								 color="grey darken-3"></v-text-field>
								<div class="d-flex justify-space-between py-3">
									<div class="grey--text lighten-2 pointer" @click="type=1">返回登陆</div>
								</div>
								<v-btn color="grey darken-3" @click="register" style="width: 100%;color: white;">
									注册
								</v-btn>
							</v-form>
						</v-card-text>

						<!-- <v-card-actions class="d-flex justify-center">
									</v-card-actions> -->
					</v-card>

					<v-dialog v-model="dialog" persistent width="500">
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
								<v-btn color="grey darken-3" text @click="toJH">
									确定
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-col>
			</v-row>
		</v-container>


	</v-img>

	<!-- </v-container> -->

</template>

<script>
	import {
		mapActions
	} from 'vuex';
	import img from '@/img/logo.png'
	import bgImg from '@/img/body.svg'
	import showIcon from '@/img/show.svg'
	import hideIcon from '@/img/hide.svg'
	export default {

		data() { //数据
			return {
				codeValid:true,//激活码校验
				errorText: {},
				snackbar: false,
				code: '',
				dialog: false, //对话框
				logo: img,
				show_icon: showIcon,
				hide_icon: hideIcon,
				bg: bgImg,
				type: 1, //1登陆2忘记3注册
				registerValid: true,
				loginValid: true,
				show1: false,
				name: '',
				password: '',
				email: '',
				nameRules: [
					v => !!v || '必填',
					v => (v && v.length >= 2) || '名称至少两个字',
				],
				rules: {
					required: value => !!value || '必填.',
					min: v => v.length >= 6 || '最少六个字符',
					email: value => {
						const pattern =
							/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						return pattern.test(value) || '请输入正确的邮箱.'
					},
					length: v =>  (v&&v.length <= 68) || '超出长度',
					// isEmpty: v => /\S/.test(v) || '不可为空',
					isEmpty:v => /^[^\s]*$/.test(v) ||'不能是空格',
					not: v => !/[\u4E00-\u9FA5]/g.test(v) || '不能是中文'
				},
			}
		},

		components: { //模板

		},

		methods: { //方法
			...mapActions(['changeLay', 'changeSnack']),

			login() { //登陆
				if (this.$refs.loginForm.validate()) {

					this.changeLay(true);

					let list = {
						account: this.name,
						password: this.password
					};

					$ax.getAjaxData('/EasWebUser/login', list, (res) => {

						this.changeLay(false);

						if (res.code == 1) {
							sessionStorage.token = res.token;
							if (res.accState == 0) { //已过期

								this.dialog = true;

							} else { //未过期
								let msg = {
									state: true,
									errorText: {
										type: 'success',
										text: '登陆成功'
									}
								}
								this.changeSnack(msg);

								let userData = {
									name: this.name,
									email: res.email,
									endTime: res.endTime
								}

								sessionStorage.showBar = true;
								this.$store.state.showBar = true;
								sessionStorage.userData = JSON.stringify(userData);

								this.$router.replace({
									path: '/dashboard'
								});

							}

						}
					});
				}
			},

			register() { //注册
				if (this.$refs.registForm.validate()) {
					let list = {
						account: this.name,
						password: this.password,
						email: this.email
					}
					this.changeLay(true);
					$ax.getAjaxData('/EasWebUser/register', list, (res) => {

						if (res.code == 1) {
							this.changeLay(false);
							let msg = {
								state: true,
								errorText: {
									type: 'success',
									text: '注册成功'
								}
							}
							this.changeSnack(msg);
							sessionStorage.userName = this.name;
							this.type = 1;
							this.name = '';
							this.password = '';

						} else {
							this.changeLay(false);
						}
					});
				};
			},

			toJH() { //激活
				if (this.$refs.codeForm.validate()) {
					let list = {
						code: this.code
					}
					this.changeLay(true);
					$ax.getAjaxData('/EasWebUser/recharge', list, (res) => {

						this.changeLay(false);

						if (res.code == 1) {
							this.dialog = false;

							this.login();

						}

					}, {
						hasToken: true
					});
				}


			}
		},

		//-----------生命周期--------------------------------------

		created() { //应用程序加载前触发。多个页面会调用多次

		},

		mounted() { //页面渲染完成后触发

		}


	}
</script>

<style scoped="scoped">
	.loginTitle {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 	.v-text-field {
    padding-top: 6px;
    margin-top: 4px;
} */
	.pointer {
		cursor: pointer;
	}

	.xy-height {
		height: 100vh;
	}
</style>
