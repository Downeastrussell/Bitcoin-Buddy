import React, { Component } from "react"
import btc from "../../importedMedia/bitcoin.png"
import btc1 from "../../importedMedia/blackBTC1.png"



export default class TransactionDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const txn = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}
        let btcPrice =this.props.prices[0]
        let btcDate = this.props.prices[1]

        if (txn.sold===false){
            return (

                <section className="txn">
                    <div key={txn.id} className="card">
                        <div className="card-body">
                            <h4><img src={btc} alt="btc"></img></h4>
                            <h6 className="card-title">Spent: ${txn.usd}</h6>
                            <h6 className="card-title">For {txn.buy}  Amount: <img src={btc1} alt="btc"></img> {txn.btc}</h6>
                            <h6 className="card-title">Purchased on {txn.date} at a rate of ${(txn.usd)/(txn.btc)} per Bitcoin</h6>
                            <h6>Unrealized Profit/Loss:{(btcPrice)*(txn.btc)-(txn.usd)}  </h6>
                            <h6>Current Bitcoin Price: ${btcPrice}  Updated on {btcDate}</h6>

                            <button
                                onClick={() => this.props.donateTXN(txn.id)
                                                .then(() => this.props.history.push("/transactions"))}
                                className="card-link">Donate
                            </button>
                            <button
                                onClick={()=> this.props.history.push(`/transactions/${txn.id}/sell`)}
                                className="card-link">Sell
                            </button>
                            <button
                                onClick={()=> this.props.history.push('/transactions')}
                                className="card-link">Go Back
                            </button>

                        </div>
                    </div>
                </section>
            )
        }
        else{
           return (

            <section className="txn">
            <div key={txn.id} className="card">
                <div className="card-body">
                    <h4><img src={btc} alt="btc"></img></h4>
                    <h6 className="card-title">Sold for ${Number(txn.usd).toFixed(2)}</h6>
                    <h6 className="card-title">Bought on {txn.date}</h6>
                    <h6 className="card-title">Sold on: {btcDate}</h6>
                    <h6>Profit/Loss:${Number(txn.profit).toFixed(2)}</h6>
                    <div className="buyButton">
                    <button type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push("/transactions/buy")}
                            }>
                        Buy Bitcoin
                    </button>
                </div>

                    <button
                                onClick={() => this.props.donateTXN(txn.id)
                                                .then(() => this.props.history.push("/transactions"))}
                                className="card-link">Donate
                            </button>

                    <button
                                onClick={()=> this.props.history.push('/transactions')}
                                className="card-link">Go Back</button>



                </div>
            </div>
        </section>


           )}




    }
}
