import React from 'react';

class LifeCycle extends React.Component {
    constructor(props) {
        console.log('进入constructor');
        super(props);
        this.state = { text: '自组件的文本'};
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps 方法执行');
        return {
            fatherText: props.text
        };
    }

    componentDidMount() {
        console.log('componentDidMount方法执行');
    }

    shouldComponentUpdate(preProps, nextState) {
        console.log('shouldComponentUpdate方法执行');
        return true;
    }

    getSnapshotBeforeUpdate(preProps, preState) {
        console.log('getSnapshotBeforeUdpate方法执行');
        return 'hello world';
    }

    componentDidUpdate(preProps, preState, valueFromSnapshot) {
        console.log('componentDidUpdate方法执行');
        console.log('获取到的snapshot的值是', valueFromSnapshot);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount方法执行');
    }

    changeText = () => {
        this.setState({
            text: '修改后的自组件文本'
        });
    }

    render() {
        console.log('render 方法执行');

        return (
            <div className='container'>
                <button onClick={this.changeText} className='changeText'>
                    修改自组件内容
                </button>
                <p className='textContext'>{this.state.text}</p>
                <p className='fatherContent'>{this.props.text}</p>
            </div>
        );
    }
}

export default class App extends React.Component {

    // state 也可以像这样用属性声明的形式初始化
    state = {
      text: "父组件的文本",
      hideChild: false
    };
    // 点击按钮，修改父组件文本的方法
    changeText = () => {
      this.setState({
        text: "修改后的父组件文本"
      });
    };
    // 点击按钮，隐藏（卸载）LifeCycle 组件的方法
    hideChild = () => {
      this.setState({
        hideChild: true
      });
    };
    render() {
      return (
        <div className="fatherContainer">
          <button onClick={this.changeText} className="changeText">
            修改父组件文本内容
          </button>
          <button onClick={this.hideChild} className="hideChild">
            隐藏子组件
          </button>
          {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
        </div>
      );
    }
  }