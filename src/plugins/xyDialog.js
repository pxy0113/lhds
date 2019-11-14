import xyDialogComponent from '@/components/common/xy-dialog'

const xyDialog = {}
// 注册xyDialog
xyDialog.install = function (Vue) {
    // 生成一个Vue的子类
    // 同时这个子类也就是组件
    const xyDialogConstructor = Vue.extend(xyDialogComponent)
    // 生成一个该子类的实例
    const instance = new xyDialogConstructor()
    // 将这个实例挂载在我创建的div上
    // 并将此div加入全局挂载点内部
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)
    // 通过Vue的原型注册一个方法
    // 让所有实例共享这个方法
    Vue.prototype.$xyDialog = (config) => {
        // console.log(config instanceof String)
		
		instance.title = config.title?config.title:'提示';
		instance.hideCancel = config.hideCancel||false;//是否显示取消按钮
		instance.hideOk = config.hideOk||false;
		
        if (typeof (config) === 'string' || typeof (config) === 'number') {
            instance.message = config
            instance.visible = true
            instance.okClick = () => {
                instance.visible = false
            }
            instance.cancelClick = () => {
                instance.visible = false
            }
            return
        }
		
        instance.message = config.content
        instance.visible = true
        instance.okClick = config.onOk ? function () {
            instance.visible = false 
            config.onOk();
        } : function () {
            instance.visible = false
        }
        instance.cancelClick = config.onCancel ? function () {
            instance.visible = false
            config.onCancel(); 
        } : function () {
            instance.visible = false
        }
    }
}

export default xyDialog