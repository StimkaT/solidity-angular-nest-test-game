import { expect } from "chai";
import { ethers } from "hardhat";
import { GameLogic } from "../typechain-types";
import {gameLogicContractDeploy} from './stabs/deploy';

describe("GameLogic", function () {
    let gameLogic: GameLogic;

    beforeEach(async function () {
        gameLogic = await gameLogicContractDeploy();
    });

    describe("Pure Functions", function () {
        it("Should calculate payouts correctly", async function () {
            const balance = ethers.parseEther("1.0");
            const wallets = [
                "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
            ];
            const percents = [60, 40];

            const payouts = await gameLogic.calculatePayouts(balance, wallets, percents, 10);
            expect(payouts[0]).to.equal(ethers.parseEther("0.54"));
            expect(payouts[1]).to.equal(ethers.parseEther("0.36"));
        });
    });

    describe("getRandom", function () {
        it("Should return a number within the given range", async function () {
            const a = 1;
            const b = 2;

            const randomValue = await gameLogic.getRandom(a, b);

            expect(randomValue).to.be.gte(a);
            expect(randomValue).to.be.lte(b);
        });

        it("Should revert 'Invalid range' if a >= b", async function () {
            await expect(gameLogic.getRandom(10, 5)).to.be.revertedWith("Invalid range");
            await expect(gameLogic.getRandom(5, 5)).to.be.revertedWith("Invalid range");
        });
    });


    describe("GameLogic.getRandomNumbers (count=0 -> 1)", function () {

        it("returns array of given count within [a, b]", async function () {
            const a = 1;
            const b = 9;
            const count = 3;

            const arr = await gameLogic.getRandomNumbers(a, b, count);
            expect(arr.length).to.equal(count);
            for (const v of arr) {
                expect(v).to.be.gte(a);
                expect(v).to.be.lte(b);
            }
        });

        it("when count=0, returns exactly one number within [a, b]", async function () {
            const a = 10;
            const b = 20;

            const arr = await gameLogic.getRandomNumbers(a, b, 0);
            expect(arr.length).to.equal(1);
            expect(arr[0]).to.be.gte(a);
            expect(arr[0]).to.be.lte(b);
        });

        it("reverts when a >= b", async function () {
            await expect(gameLogic.getRandomNumbers(7, 3, 2)).to.be.revertedWith("Invalid range");
            await expect(gameLogic.getRandomNumbers(5, 5, 1)).to.be.revertedWith("Invalid range");
        });
    });




});
