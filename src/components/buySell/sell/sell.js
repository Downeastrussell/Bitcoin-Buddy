import React, { Component } from 'react'
// import btcSymbol from "../../importedMedia/blackBTC1.png"
// import priceAPI from "../../../mods/priceAPI"
import "bootstrap/dist/css/bootstrap.min.css"
import "./sell.css"



export default class SellBitcoinForm extends Component {

  state = {


    sellDate: "",
    buyDate: "",
    buyPrice: "",
    sellPrice:"",
    volume: "",
    userId: "1", //get this from session storage


  };



  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange)
    this.setState(stateToChange);
  };



  buildSellTxn = evt => {
    evt.preventDefault();
    const txnToSell = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}
    console.log(txnToSell)
    const txn = {
      id: this.props.match.params.transactionsId,
      sellDate: this.state.sellDate,
      buyDate: txnToSell.buyDate,
      buyPrice: txnToSell.buyPrice,
      sellPrice: this.state.sellPrice,
      volume: txnToSell.volume,
      userId: this.state.userId,


    }

    this.props

      .sellBTC(txn)
      .then(() => this.props.history.push("/sell"))
    console.log(txn)
  };



  render() {
    const txn = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}

    return (

      <React.Fragment>

        <form className="sellForm">
          <div>Buy Date: {txn.buyDate}</div>
          <div>Buy Price: {txn.buyPrice}</div>

          <div className="form-group">

          <label htmlFor="sellDate">Enter Date Sold</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sellDate" />

          </div>

          <div className="form-group">

            <label htmlFor="sellPrice">Enter Sell Price</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sellPrice" />

          </div>


          <button
            type="submit"
            onClick={this.buildSellTxn}
            className="btn btn-primary"
          >
            Sell
              </button>
        </form>
        <button
                                onClick={() => this.props.history.push(`/sell/${txn.id}`)}
                                className="card-link">Go Back
                            </button>
      </React.Fragment>


    );
  }

}

