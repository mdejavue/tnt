pragma solidity ^0.4.7;

//import "./ConvertLib.sol";

contract TntContract {

	struct SerItem {
		string serno;
		Status status;
		Disposition disposition;
		address bup;
	}

	enum Status { Inactive, Active, Deleted }
	enum Disposition { Created, Commissioned, Shipping, Received, Destroyed }

	mapping (string => SerItem) repository;

	function requestInfo(string serno) constant returns (Status status, Disposition disposition) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender) {
			throw;
		}
		status = serItem.status;
		disposition = serItem.disposition;
	}



	function produce(string serno) {
		if ( (bytes(repository[serno].serno)).length > 0) throw;
		repository[serno] = SerItem(serno, Status.Active, Disposition.Created, msg.sender);
	}


	function commission(string serno) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender 
			|| serItem.status != Status.Active
			|| serItem.disposition >= Disposition.Commissioned) {
			throw;
		}
		serItem.disposition = Disposition.Commissioned;
	}


	function ship(string serno, address shipto) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender 
			|| serItem.status != Status.Active
			|| serItem.disposition != Disposition.Commissioned) {
			throw;
		}
		serItem.disposition = Disposition.Shipping;
		serItem.bup = shipto;
	}


	function receive(string serno) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender 
			|| serItem.status != Status.Active
			|| serItem.disposition != Disposition.Shipping) {
			throw;
		}
		serItem.disposition = Disposition.Received;
	}


	function destroy(string serno) {
		SerItem serItem = repository[serno];
		if (serItem.bup != msg.sender 
			|| serItem.status != Status.Active) {
			throw;
		}
		serItem.disposition = Disposition.Received;
		serItem.status = Status.Deleted;
	}
}