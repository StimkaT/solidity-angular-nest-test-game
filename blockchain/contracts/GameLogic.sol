// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract GameLogic {

    function _getRandomSalt(uint256 a, uint256 b, uint256 salt) private view returns (uint256)  {
        require(a < b, "Invalid range");
        uint256 random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.prevrandao,
                    msg.sender,
                    salt
                )
            )
        );

        return a + (random % (b - a + 1));
    }

    function getRandom(uint256 a, uint256 b) public view returns (uint256) {
        return _getRandomSalt(a, b, 0);
    }

    function getRandomNumbers(uint256 a, uint256 b, uint256 count) public view returns (uint256[] memory) {
        require(a < b, "Invalid range");
        if (count == 0) {
            count = 1; // default 1
        }

        uint256[] memory numbers = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            numbers[i] = _getRandomSalt(a, b, i);
        }

        return numbers;
    }

    function calculatePayouts(
        uint256 balance,
        address[] memory wallets,
        uint8[] memory percents,
        uint8 ownerFeePercent
    ) public pure returns (uint256[] memory) {
        require(wallets.length == percents.length, "Lengths mismatch");
        uint256 totalPercent = 0;
        for (uint256 i = 0; i < percents.length; i++) {
            require(wallets[i] != address(0), "Invalid player address");
            totalPercent += percents[i];
        }
        require(totalPercent == 100, "Total percent must be 100");
        require(ownerFeePercent <= 100, "ownerFeePercent percent must be <= 100");

        uint256 ownerFee = (balance * ownerFeePercent) / 100;
        uint256 balanceForPlayers = balance - ownerFee;

        uint256[] memory payouts = new uint256[](wallets.length);
        for (uint256 i = 0; i < wallets.length; i++) {
            payouts[i] = (balanceForPlayers * percents[i]) / 100;
        }
        return payouts;
    }
}
