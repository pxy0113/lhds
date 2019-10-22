

export default{ 
	timestampToTime(timestamp){
		
		let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = this.change(date.getDate()) + ' ';
		let h = this.change(date.getHours()) + ':';
		let m = this.change(date.getMinutes()) + ':';
		let s = this.change(date.getSeconds());
		return Y + M + D + h + m + s;
	},

	change(t){
		if (t < 10) {
			return "0" + t;
		} else {
			return t;
		}
	},
	
	getOneDay(){ //获取当天的0点0分到23点59分59秒999毫秒
		let date = new Date();
		let end = new Date();
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		
		
		end.setHours(23);
		end.setMinutes(59);
		end.setSeconds(59);
		end.setMilliseconds(999);
		
		 return {'start':date.getTime(),'end':end.getTime()};
	},
	getADay(time,time2){ //获取当天的0点0分到23点59分59秒999毫秒
		time = '2018-09-03 00:00';
		time2 = '2019-09-07 23:59:59'
		let date = new Date(time);
		let end = new Date(time2);
		date.setHours(0);
		date.setMinutes(0);
		date.setSeconds(0);
		date.setMilliseconds(0);
		
		
		end.setHours(23);
		end.setMinutes(59);
		end.setSeconds(59);
		end.setMilliseconds(999);
		
		 return {'start':date.getTime(),'end':end.getTime()};
	},
	
	
 }