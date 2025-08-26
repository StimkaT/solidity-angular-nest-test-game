// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract GameLogic {

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

        uint256 ownerFee = (balance * ownerFeePercent) / 100;
        uint256 balanceForPlayers = balance - ownerFee;

        uint256[] memory payouts = new uint256[](wallets.length);
        for (uint256 i = 0; i < wallets.length; i++) {
            payouts[i] = (balanceForPlayers * percents[i]) / 100;
        }
        return payouts;
    }
}
