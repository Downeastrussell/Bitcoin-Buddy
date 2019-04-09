import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./buy.css"




export default class BuyBitcoinPastForm extends Component {

  state = {

    priceHistory: [],
    buyDate: "",
    sellDate: "",
    buyPrice: "",
    sellPrice: "",
    volume: "",
    userId: sessionStorage.getItem('credentials'), //get this from session storage
  };



  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange)
    this.setState(stateToChange);
  };




  buildNewTxn = evt => {
    evt.preventDefault();
    // let amoutOfBitcoin = (this.state.buyPrice) / (this.props.prices[0])
    const txn = {


      buyDate: this.state.buyDate,
      sellDate: this.state.sellDate,
      buyPrice: this.state.buyPrice,
      sellPrice: this.state.sellPrice,
      volume: this.state.volume,
      userId: this.state.userId,



    }
    console.log(txn)
    this.props.buyBTC(txn)

      .then(() => this.props.history.push("/transactions"))


  };



  render() {

    return (

      <React.Fragment>

        <form className="buyForm">
        <h1>Enter Historical Bitcoin Transactions and start tracking your Bitcoin Investment, Today! </h1>

          <div className="form-group">

            <label htmlFor="buyPrice">Purchase Price</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="buyPrice"
              placeholder="Enter $ Dollar Amount" />


          </div>
          <div className="form-group">

            <input
              type="number"
              className="form-control"
              id="volume"
              onChange={this.handleFieldChange} />
            <label htmlFor="volume">Amount of Bitcoin Purchased</label>
          </div>

          <div className="form-group">
            <label htmlFor="buyDate">Buy Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="buyDate"
            />

          </div>
          <div className="form-group">

            <label htmlFor="sellPrice">Proceeds from Sale</label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sellPrice"
              placeholder="Enter $ Dollar Amount" />


          </div>

          <div className="form-group">
            <label htmlFor="sellDate">Buy Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="sellDate"
            />

          </div>








          <button
            type="submit"
            onClick={this.buildNewTxn}
            className="btn btn-primary"
          >
            Save Transaction
              </button>
        </form>


      </React.Fragment>


    );
  }

}















