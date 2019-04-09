import { Route } from 'react-router-dom'
import React, { Component } from "react"
import TransactionList from "./transactions/transactions"
import TransactionDetail from "./transactions/TransactionDetail"
import BuyBitcoinPastForm from "./buySell/buy/buy"
import SellBitcoinForm from "./buySell/sell/sell"
import priceAPI from "../mods/priceAPI"
import HomePage from "./home/home"
import LoginPage from './login/login';
import BuyBitcoinNowForm from "./buySell/buy/buyNow"
// import SellPastTransactions from './buySell/sell/sellPast';
// import SellDetails from "./buySell/sell/sellDetails"
import Callback from "./authentication/Callback"
import Auth0Client from "./authentication/Auth"

// import {LineChartDemo} from "./charts/testCharts"
// import 'primereact/resources/themes/nova-light/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';



export default class ApplicationViews extends Component {
  state = {
    users: [],
    transactions: [],
    prices: [],
    priceHistory: []
  }


  getPriceInfo =()=>{
    return priceAPI.getBTCprice()
    .then(prices => this.setState({
      prices: prices
    }))
  };



  donateTXN = id => {
    return priceAPI.deleteUserTxn(id)
      .then(transactions => this.setState({
        transactions: transactions
      })
      )
  };

  buyBTC = txn => {
    const userId=sessionStorage.getItem('credentials');
    return priceAPI.buyBTC(txn)
      .then(() => priceAPI.getUserTxn(userId))
      .then(transactions =>
        this.setState({
          transactions: transactions
        })
      )
  };

  sellBTC = txn => {
    const userId=sessionStorage.getItem('credentials');
    return priceAPI.sellBTC(txn)
      .then(() => priceAPI.getUserTxn(userId))
      .then(transactions =>
        this.setState({
          transactions: transactions
        }))
  };

  // componentDidMount() {
  //   const newState = {}
  //   let userId = "1"      //****set this in future with session storage at login****//

  //   priceAPI.getBTCprice().then(prices => { newState.prices = prices })

  //   priceAPI.getSingleUserInfo(userId)
  //     .then(users => { newState.users = users })
  //   priceAPI.getPriceHistory()
  //     .then(priceHistory => { newState.priceHistory = priceHistory })
  //   priceAPI.getUserTxn(userId)
  //     .then(transactions => {
  //       newState.transactions = transactions
  //       console.log(newState)
  //       this.setState(newState)
  //     })
  // }



  componentDidMount() {
    const newState = {}
    let userId = sessionStorage.getItem('credentials')    //****set this in future with session storage at login****//

    priceAPI.getBTCprice().then((prices) => {
      newState.prices = prices;
      priceAPI.getSingleUserInfo(userId).then((users) => {
        newState.users = users;
        priceAPI.getUserTxn(userId).then((transactions) => (newState.transactions = transactions));
        priceAPI.getPriceHistory().then((priceHistory) => {
          newState.priceHistory = priceHistory;

          this.setState(newState)
          console.log(newState)
        });
      });
    });
  }

  render() {
    return (

      <div className="container-div" >

        <Route exact path="/callback" component={Callback} />

        <Route exact path="/login" render={(props) => {
          return <LoginPage
            users={this.state.users} />

        }} />

        <Route exact path="/" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <HomePage
              users={this.state.users}
              transactions={this.state.transactions}
              prices={this.state.prices} />;
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />

        <Route exact path="/transactions" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <TransactionList
              {...props}
              transactions={this.state.transactions}
              users={this.state.users}
              prices={this.state.prices}
              donateTXN={this.donateTXN}
              getPriceInfo={this.getPriceInfo}
              />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />
        <Route exact path="/transactions/:transactionsId(\d+)" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <TransactionDetail
              {...props}
              sellBTC={this.sellBTC}
              donateTXN={this.donateTXN}
              transactions={this.state.transactions}
              prices={this.state.prices} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />

        <Route exact path="/buy" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <BuyBitcoinPastForm
              {...props}
              transactions={this.state.transactions}
              prices={this.state.prices}
              buyBTC={this.buyBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />
        <Route path="/transactions/buyNow" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <BuyBitcoinNowForm
              {...props}
              prices={this.state.prices}
              transactions={this.state.transactions}
              buyBTC={this.buyBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />

        {/* <Route exact path="/sell" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <SellPastTransactions
              {...props}
              transactions={this.state.transactions}
              prices={this.state.prices}
              buyBTC={this.buyBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} /> */}

        {/* <Route exact path="/sell/:transactionsId(\d+)" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <SellDetails
              {...props}
              donateTXN={this.donateTXN}
              transactions={this.state.transactions}
              prices={this.state.prices}
              sellBTC={this.sellBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} /> */}

        <Route path="/sell/:transactionsId(\d+)/sellPast" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <SellBitcoinForm
              {...props}
              transactions={this.state.transactions}
              prices={this.state.prices}
              sellBTC={this.sellBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />

        <Route exact path="/transactions/:transactionsId(\d+)/sell" render={(props) => {
          if (Auth0Client.isAuthenticated()) {
            return <SellBitcoinForm
            {...props}
            transactions={this.state.transactions}
            prices={this.state.prices}
            sellBTC={this.sellBTC} />
          } else {
            Auth0Client.signIn();
            return null;
          }
        }} />

      </div>
    )
  }
}