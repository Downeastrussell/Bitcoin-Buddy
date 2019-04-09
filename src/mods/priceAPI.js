const remoteURL = "http://localhost:5002"

export default {

            ////////////////////////////////////
            /////----Admin API calls------/////
            ////////////////////////////////////
  getAllTxn() {
    return fetch(`${remoteURL}/transactions`).then(e => e.json())
  },








            ///////////////////////////////////////////////
            /////----Users Transaction API calls------/////
            ///////////////////////////////////////////////



  getUserTxn(userId) {
    return fetch(`${remoteURL}/transactions?userId=${userId}`).then(e => e.json())
  },

  getSingleTxn(txnId){
    return fetch(`${remoteURL}/transactions/${txnId}`).then(e => e.json())
  },


  deleteUserTxn(id){
    return fetch(`${remoteURL}/transactions/${id}`, {
           method: "DELETE"
            }).then(d=>d.json())
            .then(() => fetch(`${remoteURL}/transactions`))
            .then(r=>r.json())

},

            ///////////////////////////////////////////////
            /////-----Users buy/sell API calls--------/////
            ///////////////////////////////////////////////
buyBTC(txn) {
  return fetch(`${remoteURL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(txn)
  }).then(r => r.json())
},

sellBTC(txn) {
  return fetch(`${remoteURL}/transactions/${txn.id}` , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(txn)
  }).then(r => r.json());
},

getPriceHistory(){
  return fetch(`${remoteURL}/priceHistory`).then(e => e.json())
},





            ////////////////////////////////////
            /////----price API call(s)------/////
            ////////////////////////////////////

getBTCprice() {
  return fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`).then(e => e.json())

.then(parsed => {
  let currentPrice =[parsed.bpi.USD.rate_float,parsed.time.updated]



  console.log(currentPrice)
  return currentPrice

})},

            ///////////////////////////////////
            /////----Users API calls------/////
            ///////////////////////////////////

getSingleUserInfo(userId) {
    return fetch(`${remoteURL}/users/${userId}`).then(e => e.json())}










}