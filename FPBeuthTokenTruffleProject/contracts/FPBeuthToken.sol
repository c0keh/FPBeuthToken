pragma solidity ^0.4.18;

contract owned {
    address public owner;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }

    function getOwner() public constant returns (address Owner) {
        return owner;
    }
}

interface tokenRecipient { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public; }

contract TokenERC20 {
    // Public variables of the token
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    // 18 decimals is the strongly suggested default, avoid changing it
    uint256 public totalSupply;

    // This creates an array with all balances
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;

    // This generates a public event on the blockchain that will notify clients
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This notifies clients about the amount burnt
    event Burn(address indexed from, uint256 value);

    /**
     * Constrctor function
     *
     * Initializes contract with initial supply tokens to the creator of the contract
     */
    function TokenERC20(
        uint256 initialSupply,
        string tokenName,
        string tokenSymbol
    ) public {
        totalSupply = initialSupply * 10 ** uint256(decimals);  // Update total supply with the decimal amount
        balanceOf[msg.sender] = totalSupply;                // Give the creator all initial tokens
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
    }
    
    function getTokenName() public constant returns (string Tokenname) {
         return name;
     }
     
     function getTotalSupply() public constant returns (uint256 TotalSupply) {
         return totalSupply;
     }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _transfer(address _from, address _to, uint _value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(_to != 0x0);
        // Check if the sender has enough
        require(balanceOf[_from] >= _value);
        // Check for overflows
        require(balanceOf[_to] + _value > balanceOf[_to]);
        // Save this for an assertion in the future
        uint previousBalances = balanceOf[_from] + balanceOf[_to];
        // Subtract from the sender
        balanceOf[_from] -= _value;
        // Add the same to the recipient
        balanceOf[_to] += _value;
        Transfer(_from, _to, _value);
        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balanceOf[_from] + balanceOf[_to] == previousBalances);
    }

    /**
     * Transfer tokens
     *
     * Send `_value` tokens to `_to` from your account
     *
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transfer(address _to, uint256 _value) public {
        _transfer(msg.sender, _to, _value);
    }

    /**
     * Transfer tokens from other address
     *
     * Send `_value` tokens to `_to` in behalf of `_from`
     *
     * @param _from The address of the sender
     * @param _to The address of the recipient
     * @param _value the amount to send
     */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= allowance[_from][msg.sender]);     // Check allowance
        allowance[_from][msg.sender] -= _value;
        _transfer(_from, _to, _value);
        return true;
    }

    /**
     * Set allowance for other address
     *
     * Allows `_spender` to spend no more than `_value` tokens in your behalf
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     */
    function approve(address _spender, uint256 _value) public
    returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        return true;
    }

    /**
     * Set allowance for other address and notify
     *
     * Allows `_spender` to spend no more than `_value` tokens in your behalf, and then ping the contract about it
     *
     * @param _spender The address authorized to spend
     * @param _value the max amount they can spend
     * @param _extraData some extra information to send to the approved contract
     */
    function approveAndCall(address _spender, uint256 _value, bytes _extraData)
    public
    returns (bool success) {
        tokenRecipient spender = tokenRecipient(_spender);
        if (approve(_spender, _value)) {
            spender.receiveApproval(msg.sender, _value, this, _extraData);
            return true;
        }
    }

    /**
     * Destroy tokens
     *
     * Remove `_value` tokens from the system irreversibly
     *
     * @param _value the amount of money to burn
     */
    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);   // Check if the sender has enough
        balanceOf[msg.sender] -= _value;            // Subtract from the sender
        totalSupply -= _value;                      // Updates totalSupply
        Burn(msg.sender, _value);
        return true;
    }

    /**
     * Destroy tokens from other account
     *
     * Remove `_value` tokens from the system irreversibly on behalf of `_from`.
     *
     * @param _from the address of the sender
     * @param _value the amount of money to burn
     */
    function burnFrom(address _from, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);                // Check if the targeted balance is enough
        require(_value <= allowance[_from][msg.sender]);    // Check allowance
        balanceOf[_from] -= _value;                         // Subtract from the targeted balance
        allowance[_from][msg.sender] -= _value;             // Subtract from the sender's allowance
        totalSupply -= _value;                              // Update totalSupply
        Burn(_from, _value);
        return true;
    }
}

/******************************************/
/*       ADVANCED TOKEN STARTS HERE       */
/******************************************/

