import React, { Component } from "react"
// import btc from "../../importedMedia/bitcoin.png"
import btc1 from "../../importedMedia/blackBTC1.png"
import "./home.css"




export default class HomePage extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */

        let btcPrice = this.props.prices[0]
        let btcDate = this.props.prices[1]

        let totalUSDspent = 0;
        this.props.transactions.map(x => {
            if (Number(x.btc) > 0) {
                console.log(totalUSDspent)
                return totalUSDspent += Number(x.usd)
            }
        })
        let totalBTC = 0;
        this.props.transactions.map(x => {
            return totalBTC += Number(x.btc)
        })
        let totalUSDavaliable = 0;
        this.props.transactions.map(x => {
            if (x.btc === "0") {
                return totalUSDavaliable += Number(x.usd)
            }
        })
        let totalProfit = 0;
        this.props.transactions.map(x=>{
            return totalProfit += Number(x.profit)
        })






        return (





            <div className="container-profilecard">

                <h1>Welcome to BitcoinBuddy</h1>
                <h2>Current Bitcoin Price: ${btcPrice}</h2>
                <h2>Last updated on: {btcDate}</h2>

                <div key={this.props.users.id} className="card">
                    <img className="card" src={this.props.users.picture} alt={this.props.users.name}></img>
                    <h1>{this.props.users.name}</h1>
                    <p className="title">Creator of Bitcoin</p>
                    <p><button>Change profile Picture</button></p>

                </div>

                <table class="cinereousTable">
                    <thead>
                        <tr>
                            <th>Total Account Balance($USD): </th>
                            <th>Total USD in Account</th>
                            <th>Total Bitcoin in Account</th>
                            <th>Unrealized profit/loss:</th>
                            <th>Realized profit/loss:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${(totalBTC * btcPrice) + totalUSDavaliable}</td>
                            <td>${totalUSDavaliable}</td>
                            <td><img src={btc1} alt="btc"></img>{totalBTC}</td>
                            <td>{(totalUSDspent)-(totalBTC*btcPrice)}</td>
                            <td>{totalProfit}</td>
                        </tr>
                    </tbody>
                    {/* <tbody>
                        <tr>
                            <td>cell1_1</td>
                            <td>cell2_1</td>
                            <td>cell3_1</td>
                            <td>cell4_1</td>
                            <td>cell5_1</td>
                        </tr>
                        <tr>
                            <td>cell1_2</td>
                            <td>cell2_2</td>
                            <td>cell3_2</td>
                            <td>cell4_2</td>
                            <td>cell5_2</td>
                        </tr>
                        <tr>
                            <td>cell1_3</td>
                            <td>cell2_3</td>
                            <td>cell3_3</td>
                            <td>cell4_3</td>
                            <td>cell5_3</td>
                        </tr>
                        <tr>
                            <td>cell1_4</td>
                            <td>cell2_4</td>
                            <td>cell3_4</td>
                            <td>cell4_4</td>
                            <td>cell5_4</td>
                        </tr>
                        <tr>
                            <td>cell1_5</td>
                            <td>cell2_5</td>
                            <td>cell3_5</td>
                            <td>cell4_5</td>
                            <td>cell5_5</td>
                        </tr>
                    </tbody> */}
                </table>
            </div>






        )
    }
}