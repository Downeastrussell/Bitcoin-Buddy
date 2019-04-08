import React, { Component } from "react"
import btcSymbol from "../../importedMedia/blackBTC1.png"
import "./home.css"




export default class HomePage extends Component {
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
        let bitcoinUnSold = 0;
        this.props.transactions.map(x => {
            if (x.sellDate === null) {
                return bitcoinUnSold += Number(x.volume)
            }
        })
        let costBasis = 0;
        this.props.transactions.map(x => {

            return costBasis += Number(x.buyPrice)

        })
        let unrealizedProfit = 0;
        this.props.transactions.map(txn => {
            if (txn.sellDate === null) {
                return unrealizedProfit += (((Number(txn.volume)) * currentBTCprice)) - Number(txn.buyPrice)
            }
        })
        let realizedProfit = 0;
        this.props.transactions.map(txn => {
            if (txn.sellDate != null) {
                return realizedProfit += ((Number(txn.sellPrice)) - Number(txn.buyPrice))
            }
        })

        console.log(totalProceeds)
        console.log(bitcoinUnSold)
        console.log(currentBTCprice)





        return (





            <div className="container-profilecard">

                <h1>Welcome to BitcoinBuddy</h1>
                <h2>Current Bitcoin Price: ${currentBTCprice}</h2>
                <h2>Last updated on: {lastestUpdateTime}</h2>

                <hr></hr>

                <h1>Account Overview</h1>
                <h2>Total Value of Account: ${(totalProceeds+((bitcoinUnSold)*(currentBTCprice))).toFixed(2)} </h2>
                <h2>Total Profit and Loss: ${((realizedProfit)+(unrealizedProfit)).toFixed(2)}</h2>

                <hr></hr>


                <h1>Bitcoin Purchases</h1>
                <h2>Total Cost Basis: ${(costBasis).toFixed(2)} </h2>
                <h2>Total Bitcoin Bought:  <img src={btcSymbol} alt="btc" className="icon--btx" />{Number(totalBTC).toFixed(8)}</h2>

                <hr></hr>

                <h1>Info on Bitcoin Sales</h1>
                <h2>Total Bitcoin Sold:  <img src={btcSymbol} alt="btc" className="icon--btx" /> {Number(bitcoinSold).toFixed(8)}</h2>
                <h2>Total Realized Profit from Sales: ${(realizedProfit).toFixed(2)}</h2>
                <h2>Net Proceeds: ${(totalProceeds).toFixed(2)}</h2>

                <hr></hr>

                <h1>Info on Unsold Bitcoin</h1>
                <h2>Unsold Bitcoin:  <img src={btcSymbol} alt="btc" className="icon--btx" />{Number(totalBTC - bitcoinSold).toFixed(8)}</h2>
                <h2>Value of Unsold Bitcoin: ${Number((totalBTC - bitcoinSold) * currentBTCprice).toFixed(2)}</h2>
                <h2>Total Unrealized Profit/Loss: ${(unrealizedProfit).toFixed(2)}</h2>




                <br></br>
                <br></br>
            </div>






        )
    }
}