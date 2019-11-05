import echarts from 'echarts'
import vuex from '../store/index'
const line = (datas) =>{
	let type = vuex.state.currentType;//手机端不需要grids
	let grids = {
			top:30,
			left: '4%',
			right: '5%', 
			containLabel: true
		}
	return {
		grid:type=='Mobile'?{top:30}:grids,
		title : {
			show:false,
			text: datas.title,
			subtext: '',
			x:'center',
			textStyle: {
			    color: '#455A64',
				fontWeight:700
			}
		},


		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: datas.labels
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: datas.series,
			type: 'line',
			color:'#66BB6A',
			smooth:true,
			areaStyle: {}
		}]
	};


	
}
const bar = (title,xData,yData,series) =>{
	return {
		title: { text: title },
		tooltip: {},
		xAxis: {
		  data: xData
		},
		yAxis: {
			
		},
		series: series
	}

}

const pie = (t,pay) =>{
	return  {
		title : {
			text: t,
			subtext: '',
			x:'center'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},

		// backgroundColor: '#2c343c', //设置图标的背景色,
		label: {
			normal: {
				fontStyle: 'italic' //文字字体的风格
			}
		},
		labelLine: {
			normal: {
				lineStyle: {
					color: 'rgba(255, 255, 255, 0.3)' //设置标签的视觉引导线
				}
			}
		},		
		legend: {
			data:[pay[0].name,pay[1].name,pay[2].name,pay[3].name],
			right: 'center',
            bottom: 0,
            orient: 'horizontal'
		},
		series:[
			{
				name: t, //系列名称, 用于toolitp的显示
				type: 'pie', //图形的类型
				radius: '50', //饼图的半径
				roseType: 'angle',  //通过roseType绘制南丁格尔图
				data: [ //数据
					{value:pay[0].value, name:pay[0].name},
					{value:pay[1].value, name:pay[1].name},
					{value:pay[2].value, name:pay[2].name},
					{value:pay[3].value, name:pay[3].name}
				],
				itemStyle: {  //设置每个item的颜色
					normal: {
						color: function(params) { //params是一个对象, 传入的是seriesIndex, dataIndex, data, value 等各个参数。
							var colorList = [
// 							'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
// 							'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
// 							'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							'pink','yellow','skyblue','green','orange'
							];
							return colorList[params.dataIndex]
						},
						// shadowBlur: 100
					}
				}
			}
		]
	}
}
const p = (t,pay) =>{
	return{
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
	}
}
const circle = (t,pay) =>{
	return{
		title : {
        text: '某站点用户访问来源',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        top: 20,
		display:'flex',
        orient: 'horizontal',
		// left:'right',
        data:[pay[0].name,pay[1].name,pay[2].name,pay[3].name]
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '45%',
            center: ['40%', '60%'],
			data: [ //数据
					{value:pay[0].value, name:pay[0].name},
					{value:pay[1].value, name:pay[1].name},
					{value:pay[2].value, name:pay[2].name},
					{value:pay[3].value, name:pay[3].name}
			],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
	}
}
const pp = (t,pay) =>{
	return{
		title : {
        text: '',
        subtext: '',
        x:'left',
		top:18,
		// left:120,
		// bottom:0,
		textStyle: {
			fontSize:'14',
			color:'#515a6e',
			fontWeight:'400'
		}
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'align',
        left: 'bottom',
        data:[pay[0].name,pay[1].name,pay[2].name,pay[3].name]
    },
    series : [
        {
            name: t,
            type: 'pie',
            radius : '40%',
            center: ['40%', '60%'],
			data: [ //数据
					{value:pay[0].value, name:pay[0].name},
					{value:pay[1].value, name:pay[1].name},
					{value:pay[2].value, name:pay[2].name},
					{value:pay[3].value, name:pay[3].name}
			],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
        }
    ]
	}
}
export  {line}