import verifyPlainObject from '../utils/verifyPlainObject'

// 外部函数传的constant（eg: const mapDispatch = {TestAdd};）
export function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    const constant = getConstant(dispatch, options)

    // constant = {testFunc: 
    // function () {
    //   return dispatch(actionCreator.apply(this, arguments));
    // };}
    function constantSelector() {
      return constant
    }
    constantSelector.dependsOnOwnProps = false
    return constantSelector
  }
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
export function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null &&
    mapToProps.dependsOnOwnProps !== undefined
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//
/**
 * @export  mapstateToprops传递时调用
 * @param {*} mapToProps  使用connect是传递的mapStateToProprs
 * @param {*} methodName  名称  methodName = 'mapStatetoProps' || 'mapDispatchToProps'
 * @returns  返回initProxySelector(dispatch, { displayName })
 */
export function wrapMapToPropsFunc(mapToProps, methodName) {
    /*
  * connect.js
  *function match(arg, factories, name) {
  * for (let i = factories.length - 1; i >= 0; i--) {
  *   const result = factories[i](arg)
  *   if (result) return result
  * }
  * 
  * result 就是这个函数
  * 
  *  最终执行在 selectorFactory.js中finalPropsSelectorFactory函数
  *   const mapStateToProps = initMapStateToProps(dispatch, options)
  *  const mapDispatchToProps = initMapDispatchToProps(dispatch, options)
  *  const nextStateProps = mapStateToProps(state, ownProps)
  */  
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      // proxy.mapToProps => const mapStateToProps = (state) => ({});
      // state = stateOrDispatch
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(stateOrDispatch, ownProps)
        : proxy.mapToProps(stateOrDispatch)
    }

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true

        /** 
     * stateOrDispatch : store数据
    */
    proxy.mapToProps = function detectFactoryAndVerify(
      stateOrDispatch,
      ownProps
    ) {
      proxy.mapToProps = mapToProps
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)
      let props = proxy(stateOrDispatch, ownProps)

      if (typeof props === 'function') {
        proxy.mapToProps = props
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props)
        props = proxy(stateOrDispatch, ownProps)
      }

      if (process.env.NODE_ENV !== 'production')
        verifyPlainObject(props, displayName, methodName)

      return props
    }

    return proxy
  }
}
