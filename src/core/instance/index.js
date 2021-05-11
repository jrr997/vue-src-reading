import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// 这是最初的Vue，是一个构造函数，此时Vue及Vue.prototype还没有各种方法和属性
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // new Vue之后执行这个函数，主要做了以下的事情
  // 0. 创建vm.$options
// 1. vm._self = vm 实例中定义了_self属性，指向自己
// 2. 初始化实例，包括生命周期、State等
// 3. 调用生命周期钩子beforeCreate和create
// 4. 调用vm.$mount挂载vm.$options.el,如果options中没有el，需要手动调用$mount()方法
}
// console.log(Vue.nextTick); // undefined,证明了目前的Vue只是一个干净的function

/* 给Vue.prottype定义各种属性和方法 */
initMixin(Vue) // 创建了一个function：Vue.prototype._init，因此上面能用this._init()
stateMixin(Vue) // Vue.prototype上增加了$delete、$set、$watch方法，初始化了$data、$props = undefined
eventsMixin(Vue) // Vue.prototype上增加了4个事件相关的方法：$emit、$on、$off和$once
// console.log('eventsMixin');
lifecycleMixin(Vue) // Vue.prototype上增加了3个生命周期相关的方法：_update、$forceupdate、$destory
renderMixin(Vue) // Vue.prototype上增加了$nexttick、_render和一堆renderHelper相关的方法

export default Vue

// 总结：这里定义了Vue为一个构造函数，并在Vue.prototype上增加了各种方法
