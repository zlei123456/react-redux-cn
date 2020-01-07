# react-redux-cn
react-redux 中文注释


proxy: 代理   form initProxySelector   初始化？？？？


connectAdvanced：connect组件，是react 组件Context.Consumer的，订阅store数据组件的包装器。
Provider：Context.Provider 组件，包含store数据，
    -function
        -subscribe: 监听redux的store数据变化，setState新的value，如果有变化的话，刷新Context的子组件。

form react Context
    Context.Provider
            每个 Context 对象都附带一个 Provider React组件，允许 consumer(使用者) 组件 来 订阅 context 的改变。

            接受一个 value 属性传递给使用组件，这个 consumer(使用者) 组件 为 Provider(提供者) 的后代组件 。一个 Provider 可以连接到许多 consumers 。Provider(提供者) 可以被嵌套以覆盖树中更深层次的值。

            每当 Provider(提供者) 的 value 属性发生变化时，所有作为 Provider(提供者) 后代的 consumer(使用者) 组件 都将重新渲染。 从Provider 到其后代使用者的传播不受 shouldComponentUpdate 方法的约束，因此即使祖先组件退出更新，也会更新 consumer(使用者

    Context.Consumer
            一个可以订阅 context 变化的 React 组件。 这允许您订阅 函数式组件 中的 context 。

            需要接收一个 函数作为子节点。 该函数接收当前 context 值并返回一个 React 节点。 传递给函数的 value 参数将等于组件树中上层这个 context 最接近的 Provider 的 value 属性。 如果上层没有提供这个 context 的 Provider ，value参数将等于传递给 createContext() 的 defaultValue 。


connect: 用于创建外部使用的connect函数
map***： 用于创建外部使用的map*函数
selectorFactory: 
    -- impureFinalPropsSelectorFactory  只要store变化， 引用子组件就刷新
    -- pureFinalPropsSelectorFactory (默认)  会做浅比较判断有没有变化，没有变化的引用的子组件就不刷新

wrapMapToProps: mapDispatchToProps和mapStateTpProps执行函数
    -- wrapMapToPropsConstant： 处理object常量
    -- wrapMapToPropsFunc： 处理函数。
    如果mapDispatchToProps是Object的话用的wrapMapToPropsConstant, 函数用的wrapMapToPropsFunc