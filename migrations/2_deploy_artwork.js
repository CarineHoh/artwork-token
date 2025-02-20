const ArtworkToken = artifacts.require("ArtworkToken");

module.exports = function(deployer) {
  deployer.deploy(ArtworkToken);
};
