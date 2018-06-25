const express = require('express')
const app = express()
const fs = require("fs");
const crypto = require('crypto');
const verify = crypto.createVerify('RSA-SHA1');


// loe message sisu
var data = fs.readFileSync("message.txt");
// loe public key millega signature kontrollida
var pubKey = fs.readFileSync("public_key.pem");
// signatuur
var sig = fs.readFileSync("signature.signed");
// base64 signatuur
var encSig = fs.readFileSync("signature.signed.base64");
// decode signature tagasi base64-st
var decodedSig = new Buffer(sig, 'base64');


// INFO
console.log("data is: " + data);
console.log("pubKey is: " + pubKey);
console.log("encSig (base64) is: " + encSig);
console.log("sig is: " + sig);
console.log("dec is: " + decodedSig);

// data mille signatuuri ma tsekin
verify.update(data);

// verify 

if (verify.verify(pubKey, decodedSig) === true) {
    console.log("HOORAY!");
} else {
    console.log("not verified")
};

// verify.verify saab teha ainult korra, muidu tuleb Error:Not initialised
// console.log(verify.verify(pubKey, sig));
// console.log(verify.verify(pubKey, decodedSig));


app.get('/', function (req, res) {
    res.send('<h1>signing test app</h1>')
});

// Server start
app.listen(8005, "localhost", function () {
    console.log('signApp listening on port 8005')
});
