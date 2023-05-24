var steem = require('../lib');

const express = require('express');
const cors = require("cors");

const app = express();
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/login', (req, res) => {

  // console.log("request "+JSON.stringify(req.body))
if ( req.body.username !== null && req.body.pkey !== null){

    steem.api.getAccounts([req.body.username], function(err, result) {
      try{
        var pubWif= result[0].memo_key;

        const metadata = JSON.parse(result[0].posting_json_metadata).profile;
          const clientName = metadata.name;
        const clientImage = metadata.profile_image;

        //
        console.log( clientImage+" "+ clientName);
        var check = steem.auth.wifIsValid(req.body.pkey,pubWif)
        const data = {
          account_validate : check,
          clientName : clientName,
          clientImage : clientImage
        }
        res.status(200).json({data: data})

      }catch(e){
        res.status(400).json({data:"Please Provide Valid Username Or Private Memo Key "})
      }

      // var reputation = steem.formatter.reputation(result[0].reputation);
      // // console.log(reputation);
    });

} else {
  res.status(400).json({data:"Please Provide Username and Private Memo Key"})

}
});


// Start the server
app.listen(port, () => {
  console.log("NEw server alubukhraw aly")
  console.log(`Server is running on port ${port}`);
});



// var steem = require('../lib');
//
// // steem.api.getAccountCount(function(err, result) {
// // 	console.log(err, result);
// // });
//
// steem.api.getAccounts(['steem.dapps'], function(err, result) {
//     try{
//     var pubWif= result[0].memo_key;
// 	console.log(pubWif);
//     var privateKey = '5JmFdu2gUZ7tuEZQX5ikH6GMjtwuRAeoyzkf6E1oxrGue4yfw6n';
//     var check = steem.auth.wifIsValid(privateKey,pubWif)
//     console.log(check)
//
// }catch(e){
//     console.log(e)
// }
//
// 	var reputation = steem.formatter.reputation(result[0].reputation);
// 	console.log(reputation);
// });
// // steem.api.getAccounts(['blockseater'], function(err, result) {
// // 	console.log(err, result);
// // 	var reputation = steem.formatter.reputation(result[0].reputation);
// // 	console.log(reputation);
// // });
// // steem.api.getState('trending/steemit', function(err, result) {
// // 	console.log(err, result);
// // });
//
// // steem.api.getFollowing('ned', 0, 'blog', 10, function(err, result) {
// // 	console.log(err, result);
// // });
//
// // steem.api.getFollowers('dan', 0, 'blog', 10, function(err, result) {
// // 	console.log(err, result);
// // });
//
// // steem.api.streamOperations(function(err, result) {
// // 	console.log(err, result);
// // });
//
// // steem.api.getDiscussionsByActive({
// //   limit: 10,
// //   start_author: 'thecastle',
// //   start_permlink: 'this-week-in-level-design-1-22-2017'
// // }, function(err, result) {
// // 	console.log(err, result);
// // });
// // let s = steem.auth.getPrivateKeys('steem.dapps','P5JMHTPgHrtpNjDz3RpnGZJBsdFdM4gCakj8RuC9JrGgYWhsqrCx');
// // console.log("kia aya "+ JSON.stringify(s))
// let key = "5Hv82z1VtGb9q1yegzrv6aC6AEkwjSKzkQ81HySjbfMQPpzZmRi"
// // let pub = "5JmFdu2gUZ7tuEZQX5ikH6GMjtwuRAeoyzkf6E1oxrGue4yfw6f"
// // steem.api.setOptions({
// // 	url:"https://api.steemit.com",
// // 	address_prefix: 'TST',
// // 	useTestNet: true,
// //   });
// // steem.api.verifyAccountAuthority("steem.dapps",[key],(err,res)=>{
// // 	console.log("Result = "+err)
//
// // })
// // let check= steem.auth.wifIsValid(pub, pubKey);
// // let check = steem.auth.isWif(pub)
// // let check = steem.auth.toWif("steem.dapps", key, "posting")
// // let check = steem.auth.verify("steem.dapps", key, "login")
// // console.log(check)
