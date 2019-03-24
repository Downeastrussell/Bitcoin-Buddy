import React, { Component } from 'react'
import { Link } from "react-router-dom";
import btcSymbol from "../../importedMedia/blackBTC1.png"
import "bootstrap/dist/css/bootstrap.min.css"
import "./txn.css"



export default class TransactionList extends Component {




    render() {

        let totalBTC = 0;
        this.props.transactions.map(x => {
            return totalBTC += Number(x.btc)
        })
        let totalUSDavaliable = 0;
        this.props.transactions.map(x => {
            if(x.btc==="0"){
                return totalUSDavaliable += Number(x.usd)
            }
        })
        let totalProfit = 0;
        this.props.transactions.map(x=>{
            return totalProfit += Number(x.profit)
        })


        let currentBTCprice = this.props.prices[0]
        let lastestUpdateTime = this.props.prices[1]


        return (
            <React.Fragment>
                <div className="buyButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/transactions/buy")}
                            }>
                        Buy Bitcoin
                    </button>
                </div>
            <section className="txn">

                <h1>Entire Transaction History</h1>
                <table className="cinereousTable">
                    <thead>
                        <tr>
                            <th>Type of Asset</th>

                            <th>Date</th>
                            <th>Cost($)</th>
                            <th><img src={btcSymbol} alt="btc" className="icon--btx" /> Amount </th>
                            <th>Current Value--Bitcoin</th>
                            <th>Profit/Loss--$</th>
                            <th>USD from Sale--$</th>
                            <th>Buy/Sell</th>

                        </tr>
                    </thead>


                    {
                        this.props.transactions.map(txn =>

                            <tbody>
                                <tr key={txn.id}>
                                    <td >{(txn.buy).toUpperCase()}</td>
                                    <td >{txn.date}</td>
                                    <td >{txn.usd}</td>
                                    <td >{txn.btc}</td>
                                    <td >{(currentBTCprice * txn.btc).toFixed(2)}</td>
                                    <td >{Number(txn.profit).toFixed(2)}</td>
                                    <td >{((txn.usd+txn.profit)*txn.sold).toFixed(2)}</td>
                                    <td > <Link className="nav-link" to={`/transactions/${txn.id}`}> Details</Link></td>



                                </tr>
                            </tbody>

                        )
                    }

                    <tfoot>
                        <tr>
                            <td>Totals:</td>
                            <td></td>
                            <td></td>
                            <td> <img src={btcSymbol} alt="btc" className="icon--btx" /> {(totalBTC).toFixed(8)}</td>
                            <td>${(totalBTC * currentBTCprice).toFixed(2)}</td>
                            <td>${(totalProfit).toFixed(2)} </td>
                            <td>${(totalUSDavaliable).toFixed(2)} </td>
                            <td> </td>
                        </tr>
                    </tfoot>


                </table>
                <h2>USD in Account: ${(totalUSDavaliable).toFixed(2)} </h2>
                <h2>BTC in Account: {(totalBTC).toFixed(8)}</h2>
                <h2>Total Value of BTC: ${(totalBTC*currentBTCprice).toFixed(2)} </h2>
                {/* <h2>Profit: {profit}</h2> */}
                <h1>Total Value of Account: {((totalBTC*currentBTCprice)+totalUSDavaliable).toFixed(2)}</h1>
                <br></br>
                <br></br>
                <h2>Current Bitcoin Price: ${currentBTCprice}</h2>
                <h3>Last Updated: {(lastestUpdateTime)}</h3>
            </section>
        </React.Fragment>


        )
    }

}
















