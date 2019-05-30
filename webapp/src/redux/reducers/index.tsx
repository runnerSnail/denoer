import { ModifyAction } from '../actions';
import { DECREMENT, INCREMENT, SERACHOPTION } from '../constants';

// 处理并返回 state 
export default (state:StoreState = initStoreState , action: ModifyAction):  StoreState => {
  switch (action.type) {
    case INCREMENT:
      return Object.assign(state,{
        num:state.num+1
      })
    case DECREMENT:
      return Object.assign(state,{
        num:state.num+1
      })
    case SERACHOPTION:
      return Object.assign(state,{
        serachOption:action.value
      })
    default:
      return state
  }
}

export type StoreState = {
  serachOption:boolean,
  num:number
}

const initStoreState ={
  serachOption:false,
  num:0
}