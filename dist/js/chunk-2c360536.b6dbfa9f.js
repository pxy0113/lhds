(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c360536"],{"0b77":function(t,e,n){},1700:function(t,e,n){t.exports=n.p+"img/up.373baae5.svg"},"386d":function(t,e,n){"use strict";var i=n("cb7c"),s=n("83a1"),a=n("5f1b");n("214f")("search",1,function(t,e,n,o){return[function(n){var i=t(this),s=void 0==n?void 0:n[e];return void 0!==s?s.call(n,i):new RegExp(n)[e](String(i))},function(t){var e=o(n,t,this);if(e.done)return e.value;var l=i(t),c=String(this),r=l.lastIndex;s(r,0)||(l.lastIndex=0);var d=a(l,c);return s(l.lastIndex,r)||(l.lastIndex=r),null===d?-1:d.index}]})},"3b2b":function(t,e,n){var i=n("7726"),s=n("5dbc"),a=n("86cc").f,o=n("9093").f,l=n("aae3"),c=n("0bfb"),r=i.RegExp,d=r,u=r.prototype,f=/a/g,v=/a/g,h=new r(f)!==f;if(n("9e1e")&&(!h||n("79e5")(function(){return v[n("2b4c")("match")]=!1,r(f)!=f||r(v)==v||"/a/i"!=r(f,"i")}))){r=function(t,e){var n=this instanceof r,i=l(t),a=void 0===e;return!n&&i&&t.constructor===r&&a?t:s(h?new d(i&&!a?t.source:t,e):d((i=t instanceof r)?t.source:t,i&&a?c.call(t):e),n?this:u,r)};for(var p=function(t){t in r||a(r,t,{configurable:!0,get:function(){return d[t]},set:function(e){d[t]=e}})},g=o(d),m=0;g.length>m;)p(g[m++]);u.constructor=r,r.prototype=u,n("2aba")(i,"RegExp",r)}n("7a56")("RegExp")},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},b427:function(t,e,n){"use strict";(function(t){n("7f7f"),n("ac6a"),n("3b2b"),n("386d");var i=n("a24c"),s=n("2078"),a=n("1700"),o=n.n(a);e["a"]={inject:["theme"],compoments:{addRule:s["default"],settingDialog:i["default"]},data:function(){return{tips:"暂无数据",showSetDialog:!1,transition:"scale-transition",loading:!0,currency:[{id:1,value:"USDT"},{id:2,value:"ETH"},{id:3,value:"BTC"}],names2:[{id:1,name:"Sno"},{id:2,name:"Hon"},{id:3,name:"Don"},{id:4,name:"Elaine Street"},{id:5,name:"Court Street"},{id:6,name:"oub"},{id:7,name:"VA"},{id:8,name:"AJKJK V"}],neighborhoods:[1,4],search:"",valid:!0,datas:{},condition:{type:"",account:"",rule:""},addCollocation:!1,currentRule:null,showAddRule:!1,upIcon:o.a,target:"#vRow",options:{duration:1e3,offset:0,easing:"easeInOutCubic"},ruleData:[],items:[]}},methods:{closeSetting:function(){this.showSetDialog=!1},showSetting:function(){this.showSetDialog=!0},addSelect:function(t){var e=this.neighborhoods.indexOf(t);e>-1?this.neighborhoods.splice(e,1):this.neighborhoods.push(t)},closeAddColl:function(){this.addCollocation=!1,this.neighborhoods=[],this.$refs.form.resetValidation()},debounce:function(){var t=this;clearTimeout(this.t),this.t=setTimeout(function(){var e=t;if(e.isEmpty(t.search))t.ruleData=t.names2;else{var n=t.fuzzyQuery(t.search);t.ruleData=n}},3e3)},fuzzyQuery:function(t){var e=new RegExp(t),n=[];return this.names2.forEach(function(t){e.test(t.name)&&n.push(t)}),n},isEmpty:function(t){return"undefined"==typeof t||null==t||""==t||t.length>0&&0==t.trim().length},cancelSearch:function(){this.search="",this.ruleData=this.names2},transUpperCase:function(t){return t.toUpperCase()},showChip:function(t){this.$set(t,"show",!t.show),this.currentRule=t},onOperation:function(t){var e={data:[{id:t.id}],code:0==t.isRun?1004:1005};this.websocketsend(JSON.stringify(e))},onPosition:function(t){var e={data:[{id:t.id}],code:0==t.isHas?1011:1012};this.websocketsend(JSON.stringify(e))},onRemove:function(t){var e={data:[{id:t.id}],code:1010};this.websocketsend(JSON.stringify(e))},onEdit:function(t){this.showAddRule=!0},hideRule:function(){this.showAddRule=!1},allEnd:function(){var t=this;this.$Modal.confirm({title:"交易托管",content:"<p>是否全部停止?</p>",onOk:function(){var e=JSON.stringify({code:1003});t.websocketsend(e)}})},allStart:function(){var t=this;this.$Modal.confirm({title:"交易托管",content:"<p>是否全部启动?</p>",onOk:function(){var e=JSON.stringify({code:1002});t.websocketsend(e)}})},addTo:function(){this.$refs.form.validate()}},destroyed:function(){clearTimeout(this.t)},mounted:function(){var e=this;this.ruleData=this.names2,this.$sock.initWebSocket(),sessionStorage.apiPublic?this.datas=JSON.parse(sessionStorage.apiPublic):t.getTestData("/EasWebUser/getAPIData",{},function(t){1==t.code&&(sessionStorage.apiPublic=JSON.stringify(t.data),e.datas=JSON.parse(sessionStorage.apiPublic))}),this.loading=!1},beforeRouteLeave:function(t,e,n){this.$sock.close(),n()}}}).call(this,n("eeb9"))},c370:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:"","grid-list-xl":"",flat:""}},[n("v-flex",{staticClass:"d-flex flex-column"},[n("div",{staticClass:" px-5 py-2 my-0 green white--text d-flex justify-space-between align-center flex-wrap xy-border-circle"},[t._m(0),n("span",{staticStyle:{"min-width":"260px"}},[n("v-btn",{attrs:{small:"",color:"white",outlined:""},on:{click:t.showSetting}},[t._v("设置")]),n("v-btn",{attrs:{small:"",color:"white",outlined:""},on:{click:function(e){t.addCollocation=!0}}},[t._v("添加托管")]),n("v-btn",{attrs:{small:"",color:"white",outlined:""},on:{click:t.allStart}},[t._v("全部启动")]),n("v-btn",{attrs:{small:"",color:"white",outlined:""},on:{click:t.allEnd}},[t._v("全部停止")])],1)]),n("None"!==t.transition?"v-"+t.transition:"div",{tag:"component",attrs:{"hide-on-leave":""}},[t.loading?n("v-skeleton-loader",{attrs:{type:"article"}}):n("div",[t.items.length<1?n("v-list-item",{staticStyle:{border:"1px solid #ccc","text-align":"center"},attrs:{"three-line":""}},[n("p",{staticClass:"text-center",staticStyle:{width:"100%"}},[t._v(t._s(t.tips))])]):t._l(t.items,function(e,i){return n("div",{key:i},[n("v-list-item",{staticClass:"xy-tableItem",attrs:{"three-line":""}},[n("v-list-item-content",{staticClass:"align-self-start"},[n("v-list-item-title",{staticClass:" mb-2"},[n("div",{staticClass:"d-flex align-center"},[n("span",{staticClass:" font-weight-bold"},[t._v(t._s(t.transUpperCase(e.symbol))+" ")]),n("span",{staticClass:"font-weight-bold pl-2",style:{color:0==e.isRun?"#E53935":1==e.isRun?"#43A047":2==e.isRun?"orange":"blue",fontSize:"14px"}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(0==e.isRun?"待启动":1==e.isRun?"运行中":2==e.isRun?"建仓中":"平仓中"))])])]),n("v-list-item-subtitle",{staticClass:"font-weight-regular"},[t._v(t._s(e.exc))]),n("div",{staticClass:"font-weight-regular"},[n("Row",[n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[n("span",{staticClass:"textAlign"},[t._v("参考价格")]),t._v("："+t._s(e.referPrice)+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[n("span",[t._v("最新价格")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s(e.newPrice)+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[n("span",{staticClass:"textAlign"},[t._v("涨跌幅")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s("-"==e.range?"-":e.range+" %")+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[n("span",{staticClass:"textAlign"},[t._v("持仓均价")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s(e.holdPrice)+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[n("span",{staticClass:"textAlign"},[t._v("持仓数量")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s(e.holdAmount)+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:12}},[n("span",{staticClass:"textAlign"},[t._v("利润百分比")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s("-"==e.profit?"-":e.profit+" %")+"\n\t\t\t\t\t\t\t\t\t")]),n("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:12}},[n("span",{staticClass:"textAlign"},[t._v("补仓次数")]),t._v("\n\t\t\t\t\t\t\t\t\t："+t._s(e.other)+"\n\t\t\t\t\t\t\t\t\t")])],1)],1),n("div",[n("v-btn",{staticClass:"ma-0",attrs:{tile:"",outlined:"",small:"",color:"success"},on:{click:function(n){return n.preventDefault(),n.stopPropagation(),t.showChip(e)}}},[t._v("\n\t\t\t\t\t\t\t\t\t操作\n\t\t\t\t\t\t\t\t\t"),n("v-icon",{attrs:{right:""}},[t._v(t._s(e.show?"mdi-menu-up":"mdi-menu-down"))])],1)],1),e.show?n("v-expand-transition",[n("v-chip-group",{staticClass:"font-weight-regular",attrs:{"active-class":"green--text ",column:""}},[n("v-chip",{on:{click:function(n){return t.onOperation(e)}}},[t._v(t._s(0==e.isRun?"启动":"停止"))]),n("v-chip",{attrs:{disabled:e.isRun>=1},on:{click:function(n){return t.onRemove(e)}}},[t._v("删除")]),n("v-chip",{attrs:{disabled:e.isRun>=1},on:{click:function(n){return t.onEdit(e)}}},[t._v("修改")]),n("v-chip",{attrs:{disabled:0==e.isRun},on:{click:function(n){return t.onPosition(e)}}},[t._v(t._s(0==e.isBuy?"建仓":"平仓"))])],1)],1):t._e()],1)],1)],1)})],2)],1)],1),n("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.showAddRule,callback:function(e){t.showAddRule=e},expression:"showAddRule"}},[t.showAddRule?n("add-rule",{ref:"AR",staticClass:"ma-0",attrs:{ruleObj:t.currentRule,edit:!0},on:{hideRule:t.hideRule}}):t._e()],1),n("v-dialog",{attrs:{width:"800",persistent:""},model:{value:t.addCollocation,callback:function(e){t.addCollocation=e},expression:"addCollocation"}},[n("v-card",[n("v-card-title",{staticClass:"title grey lighten-2",attrs:{"primary-title":""}},[t._v("\n\t\t\t\t添加托管\n\t\t\t")]),n("v-card-text",[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("div",{staticClass:"d-flex flex-wrap"},[n("v-select",{staticClass:"pr-2",staticStyle:{"max-width":"250px"},attrs:{rules:[function(t){return!!t||"必填"}],items:t.datas,color:"green","item-color":"green","item-text":"exc","item-value":"exc",label:"规则","single-line":""},scopedSlots:t._u([{key:"label",fn:function(){return[n("span",{staticStyle:{"font-size":"14px"}},[t._v("选择规则")])]},proxy:!0}]),model:{value:t.condition.rule,callback:function(e){t.$set(t.condition,"rule",e)},expression:"condition.rule"}}),n("v-select",{staticClass:"pr-2",staticStyle:{"max-width":"250px"},attrs:{rules:[function(t){return!!t||"必填"}],items:t.datas,color:"green","item-color":"green","item-text":"exc","item-value":"exc",label:"账户","single-line":""},scopedSlots:t._u([{key:"label",fn:function(){return[n("span",{staticStyle:{"font-size":"14px"}},[t._v("选择账户")])]},proxy:!0}]),model:{value:t.condition.account,callback:function(e){t.$set(t.condition,"account",e)},expression:"condition.account"}}),n("v-select",{staticClass:"pr-2",staticStyle:{"max-width":"250px"},attrs:{rules:[function(t){return!!t||"必填"}],items:t.currency,"item-text":"value","item-value":"id",label:"法币",color:"green","item-color":"green","single-line":""},scopedSlots:t._u([{key:"label",fn:function(){return[n("span",{staticStyle:{"font-size":"14px"}},[t._v("法币类型")])]},proxy:!0}]),model:{value:t.condition.type,callback:function(e){t.$set(t.condition,"type",e)},expression:"condition.type"}})],1)]),n("v-card",{attrs:{outlined:""}},[n("v-card-title",{staticStyle:{"max-width":"250px"}},[n("v-text-field",{attrs:{"append-icon":""==t.search?"":"mdi-close",label:"搜索",color:"green","single-line":"","hide-details":""},on:{"click:append":t.cancelSearch,input:t.debounce},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),n("v-card-text",{staticStyle:{height:"250px","overflow-y":"auto"}},[0==t.ruleData.length?n("v-chip",{staticClass:"ma-2"},[t._v("\n\t\t\t\t\t\t\t  无结果\n\t\t\t\t\t\t\t")]):t._e(),t._l(t.ruleData,function(e,i){return n("v-chip",{key:i,staticClass:"ma-2",attrs:{color:t.neighborhoods.indexOf(e.id)>-1?"green":"grey","text-color":"white"},on:{click:function(n){return t.addSelect(e.id)}}},[t.neighborhoods.indexOf(e.id)>-1?n("v-avatar",{attrs:{left:""}},[n("v-icon",[t._v("mdi-checkbox-marked-circle")])],1):t._e(),t._v("\n\t\t\t\t\t\t\t  "+t._s(e.name)+"\n\t\t\t\t\t\t\t")],1)})],2),n("v-card-text",{staticClass:"d-flex align-baseline justify-end "},[n("span",{staticClass:"font-weight-regular pr-2"},[t._v("已选 "+t._s(t.neighborhoods.length)+" 个")]),t.neighborhoods.length>0?n("v-btn",{attrs:{color:"green",text:""},on:{click:t.addTo}},[t._v("添加至托管")]):t._e()],1)],1)],1),n("v-card-actions",[n("div",{staticClass:"flex-grow-1"}),n("v-btn",{attrs:{color:"primary",text:""},on:{click:t.closeAddColl}},[t._v("\n\t\t\t\t\t关闭\n\t\t\t\t")])],1)],1)],1),t.showSetDialog?n("setting-dialog",{attrs:{settingModal:t.showSetDialog},on:{closeSetting:t.closeSetting}}):t._e()],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticStyle:{"font-size":"18px"}},[t._v("托管列表")])}],a=n("b427"),o=a["a"],l=(n("c47c"),n("2877")),c=Object(l["a"])(o,i,s,!1,null,"32a6eb06",null);e["default"]=c.exports},c47c:function(t,e,n){"use strict";var i=n("0b77"),s=n.n(i);s.a}}]);
//# sourceMappingURL=chunk-2c360536.b6dbfa9f.js.map