'use:strict';

window.onload=function() {

     
    
    findAvailableAdverts();
    getFirstAdvert();
    // general information of the contract
    getName();
    getTotalSupply();
    // user information
    getEachData();
  
    getBuyPrice('value1', 'etherCost1');  
    
  /*  
   (function(){
    getBalance(1, 'ether1');
    setTimeout(arguments.callee, 500);
})();
*/
    getFirstAdvertURL();
   
}

function getFirstAdvertURL() {
    var col = document.getElementsByClassName("col");
    var secondCol = col[col.length - 2];
    if(secondCol.childNodes[2].nextElementSibling != null) {
        document.getElementById('testWerbung').src = secondCol.childNodes[2].nextElementSibling.childNodes[1].getElementsByTagName('span')[0].innerHTML;
    }
    console.log(secondCol.childNodes[2].nextElementSibling.childNodes[1].getElementsByTagName('span')[0].innerHTML);
}

function createLodingAnimation(id) {
    var newLoading = document.createElement('p');
    newLoading.className = 'loading';
    newLoading.innerHTML = "Transaktion wird bearbeitet ";
    
    var newSpan1 = document.createElement('span');
    newSpan1.innerHTML = '.';
    newLoading.appendChild(newSpan1);
    var newSpan2 = document.createElement('span');
    newSpan2.innerHTML = '.';
    newLoading.appendChild(newSpan2);
    var newSpan3 = document.createElement('span');
    newSpan3.innerHTML = '.';
    newLoading.appendChild(newSpan3);
    
   // document.getElementById(id).appendChild(newLoading);
    
    
    return newLoading;
}


// Fills advert list with available adverts 
function findAvailableAdverts() {
    for(firstAdvert = contract_instance.watchAdvertId.call(); firstAdvert < contract_instance.emptyAdvertId.call(); firstAdvert++) {
        makeAdvert(web3.toAscii(contract_instance.getAdvertByIndex(firstAdvert)[1]), contract_instance.getAdvertByIndex(firstAdvert)[2]);
    }
    
    console.log(firstAdvert < contract_instance.emptyAdvertId.call());
}

// Gets each accounts data 
function getEachData() {
    for(account = 1; account < 5; account++) {
        if(account < 3) {
            getOwner('investor' + account, account);
            getBalance(account, 'ether' + account);  
            getTokenBalance('token' + account, account);
        } else {
            getOwner('user' + account, account);
            getTokenBalance('token' + account, account);
        }
    }
}

var newBatteryLevel;
var newURL;

var firstAdvertBatteryLevel;
var firstAdvertURL;

function getFirstAdvert() {
    firstAdvertURL = 'newURL' + contract_instance.watchAdvertId.call();
    firstAdvertBatteryLevel = 'newBatteryLevel' + contract_instance.watchAdvertId.call();   
}

// Adds a new Advert in the second Column when an advert is bought 
function makeAdvert(URL, TokenValue) {

    var newAdvert = document.createElement('div');
    newAdvert.className = 'advert';
    
    var newH3 = document.createElement('h3');
    newH3.innerHTML = 'Werbung ' + contract_instance.emptyAdvertId.call();
    
    newAdvert.appendChild(newH3);
    
    var newCompleteAdvert = document.createElement('span');
    newCompleteAdvert.innerHTML = 'URL: ';

    newURL = document.createElement('span');
    newURL.id = 'newURL' + contract_instance.watchAdvertId.call();
    newURL.innerHTML = URL;
    
    var newBattery = document.createElement('div');
    newBattery.className = 'battery';
    
    newBatteryLevel = document.createElement('div');
    newBatteryLevel.id = 'newBatteryLevel' + contract_instance.watchAdvertId.call();
    newBatteryLevel.style.textAlign = 'center';
    newBatteryLevel.style.backgroundColor = 'chartreuse';
    newBatteryLevel.style.width = '100%';
    newBatteryLevel.style.height = '100%';
    newBatteryLevel.innerHTML = TokenValue;
    
    newBattery.appendChild(newBatteryLevel);
    newCompleteAdvert.appendChild(newURL);
    newCompleteAdvert.appendChild(newBattery);
    
    var newZero = document.createElement('span');
    newZero.className = 'zeroPercent'
    newZero.innerHTML = '0%';
    
    var new100 = document.createElement('span');
    new100.innerHTML = '100%';
    new100.style.paddingLeft = '20%';
    
    newAdvert.appendChild(newCompleteAdvert);
    newAdvert.appendChild(newZero);
    newAdvert.appendChild(new100);

    var col = document.getElementsByClassName("col");
    var secondCol = col[col.length - 2];
    secondCol.appendChild(newAdvert);
}


