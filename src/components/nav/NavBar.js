// import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "./NavBar"



// class NavBar extends Component {
//     render() {
//         return (
//             <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
//                 <ul className="nav nav-pills">
//                     <li className="nav-item">

//                         <Link className="nav-link" to="/"><i className="material-icons">  account_balance </i>Account Overview</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/buy"><i className="material-icons">  show_chart </i>Buy</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/sell"><i className="material-icons">  show_chart </i>Sell</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/transactions"><i className="material-icons">  folder_shared </i>Transaction History</Link>
//                     </li>
//                     <li className="nav-item">
//                         <Link className="nav-link" to="/login">Logout</Link>
//                     </li>
//                 </ul>
//             </nav>
//         )
//     }
// }


// export default NavBar


import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../authentication/Auth";
import "./NavBar"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {
 signOut = () => {
   auth0Client.signOut();
   sessionStorage.clear()
   this.props.history.replace("/");
 };

 render() {
   return (
     <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
       <Link className="navbar-brand" to="/">
         Bitcoin Buddy
       </Link>
       {!auth0Client.isAuthenticated() ? (
         <button className="btn btn-success" onClick={auth0Client.signIn}>
           Sign In
         </button>
       ) : (
         <React.Fragment>
           <div>
             <label className="mr-2 text-blue">
               {auth0Client.getProfile().name}
             </label>
             <button
               className="btn btn-danger"
               onClick={() => {
                 this.signOut();
               }}
             >
               Sign Out
             </button>
           </div>

           <ul className="nav nav-pills">

                    <li className="nav-item">
                        <Link className="nav-link" to="/"><i className="material-icons">  account_balance </i>Account Overview</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/buy"> <i className="material-icons">folder_shared </i>Record Historical Transactions</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/transactions"> <i className="material-icons">  show_chart </i>Active Trading and Transaction History</Link>
                    </li>

           </ul>
         </React.Fragment>
       )}
     </nav>
   );
 }
}

export default withRouter(NavBar);

