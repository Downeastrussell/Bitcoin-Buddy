import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import Bitcoin from "./bitcoin.js"

// import './index.css'

ReactDOM.render(
    <Router>
        <Bitcoin />
    </Router>
    , document.getElementById('root'))