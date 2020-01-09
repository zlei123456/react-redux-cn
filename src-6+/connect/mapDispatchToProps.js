import { bindActionCreators } from 'redux'
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'

// 如果map是函数
export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function'
    ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
    : undefined
}

export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps
    ? wrapMapToPropsConstant(dispatch => ({ dispatch }))
    : undefined
}

// map是object
export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object'
    ? wrapMapToPropsConstant(dispatch =>
        bindActionCreators(mapDispatchToProps, dispatch)
      )
    : undefined
}

export default [
  whenMapDispatchToPropsIsFunction,
  whenMapDispatchToPropsIsMissing,
  whenMapDispatchToPropsIsObject
]
