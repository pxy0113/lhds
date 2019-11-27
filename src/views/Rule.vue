<template>
	<div>
		<div id="vRow" v-if="!showAddRule">
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<span class="pl-2 borderLeft-bold">
					规则列表
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
					
					<v-row align="center" justify="start" class="px-1" v-else>
						<v-col v-for="(item,i) in ruleList" :key="i" class="d-flex flex-column" 
						cols="12" :lg="3" :md="4" :sm="6" :xs="12">
									<v-card outlined flat>
										<v-card-text class="d-flex align-center">
											<div class="font-weight-bold black--text xy-title-hidden">
											{{item.R0}}
											</div>/<span style="font-size: 12px;">规则名称</span>
										</v-card-text>

										<div class="closeIcon">
											<div class="triangle">
												<v-icon style="position: absolute;top: 4px;right: 4px;"
												color="white"
												@click="delRule(item.id,i)">
													mdi-close
												</v-icon>
											</div>
										</div>
										<v-window v-model="item.id">
											<v-window-item :value="item.id+1">
												
											</v-window-item>
										</v-window>	
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
											<p class="d-flex justify-space-between align-center flex-wrap">
												<span class="font-weight-bold">建仓金额：</span>
												<span>{{item.R3}}</span>
											</p>
											
											<p class="text-center pt-2 mb-0 d-flex align-center justify-space-between">
												<v-btn outlined small @click="editRule(item)" color="primary">编辑</v-btn>
												<v-btn outlined small @click="lookOne(i,item)" color="green">更多</v-btn>
											</p>	
											
											
										</v-card-text>
										
									</v-card>

						</v-col>
					</v-row>
				
					<div class="text-center mt-5">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
					
					<common-more :hover="lookMore" :item="moreObj" @closeLay="closeLay" v-if="lookMore"></common-more>
					
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
		<common-addrule v-if="showAddRule" @hideRule="hideRule" :ruleObj="currentRule" :edit="editType" parentName="Rule"
		></common-addrule>
	</div>
</template>

<script>
	import { ruleData } from '@/mixins/ruleData.js'
	import {scrollMixins} from '@/mixins/scroll.js'
	export default {
		mixins:[ruleData,scrollMixins],
		data:() =>({
			// showIndex: -1, //当前显示的折叠菜单的下标
			lookMore:false,
			moreObj:{},
		}),
		methods:{
			closeLay(){//关闭弹出层
				this.moreObj = {};
				this.lookMore = false;
				this.beforeClose();
			},
			
			lookOne(i,item) { //查看折叠的内容
				this.lookMore = true;
				this.afterOpen();
				this.moreObj = {
					R4:item.R4,
					R5:item.R5,
					R6:item.R6,
					R7:item.R7,
					R8:item.R8,
					R9:item.R9,
					R10:item.R10
				};
			},
			
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

	.v-card--reveal {
	  align-items: center;
	  bottom: 0;
	  left:0;
	  justify-content: center;
	  position: absolute;
	  width: 100%;
	}
	.triangle{
		width: 0; 
		height: 0;
		border-top: 50px solid #31b968;
		border-left: 50px solid transparent;
	}
	.closeIcon{
		position: absolute;
		top: 0; 
		right: 0;
		width: 50px;
		height: 50px;
		overflow: hidden;
	}
</style>
