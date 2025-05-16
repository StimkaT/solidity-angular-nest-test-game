const hre = require("hardhat");
const {string} = require("hardhat/internal/core/params/argumentTypes");

async function main() {
    // Деплой контракта Game
    const Game = await hre.ethers.getContractFactory("Game");
    const game = await Game.deploy("Hello, Blockchain!"); // Если конструктор принимает (string, uint)
    await game.waitForDeployment();
    console.log("Game deployed to:", await game.getAddress());

    // Деплой контракта GameArray (из соседней папки)
    const GameArray = await hre.ethers.getContractFactory("ArrayGame");

    const gameArray = await GameArray.deploy(); // (укажите аргументы конструктора, если нужно)
    await gameArray.waitForDeployment();
    console.log("GameArray deployed to:", await gameArray.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
