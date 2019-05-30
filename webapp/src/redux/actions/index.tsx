import { INCREMENT, DECREMENT, SERACHOPTION } from "../constants";

export interface IINCREMENTAction {
    type: INCREMENT;
}

export interface IDECREMENTAction {
    type: DECREMENT;
}
export interface SEARCHAction {
    type: SERACHOPTION;
    value:boolean
}
// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyAction = IINCREMENTAction | IDECREMENTAction | SEARCHAction;


// 增加 state 次数的方法
export const increment = (): IINCREMENTAction => ({
    type: INCREMENT
})

// 减少 state 次数的方法
export const decrement = (): IDECREMENTAction => ({
    type: DECREMENT
})

// 设置是否可以访问谷歌

export const searchByGoogle = (value:boolean): SEARCHAction => ({
    type: SERACHOPTION,
    value
})