const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/6113828fd8e8448f9a9e3fa7962e2cc6");

const walletAddress = "0x2Bc3E1bb6C3C68720b392733993Bfef7334d3cbe"; // твой кошелек
const tokenAddress = "0x7b44196a1D950FD80506d3782Cf2ad563C76C136"; // твой токен PGT
const tokenAbi = ["function balanceOf(address owner) view returns (uint256)"];

async function main() {
    // Проверим ETH баланс
    const ethBalance = await provider.getBalance(walletAddress);
    console.log("ETH balance:", ethers.formatEther(ethBalance));

    // Проверим PGT токены
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);
    const tokenBalance = await tokenContract.balanceOf(walletAddress);
    console.log("PGT balance:", ethers.formatUnits(tokenBalance, 18)); // 18 — стандартный decimals
}

main();
