(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1eec7618"],{1258:function(t,e,a){"use strict";(function(t){a("8e6e"),a("ac6a"),a("456d"),a("a481"),a("7f7f");var n=a("bd86"),r=a("2f62"),i=a("7c04"),o=a.n(i),s=a("adc8"),l=a.n(s),c=a("441d"),d=a.n(c),u=a("404d"),f=a.n(u);function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(a,!0).forEach(function(e){Object(n["a"])(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}e["a"]={data:function(){return{codeValid:!0,errorText:{},snackbar:!1,code:"",dialog:!1,logo:o.a,show_icon:d.a,hide_icon:f.a,bg:l.a,type:1,registerValid:!0,loginValid:!0,show1:!1,name:"",password:"",email:"",nameRules:[function(t){return!!t||"必填"},function(t){return t&&t.length>=2||"名称至少两个字"}],rules:{required:function(t){return!!t||"必填."},min:function(t){return t.length>=6||"最少六个字符"},email:function(t){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(t)||"请输入正确的邮箱."},length:function(t){return t&&t.length<=68||"超出长度"},isEmpty:function(t){return/^[^\s]*$/.test(t)||"不能是空格"},not:function(t){return!/[\u4E00-\u9FA5]/g.test(t)||"不能是中文"}}}},components:{},methods:g({},Object(r["b"])(["changeLay","changeSnack"]),{login:function(){var e=this;if(this.$refs.loginForm.validate()){this.changeLay(!0);var a={account:this.name,password:this.password};t.getAjaxData("/EasWebUser/login",a,function(t){if(e.changeLay(!1),1==t.code)if(sessionStorage.token=t.token,0==t.accState)e.dialog=!0;else{var a={state:!0,errorText:{type:"success",text:"登陆成功"}};e.changeSnack(a);var n={name:e.name,email:t.email,endTime:t.endTime};sessionStorage.showBar=!0,e.$store.state.showBar=!0,sessionStorage.userData=JSON.stringify(n),e.$router.replace({path:"/dashboard"})}})}},register:function(){var e=this;if(this.$refs.registForm.validate()){var a={account:this.name,password:this.password,email:this.email};this.changeLay(!0),t.getAjaxData("/EasWebUser/register",a,function(t){if(1==t.code){e.changeLay(!1);var a={state:!0,errorText:{type:"success",text:"注册成功"}};e.changeSnack(a),sessionStorage.userName=e.name,e.type=1,e.name="",e.password=""}else e.changeLay(!1)})}},toJH:function(){var e=this;if(this.$refs.codeForm.validate()){var a={code:this.code};this.changeLay(!0),t.getAjaxData("/EasWebUser/recharge",a,function(t){e.changeLay(!1),1==t.code&&(e.dialog=!1,e.login())},{hasToken:!0})}}}),created:function(){},mounted:function(){}}}).call(this,a("eeb9"))},"404d":function(t,e,a){t.exports=a.p+"img/hide.e7770040.svg"},"441d":function(t,e,a){t.exports=a.p+"img/show.3858be07.svg"},a55b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-img",{attrs:{src:t.bg,"lazy-src":"",height:"100vh",position:"left bottom"}},[a("v-container",{staticClass:"mx-auto xy-height"},[a("v-row",{staticStyle:{height:"100%"},attrs:{align:"start",justify:"center"}},[a("v-col",{attrs:{lg:3,md:6,sm:6,xs:6}},[a("v-card",{staticStyle:{background:"#FFFFFF",border:"1px solid #FFFFFF"},attrs:{flat:"",outlined:""}},[a("div",{staticClass:" fill-height loginTitle py-5"},[a("v-avatar",[a("img",{attrs:{src:t.logo}})]),a("span",{staticStyle:{"font-size":"1.5rem","margin-left":"3px"}},[t._v("量化大师")])],1),1==t.type?a("v-card-text",[a("v-form",{ref:"loginForm",attrs:{"lazy-validation":""},scopedSlots:t._u([{key:"append",fn:function(){return[a("v-fade-transition",{attrs:{"leave-absolute":""}},[a("img",{staticStyle:{cursor:"pointer"},attrs:{width:"24",height:"24",src:t.show1?t.show_icon:t.hide_icon,alt:""},on:{click:function(e){t.show1=!t.show1}}})])]},proxy:!0}],null,!1,3518805708),model:{value:t.loginValid,callback:function(e){t.loginValid=e},expression:"loginValid"}},[a("v-text-field",{attrs:{outlined:"",rules:t.nameRules,label:"用户名",required:"",dense:"","prepend-inner-icon":"mdi-account",color:"grey darken-3"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-text-field",{attrs:{outlined:"",rules:[t.rules.required,t.rules.min],type:t.show1?"text":"password","prepend-inner-icon":"mdi-key",dense:"",label:"密码",color:"grey darken-3"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),a("div",{staticClass:"d-flex justify-end py-3"},[a("div",{staticClass:"grey--text lighten-4 pointer",on:{click:function(e){t.type=2}}},[t._v("我要注册")])]),a("v-btn",{attrs:{color:"grey darken-3",dark:"",block:""},nativeOn:{click:function(e){return e.stopPropagation(),t.login(e)}}},[t._v("\n\t\t\t\t\t\t\t\t登陆\n\t\t\t\t\t\t\t")])],1)],1):t._e(),2==t.type?a("v-card-text",[a("v-form",{ref:"registForm",attrs:{"lazy-validation":""},model:{value:t.registerValid,callback:function(e){t.registerValid=e},expression:"registerValid"}},[a("v-text-field",{attrs:{outlined:"",dense:"",rules:t.nameRules,label:"用户名",required:"","prepend-inner-icon":"mdi-account",color:"grey darken-3"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-text-field",{attrs:{outlined:"",dense:"",rules:[t.rules.required,t.rules.min],type:t.show1?"text":"password","prepend-inner-icon":"mdi-key",color:"grey darken-3",label:"密码"},scopedSlots:t._u([{key:"append",fn:function(){return[a("v-fade-transition",{attrs:{"leave-absolute":""}},[a("img",{staticStyle:{cursor:"pointer"},attrs:{width:"24",height:"24",src:t.show1?t.show_icon:t.hide_icon,alt:""},on:{click:function(e){t.show1=!t.show1}}})])]},proxy:!0}],null,!1,3518805708),model:{value:t.password,callback:function(e){t.password=e},expression:"password"}},[t._v("\n\t\t\t\t\t\t\t\t</>\n\t\t\t\t\t\t\t\t")]),a("v-text-field",{attrs:{"prepend-inner-icon":"mdi-email",outlined:"",dense:"",rules:[t.rules.email],label:"邮箱",color:"grey darken-3"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),a("div",{staticClass:"d-flex justify-space-between py-3"},[a("div",{staticClass:"grey--text lighten-2 pointer",on:{click:function(e){t.type=1}}},[t._v("返回登陆")])]),a("v-btn",{staticStyle:{width:"100%",color:"white"},attrs:{color:"grey darken-3"},on:{click:t.register}},[t._v("\n\t\t\t\t\t\t\t\t注册\n\t\t\t\t\t\t\t")])],1)],1):t._e()],1),a("v-dialog",{attrs:{persistent:"",width:"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v("\n\t\t\t\t\t\t\t激活账号\n\t\t\t\t\t\t")]),a("v-card-text",[a("v-form",{ref:"codeForm",attrs:{"lazy-validation":""},model:{value:t.codeValid,callback:function(e){t.codeValid=e},expression:"codeValid"}},[a("v-text-field",{attrs:{label:"激活码",rules:[t.rules.not,t.rules.required,t.rules.isEmpty]},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{color:"grey darken-3",text:""},on:{click:t.toJH}},[t._v("\n\t\t\t\t\t\t\t\t确定\n\t\t\t\t\t\t\t")])],1)],1)],1)],1)],1)],1)],1)},r=[],i=a("1258"),o=i["a"],s=(a("bf4e"),a("2877")),l=Object(s["a"])(o,n,r,!1,null,"6aa21bf9",null);e["default"]=l.exports},adc8:function(t,e,a){t.exports=a.p+"img/body.8aa7c4a6.svg"},bf4e:function(t,e,a){"use strict";var n=a("fbdd"),r=a.n(n);r.a},fbdd:function(t,e,a){}}]);