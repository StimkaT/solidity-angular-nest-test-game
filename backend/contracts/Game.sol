// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Game {
    struct Game {
        string id;
    }

    Game[] private gameData;

    constructor(string memory _initialId) {
        gameData.push(Game(_initialId));
    }

    function getGameData() public view returns (Game[] memory) {
        return gameData;
    }

    function addGame(string memory _id) public {
        gameData.push(Game(_id));
    }

    function updateGame(uint index, string memory _newId) public {
        require(index < gameData.length, "Index out of bounds");
        gameData[index].id = _newId;
    }

    function getGame(uint index) public view returns (string memory) {
        require(index < gameData.length, "Index out of bounds");
        return gameData[index].id;
    }
}
