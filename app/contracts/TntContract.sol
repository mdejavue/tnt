pragma solidity ^0.4.7;

//import "./ConvertLib.sol";

contract TntContract {

	uint constant SERNO_START = 1000;
	uint currentSerno = SERNO_START;

	struct SerItem {
		uint serno;
		Status status;
		Disposition disposition;
		address bup;
	}

	enum Status { Inactive, Active, Deleted }
	enum Disposition { Created, Commissioned, Shipping, Received, Sold, Destroyed }

	mapping (uint => SerItem) repository;

	function requestInfo(uint serno) returns (Status status, Disposition disposition) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender) {
			throw;
		}
		status = serItem.status;
		disposition = serItem.disposition;
	}

	function produce() returns (uint serno) {
		serno = currentSerno++;
		repository[serno] = SerItem(serno, Status.Active, Disposition.Created, msg.sender);
	}

	function commission(uint serno) returns (bool success) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender 
			|| serItem.status != Status.Active
			|| serItem.disposition >= Disposition.Commissioned) {
			throw;
		}
		serItem.disposition = Disposition.Commissioned;
		success = true;
	}
}