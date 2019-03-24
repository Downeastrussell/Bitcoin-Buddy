import React, { Component } from 'react'
// import btcSymbol from "../../importedMedia/blackBTC1.png"
import priceAPI from "../../../mods/priceAPI"
import "bootstrap/dist/css/bootstrap.min.css"
import "./sell.css"



export default class SellBitcoinForm extends Component {

  state = {

    sell: "Bitcoin",
    buy: "usd",
    date: this.props.prices[1],
    usd: "",
    btc: "0",
    userId: "3", //get this from session storage
    profit: "",
    sold: true
  };



  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange)
    this.setState(stateToChange);
  };



  buildSellTxn = evt => {
    evt.preventDefault();
    const txn1 = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}
    const txn = {
      id: this.props.match.params.transactionsId,
      sell: this.state.sell,
      buy: this.state.buy,
      date: this.props.prices[1],
      usd: (this.props.prices[0]) * (txn1.btc),
      btc: "0",
      userId: this.state.userId,
      profit: (this.props.prices[0]) * (txn1.btc) - (txn1.usd),
      sold: this.state.sold

    }

    this.props

      .sellBTC(txn)
      .then(() => this.props.history.push("/transactions"))
    console.log(txn)
  };

  // componentDidMount() {
  //   priceAPI.getSingleTxn(this.props.match.params.transactionsId)
  //     .then(txn => {
  //       this.setState({
  //         // sell: txn.sell ,
  //         // buy: txn.buy ,
  //         date: txn.date,
  //         // usd: txn.usd,
  //         btc: txn.btc,
  //         userId: txn.userId,
  //         // profit: txn.profit,
  //         // sold: txn.sold
  //       })
  //       console.log(txn)
  //     })

  // }

  render() {
    const txn = this.props.transactions.find(a => a.id === parseInt(this.props.match.params.transactionsId)) || {}

    let x = (this.props.prices[0])
    let y = this.props.prices[1]
    const profit = (x) * (txn.btc) - (txn.usd)
    console.log(profit)





    return (

      <React.Fragment>

        <form className="sellForm">
          <div>Current Date/Time: {this.props.prices[1]}</div>
          <div>Current Price of Bitcoin: ${this.props.prices[0]}</div>
          <div>Buy Bitcoin price ${(txn.usd) / (txn.btc)}</div>
          <div>Buy Date: {txn.date}</div>

          {/* <div className="form-group"> */}
          {/* <label htmlFor="usd">Bitcoin</label>
            <input
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="usd"

              value={this.state.usd} />



          </div> */}

          {/* <div className="form-group">
            <label htmlFor="profit">Bitcoin</label>
            <input
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="profit"

              value={profit} />



          </div> */}



          {/* <input type="text" htmlFor="profit" id="profit" onChange={this.handleFieldChange} value={profit} /> */}

          {/*
          <div className="form-group">

            <input
              htmlFor="usd"
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="btc"
              value={"0"} />
          </div> */}

          <div>Sell: {txn.btc} Bitcoin to realise a ${profit} profit/loss</div>



          <button
            type="submit"
            onClick={this.buildSellTxn}
            className="btn btn-primary"
          >
            Sell
              </button>
        </form>
      </React.Fragment>


    );
  }

}

