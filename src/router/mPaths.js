/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [{
		path: '/dashboard',
		// Relative to /src/views
		name:'首页',
		view: 'Dashboard'
	},
	{
		path: '/login',
		name: 'Login In',
		view: 'Login'
	},
	{
		path: '/list',
		name: '详细数据',
		view: 'List'
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
