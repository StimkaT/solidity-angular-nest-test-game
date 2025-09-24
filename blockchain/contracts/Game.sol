// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

import "./GameBase.sol";

contract DelegateCallGameStorage is GameBase {

    bool public isFinished;

    constructor(
        Player[] memory _playerList,
        address logicAddr,
        uint256 _bettingMaxTime,
        uint256 _gameMaxTime,
        address _tokenAddress
    ) {
        _init(_playerList, logicAddr, _bettingMaxTime, _gameMaxTime);
        require(_tokenAddress != address(0), "Token address zero");
        gameToken = IERC20(_tokenAddress);
        isFinished = false;
    }

    function finish(PlayerResult[] memory _playerResultList) public {
        require(!isFinished, "Game already finished");
        _finish(_playerResultList);
        isFinished = true;
    }

    function deposit() external {
        _deposit();
    }

    function getPlayer(uint256 index) public view returns (Player memory) {
        return _getPlayer(index);
    }

    function getAllPlayers() public view returns (
        string[] memory names,
        address[] memory wallets,
        uint256[] memory bets,
        bool[] memory isPaid,
        bool[] memory isPaidOut,
        uint256[] memory results
    ) {
        return _getAllPlayers();
    }

    function getGameData() public view returns (
        uint256 bettingMaxTime,
        uint256 gameMaxTime,
        uint256 createdAt,
        uint256 startedAt,
        uint256 finishedAt,
        bool isBettingComplete,
        bool isGameAborted,
        bool isGameFinished
    ) {
        return _getGameData();
    }

    function getContractBalance() public view returns (uint256) {
        return _getContractBalance();
    }

    function withdrawRemainingBalance() public {
        _withdrawRemainingBalance();
    }

    function abortGame() public {
        _abortGame();
    }
}
