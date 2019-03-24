import { Route } from 'react-router-dom'
import React, { Component } from "react"
//Transaction Tab
import TransactionList from "./transactions/transactions"
import TransactionDetail from "./transactions/TransactionDetail"
import BuyBitcoinForm from "./buySell/buy/buy"
import SellBitcoinForm from "./buySell/sell/sell"
import priceAPI from "../mods/priceAPI"
import HomePage from "./home/home"



export default class ApplicationViews extends Component {
    state = {
        users: [],
        transactions: [],
        prices:[]

        // charts: [],


    }

    unrealizedProfit= txn =>{
        if(txn.btc>0){
         return ((this.props.prices[0])*(txn.btc)-(txn.usd))

        }
        else{
          return "0"

        }
    }
    realizedProfit(){

    }



    donateTXN = id =>  {
        return priceAPI.deleteUserTxn(id)
        .then(transactions => this.setState({
            transactions: transactions
          })
        )
      };

      buyBTC = txn => {
      return priceAPI.buyBTC(txn)
    .then(() => priceAPI.getUserTxn("3"))
    .then(transactions =>
      this.setState({
        transactions: transactions
      })
    )};

      sellBTC = txn => {
           return priceAPI.sellBTC(txn)
           .then(()=> priceAPI.getUserTxn("3") )
           .then(transactions =>
            this.setState({
                transactions: transactions
            }))
      };







    componentDidMount() {
        const newState = {}
        let userId = "3"      //****set this in future with session storage at login****//

       priceAPI.getBTCprice()
        .then(prices =>{newState.prices = prices})
        priceAPI.getSingleUserInfo(userId)
        .then(users =>{newState.users = users})


        // apiManager.getAllEmployees()
        // .then(employees => {newState.employees = employees})
        // apiManager.getAllLocations()
        // .then(locations => {newState.locations = locations})
        priceAPI.getUserTxn(userId)
        .then(transactions =>{newState.transactions = transactions
            console.log(newState)
            this.setState(newState)})





    }

    render() {
        return (

            <div className="container-div" >


                  <Route exact path="/" render={(props) => {
                     return <HomePage
                             users={this.state.users}
                             transactions={this.state.transactions}
                             prices={this.state.prices} />

                }}/>
                <Route exact path="/transactions" render={(props) => {
                    return <TransactionList
                            {...props}
                            transactions ={this.state.transactions}
                            users={this.state.users}
                            prices={this.state.prices}
                            donateTXN={this.donateTXN}/>
                }}/>

                <Route exact path="/transactions/:transactionsId(\d+)" render={(props) => {
                     return <TransactionDetail
                             {...props}
                             donateTXN={this.donateTXN}
                             transactions={this.state.transactions}
                             prices={this.state.prices} />
                }}/>

                <Route path="/transactions/buy" render={(props)=>{
                    return <BuyBitcoinForm
                            {...props}
                            transactions={this.state.transactions}
                            prices={this.state.prices}
                            buyBTC = {this.buyBTC}/>


                }}/>
                <Route path="/transactions/:transactionsId(\d+)/sell" render={(props)=>{
                    return <SellBitcoinForm
                            {...props}
                            transactions={this.state.transactions}
                            prices={this.state.prices}
                            sellBTC = {this.sellBTC}/>


                }}/>

           </div>
        )
    }
}