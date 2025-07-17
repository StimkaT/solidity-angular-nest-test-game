const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with:", deployer.address);

    // 1. Деплой логики
    const GameLogic = await hre.ethers.getContractFactory("GameLogic");
    const logicContract = await GameLogic.deploy();
    await logicContract.waitForDeployment();
    console.log("✅ GameLogic deployed at:", await logicContract.getAddress());

    // 2. Подготовка массива игроков
    const players = [
        {
            name: "Alice",
            wallet: deployer.address,
            bet: hre.ethers.parseEther("0.1"),
            isPaid: false,
            isPaidOut: false,
            result: 0
        },
        {
            name: "Bob",
            wallet: "0x000000000000000000000000000000000000dEaD",
            bet: hre.ethers.parseEther("0.1"),
            isPaid: false,
            isPaidOut: false,
            result: 0
        }
    ];

    // 3. Деплой DelegateCallGameStorage
    const DelegateCallGameStorage = await hre.ethers.getContractFactory("DelegateCallGameStorage");
    const contract = await DelegateCallGameStorage.deploy(
        players,
        await logicContract.getAddress(),
        5 * 60,  // 5 minutes
        30 * 60  // 30 minutes
    );

    await contract.waitForDeployment();
    console.log("✅ GameStorage deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error("❌ Deployment error:", error);
    process.exitCode = 1;
});
