const hre = require("hardhat");

async function main() {
    const ethers = hre.ethers;

    // Создаём фабрику контракта
    const MyToken = await ethers.getContractFactory("MyToken");

    // Сумма токенов (1 миллион с 18 decimals)
    const initialSupply = ethers.parseUnits("1000000", 18);

    // Деплой
    const token = await MyToken.deploy(initialSupply);

    // В ethers v6 метод deployed() теперь возвращает просто контракт после await deploy()
    // Можно проверить состояние так:
    await token.waitForDeployment(); // ✅ вот правильный способ

    console.log("MyToken deployed to:", token.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
