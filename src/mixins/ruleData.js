import upSvg from '@/img/up.svg'
	import Utils from '@/plugins/cryAes.js'
	import {
		mapActions
	} from 'vuex';

	export const ruleData = {
		data() {
			return {
				showIndex: -1, //当前显示的折叠菜单的下标

				transition: 'fade-transition',

				loading: true, //控制骨架屏 true表示显示

				upIcon: upSvg,

				editType: false, //新增

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
			wssData: {
				handler(nV, oV) {
					this.getMessage();
				},
				deep: true
			}
		},

		computed: {
			wssData() { //wss传递的消息
				return this.$store.state.collocationList;
			}
		},

		methods: {
			...mapActions(['changeLay', 'changeSnack']),

			changeTime(time) {
				return this.$utils.timestampToTime(Number(time));
			},

			newRule() {
				this.showAddRule = true;
				this.editType = false;
			},

			getMessage() { //wss传递的消息
				let result = this.wssData;
				switch (result.code) {
					case 20013: //客户端在线
						let json = JSON.stringify({
							code: 1006
						});

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
							h('p', {
								style: {
									fontWeight: '700'
								}
							}, '确定删除吗? 该操作不可撤销'),
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

								let json = JSON.stringify({
									code: 1006
								});

								state == -1 ? this.$sock.initWebSocket() : this.$sock.websocketsend(json);

								sessionStorage.removeItem('collocation'); //清空缓存里的rule/api

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
				this.$vuetify.goTo(this.target, this.options); //平滑滚动到表头
				this.getRuleList();
			},

			unescapeF(str) { //unicode=>文字
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
		beforeRouteLeave(to, from, next) { //路由离开前断开
			this.$sock.close();

			next();
		},
	}
