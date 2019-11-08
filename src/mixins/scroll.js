/*禁止触摸滚动 配合全局class .scroll_open使用
滚动开始
*/
export const scrollMixins = {
	data: () => ({
		scrollTop:0,
	}),
	methods:{
		afterOpen(bodyClass = 'scroll_open') {//禁止滚动穿透1-记录滚动高度 显示fixed布局
		   this.scrollTop = document.scrollingElement.scrollTop  ||
		                document.documentElement.scrollTop || 
		                document.body.scrollTop;
		    document.body.classList.add(bodyClass);
		    document.body.style.top = -this.scrollTop + 'px';
		},
		beforeClose(bodyClass = 'scroll_open') {//禁止滚动穿透2-删除fixed布局 允许滚动
		    document.body.classList.remove(bodyClass);
		    document.scrollingElement.scrollTop = document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop;
		},
	}
}