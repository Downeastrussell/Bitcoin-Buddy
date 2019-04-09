import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "./buy.css"

export default class BuyBitcoinNowForm extends Component {

  state = {
    buyDate: this.props.prices[1],
    sellDate: null,
    buyPrice: "",
    sellPrice: null,
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
    let amoutOfBitcoin = (this.state.buyPrice) / (this.props.prices[0])
    const txn = {


      buyDate: this.state.buyDate,
      sellDate: this.state.sellDate,
      buyPrice: this.state.buyPrice,
      sellPrice: this.state.sellPrice,
      volume: JSON.stringify(amoutOfBitcoin),
      userId: this.state.userId,



    }
    console.log(txn)
    this.props.buyBTC(txn)

      .then(() => this.props.history.push("/transactions"))


  };



  render() {
    let amoutOfBitcoin = (this.state.buyPrice) / (this.props.prices[0])

    return (

      <React.Fragment>

        <form className="buyForm">

          <div><h1>Current Price of Bitcoin: ${this.props.prices[0]}</h1></div>

          <div className="form-group">

            <label htmlFor="buyPrice"></label>
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
              type="hidden"
              className="form-control"
              id="volume"
              value={amoutOfBitcoin} />
            <label htmlFor="volume"><h2>Press the 'Buy Now' button to Record a Purchase of {amoutOfBitcoin} Bitcoin(s), Today!</h2></label>
          </div>




          <button
            type="submit"
            onClick={this.buildNewTxn}
            className="btn btn-primary"
          >
            Submit
              </button>
        </form>

        <button
          onClick={() => this.props.history.push('/transactions')}
          className="card-link">Go Back</button>
      </React.Fragment>


    );
  }

}

