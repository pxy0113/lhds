<template>
	<div>
		<div id="vRow" v-if="!showAddRule">
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<span class="d-flex align-center">
					<Avatar style="background-color: #66BB6A" size="10"></Avatar>
					<span class="pl-2">规则列表</span>
				</span>
				<v-btn small outlined color="green"  @click="newRule" class="ma-1">新增规则</v-btn>

			</div>
			
			 <v-divider></v-divider>

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
						<v-row align="center" justify="space-between" class="px-1">
							<v-col v-for="(item,i) in ruleList" :key="i" class="d-flex flex-column" 
							cols="12" :lg="2" :md="4" :sm="6" :xs="12">
								 <v-hover>
								    <template v-slot:default="{ hover }">
										<v-card outlined flat>
											<v-card-text>
												<span class="font-weight-bold demo black--text">
												{{item.R0}}
												</span>/<span style="font-size: 12px;">规则名称</span>
											</v-card-text>

											<v-card-text>
												<p class="d-flex justify-space-between align-center">
													<span class="font-weight-bold">计价货币：</span>
													<span>{{item.R54==1?'USDT':item.R54==2?'ETH':'BTC'}}</span>
												</p>
												<p class="d-flex justify-space-between align-center">
													<span class="font-weight-bold">买入跌幅：</span>
													<span>{{item.R1}}%</span>
												</p>
												<p class="d-flex justify-space-between align-center">
													<span class="font-weight-bold">跌幅回调：</span>
													<span>{{item.R2}}%</span>
												</p>
												<p class="d-flex justify-space-between align-center flex-wrap mb-0">
													<span class="font-weight-bold">建仓金额：</span>
													<span>{{item.R3}}</span>
												</p>
												
											</v-card-text>
											<v-fade-transition>
											  <v-overlay class="bor"
												v-if="hover"
												absolute
												:opacity="1"
												
											  >
												<div class="font-weight-regular overlay">
													<p class="d-flex justify-space-between align-center">
														<span class="font-weight-bold">涨幅回调：</span>
														<span>{{item.R5}}% </span>
													</p>
													<p class="d-flex justify-space-between align-center">
														<span class="font-weight-bold">卖出涨幅：</span>
														<span>{{item.R4}}%</span>
													</p>
													<p class="d-flex justify-space-between align-center">
														<span class="font-weight-bold">止损跌幅：</span>
														<span>{{item.R6}}% </span>
													</p>
													<p class="d-flex justify-space-between align-center">
														<span class="font-weight-bold">补仓跌幅：</span>
														<span>{{item.R7}}% </span>
													</p>
													<p class="d-flex justify-space-between align-center flex-wrap">
														<span class="font-weight-bold">补仓总额：</span>
														<span>{{item.R8*item.R9}}</span>
													</p>
													<p class="d-flex justify-space-between align-center mb-0">
														<span class="font-weight-bold">补仓回调：</span>
														<span>{{item.R10}}% </span>
													</p>


												</div>
											  </v-overlay>
											</v-fade-transition>
										</v-card>
									</template>
								</v-hover>

							</v-col>
						</v-row>
						
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
		<common-addrule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" ref="AR" :edit="editType"></common-addrule>
	</div>
</template>

<script>
	import { ruleData } from '@/mixins/ruleData.js'
	export default {
		mixins:[ruleData],
		data:() =>({
			// showIndex: -1, //当前显示的折叠菜单的下标
		}),
		methods:{
// 			lookOne(i,e) { //查看折叠的内容
// 				this.showIndex == i ? this.showIndex = -1 : this.scrollActions(i,e);
// 			},
// 			scrollActions(i,e){
// 				this.showIndex = i;
// 				let ev = e.currentTarget.parentElement.parentElement;//拿到按钮的祖父元素
// 
// 				let clientHeight =document.documentElement.clientHeight;
// 
// 				if ("IntersectionObserver" in window) {//判断浏览器是否支持
// 					let Observer = new IntersectionObserver(
// 					  entry => {
// 						if(entry[0].intersectionRatio < 1){
// 							this.$vuetify.goTo(e.target, {
// 								duration: 1000,
// 								offset: clientHeight/3,
// 								easing: 'easeInOutCubic'});
// 						}				  
// 						  Observer.disconnect();
// 						  Observer.unobserve(ev);
// 					  }
// 	
// 					);
// 					
// 					Observer.observe(ev);
// 				   
// 						
// 				}else{
// 					this.$vuetify.goTo(e.target, {
// 					duration: 1000,
// 					offset: clientHeight/3,
// 					easing: 'easeInOutCubic'});
// 				}
// 
// 			}
		}
	}
</script>
<style scoped="scoped">
	.overlay{
		font-size: 14px;
		min-width: 180px!important;

	}
	.bor:after{
	    content: '';
	    width: 100%;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    opacity: 0.5;
	    background: url('../img/green.jpg') center center no-repeat;
	}
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
