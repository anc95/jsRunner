import ReactDom from 'react-dom'
import react from 'react'

export default function(x) {
    console.log(11111)
    ReactDom.render(
        react.createElement(x),
        document.getElementById('root')
    )
}