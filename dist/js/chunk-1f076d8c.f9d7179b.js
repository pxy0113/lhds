(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f076d8c"],{1700:function(t,e,a){t.exports=a.p+"img/up.373baae5.svg"},2598:function(t,e,a){},8167:function(t,e,a){t.exports=a.p+"img/user.7ef46bfa.jpg"},ac4e:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","grid-list-xl":""}},[a("v-layout",{attrs:{"justify-center":"",wrap:"","flex-column":""}},[a("v-flex",{staticClass:"py-0",attrs:{xs12:"",md11:"",lg11:"",sm11:"",cols:"12"}},[a("v-card",{staticClass:"mx-auto",staticStyle:{border:"1px solid #BDBDBD"},attrs:{outlined:"",id:"vRow"}},[a("v-card",{staticStyle:{border:"none"},attrs:{outlined:"",img:t.bannerImg}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-avatar",{staticClass:"white  d-none d-sm-flex",attrs:{tile:"",size:100}},[a("v-img",{attrs:{src:t.bg}})],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"display-1 mb-4 white--text"},[t._v(t._s(t.userData.name))]),a("v-list-item-subtitle",{staticClass:"d-flex align-center"},[a("v-icon",{attrs:{size:"14",color:"white"}},[t._v("mdi-email")]),a("span",{staticClass:"white--text pl-2"},[t._v(t._s(t.userData.email))])],1),a("v-list-item-subtitle",{staticClass:"d-flex flex-wrap"},[a("span",{staticClass:"py-2 white--text"},[a("v-icon",{staticClass:"pr-1",attrs:{size:"16",color:"white"}},[t._v("\n\t\t\t\t\t\t\t\t\t\tmdi-av-timer\n\t\t\t\t\t\t\t\t\t")]),t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(t.changeTime(t.userData.endTime))+" 到期\n\t\t\t\t\t\t\t\t\t")],1),a("span",{staticClass:"red--text py-2 pl-2",staticStyle:{cursor:"pointer"},on:{click:t.renew}},[t._v("续期")])])],1)],1),a("v-btn",{staticClass:"font-weight-light",staticStyle:{position:"absolute",right:"8px",top:"2px"},attrs:{fab:"",color:"error","x-small":""},on:{click:t.exit}},[a("v-icon",{attrs:{size:"20"}},[t._v("mdi-power")])],1)],1),a("p",{staticClass:"px-2 mb-0",staticStyle:{border:"1px solid #ccc"}},[a("v-btn",{attrs:{color:"green",outlined:"",small:""},on:{click:function(e){t.addDialog=!0}}},[t._v("添加API")])],1),a("None"!==t.transition?"v-"+t.transition:"div",{tag:"component",attrs:{"hide-on-leave":""}},[t.loading?a("v-skeleton-loader",{attrs:{type:"article"}}):a("div",[t.apiList.length<1?a("v-list-item",{staticClass:"xy-tableItem",attrs:{"three-line":""}},[a("p",{staticClass:"text-center",staticStyle:{width:"100%"}},[t._v("暂无数据")])]):t._l(t.apiList,function(e,s){return a("div",{key:s},[a("v-list-item",{staticStyle:{"border-bottom":"1px solid #ccc"},attrs:{"three-line":""}},[a("v-list-item-content",{staticClass:"align-self-start"},[a("v-list-item-title",{staticClass:" mb-2"},[a("div",{staticClass:"d-flex align-center justify-space-between"},[a("span",{staticClass:" font-weight-bold"},[t._v(t._s(t.transUpperCase(e.exchange))+"\n\t\t\t\t\t\t\t\t\t\t\t"),a("span",{staticClass:"font-weight-light",staticStyle:{"font-size":"12px"}},[t._v("/交易所")])]),a("v-btn",{attrs:{color:"primary",text:"",small:""},on:{click:function(a){return t.delApi(e)}}},[t._v("删除")])],1)]),a("div",{staticClass:"font-weight-regular body-2"},[a("div",{staticClass:"d-flex justify-space-between flex-wrap align-center "},[a("div",{staticClass:"pr-3 py-1 d-flex flex-wrap align-center justify-space-between"},[a("span",[t._v("名称：")]),a("span",[t._v(t._s(e.remark))])]),a("div",{staticClass:"pr-3 py-1 d-flex flex-wrap align-center justify-space-between"},[a("span",[t._v("买入费率(%)：")]),a("span",[t._v(t._s(e.buy))])]),a("div",{staticClass:"pr-3 py-1 d-flex flex-wrap align-center justify-space-between"},[a("span",[t._v("卖出费率(%)：")]),a("span",[t._v(t._s(e.sell))])])]),a("div",{staticClass:"d-flex justify-space-between flex-wrap align-center"},[a("div",{staticClass:"pr-3 py-1 d-flex flex-wrap align-center justify-space-between"},[a("span",[t._v("API_KEY：")]),a("span",[t._v(t._s(e.key))])]),a("div",{staticClass:"pr-3 py-1 d-flex flex-wrap align-center justify-space-between"},[a("span",[t._v("API_SECRET：")]),a("span",[t._v(t._s(e.secret))])])])])],1)],1)],1)}),a("div",{staticClass:"text-center my-2"},[a("v-pagination",{attrs:{color:"green",length:t.curPage.size,"total-visible":5},on:{input:t.inputShow},model:{value:t.curPage.page,callback:function(e){t.$set(t.curPage,"page",e)},expression:"curPage.page"}})],1)],2)],1)],1),t.apiList.length>=5?a("Avatar",{staticStyle:{background:"#4CAF50",position:"fixed",right:"10px",bottom:"10px"},attrs:{src:t.upIcon},nativeOn:{click:function(e){return e.stopPropagation(),t.$vuetify.goTo(t.target,t.options)}}}):t._e()],1)],1),a("v-dialog",{attrs:{width:"500",persistent:""},model:{value:t.addDialog,callback:function(e){t.addDialog=e},expression:"addDialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v("\n\t\t\t\t添加账户\n\t\t\t")]),a("v-card-text",[a("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-select",{attrs:{rules:[function(t){return!!t||"必填"}],items:t.items,"item-text":"exc","item-value":"exc",color:"green","item-color":"green",label:"交易所","single-line":""},scopedSlots:t._u([{key:"label",fn:function(){return[a("span",{staticStyle:{"font-size":"14px"}},[t._v("交易所")])]},proxy:!0}]),model:{value:t.place,callback:function(e){t.place=e},expression:"place"}}),a("v-text-field",{attrs:{label:"账户备注名称",rules:[function(t){return!!t||"必填"}],required:"",color:"green"},model:{value:t.news.A1,callback:function(e){t.$set(t.news,"A1",e)},expression:"news.A1"}}),a("v-text-field",{attrs:{rules:[function(t){return!!t||"必填"}],required:"",color:"green",label:"API_KEY"},model:{value:t.news.A2,callback:function(e){t.$set(t.news,"A2",e)},expression:"news.A2"}}),a("v-text-field",{attrs:{rules:t.nameRules,required:"",color:"green",label:"API_SECRET"},model:{value:t.news.A3,callback:function(e){t.$set(t.news,"A3",e)},expression:"news.A3"}}),a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{label:"买入费率",min:"0",step:"0.1",rules:[function(t){return!!t||"必填"}],required:"",color:"green",type:"number"},model:{value:t.news.A4,callback:function(e){t.$set(t.news,"A4",e)},expression:"news.A4"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{label:"卖出费率",min:"0",step:"0.1",color:"green",rules:[function(t){return!!t||"必填"}],required:"",type:"number"},model:{value:t.news.A5,callback:function(e){t.$set(t.news,"A5",e)},expression:"news.A5"}})],1)],1),"OKEx"==t.place?a("v-text-field",{attrs:{rules:[function(t){return!!t||"必填"}],required:"",color:"green",label:"PASSPHPASE",type:"password"},model:{value:t.newsPassword,callback:function(e){t.newsPassword=e},expression:"newsPassword"}}):t._e()],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{color:"green",text:""},on:{click:t.closeAccount}},[t._v("\n\t\t\t\t\t关闭\n\t\t\t\t")]),a("v-btn",{attrs:{color:"green",text:""},on:{click:t.addOneAccount}},[t._v("\n\t\t\t\t\t确定\n\t\t\t\t")])],1)],1)],1),a("v-dialog",{attrs:{width:"500",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v("\n\t\t\t\t激活账号\n\t\t\t")]),a("v-card-text",[a("v-text-field",{attrs:{label:"激活码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{color:"primary",text:""},on:{click:t.cancelDialog}},[t._v("\n\t\t\t\t\t关闭\n\t\t\t\t")]),a("v-btn",{attrs:{color:"primary",text:""},on:{click:t.postCode}},[t._v("\n\t\t\t\t\t确定\n\t\t\t\t")])],1)],1)],1)],1)},i=[],n=a("ec68"),r=n["a"],l=(a("c1fe"),a("2877")),c=Object(l["a"])(r,s,i,!1,null,"0885972c",null);e["default"]=c.exports},c1fe:function(t,e,a){"use strict";var s=a("2598"),i=a.n(s);i.a},ec68:function(t,e,a){"use strict";(function(t){a("8e6e"),a("456d"),a("c5f6");var s=a("bd86"),i=(a("ac6a"),a("39b6")),n=a("2f62"),r=a("1700"),l=a.n(r),c=a("7c04"),o=a.n(c),p=a("8167"),u=a.n(p);function d(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,s)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?d(a,!0).forEach(function(e){Object(s["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):d(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}e["a"]={data:function(){return{transition:"scale-transition",loading:!0,upIcon:l.a,target:"#vRow",options:{duration:1e3,offset:0,easing:"easeInOutCubic"},detailStep:1,curPage:{page:1,size:0},valid:!0,news:{A1:"",A2:"",A3:"",A4:.1,A5:0},newsPassword:"",place:"",items:[],addDialog:!1,apiColumns:[{text:"名称",align:"center",sortable:!1,value:"exchange"},{text:"备注",align:"center",sortable:!1,value:"remark"},{text:"API KEY",align:"center",sortable:!1,value:"key"},{text:"API SECRET",align:"center",sortable:!1,value:"secret"},{text:"买入费率(%)",align:"center",sortable:!1,value:"buy"},{text:"卖出费率(%)",align:"center",sortable:!1,value:"sell"},{text:"操作",align:"center",sortable:!1,value:"del"}],apiList:[],nameRules:[function(t){return!!t||"必填"},function(t){return t&&t.length<=68||"超出长度"}],bannerImg:u.a,dialog:!1,code:"",userData:sessionStorage.userData?JSON.parse(sessionStorage.userData):{},bg:o.a}},watch:{place:{handler:function(t,e){var a=this;this.items.forEach(function(e){e.exc==t&&(a.news.A4=e.buy,a.news.A5=e.sell)})},immediate:!0}},mounted:function(){var e=this;sessionStorage.apiPublic?(this.items=JSON.parse(sessionStorage.apiPublic),this.place=this.items.length>0?this.items[0].exc:""):t.getTestData("/EasWebUser/getAPIData",{},function(t){1==t.code&&(sessionStorage.apiPublic=JSON.stringify(t.data),e.items=t.data,e.place=e.items.length>0?e.items[0].exc:"")}),this.getApiList()},methods:g({},Object(n["b"])(["changeLay","changeSnack"]),{transUpperCase:function(t){return t.toUpperCase()},inputShow:function(t){this.curPage.page=t,this.detailStep=1,this.$vuetify.goTo(this.target,this.options),this.getApiList()},changeTime:function(t){return this.$utils.timestampToTime(Number(t))},renew:function(){this.dialog=!0},cancelDialog:function(){this.code="",this.dialog=!1},delApi:function(e){var a=this;this.$Modal.confirm({title:"删除",content:"<p>确定删除吗？该操作不可撤销</p>",onOk:function(){a.changeLay(!0),t.getAjaxData("/EasWebUser/delAPI",{id:e.id},function(t){if(a.changeLay(!1),1==t.code){var s={state:!0,errorText:{type:"green",text:"删除成功"}};a.changeSnack(s);var i=a.apiList.indexOf(e);a.apiList.splice(i,1)}},{hasToken:!0})}})},closeAccount:function(){this.$refs.form.resetValidation(),this.addDialog=!1,this.news=this.$options.data().news,this.newsPassword="",this.place=this.items.length>0?this.items[0].exc:""},addOneAccount:function(){var e=this;if(this.$refs.form.validate()){var a={A1:this.place,A6:this.newsPassword,A7:0,A8:0,A9:0,A10:0},s={exc:this.place,remark:this.news.A1,data:i["a"].encrypt(JSON.stringify(Object.assign({},this.news,a)))};this.changeLay(!0),t.getAjaxData("/EasWebUser/addAPI",s,function(t){if(e.changeLay(!1),1==t.code){var a={state:!0,errorText:{type:"green",text:e.edit?"编辑成功":"添加成功"}};e.changeSnack(a),e.addDialog=!1,e.$refs.form.resetValidation(),e.getApiList()}},{hasToken:!0})}},getApiList:function(){var e=this;this.loading=!0,t.getAjaxData("/EasWebUser/getAPI",{pageSize:10,pageIndex:this.curPage.page},function(t){e.loading=!1,1==t.code?(e.apiList=t.data,e.curPage={page:t.pageIndex,size:t.pageMaxPage},e.detailStep=1):console.log("错误错误")},{hasToken:!0})},postCode:function(){var e=this;if(""!==this.code)this.changeLay(!0),t.getAjaxData("/EasWebUser/recharge",{code:this.code},function(t){if(e.changeLay(!1),1==t.code){var a=JSON.parse(sessionStorage.userData);a.endTime=t.endTime,sessionStorage.userData=JSON.stringify(a),e.userData=a;var s={state:!0,errorText:{type:"green",text:"续期成功！"}};e.changeSnack(s),e.dialog=!1,e.code=""}},{hasToken:!0});else{var a={state:!0,errorText:{type:"error",text:"激活码不可为空"}};this.changeSnack(a)}},exit:function(){var t=this;this.$Modal.confirm({title:"退出登录",content:"<p>确定退出吗？</p>",onOk:function(){sessionStorage.clear(),t.$store.state.showBar=!1,t.$router.push({path:"/login"})}})}})}}).call(this,a("eeb9"))}}]);
//# sourceMappingURL=chunk-1f076d8c.f9d7179b.js.map