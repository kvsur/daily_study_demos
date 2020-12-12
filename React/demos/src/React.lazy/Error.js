import React, { Component } from 'react'

export default class Error extends Component {
    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            error: {}
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: {
                error, errorInfo
            }
        })
    }

    render() {
        const { hasError } = this.state;
        return (
            <div>
                {
                    hasError ? <span style={{color: 'red'}}>Load component error</span> :
                    this.props.children
                }
            </div>
        )
    }
}
