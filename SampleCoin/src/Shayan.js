const SHA256 = require("crypto-js/sha256");

class Block {
	constructor (index, timestamp, data, prevHash) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.prevHash = prevHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data)).toString();	
	}
}

class Blockchain {
	constructor () {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, "12/01/2017", "Genesis Block", "0");
	}

	addBlock(newBlock) {
		newBlock.prevHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	isChainValid() {
		for(let i = 1; i < this.chain.length; i++) {
			const previousBlock = this.chain[i-1];
			const currentBlock = this.chain[i];

			if(currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if(currentBlock.prevHash !== previousBlock.hash) {
				return false;
			}

		}

		return true;
	}
}

let sampleCoin = new Blockchain();
sampleCoin.addBlock(new Block(1, "12/03/2017", {amount: 4}));
sampleCoin.addBlock(new Block(2, "12/04/2017", {amount: 8}));

console.log(JSON.stringify(sampleCoin, null, 4));

console.log("is sampleCoin valid? : " + sampleCoin.isChainValid());

console.log('chaingign a block ....');
sampleCoin.chain[1].data = {amount : 100};

console.log(JSON.stringify(sampleCoin, null, 4));
console.log("is sampleCoin valid? : " + sampleCoin.isChainValid());