contract FPBeuthToken is owned, TokenERC20 {

    uint256 public sellPrice;
    uint256 public buyPrice; //für diesen Preis kann der Investor unsere Tokens kaufen
    uint256 public emptyAdvertId; // index where free place in array
    uint256 public watchAdvertId; // index which advert to watch in array
    uint256 public remainingTokens;
    uint256 public profit;

    mapping (address => uint256) public userBalance;
    mapping (uint256 => Advertisement) public adverts;

    event Shop(address indexed from, uint256 value, uint256 newBalance);
    event Charge(address indexed from, uint256 chargedValue, uint256 newBalance);
    event AddAdvertisement(address indexed from, uint256 advertId, uint256 value);

    function FPBeuthToken(uint256 initialSupply, string tokenName, string tokenSymbol)
    TokenERC20(initialSupply, tokenName, tokenSymbol) public {
        emptyAdvertId = 0;
        watchAdvertId = 0;
        sellPrice = 100000000000000000;
        buyPrice = 100000000000000000;
        remainingTokens = initialSupply;
    }

    // Repräsentation einer Werbung
    struct Advertisement {
        address adOwner;
        string url;
        uint256 value;
        uint256 fullValue;
        uint256 id;
    }

    function setSellPrice(uint256 newSellPrice) public onlyOwner{
        require(newSellPrice > 0);
        sellPrice = newSellPrice;
    }

    function setBuyPrice(uint256 newBuyPrice) public onlyOwner{
        require(newBuyPrice > 0);
        buyPrice = newBuyPrice;
    }
    
    function getBuyPrice() public constant returns (uint256){
        return buyPrice;
    }
    
    function getAdvertByIndex(uint256 index) public constant returns (address owner, string url, uint256 value, uint256 fullValue, uint256 id){
        return (adverts[index].adOwner, adverts[index].url, adverts[index].value, adverts[index].fullValue, adverts[index].id);
    }
    
    function getEmptyAdvertId() public constant returns(uint256 advertId){
        return emptyAdvertId;
    }
    
    function getWatchAdvertId() public constant returns(uint256 advertId){
        return watchAdvertId;
    }


    //Der Investor kann für Ether unsere Tokens kaufen
    function buy() public payable returns (uint256 amount){
        amount = msg.value / buyPrice;                    // calculates the amount
        require(balanceOf[owner] >= amount);               // checks if it has enough to sell
        balanceOf[msg.sender] += amount;                  // adds the amount to buyer's balance
        balanceOf[owner] -= amount;                        // subtracts amount from seller's balance
        Transfer(owner, msg.sender, amount);               // execute an event reflecting the change
        remainingTokens -= amount;
        return amount;                                    // ends function and returns
    }

    //für unseren Fall wahrscheinlich erstmal nicht notwendig
    function sell(uint256 amount) public returns (uint256 revenue){
        require(balanceOf[msg.sender] >= amount);         // checks if the sender has enough to sell
        balanceOf[owner] += amount;                        // adds the amount to owner's balance
        balanceOf[msg.sender] -= amount;                  // subtracts the amount from seller's balance
        revenue = amount * sellPrice;
        require(msg.sender.send(revenue));                // sends ether to the seller: it's important to do this last to prevent recursion attacks
        Transfer(msg.sender, owner, amount);               // executes an event reflecting on the change
        return revenue;                                   // ends function and returns
    }

    //Der Investor kauft Werbung; er übergibt einen String mit der Url; damit wird die Werbung gesetzt;
    //Der Wert der Werbung wird von der balanceOf abgezogen und wird der Werbung gutgeschrieben
    //braucht man hier am Ende noch ein Transfer-Event
    function addAdvert (string advertUrl, uint256 fluxCoins) public returns (uint256 advertId) {
        require(balanceOf[owner] + fluxCoins > balanceOf[owner]);
        require(balanceOf[msg.sender] >= fluxCoins); //prueft wallet zahlbarkeit automatisch? dann require unnötig
        require(emptyAdvertId + 1 != watchAdvertId);
        adverts[emptyAdvertId] = Advertisement({adOwner: msg.sender, url: advertUrl, value: fluxCoins, fullValue: fluxCoins, id: advertId});
        advertId = emptyAdvertId;
        emptyAdvertId++;
        balanceOf[msg.sender] -= fluxCoins;

        AddAdvertisement(msg.sender, advertId, fluxCoins);  // Event beim Hinzufügen
        return advertId;
    }

    function getAdvertValue(uint256 advertId) public constant returns (uint256 value){
        require(adverts[advertId].adOwner == msg.sender || msg.sender == owner);
        return adverts[advertId].value;
    }

    function charge(uint8 minCharged, uint256 advertId) public {
        uint256 chargedValue = minCharged * 1;
        require(chargedValue + userBalance[msg.sender] > userBalance[msg.sender]);
        require(advertId == watchAdvertId);
        require(adverts[watchAdvertId].value > 0);

        uint256 previousAdvertValue = adverts[advertId].value;
        userBalance[msg.sender] += chargedValue / 2;
        balanceOf[owner] += chargedValue / 2;
        adverts[advertId].value -= chargedValue;

        if(adverts[advertId].value == 0 || adverts[advertId].value > previousAdvertValue){
            delete adverts[advertId];
            watchAdvertId++;
        }
        remainingTokens += minCharged / 2;
        profit += minCharged / 2;
        Charge(msg.sender, chargedValue, userBalance[msg.sender]);
    }

    function getAdvert() public constant returns (uint256, string) {
        require(watchAdvertId != emptyAdvertId);
        require(adverts[watchAdvertId].value > 0);
        return (watchAdvertId, adverts[watchAdvertId].url);
    }

    function getMyUserBalance() public constant returns (uint256 coinCount) {
        return userBalance[msg.sender];
    }

    function getMyInvestorBalance() public constant returns (uint256 coinCount) {
        return balanceOf[msg.sender];
    }

    function buyGood(uint256 value) public {
        require(userBalance[msg.sender] - value < userBalance[msg.sender]);
        require(userBalance[msg.sender] - value >= 0);

        userBalance[msg.sender] -= value;
        balanceOf[owner] += value;
        remainingTokens += value;
        Shop(msg.sender, value, userBalance[msg.sender]);
    }
}
