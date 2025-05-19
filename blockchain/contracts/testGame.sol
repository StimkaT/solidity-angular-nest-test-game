// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestGame {
    struct Player {
        string name;           // имя
        string wallet;         // адрес кошелька
        string privateKey;     // приватный ключ (не рекомендуется хранить в контракте)
        uint256 balance;       // баланс
        bool isPaid;           // была ли оплата?
        uint256 amountPaid;    // фактическая сумма оплаты
    }

    struct Game {
        string gameId;             // id игры
        string launchTime;         // время создания
        string startTime;          // время старта
        bool conditionToStartDone; // условия старта выполнены?
        bool isFinish;             // завершена?
        bool gameTookPlace;        // состоялась?
        uint256 bank;              // банк
        Player[] playerList;       // игроки
    }

    Game private gameData;

    constructor(
        string memory _gameId,
        string memory _launchTime,
        string memory _startTime,
        bool _conditionToStartDone,
        bool _isFinish,
        bool _gameTookPlace,
        uint256 _bank,
        Player[] memory _initialPlayers
    ) {
        gameData.gameId = _gameId;
        gameData.launchTime = _launchTime;
        gameData.startTime = _startTime;
        gameData.conditionToStartDone = _conditionToStartDone;
        gameData.isFinish = _isFinish;
        gameData.gameTookPlace = _gameTookPlace;
        gameData.bank = _bank;

        for (uint i = 0; i < _initialPlayers.length; i++) {
            gameData.playerList.push(_initialPlayers[i]);
        }
    }

//    function getGameData() public view returns (
//        string memory,
//        string memory,
//        string memory,
//        bool,
//        bool,
//        bool,
//        uint256,
//        string[] memory,
//        string[] memory,
//        string[] memory,
//        uint256[] memory,
//        bool[] memory,
//        uint256[] memory
//    ) {
//        uint length = gameData.playerList.length;
//        string[] memory names = new string[](length);
//        string[] memory wallets = new string[](length);
//        string[] memory privateKeys = new string[](length);
//        uint256[] memory balances = new uint256[](length);
//        bool[] memory isPaidFlags = new bool[](length);
//        uint256[] memory amountsPaid = new uint256[](length);
//
//        for (uint i = 0; i < length; i++) {
//            Player storage p = gameData.playerList[i];
//            names[i] = p.name;
//            wallets[i] = p.wallet;
//            privateKeys[i] = p.privateKey;
//            balances[i] = p.balance;
//            isPaidFlags[i] = p.isPaid;
//            amountsPaid[i] = p.amountPaid;
//        }
//
//        return (
//            gameData.gameId,
//            gameData.launchTime,
//            gameData.startTime,
//            gameData.conditionToStartDone,
//            gameData.isFinish,
//            gameData.gameTookPlace,
//            gameData.bank,
//            names,
//            wallets,
//            privateKeys,
//            balances,
//            isPaidFlags,
//            amountsPaid
//        );
//    }
}
