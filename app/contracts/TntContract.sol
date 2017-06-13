pragma solidity ^0.4.7;

//import "./ConvertLib.sol";

contract TntContract {
	uint public constant DECAY_RATE = 10 finney; 
	uint public constant CLICK_DECAY = 10 finney;
	uint public constant MINIMUM_BID = 10 finney;
	uint public constant MINIMUM_CONFIG_FEE = 10 finney;

	address[] activeBidders;
	mapping (address => uint) bids;
	mapping (address => string) configurations;
	uint public lastDecay;

	event NewBid(
		address indexed _address,
		uint indexed _bid
	);

	function TntContract() {
		lastDecay = now;
	}

	function setMyConfiguration(string json) payable returns(string){
		if (msg.value <= MINIMUM_CONFIG_FEE) {
			throw;
		}
		configurations[msg.sender] = json;
		return configurations[msg.sender];
	}

	function getMyConfiguration() constant returns(string) {
		return configurations[msg.sender];
	}

	function getActiveBidders() constant returns(address[]) {
		return activeBidders;
	}

	function getBid(address ad) constant returns(uint) {
		return bids[ad];
	}

	function decayDueClicks(address ad, uint count) {
		// if (msg.sender != 'fixed address')
		// var amount = count * CLICK_DECAY;
		// decay amount
	}

	// has to be called from external
	function decayDueTime() returns(bool success){
		if (now >= lastDecay + 1 days) {
			for(uint iter = 0; iter < activeBidders.length; iter++) {
				address current = activeBidders[iter];
				if (bids[current] >= DECAY_RATE) {
					bids[current] -= DECAY_RATE;
				} else {
					bids[current] = 0;
					// swap with last and remove last for clean array
					activeBidders[iter] = activeBidders[activeBidders.length-1];
					delete activeBidders[activeBidders.length-1];
					activeBidders.length--;
				}
			}
			lastDecay = lastDecay + 1 days;
			return true;
		} else {
			return false;
		}
	}

	function bump(address who) payable returns(uint totalBid) {
		if (msg.value <= MINIMUM_BID) {
			throw;
		}

		// new bidder address ? -> add to activeBidders
		if (bids[who] == 0) {
			uint entryIndex = activeBidders.length;
			activeBidders.length += 1;
			activeBidders[entryIndex] = who;
		}

		bids[who] += msg.value;
		NewBid(who, bids[who]);
		return bids[who];
	}

	function claimShare() {
		// one can claim its share every 10 minutes
		// share ratio will be oraclized based on Stream viewers or Website conversions
		// share is paid out
	}

}
