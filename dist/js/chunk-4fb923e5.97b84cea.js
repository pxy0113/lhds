(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fb923e5","chunk-06589640","chunk-1ada2f8f"],{"1a33":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"ma-2"},[s("div",{staticClass:"d-flex flex-column mt-1",attrs:{id:"vRow"}},[s("div",{staticClass:"d-flex justify-start align-center flex-wrap py-2 px-3"},[s("v-divider",{staticClass:"my-1",attrs:{vertical:""}}),s("div",{staticClass:"px-2 ",staticStyle:{"max-width":"400px"}},[s("v-menu",{ref:"menu",attrs:{bottom:"",origin:"center center","close-on-content-click":!1,"return-value":t.shortStart,transition:"scale-transition","min-width":"290px"},on:{"update:returnValue":function(e){t.shortStart=e},"update:return-value":function(e){t.shortStart=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-text-field",t._g({attrs:{"hide-details":"",color:"green",label:"开始时间",readonly:""},model:{value:t.startTime,callback:function(e){t.startTime=e},expression:"startTime"}},a))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[s("v-date-picker",{attrs:{"no-title":"",scrollable:"",locale:"zh-cn",color:"green","day-format":t.dateF},model:{value:t.shortStart,callback:function(e){t.shortStart=e},expression:"shortStart"}},[s("v-spacer"),s("v-btn",{attrs:{text:"",color:"green",outlined:""},on:{click:t.startTimeOk}},[t._v("确定")])],1)],1)],1),s("v-divider",{staticClass:"my-1",attrs:{vertical:""}}),s("div",{staticClass:"px-2 ",staticStyle:{"max-width":"400px"}},[s("v-menu",{ref:"menu1",attrs:{bottom:"",origin:"center center","close-on-content-click":!1,"return-value":t.shortEnd,transition:"scale-transition","min-width":"290px"},on:{"update:returnValue":function(e){t.shortEnd=e},"update:return-value":function(e){t.shortEnd=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-text-field",t._g({attrs:{"hide-details":"",color:"green",label:"结束时间",readonly:""},model:{value:t.endTime,callback:function(e){t.endTime=e},expression:"endTime"}},a))]}}]),model:{value:t.menu1,callback:function(e){t.menu1=e},expression:"menu1"}},[s("v-date-picker",{attrs:{"no-title":"",scrollable:"",locale:"zh-cn",color:"green","day-format":t.dateF},model:{value:t.shortEnd,callback:function(e){t.shortEnd=e},expression:"shortEnd"}},[s("v-spacer"),s("v-btn",{attrs:{text:"",color:"green",outlined:""},on:{click:t.endTimeOk}},[t._v("确定")])],1)],1)],1),s("v-divider",{staticClass:"my-1",attrs:{vertical:""}}),s("div",{staticClass:"px-2",staticStyle:{width:"200px"}},[s("v-select",{attrs:{"hide-details":"",color:"green",label:"类别",items:t.typeArr,"item-text":"value","item-color":"green","item-value":"id"},on:{change:t.changeTab},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}})],1),s("v-divider",{staticClass:"my-1",attrs:{vertical:""}}),s("v-btn",{staticClass:"mx-2 my-1",attrs:{color:"green",depressed:"",outlined:""},on:{click:t.search}},[s("v-icon",[t._v("mdi-magnify")]),t._v("\n\t\t\t \t查询\n\t\t\t ")],1)],1),s("None"!==t.transition?"v-"+t.transition:"div",{tag:"component",attrs:{"hide-on-leave":""}},[t.loading?s("v-skeleton-loader",{attrs:{type:"article"}}):s("div",[t.items.length<1?s("v-list-item",{staticClass:"xy-tableItem",attrs:{"three-line":""}},[s("p",{staticClass:"text-center",staticStyle:{width:"100%"}},[t._v("暂无数据")])]):s(t.componentArr[t.tabIndex],{ref:"componentType",tag:"component",attrs:{items:t.items},on:{"hook:mounted":t.doSomething}}),t.items.length>0?s("div",{staticClass:"text-center my-4"},[s("v-pagination",{attrs:{color:"green",length:t.curPage.size,"total-visible":7},on:{input:t.inputShow},model:{value:t.curPage.page,callback:function(e){t.$set(t.curPage,"page",e)},expression:"curPage.page"}})],1):t._e()],1)],1),s("v-fab-transition",[t.items.length>=5?s("Avatar",{staticClass:"xy-suspend",attrs:{src:t.upIcon},nativeOn:{click:function(e){return e.stopPropagation(),t.$vuetify.goTo(t.target,t.options)}}}):t._e()],1)],1)])},n=[],i=(s("28a5"),s("bf4b")),r=s("6d0d"),l=s("ff5d"),c={mixins:[l["a"]],components:{orderList:i["default"],tableList:r["default"]},data:function(){return{menu:!1,menu1:!1}},methods:{dateF:function(t){var e=t.split("-");return e[2]},startTimeOk:function(){this.menu=!1,this.$refs.menu.save(this.shortStart),this.startTime=this.$moment(this.shortStart).format("YYYY-MM-DD HH:mm:ss")},endTimeOk:function(){this.endTime=this.$moment(this.shortEnd).set("hour",23).set("minutes",59).set("seconds",59).format("YYYY-MM-DD HH:mm:ss"),this.$refs.menu1.save(this.shortEnd),this.menu1=!1}}},o=c,u=s("2877"),d=Object(u["a"])(o,a,n,!1,null,null,null);e["default"]=d.exports},4619:function(t,e,s){},"6d0d":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-row",{staticClass:"px-1",attrs:{align:"center",justify:"start"}},t._l(t.items,function(e,a){return s("v-col",{key:a,staticClass:"d-flex flex-column",attrs:{cols:"12",lg:2,md:4,sm:6,xs:12}},[s("v-card",{attrs:{outlined:"",flat:""}},[s("v-card-text",{staticClass:"d-flex align-center font-weight-bold green lighten-4"},[s("span",{staticClass:"pr-4 "},[t._v(t._s(t.transUpperCase(e.symbol))+" ")]),s("span",{style:{color:e.percentage>0?"#E53935":"#43A047",fontSize:"14px"}},[t._v(t._s(e.percentage)+"%")])]),s("v-card-text",[s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("交易所：")]),s("span",[t._v(t._s(e.exchange))])]),s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("法币：")]),s("span",[t._v(t._s(e.currency))])]),s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("平仓数量：")]),s("span",[t._v(t._s(e.closeNum))])]),s("p",{staticClass:"d-flex justify-space-between align-center flex-wrap"},[s("span",{staticClass:"font-weight-bold"},[t._v("平仓收益：")]),s("span",[t._v(t._s(e.profit))])]),s("p",{staticClass:"text-center mb-0"},[s("v-btn",{staticClass:"my-0",attrs:{text:"",color:"success",small:"",icon:""},on:{click:function(s){return t.openDrawer(e.easid)}}},[s("v-icon",[t._v("mdi-menu-down")])],1)],1)])],1)],1)}),1),s("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-card",[s("div",{staticClass:"blue-grey darken-4  pa-4 d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold white--text ml-5 my-0",staticStyle:{"font-size":"1.2rem"}},[t._v("下单详情")]),s("v-btn",{staticClass:"my-0",attrs:{icon:"",dark:""},on:{click:t.clickClose}},[s("v-icon",[t._v("mdi-close")])],1)],1),0==t.placeDetail.length?s("h4",{staticClass:"text-center subtitle-1 py-2"},[t._v("暂无数据")]):s("v-list",{attrs:{"three-line":"",subheader:""}},[s("v-list-item",{staticClass:"d-xl-none d-lg-none d-md-none"},[s("v-row",{staticClass:"mx-0"},[s("v-col",{staticClass:"d-flex flex-column mx-auto my-0",attrs:{lg:8,md:10,sm:8,xs:8}},[s("v-window",{staticClass:" elevation-1",model:{value:t.detailStep,callback:function(e){t.detailStep=e},expression:"detailStep"}},t._l(t.placeDetail,function(e,a){return s("v-window-item",{key:a,attrs:{value:a+1}},[s("v-card-text",{staticClass:"blue-grey--text"},[s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("交易所:")]),s("span",[t._v(t._s(e.exchange))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("交易对:")]),s("span",[t._v(t._s(e.symbol))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("操作方向:")]),s("span",[t._v(t._s(t.operates[e.operate]))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("法币:")]),s("span",[t._v(t._s(e.currency))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("手续费:")]),s("span",[t._v(t._s(e.fee))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("建仓数量:")]),s("span",[t._v(t._s(e.num))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("建仓价格:")]),s("span",[t._v(t._s(e.price))])]),s("h4",{staticClass:"d-flex justify-space-between font-weight-regular"},[s("span",[t._v("建仓时间:")]),s("span",[t._v(t._s(e.placeTime))])])])],1)}),1),s("h4",{staticClass:"my-2 d-flex justify-center  align-center"},[s("v-btn",{staticClass:"pa-1 mx-2",attrs:{disabled:1===t.detailStep||0==t.placeDetail.length,text:"","x-small":"",fab:""},on:{click:function(e){t.detailStep--}}},[s("v-icon",[t._v("mdi-arrow-left")])],1),s("span",[t._v(t._s(t.detailStep)+"/"+t._s(t.placeDetail.length))]),s("v-btn",{staticClass:"pa-1 mx-2",attrs:{disabled:t.detailStep===t.placeDetail.length||0==t.placeDetail.length,fab:"",text:"","x-small":""},on:{click:function(e){t.detailStep++}}},[s("v-icon",[t._v("mdi-arrow-right")])],1)],1)],1)],1)],1),s("v-list-item",{staticClass:"d-none d-lg-flex d-md-flex d-xl-flex",attrs:{lg12:"",md12:"",xl12:""}},[s("v-list-item-content",[s("v-simple-table",{attrs:{dense:""}},[s("thead",[s("tr",[s("th",{staticClass:"text-center subtitle-1"},[t._v("交易所")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("交易对")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("操作方向")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("法币")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("手续费")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("建仓数量")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("建仓价格")]),s("th",{staticClass:"text-center subtitle-1"},[t._v("建仓时间")])])]),s("tbody",t._l(t.placeDetail,function(e,a){return s("tr",{key:a,staticClass:"subtitle-1 text-center"},[s("td",[t._v(t._s(e.exchange))]),s("td",[t._v(t._s(e.symbol))]),s("td",[t._v(t._s(t.operates[e.operate]))]),s("td",[t._v(t._s(e.currency))]),s("td",[t._v(t._s(e.fee))]),s("td",[t._v(t._s(e.num))]),s("td",[t._v(t._s(e.price))]),s("td",[t._v(t._s(e.placeTime))])])}),0)])],1)],1)],1)],1)],1)],1)},n=[],i=s("fd80"),r=i["a"],l=(s("fa80"),s("2877")),c=Object(l["a"])(r,a,n,!1,null,"20e01c04",null);e["default"]=c.exports},b050:function(t,e,s){},bf4b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-row",{staticClass:"px-1",attrs:{align:"center",justify:"start"}},t._l(t.items,function(e,a){return s("v-col",{key:a,staticClass:"d-flex flex-column",attrs:{cols:"12",lg:2,md:4,sm:6,xs:12}},[s("v-card",{attrs:{outlined:"",flat:""}},[s("v-card-text",{staticClass:"d-flex align-end green lighten-4"},[s("Tag",{staticClass:"px-1",attrs:{color:0==e.operate||2==e.operate?"#70c68e":"#f1837f"}},[t._v(t._s(t.stateArr[e.operate]))]),s("span",{staticClass:" font-weight-bold"},[t._v(t._s(t.transUpperCase(e.symbol))+" ")]),t._v("/\n\t\t\t\t\t"),s("span",{staticStyle:{"font-size":"12px"}},[t._v(t._s(e.exchange))])],1),s("v-card-text",[s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("时间：")]),s("span",[t._v(t._s(e.placeTime))])]),s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("法币：")]),s("span",[t._v(t._s(e.currency))])]),s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("数量：")]),s("span",[t._v(t._s(e.num))])]),s("p",{staticClass:"d-flex justify-space-between align-center"},[s("span",{staticClass:"font-weight-bold"},[t._v("价格：")]),s("span",[t._v(t._s(e.price))])]),s("p",{staticClass:"d-flex justify-space-between align-center flex-wrap mb-0"},[s("span",{staticClass:"font-weight-bold"},[t._v("手续费：")]),s("span",[t._v(t._s(e.fee))])])])],1)],1)}),1)],1)},n=[],i={props:{items:{type:Array,default:function(){return[]}}},data:function(){return{stateArr:["买","卖","补","止"]}},methods:{transUpperCase:function(t){return t.toUpperCase()}},computed:{},mounted:function(){}},r=i,l=(s("e135"),s("2877")),c=Object(l["a"])(r,a,n,!1,null,"6079d420",null);e["default"]=c.exports},e135:function(t,e,s){"use strict";var a=s("4619"),n=s.n(a);n.a},fa80:function(t,e,s){"use strict";var a=s("b050"),n=s.n(a);n.a},fd80:function(t,e,s){"use strict";(function(t){s("8e6e"),s("456d"),s("c5f6"),s("ac6a");var a=s("bd86"),n=s("2f62"),i=s("6015");function r(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,a)}return s}function l(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?r(s,!0).forEach(function(e){Object(a["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):r(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}e["a"]={props:{items:{type:Array,default:function(){return[]}}},mixins:[i["a"]],data:function(){return{detailStep:1,placeDetail:[],drawer:!1,operates:["买入","卖出","补仓","止损"]}},methods:l({},Object(n["b"])(["changeLay"]),{transUpperCase:function(t){return t.toUpperCase()},clickClose:function(){this.drawer=!1,this.beforeClose()},openDrawer:function(e){var s=this;this.changeLay(!0),t.getAjaxData("/EasWebUser/getPlaceID",{id:e},function(t){if(1==t.code){var e=JSON.parse(JSON.stringify(t.data));e.forEach(function(t){t.placeTime=s.$moment(Number(t.placeTime)).format("YYYY-MM-DD HH:mm:ss")}),s.placeDetail=e,s.detailStep=1,s.drawer=!0,s.afterOpen()}else console.log("错误错误");s.changeLay(!1)},{hasToken:!0})}}),computed:{},mounted:function(){}}}).call(this,s("eeb9"))},ff5d:function(t,e,s){"use strict";(function(t){s.d(e,"a",function(){return o});s("8e6e"),s("456d"),s("c5f6"),s("ac6a");var a=s("bd86"),n=s("2f62"),i=s("1700"),r=s.n(i);function l(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,a)}return s}function c(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?l(s,!0).forEach(function(e){Object(a["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var o={data:function(){return{shortStart:"",shortEnd:"",typeArr:[{id:0,value:"收益数据"},{id:1,value:"下单数据"}],loading:!0,transition:"fade-transition",upIcon:r.a,urls:["/EasWebUser/getClose","/EasWebUser/getPlace"],target:"#vRow",options:{duration:1e3,offset:0,easing:"easeInOutCubic"},startTime:"",endTime:"",items:[],tabIndex:0,size:50,componentArr:["tableList","orderList"]}},mounted:function(){this.init()},methods:c({init:function(){this.startTime=this.$moment().startOf("day").format("YYYY-MM-DD HH:mm:ss"),this.endTime=this.$moment().endOf("day").format("YYYY-MM-DD HH:mm:ss"),this.shortStart=this.$moment().format("YYYY-MM-DD"),this.shortEnd=this.$moment().format("YYYY-MM-DD");var t={beginTime:this.$moment(this.startTime).format("x"),endTime:this.$moment(this.endTime).format("x"),pageSize:10,pageIndex:1};this.getListData(t)},getListData:function(e){var s=this;this.loading=!0,t.getAjaxData(this.urls[this.tabIndex],e,function(t){if(1==t.code){var e=t.data;s.curPage={page:t.pageIndex,size:t.pageMaxPage},e.forEach(function(t){t.placeTime&&(t.placeTime=s.$utils.timestampToTime(Number(t.placeTime))),t.closeTime&&(t.closeTime=s.$utils.timestampToTime(Number(t.closeTime)))}),s.items=e}else console.log("错误错误");s.loading=!1},{hasToken:!0})},inputShow:function(t){this.curPage.page=t;var e=this.$moment(this.startTime).format("x"),s=this.$moment(this.endTime).format("x"),a={beginTime:e,endTime:s,pageSize:10,pageIndex:this.curPage.page?this.curPage.page:0};this.$vuetify.goTo(this.target,this.options),this.getListData(a)}},Object(n["b"])(["changeSnack"]),{changeTab:function(){var t={beginTime:this.$moment(this.startTime).format("x"),endTime:this.$moment(this.endTime).format("x"),pageSize:10,pageIndex:1};this.getListData(t)},search:function(){if(this.startTime&&this.endTime){var t=this.$moment(this.startTime).valueOf(),e=this.$moment(this.endTime).valueOf();if(e>t){var s={beginTime:this.$moment(this.startTime).format("x"),endTime:this.$moment(this.endTime).format("x"),pageSize:10,pageIndex:1};this.getListData(s)}else{var a={state:!0,errorText:{type:"info",text:"开始时间不能大于结束时间"}};this.changeSnack(a)}}else{var n={state:!0,errorText:{type:"info",text:"请填写时间再搜索"}};this.changeSnack(n)}},doSomething:function(){console.log("渲染了"+this.componentArr[this.tabIndex])}})}}).call(this,s("eeb9"))}}]);