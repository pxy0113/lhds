<template>
	<div>
		<!-- <v-btn block outlined @click="show" class="ma-0">{{dateStr}}</v-btn> -->
		<span @click="show" style="font-size: 14px;">
			{{dateStr}}
			<slot name="tail"></slot> 
			<v-icon v-if="showIcon" right>mdi-chevron-down</v-icon>
		</span>
		 <v-bottom-sheet v-model="display">

		      <v-sheet class="text-center" height="200px">
				<div class="picker">
					<p class="d-flex justify-space-between align-baseline py-4 px-2">
						<v-btn text color="blue-grey" class="my-0" @click="cancelSelect">取消</v-btn>
						<span class="subtitle-2">请选择日期时间</span>
						<v-btn text color="green" class="my-0" @click="selectOk">确定</v-btn>
					</p>
					
					<v-row class="py-0 pa-6">
						<v-col v-for="(wheel, i) in pickerData" :key="i" class="py-0">
							{{text[i]}}
						</v-col>
					</v-row>
					<div class="picker-panel">
						<div class="picker-mask-top"></div>
						<div class="picker-mask-bottom"></div>
						<div class="picker-wheel-wrapper" ref="wheelWrapper">							
							<div class="picker-wheel" v-for="(wheel, index) in pickerData" :key="index">
								<div class="wheel-scroll">
									<div class="d-flex flex-column wheel-item" v-for="(item, idx) in wheel" :key="idx">
										{{item}}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		      </v-sheet>
		    </v-bottom-sheet>
		  </div>
	</div>
</template>

<script>
	import {
	  getMonthDay,
	  dateTimePicker,
	  transPickerValue
	} from '@/plugins/newDate.js'
	import upSvg from '@/img/up.svg'
	import BScroll from 'better-scroll'
	import { scrollMixins } from '@/mixins/scroll.js'
	import {
		mapActions
	} from 'vuex';
	export default {
		mixins:[scrollMixins],
		data() {
			return {
				dateStr:'',
				
				firstTime:'2019-01-11',
				
				text:['年','月','日'],
				
				dateTime:[0,0,0],
				
				wheels: [],
				
				display:false,

				pickerData: [],


			}
		},
		
		computed:{
		  dateTimeArray(){
		    return dateTimePicker().dateTimeArray;
		  }
		},
		
		mounted() {
			this.init();
		},
		
		props:{
			value:{
				type:String,
				default:''
			},
			showIcon:{
				type:Boolean,
				default:false
			}
		},
		
		watch:{
			value:{
				handler(nV,oV){
					this.firstTime = nV; 
					this.init();
				},
				immediate: true
			},
			display(nV){
				!nV&&this.scrollToOrigin();
			}
		},
		
		methods: {
			init(){//初始化
				this.dateTime = transPickerValue(this.firstTime);
				
				this.pickerData  = this.dateTimeArray;
				
				let brr = [];
				
				this.dateTime.forEach((item,i) =>{
					brr.push(this.pickerData[i][this.dateTime[i]]);
				});

				this.dateStr = `${brr[0]}-${brr[1]}-${brr[2]}`;
			},

			cancelSelect(){//取消选择
				this.display = false;
			},
			
			scrollToOrigin(){//滚动位置回到原点
				this.beforeClose();
				
				this.dateTime.forEach((item,i) =>{
					this.wheels[i].wheelTo(item);
				});
			},

			selectOk(){//确定选择
				let arr = [];
				
				this.wheels.forEach((wheel, i) => {
				  arr.push(wheel.getSelectedIndex());//bs自带的方法 获取元素下标
				});

				this.dateTime = arr;
				
				let brr = [];
				
				arr.forEach((item,i) =>{
					brr.push(this.pickerData[i][arr[i]]);
				});
				
				let str = `${brr[0]}-${brr[1]}-${brr[2]}`;
				
				this.dateStr = str;
				
				this.$emit('changeTime',str);

				this.display = false;
			},

			show(){ //显示选择器

				this.display = true;
				
				this.$nextTick(() => {
				  const wheelWrapper = this.$refs.wheelWrapper
				  this.pickerData.forEach((item, index) => {
					this.createWheel(wheelWrapper, index).enable()
				  });
				});
				
				this.afterOpen();
			},
			
			_getCurrentValue () {
			  const value = []
			  this.wheels.forEach((wheel, i) => {
			    const j = wheel.getSelectedIndex();//bs自带的方法 获取元素下标
			    value.push({
			      index: j,
			      value: this.pickerData[i][j]
			    })
			  });
			  return value
			},
			
			createWheel (wheelWrapper, i) { //创建bs的wheel配置
			  if (!this.wheels[i]) {
			    const wheel = this.wheels[i] = new BScroll(wheelWrapper.children[i], {
			      wheel: {
			        selectedIndex: this.dateTime[i],
			        rotate: 25
			      },
			      swipeTime: 1500
			    })
			    wheel.on('scrollEnd', () => {
			      const newIndex = this._getCurrentValue()[i].index;
				  const newValue = this._getCurrentValue()[i].value;
			    });

				
			  } else {
			    this.wheels[i].refresh()
			  }
			  
			  return this.wheels[i]
			},
		}
	}
</script>
<style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,.2);
  }

  .picker {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
	height: 270px;
    // z-index: 10000;
    background: #fff;
  }

  .picker-panel {
    position: relative;
    // height: 226px;
	height: 125px;//186
    padding: 12px 12px;
    box-sizing: border-box;

    .picker-mask-top, .picker-mask-bottom {
      position: absolute;
      left: 0;
      right: 0;
      height: 34px;//72
      background: #fff;
      transform: translateZ(0);
      z-index: 1;
      pointer-events: none;
    }

    .picker-mask-top {
      top: 12px;
      background: linear-gradient(to bottom, rgba(255,255,255,.9), rgba(255,255,255,.5));
      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #ebebeb;
        transform: scaleY(.5);
      }
    }

    .picker-mask-bottom {
      bottom: 12px;
      background: linear-gradient(to top, rgba(255,255,255,.9), rgba(255,255,255,.5));
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        border-bottom: 1px solid #ebebeb;
        transform: scaleY(.5);
      }
    }
  }

  .picker-wheel-wrapper {
    display: flex;
    align-items: stretch;
    height: 100%;

    .picker-wheel {
      flex: 1;
      overflow: hidden;
    }

    .wheel-scroll {
      margin-top: 34px;//72 -52

      .wheel-item {
        height: 34px;
        line-height: 34px;
        font-size: 17px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
      }
    }
  }
</style>