	var websock = null;

	var state = -1;

	import vuex from '../store/index'

	export default{
		
		initWebSocket(){ //初始化weosocket
			let token = sessionStorage.token;
			
			if(token){
				let ds = window.encodeURIComponent(token);
				
				// const wsuri = `ws://192.168.2.103:8080/EasRobotWS/ws?token=${ds}`;
				const wsuri = `ws://ws.lhds.vip:8080/EasRobotWS/ws?token=${ds}`;
				
				// const wsuri = `ws://m252t77964.wicp.vip:20211/EasRobotWS/ws?token=${ds}`
				
				websock = new WebSocket(wsuri);
				
				state = websock.readyState;
				
				websock.onmessage = (e) =>{
					this.websocketonmessage(e);
				};
				websock.onopen = () =>{
					this.websocketonopen();
				};
				websock.onerror = function(){
					console.log('失败了');
				};
				websock.onclose = (e) =>{
					this.websocketclose(e);
				};
			}
		},
			
		websocketonmessage(e){
			let result = JSON.parse(e.data);
			
			console.log('收到数据 = >',result);
			
			state = websock.readyState;
			
			vuex.state.collocationList = result;

		},
		
		websocketonopen(){
			console.log('打开websocket');

			//this.websocketsend();
			
			state = websock.readyState;

		},
		
		websocketclose(e){  //关闭
			console.log('断开连接', e);
			
			vuex.state.collocationList = [];
			
			state = -1;
		},

		websocketsend(Data){//数据发送
			console.log('发送数据 = >',Data);
			websock.send(Data);
		},
		
		close(){
			if(state >= 0){
				websock.close();
				state = websock.readyState;
				// state = -1;
				// console.log(state)
			}
			
		},
		lookState(){//查询sock当前状态
			return state;
		}


		
	}		
				

				
				
