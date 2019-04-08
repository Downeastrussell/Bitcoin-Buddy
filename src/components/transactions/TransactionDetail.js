import React, { Component } from "react"
import btc from "../../importedMedia/bitcoin.png"
import btc1 from "../../importedMedia/blackBTC1.png"



export default class TransactionDetail extends Component {


    state = {
        userId: "1"
    }



    buildSellTxn = evt => {
        evt.preventDefault();
        const txnToSell = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}
        console.log(txnToSell)
        const txn = {
            id: this.props.match.params.transactionsId,
            sellDate: this.props.prices[1],
            buyDate: txnToSell.buyDate,
            buyPrice: txnToSell.buyPrice,
            sellPrice: (this.props.prices[0]) * (txnToSell.volume),
            volume: txnToSell.volume,
            userId: this.state.userId,


        }

        this.props

            .sellBTC(txn)
            .then(() => this.props.history.push("/transactions"))
        console.log(txn)
    };


    render() {

        const txn = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}
        let btcPrice = this.props.prices[0]
        let btcDate = this.props.prices[1]
        let realisedProfit = (txn.sellPrice - txn.buyPrice)
        let unrealisedProfit = ((Number(txn.volume) * this.props.prices[0]) - Number(txn.buyPrice))
        console.log(realisedProfit)
        console.log(txn)

        if (txn.sellDate === null) {
            return (

                <section className="txn">
                    <div key={txn.id} className="card">
                        <div className="card-body">
                            <h4><img src={btc} alt="btc"></img></h4>
                            <h6 className="card-title">Cost Basis: ${txn.buyPrice}</h6>
                            <h6 className="card-title">Amount: <img src={btc1} alt="btc"></img>{txn.volume}  </h6>
                            <h6 className="card-title">Purchased on {txn.buyDate} at a rate of ${(txn.buyPrice) / (txn.volume)} per Bitcoin</h6>
                            <h6>Unrealized Profit/Loss:{unrealisedProfit}  </h6>
                            <h6>Current Bitcoin Price: ${btcPrice}  Updated on {btcDate}</h6>

                            <button
                                onClick={() => this.props.donateTXN(txn.id)
                                    .then(() => this.props.history.push("/transactions"))}
                                className="card-link">Delete
                            </button>

                            {/* <button
                                type="submit"
                                onClick={this.buildSellTxn}
                                className="btn btn-primary">

                                Sell

                                </button> */}
                            <button
                                onClick={() => this.props.history.push('/transactions')}
                                className="card-link">Go Back
                            </button>

                        </div>
                    </div>
                </section>
            )
        }
        else {
            return (

                <section className="txn">
                    <div key={txn.id} className="card">
                        <div className="card-body">
                            <h4><img src={btc} alt="btc"></img></h4>
                            <h6 className="card-title">Sold on: {txn.sellDate}</h6>
                            <h6 className="card-title">Sold for ${Number(txn.sellPrice).toFixed(2)}</h6>
                            <h6 className="card-title">Bought on {txn.buyDate}</h6>
                            <h6 className="card-title">Bought for ${Number(txn.buyPrice).toFixed(2)}</h6>
                            <h6>Realised Profit/Loss on Sale:${realisedProfit.toFixed(2)}</h6>
                            <div className="buyButton">
                                <button
                                    onClick={() => this.props.donateTXN(txn.id)
                                        .then(() => this.props.history.push("/transactions"))}
                                    className="card-link">Delete
                            </button>
                                <button
                                    onClick={() => this.props.history.push('/transactions')}
                                    className="card-link">Go Back
                                </button>

                            </div>

                        </div>
                    </div>
                </section>


            )
        }




    }
}
