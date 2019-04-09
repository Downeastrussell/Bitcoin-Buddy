import React, { Component } from 'react'
import { Link } from "react-router-dom";
import btcSymbol from "../../importedMedia/blackBTC1.png"
import "bootstrap/dist/css/bootstrap.min.css"
import "./txn.css"

export default class TransactionList extends Component {


    render() {
        let currentBTCprice = this.props.prices[0]
        let lastestUpdateTime = this.props.prices[1]

        let totalBTC = 0;
        this.props.transactions.map(x => {
            return totalBTC += Number(x.volume)
        })

        let totalProceeds = 0;
        this.props.transactions.map(x => {
            if (x.sellDate != null) {
                return totalProceeds += Number(x.sellPrice)
            }
        })
        let bitcoinSold = 0;
        this.props.transactions.map(x => {
            if (x.sellDate != null) {
                return bitcoinSold += Number(x.volume)
            }
        })
        let costBasis = 0;
        this.props.transactions.map(x => {

            return costBasis += Number(x.buyPrice)

        })
        let unrealizedProfit = 0;
        this.props.transactions.map(txn => {
            if (txn.sellDate === null) {
                return unrealizedProfit += ((Number(txn.volume)) * currentBTCprice) - Number(txn.buyPrice)
            }
        })
        let realizedProfit = 0;
        this.props.transactions.map(txn => {
            if (txn.sellDate != null) {
                return realizedProfit += ((Number(txn.sellPrice)) - Number(txn.buyPrice))
            }
        })

        console.log(unrealizedProfit)
        console.log(currentBTCprice)

        return (
            <React.Fragment>

                <section className="txn">

                    <h1>Transaction History</h1>
                    <table className="cinereousTable">
                        <thead>
                            <tr>
                                <th id="2">Date Purchased</th>
                                <th id="3">Cost Basis ($)</th>
                                <th id="4"><img src={btcSymbol} alt="btc" className="icon--btx" /> Volume </th>
                                <th id="7">Proceeds from Sale</th>
                                <th id="8">Date Sold</th>
                                <th id="9">More Info</th>
                            </tr>
                        </thead>

                        {
                            this.props.transactions.map(txn =>

                                <tbody key={txn.id}>
                                    <tr key={txn.id}>
                                        <td >{txn.buyDate}</td>
                                        <td >{txn.buyPrice}</td>
                                        <td >{txn.volume}</td>
                                        <td >{(txn.sellPrice)}</td>
                                        <td >{txn.sellDate}</td>
                                        <td > <Link className="nav-link" to={`/transactions/${txn.id}`}>Sell/Details</Link></td>
                                    </tr>
                                </tbody>
                            )
                        }
                        <tfoot>
                            <tr>
                                <td>Totals:</td>
                                <td>{costBasis}</td>
                                <td> <img src={btcSymbol} alt="btc" className="icon--btx" /> {(totalBTC).toFixed(8)}</td>
                                <td>{totalProceeds}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>



                    <hr></hr>
                    <button
                                onClick={() => this.props.getPriceInfo()
                                    .then(() => this.props.history.push('/transactions/buyNow'))}
                                className="card-link">Record a Bitcoin Purchase at the Current Market Price!
                            </button>
                            <hr></hr>

                    {/* <button
                        onClick={() => this.props.history.push('/transactions/buyNow')}
                        className="card-link">Record a Bitcoin Purchase at the Current Market Price!</button> */}

                    <h2>Current Bitcoin Price: ${currentBTCprice}</h2>
                    <h3>Last Updated: {(lastestUpdateTime)}</h3>
                    <button
                        onClick={() => this.props.getPriceInfo()}

                        className="card-link">Refresh Price</button>

                </section>
            </React.Fragment>


        )
    }

}
















