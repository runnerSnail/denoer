import React,{Component} from 'react';
import { RouteComponentProps } from 'react-router';


// 创建props接口
export interface IProps {
    value: number,
    onIncrement: () => void,
    onDecrement: () => void
}
// 创建state接口
export interface IState {
    
}

// 使用接口代替 PropTypes 进行类型校验
export default class Counter extends Component<IProps & RouteComponentProps<{}>,IState> {
    // public props: IProps & RouteComponentProps;
    // public state: IState = {

    // }
    constructor(props:any) {
        super(props);
        this.state = {
            
        };
    }
    public render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                Clicked: { value } times
                <br />
                <br />
                <button onClick={ onIncrement } style={{ marginRight: 20 }}> +  </button>
                <button onClick={ onDecrement }> - </button>
            </p>
        )
    }
}