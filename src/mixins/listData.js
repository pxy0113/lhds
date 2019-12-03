//详细数据页面的mixins数据
import {
		mapActions
	} from 'vuex'
	export const listData = {
		data: () => ({
			shortStart:'',//pc段端于传递给选择器的字段
			shortEnd:'',

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

			urls: [ '/EasWebUser/getClose','/EasWebUser/getPlace'],

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

			componentArr: ['tableList','orderList'], //组件数组

		}),

		mounted() {
			this.init();
		},
		methods: {
			init() { //初始化
				this.startTime = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
				this.endTime = this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
				
				this.shortStart = this.$moment().format('YYYY-MM-DD');
				this.shortEnd = this.$moment().format('YYYY-MM-DD');

				let list = {
					"beginTime": this.$moment(this.startTime).format('x'),
					"endTime": this.$moment(this.endTime).format('x'),
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
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
							if(item.placeTime){
								item.placeTime = this.$utils.timestampToTime(Number(item.placeTime));
							}
							if(item.closeTime){
								item.closeTime = this.$utils.timestampToTime(Number(item.closeTime));
							}
							
						});
						this.items = data;

					} else {
						console.log('错误错误')
					}

					this.loading = false;

				}, {
					hasToken: true
				});


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

			changeTab() {
				let list = {
					"beginTime": this.$moment(this.startTime).format('x'),
					"endTime": this.$moment(this.endTime).format('x'),
					"pageSize": 10,
					"pageIndex": 1
				}
				this.getListData(list);
			},

			search() { //搜索列表

				if (this.startTime && this.endTime) {
					let start = this.$moment(this.startTime).valueOf();
					let end = this.$moment(this.endTime).valueOf();
					if (end > start) {
						let list = {
							"beginTime": this.$moment(this.startTime).format('x'),
							"endTime": this.$moment(this.endTime).format('x'),
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
			
			doSomething() {
				console.log('渲染了' + this.componentArr[this.tabIndex])
			},

		}
	}
