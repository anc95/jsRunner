import React, {Component} from 'React'

const style = {
    width: '300px',
    height: '200px',
    color: 'blue',
    fontSize: '100px',
    backgroundColor: '#aaa'
}

export default class extends Component {
    render () {
        return <div style={style}>hello, word</div>
    }
}