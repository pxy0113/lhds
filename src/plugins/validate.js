
export default {
	isEmpty(data){//不可为空 
		if (data== ""||data.replace(/(^\s*)|(\s*$)/g, "")=="") {
			return true;
		}else{
			return false;
		}
	},
	nonzero(data){//大于0
		if(data <= 0||Number(data)<=0){
			return true;
		}else{
			return false;
		}
	}
}