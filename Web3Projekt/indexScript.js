'use:strict';
window.onload=function(){

    //Die Adresse muss in remix oder mist jedes Mal neu erstellt werden
    var contract_address = "0xcA9A48Ca634C88d5801E413cd8C3888FFa3b4351";
    //nicht sicher, ob die abi jedes Mal gleich bleibt?
    var contract_abi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "userBalance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "Token2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "value", "type": "uint256" } ], "name": "buyGood", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "200000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "advertId", "type": "uint256" } ], "name": "getAdvertValue", "outputs": [ { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "percentCharged", "type": "uint256" }, { "name": "advertId", "type": "uint256" } ], "name": "charge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "18" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "advertUrl", "type": "string" }, { "name": "fluxCoins", "type": "uint256" } ], "name": "addAdvert", "outputs": [ { "name": "advertId", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newBuyPrice", "type": "uint256" } ], "name": "setBuyPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "burnFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getMyInvestorBalance", "outputs": [ { "name": "coinCount", "type": "uint256", "value": "200000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTokenName", "outputs": [ { "name": "Tokenname", "type": "string", "value": "Token2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "Owner", "type": "address", "value": "0xe44beeb8fc50c003498841f2ff6d356b78886837" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0xe44beeb8fc50c003498841f2ff6d356b78886837" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "TT2" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [ { "name": "amount", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "adverts", "outputs": [ { "name": "adOwner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "url", "type": "string", "value": "" }, { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalSupply", "outputs": [ { "name": "TotalSupply", "type": "uint256", "value": "200000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "globalAdvertId", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAdvert", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMyUserBalance", "outputs": [ { "name": "coinCount", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [ { "name": "revenue", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newSellPrice", "type": "uint256" } ], "name": "setSellPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "200" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "Token2" }, { "name": "tokenSymbol", "type": "string", "index": 2, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "TT2" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "newBalance", "type": "uint256" } ], "name": "Shop", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "percentCharged", "type": "uint256" }, { "indexed": false, "name": "newBalance", "type": "uint256" } ], "name": "Charge", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "advertId", "type": "uint256" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "AddAdvertisement", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" } ]

    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    //var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    //web3.eth.defaultAccount = web3.eth.accounts[0];
    var contract_instance = web3.eth.contract(contract_abi).at(contract_address);
    function getName() {
        document.getElementById("TokenName").innerText = contract_instance.getTokenName();
    }
    function getTotalSupply() {
        document.getElementById("TotalSupply").innerText = contract_instance.getTotalSupply();
    }
    function getTokenOwner() {
        document.getElementById("TokenOwner").innerText = contract_instance.getOwner();
    }
    function getBalance(number, account) {
        web3.eth.getBalance(web3.eth.accounts[number], function (error, balance) {
            document.getElementById(account).innerText = web3.fromWei(balance, "ether");
        });
    }








    //Der Investor kann für Ether Tokens kaufen
    function buyTokens(account) {
        //var value = contract_instance.buy({from: web3.eth.accounts[account], value: document.getElementById('value').value
        web3.personal.unlockAccount(web3.eth.accounts[account], 'test1234');
        contract_instance.buy({from: web3.eth.accounts[account], value: document.getElementById('value').value}, function(error, result) {
            if(error) {
                console.error(error);
            } else {
                var txHash = result;
                console.log(txHash);
                //callWhenMined(txHash, getTokenBalance('tokenBalance', account));
                callWhenMined(txHash, getTokenBalance('tokenBalance', web3.eth.accounts[account]));
            }
        });
    }

    function callWhenMined(txHash, callback) {
        web3.eth.getTransactionReceipt(txHash, function(error, rcpt) {
            if(error) {
                console.error(error);
            } else {
                if(rcpt == null) {
                    setTimeout(function() {
                        callWhenMined(txHash, callback);
                    }, 500);
                } else {
                    callback();
                }
            }
        })
    }

    function getTokenBalance(id, account) {
        //document.getElementById(id).innerText = getBalance(document.getElementById('value').value, account);
        web3.eth.getBalance(web3.eth.accounts[account], function (error, balance) {
            document.getElementById(id).innerText = web3.fromWei(balance, "ether"); });
    }
}