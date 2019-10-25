/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [{
		path: '/dashboard',
		// Relative to /src/views
		name:'首页',
		view: 'mobile/Index'
	},
	{
		path: '/login',
		name: 'Login In',
		view: 'Login'
	},
	{
		path: '/user',
		name: '个人中心',
		view: 'User'
	},
	{
		path: '/table-list',
		name: '详细数据',
		view: 'TableList'
	},
	{
		path: '/order-list',
		name: '下单数据',
		view: 'OrderList'
	},
	{
		path: '/rule',
		name:'规则策略',
		view: 'Rule'
	},
	{
		path: '/dem',
		name: '托管数据',
		view:'Dem'
	}
]
