pragma solidity ^0.5.0;

import "./MilkDelivery.sol";
import "./AddressBook.sol";


contract DairyProduction {
    uint32 public quantity;
    address[] public milkDeliveries;
    address public dairy;
    address addressBookAddress;

    event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity);

    constructor(address _addressBookAddress) public {
        require(_addressBookAddress != address(0));
        addressBookAddress = _addressBookAddress;
    }

    function makeCheese(uint32 _quantity, address[] memory _milkDeliveries) public returns (address) {
        quantity = _quantity;
        milkDeliveries = _milkDeliveries;
        dairy = msg.sender;
        for(uint i = 0; i < milkDeliveries.length; i++){
            MilkDelivery milk = MilkDelivery(milkDeliveries[i]);
            milk.consume();
        }
        emit CheeseProduced(address(10), dairy, quantity);
        return address(10);
    }

    /// Checks if all parties in the smart-contract are geo compliant.
    /// @dev checks all milk producers and the dairy using the AddressBook
    /// @return true if all parties are geo compliant
    function checkGeoBoundaries() public view returns (bool) {
        bool allisgood = true;
        AddressBook book = AddressBook(addressBookAddress);
        for(uint i = 0; i < milkDeliveries.length; i++){
            MilkDelivery milk = MilkDelivery(milkDeliveries[i]);
            if(!book.checkGeoBoundaries(milk.milkProducerAddress()) || !book.checkGeoBoundaries(milk.dairyAddress())){
                allisgood = false;
                break;
            }
        }
        return allisgood;
    }

    function getMilkDeliveriesCount() public view returns(uint) {
        return milkDeliveries.length;
    }

}
