// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtworkToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping von Token ID zu Artwork Name
    mapping(uint256 => string) private _artworkNames;

    constructor() ERC721("ArtworkToken", "ART") {}

    // Funktion zum Erstellen eines neuen Artwork Tokens
    function createArtwork(address recipient, string memory artworkName) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(recipient, newTokenId);
        _artworkNames[newTokenId] = artworkName;

        return newTokenId;
    }

    // Getter für den Artwork Namen
    function getArtworkName(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ArtworkToken: Query for nonexistent token");
        return _artworkNames[tokenId];
    }
}
