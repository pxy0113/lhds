(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2253ca"],{e416:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._l(t.items,function(e,r){return s("div",{key:r},[s("v-list-item",{staticClass:"xy-borderB px-3",attrs:{"three-line":""}},[s("v-list-item-content",{staticClass:"align-self-start"},[s("v-list-item-title",{staticClass:"font-weight-bold mb-2"},[s("div",{staticClass:"d-flex justify-space-between align-center"},[s("div",{staticClass:"d-flex align-center"},[s("span",{staticClass:"pr-4"},[t._v(t._s(t.transUpperCase(e.symbol))+" ")]),s("span",{style:{color:e.percentage>0?"#E53935":"#43A047",fontSize:"14px"}},[t._v(t._s(e.percentage)+"%")])]),s("v-btn",{staticClass:"my-0",attrs:{color:"success",small:""},on:{click:function(s){return t.openDrawer(e.easid)}}},[t._v("详情")])],1)]),s("v-list-item-subtitle",{staticClass:"font-weight-regular"},[t._v(t._s(e.closeTime))]),s("div",{staticClass:"font-weight-regular"},[s("Row",[s("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:12}},[t._v("\n\t\t\t\t\t\t交易所："+t._s(e.exchange)+"\n\t\t\t\t\t\t")]),s("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:12}},[t._v("\n\t\t\t\t\t\t法币："+t._s(e.currency)+"\n\t\t\t\t\t\t")]),s("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[t._v("\n\t\t\t\t\t\t平仓数量："+t._s(e.closeNum)+"\n\t\t\t\t\t\t")]),s("Col",{staticClass:"py-1",attrs:{lg:6,md:6,sm:12,xs:24}},[t._v("\n\t\t\t\t\t\t平仓收益："+t._s(e.profit)+"\n\t\t\t\t\t\t")])],1)],1)],1)],1)],1)}),s("common-listDetail",{attrs:{sheet:t.drawer,id:t.detailId},on:{changeSheet:t.test}})],2)},n=[],a=(s("8e6e"),s("ac6a"),s("456d"),s("bd86")),i=s("2f62"),c=s("6015");function l(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),s.push.apply(s,r)}return s}function o(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?l(s,!0).forEach(function(e){Object(a["a"])(t,e,s[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(s).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))})}return t}var p={props:{items:{type:Array,default:function(){return[]}}},mixins:[c["a"]],data:function(){return{drawer:!1,detailId:-1}},methods:o({test:function(t){this.drawer=t,this.beforeClose()}},Object(i["b"])(["changeLay"]),{transUpperCase:function(t){return t.toUpperCase()},openDrawer:function(t){this.detailId=t,this.afterOpen(),this.drawer=!0}}),computed:{},mounted:function(){}},u=p,d=s("2877"),f=Object(d["a"])(u,r,n,!1,null,null,null);e["default"]=f.exports}}]);