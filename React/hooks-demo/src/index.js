import React, { Component } from 'react';

export default class App extends Component {
    state = {
        count: 0,
        count2: 0
    };

    componentDidUpdate() {
        console.log('component did update');
    }

    increment = () => {
        console.log('increment setState 前的 count:', this.state.count);
        this.setState({
            count: this.state.count + 1
        });
        console.log('increment setState 后的 count:', this.state.count);
    }
    
    triple = () => {
        console.log('triple setState 前的 count:', this.state.count);
        this.setState({ count: this.state.count + 1 });
        this.setState({ count: this.state.count + 2 });
        this.setState({ count2: this.state.count + 3, count: this.state.count + 4 });
        console.log('triple setState 后的 count:', this.state.count);
    }

    reduce = () => {
        setTimeout(() => {
            console.log('reduce setState 前的 count:', this.state.count);
            // 以下的for 循环方式会触发 100 次更新，componentDidUpdate 会执行 一百次
            for(let i = 0; i < 100; i++) {
                this.setState({
                    count: this.state.count - 1
                });
            }
            console.log('reduce setState 后的 count:', this.state.count);
        }, 0);
    }


    render() {
        return (
            <div>
                <button onClick={this.increment}>+1</button>
                <button onClick={this.triple}>+3</button>
                <button onClick={this.reduce}>-1</button>
            </div>
        )
    }
}
