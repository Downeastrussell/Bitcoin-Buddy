import React, { Component } from 'react'
// import btcSymbol from "../../importedMedia/blackBTC1.png"
import "bootstrap/dist/css/bootstrap.min.css"
import "./buy.css"



export default class BuyBitcoinForm extends Component {

    state = {

        sell:"usd",
        buy:"Bitcoin",
        date:this.props.prices[1],
        usd:"",
        btc:"",
        userId:"3", //get this from session storage
        profit:"0",
        sold: false
    };



    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        console.log(stateToChange)
        this.setState(stateToChange);
      };



    buildNewTxn = evt =>{
        evt.preventDefault();
        const txn = {
            sell: this.state.sell ,
            buy: this.state.buy ,
            date: this.state.date,
            usd: this.state.usd,
            btc: this.state.btc,
            userId: this.state.userId,
            profit: this.state.profit,
            sold: this.state.sold

        }
        this.props.buyBTC(txn)

        .then(()=> this.props.history.push("/transactions"))


    };



   render() {
      console.log(this.state)
      let x =(this.state.usd)/(this.props.prices[0])
      let y = this.props.prices[1]
      console.log(y)
      console.log(x)


        return (

            <React.Fragment>

            <form className="buyForm">

            <div><h1>Current Price of Bitcoin: ${this.props.prices[0]}</h1></div>

            <div className="form-group">

            <label htmlFor="usd"></label>
            <input
              type="number"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="usd"
              placeholder="Enter $ Dollar Amount"/>


          </div>



          <div className="form-group">

            <input
              type="checkbox"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="btc"
              value= {x} />




            <label htmlFor="btc"><h2>Check the box and press the 'Submit' button to purchase {x} Bitcoin</h2></label>
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
                                onClick={()=> this.props.history.push('/transactions')}
                                className="card-link">Go Back</button>
          </React.Fragment>


        );
    }

}















