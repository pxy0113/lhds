<template>
	<div>
		<!-- <v-card v-if="!showAddRule" outlined  id="vRow"> -->
		<div id="vRow" v-if="!showAddRule">
			<div class=" px-5 py-2 d-flex justify-space-between align-center flex-wrap green lighten-5">
				<!-- <Badge color="green" class="grey--text" text="规则列表"></Badge> -->
				
				<span class="d-flex align-center">
					<Avatar style="background-color: #66BB6A" size="10"></Avatar>
					<span class="pl-2">规则列表</span>
				</span>
				<v-btn small  outlined color="green"  @click="newRule" class="ma-1">新增规则</v-btn>

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
						<v-row align="center" justify="space-between">
							<v-col v-for="(item,i) in ruleList" :key="i" class="d-flex flex-column" 
							cols="12" :lg="2" :md="4" :sm="6" :xs="12">
								 <v-hover>
								    <template v-slot:default="{ hover }">
										<v-card outlined flat>
											<v-card-text>
												<div class="my-1 d-flex justify-space-between align-center flex-wrap">
													<div class="d-flex align-center">
														<div class="font-weight-bold demo">
														{{item.R0}}
														</div>/<span style="font-size: 12px;">规则名称</span>
													</div>
													<v-btn text small color="green" @click="lookOne(i,$event)">详细</v-btn>
												</div>
											</v-card-text>
														
											<v-card-text>
												
											</v-card-text>
														
											<v-card-actions>
											  <v-btn text>Listen Now</v-btn>
											</v-card-actions>
											<v-fade-transition>
											  <v-overlay
												v-if="hover"
												absolute
												:opacity="0.7"
												
											  >
												<Row style="font-size: 14px;" class="font-weight-regular px-4 ">
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>涨幅回调</span>
														<span>{{item.R5}}% </span>
													</Col>
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>卖出涨幅</span>
														<span>{{item.R4}}%</span>
													</Col>
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>止损跌幅</span>
														<span>{{item.R6}}% </span>
													</Col>
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>补仓跌幅</span>
														<span>{{item.R7}}% </span>
													</Col>
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>补仓总额</span>
														<span>{{item.R8*item.R9}} </span>
													</Col>
													<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
														<span>补仓回调</span>
														<span>{{item.R10}}% </span>
													</Col>
												</Row>
											  </v-overlay>
											</v-fade-transition>
										</v-card>
									</template>
								</v-hover>
									
								
								<!-- <v-scroll-y-transition >
									<Row style="font-size: 14px;" class="font-weight-regular grey lighten-3 px-5" v-if="showIndex==i">
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>涨幅回调</span>
											<span>{{item.R5}}% </span>
										</Col>
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>卖出涨幅</span>
											<span>{{item.R4}}%</span>
										</Col>
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>止损跌幅</span>
											<span>{{item.R6}}% </span>
										</Col>
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>补仓跌幅</span>
											<span>{{item.R7}}% </span>
										</Col>
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>补仓总额</span>
											<span>{{item.R8*item.R9}} </span>
										</Col>
										<Col :lg="6" :md="8" :sm="12" :xs="12" class="d-flex flex-column py-1">
											<span>补仓回调</span>
											<span>{{item.R10}}% </span>
										</Col>
									</Row>
									<v-divider v-else class="mx-2"></v-divider>
								</v-scroll-y-transition> -->
							</v-col>
								
								
								
						</v-row>
						
					</div>
				
					<div class="text-center mt-5">
						<v-pagination color="green" v-model="curPage.page" :length="curPage.size" v-on:input="inputShow" :total-visible="7"></v-pagination>
					</div>
					
					
				</div>
			</component>

			
			
		<!-- </v-card> -->
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

		methods:{
			lookOne(i,e) { //查看折叠的内容
				this.showIndex == i ? this.showIndex = -1 : this.scrollActions(i,e);
			},
			scrollActions(i,e){
				this.showIndex = i;
				let ev = e.currentTarget.parentElement.parentElement;//拿到按钮的祖父元素

				let clientHeight =document.documentElement.clientHeight;

				if ("IntersectionObserver" in window) {//判断浏览器是否支持
					let Observer = new IntersectionObserver(
					  entry => {
						if(entry[0].intersectionRatio < 1){
							this.$vuetify.goTo(e.target, {
								duration: 1000,
								offset: clientHeight/3,
								easing: 'easeInOutCubic'});
						}				  
						  Observer.disconnect();
						  Observer.unobserve(ev);
					  }
	
					);
					
					Observer.observe(ev);
				   
						
				}else{
					this.$vuetify.goTo(e.target, {
					duration: 1000,
					offset: clientHeight/3,
					easing: 'easeInOutCubic'});
				}

			}
		}
	}
</script>
<style scoped="scoped">
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
