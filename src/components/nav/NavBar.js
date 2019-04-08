import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar"



class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">

                        <Link className="nav-link" to="/"><i className="material-icons">  account_balance </i>Account Overview</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/buy"><i className="material-icons">  show_chart </i>Buy</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/sell"><i className="material-icons">  show_chart </i>Sell</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/transactions"><i className="material-icons">  folder_shared </i>Transaction History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar

