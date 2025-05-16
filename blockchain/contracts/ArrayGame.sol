// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArrayGame {
    struct GameItem {
        string id;
        uint256 bet;
    }

    GameItem[] private gameData;

    constructor() {}

    function getGameData() public view returns (GameItem[] memory) {
        return gameData;
    }

    function addGame(string memory _id, uint256 _bet) public {
        gameData.push(GameItem(_id, _bet));
    }

    function updateGame(uint index, string memory _newId, uint256 _newBet) public {
        require(index < gameData.length, "Index out of bounds");
        gameData[index] = GameItem(_newId, _newBet);
    }

    function getGame(uint index) public view returns (string memory, uint256) {
        require(index < gameData.length, "Index out of bounds");
        return (gameData[index].id, gameData[index].bet);
    }
}