// This adress needs to be created new whenever the contract gets deployed
var contract_address = "0x52fDf51Db56A0ABB82782e4A1207a9E0E8118FCa";            
// Stays the same until the solidity contract gets changed
var contract_abi = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "userBalance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBuyPrice", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "FluxCoin Alpha 1.1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "value", "type": "uint256" } ], "name": "buyGood", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "1e+22" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "advertId", "type": "uint256" } ], "name": "getAdvertValue", "outputs": [ { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8", "value": "18" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_value", "type": "uint256" } ], "name": "burn", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "sellPrice", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getWatchAdvertId", "outputs": [ { "name": "advertId", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "advertUrl", "type": "string" }, { "name": "fluxCoins", "type": "uint256" } ], "name": "addAdvert", "outputs": [ { "name": "advertId", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newBuyPrice", "type": "uint256" } ], "name": "setBuyPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "watchAdvertId", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "burnFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getMyInvestorBalance", "outputs": [ { "name": "coinCount", "type": "uint256", "value": "1e+22" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "emptyAdvertId", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "buyPrice", "outputs": [ { "name": "", "type": "uint256", "value": "1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTokenName", "outputs": [ { "name": "Tokenname", "type": "string", "value": "FluxCoin Alpha 1.1" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [ { "name": "Owner", "type": "address", "value": "0x511afb79880d85bfdd05f4ca2dd4d4c203dcb431" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x511afb79880d85bfdd05f4ca2dd4d4c203dcb431" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "index", "type": "uint256" } ], "name": "getAdvertByIndex", "outputs": [ { "name": "owner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "url", "type": "string", "value": "" }, { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string", "value": "FC" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "buy", "outputs": [ { "name": "amount", "type": "uint256" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "adverts", "outputs": [ { "name": "adOwner", "type": "address", "value": "0x0000000000000000000000000000000000000000" }, { "name": "url", "type": "string", "value": "" }, { "name": "value", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTotalSupply", "outputs": [ { "name": "TotalSupply", "type": "uint256", "value": "1e+22" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" } ], "name": "approveAndCall", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getAdvert", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getMyUserBalance", "outputs": [ { "name": "coinCount", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "amount", "type": "uint256" } ], "name": "sell", "outputs": [ { "name": "revenue", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getEmptyAdvertId", "outputs": [ { "name": "advertId", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newSellPrice", "type": "uint256" } ], "name": "setSellPrice", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "minCharged", "type": "uint8" }, { "name": "advertId", "type": "uint256" } ], "name": "charge", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "initialSupply", "type": "uint256", "index": 0, "typeShort": "uint", "bits": "256", "displayName": "initial Supply", "template": "elements_input_uint", "value": "10000" }, { "name": "tokenName", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "token Name", "template": "elements_input_string", "value": "FluxCoin Alpha 1.1" }, { "name": "tokenSymbol", "type": "string", "index": 2, "typeShort": "string", "bits": "", "displayName": "token Symbol", "template": "elements_input_string", "value": "FC" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "newBalance", "type": "uint256" } ], "name": "Shop", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "chargedValue", "type": "uint256" }, { "indexed": false, "name": "newBalance", "type": "uint256" } ], "name": "Charge", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "advertId", "type": "uint256" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "AddAdvertisement", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Burn", "type": "event" } ]

 if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Sets the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


function unlockAccount(account, password, isUser) {
    if(!isUser) {
        document.getElementById("transaction" + account).appendChild(createLodingAnimation('transaction' + account));
    }
    web3.personal.unlockAccount(web3.eth.accounts[account], password);
}



var actualAdvert;

/* ------------ Constant functions ------------ */

// Contract instance
var contract_instance = web3.eth.contract(contract_abi).at(contract_address);

// Gets the name of the token
function getName() {
    //document.getElementById("TokenName").innerText = contract_instance.getTokenName();
    document.getElementById("TokenName").innerText = contract_instance.name.call();
}

function getAvailableSupply() {
    getTokenOwner(0)
}

// Gets the total supply of the token
function getTotalSupply() {
    //document.getElementById("totalSupply").innerText = contract_instance.getTotalSupply();
    document.getElementById("totalSupply").innerText = web3.fromWei(contract_instance.getTotalSupply(), "ether");
}

// Gets the token owner
function getTokenOwner(id) {
    document.getElementById(id).innerText = contract_instance.getOwner();
}

// Gets the owner of its account
function getOwner(id, accountNumber) {
    var owner = web3.eth.accounts[accountNumber];
    owner = "...".concat(owner.substr(owner.length - 20));
    //document.getElementById(id).innerText = web3.eth.accounts[accountNumber];
    document.getElementById(id).innerText =  "...".concat(owner.substr(owner.length - 20));
}

// Gets the users balance
function getBalance(account, id) {
    web3.eth.getBalance(web3.eth.accounts[account], function (error, balance) {
        document.getElementById(id).innerText = web3.fromWei(balance, "ether");
    });
}      

 // Gets the token balance
function getTokenBalance(id, account) {
    document.getElementById(id).innerText = contract_instance.getMyInvestorBalance({from: web3.eth.accounts[account]});                   
}

// Gets the buyPrice
function getBuyPrice(fromId, toId) {
    //document.getElementById(toId).innerText = web3.fromWei(contract_instance.getBuyPrice() * document.getElementById(fromId).value, "ether");
    document.getElementById(toId).innerText = web3.fromWei(contract_instance.buyPrice.call() * document.getElementById(fromId).value, "ether");
}

// Gets advert by index
function getAdvertByIndex(index) {
    //var test = contract_instance.getAdvertByIndex(index);
    
    var test = contract_instance.getAdvertByIndex(contract_instance.watchAdvertId.call());
    
   // console.log(test[0]);
   // console.log(web3.toAscii(test[1]));
   // console.log(test[2]);
    
    //document.getElementById("advertURL1").innerText = web3.toAscii(test[1]);
    //document.getElementById("testWerbung").src = web3.toAscii(test[1]);
    //document.getElementById("battery-level1").innerText = test[2];
    
    
    
    //document.getElementById(firstAdvertURL.id).innerText = web3.toAscii(test[1]);
    //document.getElementById(firstAdvertBatteryLevel.id).innerText = test[2];
    
    
    
   
    console.log(firstAdvertURL);
    console.log(firstAdvertBatteryLevel);
    
    document.getElementById(firstAdvertURL).innerText = web3.toAscii(test[1]);
    document.getElementById(firstAdvertBatteryLevel).innerText = test[2];
    
   // console.log("watchAdvertId: " + contract_instance.watchAdvertId.call());
   // console.log("emptyAdvertId: " + contract_instance.emptyAdvertId.call());
}

/* ------------ Non Constant functions ------------ */

var multiplier = Math.pow(10, 18);

// An investor buys tokens for ether
function buyTokens(account) {
    unlockAccount(account, 'pwadO9P1m', false);
 
    contract_instance.buy({from: web3.eth.accounts[account], value: document.getElementById('value1').value * multiplier}, function(error, result) {
    //contract_instance.buy({from: web3.eth.accounts[account], 2 *10^20}, function(error, result) {
        if(error) {
            console.error(error);
        } else {
            var txHash = result;
            console.log(txHash);
            //callWhenMined(txHash, getTokenBalance('tokenBalance', account));
            //callWhenMined(txHash, getTokenBalance);
            callWhenMined(txHash, function(error, result) {
                //document.getElementById('token1').innerText = contract_instance.getMyInvestorBalance({from: web3.eth.accounts[1]}) / multiplier; 

                getBalance(1, 'ether1');
                document.getElementById('token1').innerText = contract_instance.getMyInvestorBalance({from: web3.eth.accounts[1]}) / multiplier; 
               // getTotalSupply();

            });
            //callWhenMined2(txHash, getBalance);
        }
    });
}

// An investor specifies an URL and its token value which will get substracted from his token balance
function buyAdvert(account, url, anzahlTokens) {
    unlockAccount(account, 'pwadO9P1m', false);
    contract_instance.addAdvert(web3.toHex(document.getElementById(url).value), web3.toBigNumber(document.getElementById(anzahlTokens).value), {from: web3.eth.accounts[1], gas:200000}, 
    function (error, result) {
        if (error) {
            console.error(error);
        } else {
            var txHash = result;
            console.log(txHash);
            callWhenMined(txHash, function (error, result) {
                document.getElementById('token1').innerText = contract_instance.getMyInvestorBalance({
                    from: web3.eth.accounts[1]
                });
                makeAdvert(document.getElementById(url).value, document.getElementById(anzahlTokens).value);
                getFirstAdvertURL();
            });
        }
    });
}

// A user charges his phone
function charge(seconds, advertID) {
    var radios = document.getElementsByName('charging1');
    if(radios[1].checked == true) {
        //web3.personal.unlockAccount(web3.eth.accounts[1], 'pwadO9P1m');
        unlockAccount(3, '234567891', true);
           contract_instance.charge(web3.toHex(seconds), web3.toBigNumber(contract_instance.watchAdvertId.call()), {from: web3.eth.accounts[3], gas:200000
        }, function (error, result) {
            if (error) {
                console.error(error);
            } else {
                var txHash = result;
                console.log(txHash);
                callWhenMined(txHash, function (error, result) {
                    
                    
                    console.log("<= 0?");
                    console.log(contract_instance.getAdvertByIndex(contract_instance.watchAdvertId.call())[2] <= 0);
                    if(contract_instance.getAdvertByIndex(contract_instance.watchAdvertId.call())[2] <= 0) {
                        console.log("less or equal 0");
                        
                        var col = document.getElementsByClassName("col");
                        var secondCol = col[col.length - 2];
                        console.log(secondCol.getElementsByClassName('advert')[0]);
                        var firstAdvert = secondCol.getElementsByClassName('advert')[0];
                        secondCol.removeChild(firstAdvert);
                        getFirstAdvertURL();
                        return;
                    }
                    
                    
                    getFirstAdvert();
                    
                    
                    getAdvertByIndex(contract_instance.watchAdvertId.call());
                    
                    
                    getTokenBalance('token' + 3, 3);
                    console.log(contract_instance.getMyInvestorBalance({from: web3.eth.accounts[3]}));
                    
                    
                    updateBatteryPercentage(seconds, 5);
                    

                    //document.getElementById(firstAdvertBatteryLevel).innerText = contract_instance.getAdvertByIndex(contract_instance.watchAdvertId.call())[2];
                    document.getElementById(newBatteryLevel.id).innerText = contract_instance.getAdvertByIndex(contract_instance.watchAdvertId.call())[2];
                });
            }
        });
    }
    
    
    //return seconds;
}

// Calls a non constant function when it got mined 
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
                //document.getElementById("transaction1").innerText = " a ";  
                document.getElementById("transaction1").innerHTML = '&nbsp;';
                callback();
                //callback('tokenBalance', 1);
                clearInput('value1');
            }
        }
    })
}

// Clears input values
function clearInput(id) {
    document.getElementById(id).value = "";
}



var batteryFull;

function updateBatteryPercentage(seconds, id) {
    batteryFull = document.getElementById('newBatteryLevel' + id).innerText;
    var newPercentage = (1 - (seconds / batteryFull)) * 100;
    document.getElementById('newBatteryLevel' + id).innerText = batteryFull - seconds;
    document.getElementById('newBatteryLevel' + id).style.width = newPercentage + "%";
    
    console.log(newPercentage + "%");
}       

function myFunction() {
     charge(100, contract_instance.watchAdvertId.call());

}

function resetRadioButtons() {
    var radios = document.getElementsByName("charging1")[0];
    radios.checked = true;
}

