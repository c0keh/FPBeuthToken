var Migrations = artifacts.require("./Migrations.sol");
var FPBeuthToken = artifacts.require("./FPBeuthToken.sol")

module.exports = function(deployer) {
  deployer.deploy(FPBeuthToken,1,"Token","T");
};
