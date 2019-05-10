
import * as React from 'react';
import './Counter.scss';
// 创建类型接口
export interface IProps {
    value: number,
    onIncrement: () => void,
    onDecrement: () => void
}

// 使用接口代替 PropTypes 进行类型校验
// const Counter = ({ value }: Iprops) => {
//     return <p>Clicked: { value } times</p>
// }

// export default Counter;


// 使用接口代替 PropTypes 进行类型校验
// @CSSModules(styles)
export default class Counter extends React.PureComponent<IProps> {
    public render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p className='xxx'>
                Clicked: { value } times
                <br />
                <br />
                <button onClick={ onIncrement } style={{ marginRight: 20 }}> +  </button>
                <button onClick={ onDecrement }> - </button>
                <span className="scss">
                </span>
            </p>
        )
    }
}
// export default CSSModules(Counter, CounterStyle);