const ArtworkToken = artifacts.require("ArtworkToken");
const { expect } = require('chai');
const truffleAssert = require('truffle-assertions');

contract("ArtworkToken", accounts => {
    let artworkToken;
    const owner = accounts[0];
    const recipient = accounts[1];
    const buyer = accounts[2];

    beforeEach(async () => {
        artworkToken = await ArtworkToken.new({ from: owner });
    });

    describe("Token Creation", () => {
        it("should create a new artwork token", async () => {
            const result = await artworkToken.createArtwork(recipient, "Mona Lisa", { from: owner });
            
            // Prüfe, ob das Event emittiert wurde
            truffleAssert.eventEmitted(result, 'Transfer', (ev) => {
                return ev.from === '0x0000000000000000000000000000000000000000' 
                    && ev.to === recipient;
            });

            const artworkName = await artworkToken.getArtworkName(1);
            expect(artworkName).to.equal("Mona Lisa");
        });

        it("should fail when non-owner tries to create token", async () => {
            await truffleAssert.reverts(
                artworkToken.createArtwork(recipient, "Mona Lisa", { from: recipient }),
                "Ownable: caller is not the owner"
            );
        });
    });

    describe("Token Transfer", () => {
        beforeEach(async () => {
            await artworkToken.createArtwork(recipient, "Mona Lisa", { from: owner });
        });

        it("should transfer token between accounts", async () => {
            await artworkToken.approve(buyer, 1, { from: recipient });
            const result = await artworkToken.transferFrom(recipient, buyer, 1, { from: buyer });

            truffleAssert.eventEmitted(result, 'Transfer', (ev) => {
                return ev.from === recipient && ev.to === buyer;
            });

            const newOwner = await artworkToken.ownerOf(1);
            expect(newOwner).to.equal(buyer);
        });
    });
});
