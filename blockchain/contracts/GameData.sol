// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArrayGame {
    struct Player {
        string id;
        string wallet;
        string amount;
        bool ready;
    }

    struct Game {
        string id;
        Player[] players;
    }

    Game private gameData;

    constructor(string memory _initialId, Player[] memory _initialPlayers) {
        gameData.id = _initialId;
        for (uint i = 0; i < _initialPlayers.length; i++) {
            gameData.players.push(_initialPlayers[i]);
        }
    }

    function getGameData() public view returns (
        string memory,
        string[] memory,
        string[] memory,
        string[] memory,
        bool[] memory
    ) {
        uint length = gameData.players.length;
        string[] memory ids = new string[](length);
        string[] memory wallets = new string[](length);
        string[] memory amounts = new string[](length);
        bool[] memory readyFlags = new bool[](length);

        for (uint i = 0; i < length; i++) {
            Player storage player = gameData.players[i];
            ids[i] = player.id;
            wallets[i] = player.wallet;
            amounts[i] = player.amount;
            readyFlags[i] = player.ready;
        }

        return (gameData.id, ids, wallets, amounts, readyFlags);
    }
}
