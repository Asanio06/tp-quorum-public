pragma solidity ^0.4.24;

import "./MilkDelivery.sol";
import "./AddressBook.sol";


contract DairyProduction {
    uint32 public quantity;
    address[] public milkDeliveries;
    address public dairy;
    address addressBookAddress;

    event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity);

    constructor(address _addressBookAddress) public {
        // TODO: check that _addressBookAddress address is not empty
        // TODO: keep track of the address of the addressbook smart-contract
    }

    function makeCheese(uint32 _quantity, address[] memory _milkDeliveries) public returns (address) {
        // TODO: keep track of variables quantity, milkDeliveries and dairy
        // TODO: call each MilkDelivery contract in order to mark it as "consumed"
        // TODO: emit a CheeseProduced event
        // TODO: return the address of this smart-contract
    }

    /// Checks if all parties in the smart-contract are geo compliant.
    /// @dev checks all milk producers and the dairy using the AddressBook
    /// @return true if all parties are geo compliant
    function checkGeoBoundaries() public view returns (bool) {
    }

    function getMilkDeliveriesCount() public constant returns(uint) {
        // TODO: return the number of milk deliveries
    }

}
