const hre = require("hardhat");

async function main() {
    const TestContract = await hre.ethers.getContractFactory("Game");
    const contract = await TestContract.deploy("Hello, Blockchain!");
    await contract.waitForDeployment();

    console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});