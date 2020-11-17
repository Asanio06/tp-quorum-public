pragma solidity ^0.5.0;

import "./MilkDelivery.sol";
import "./AddressBook.sol";


contract DairyProduction {
    uint32 public quantity;
    address[] public milkDeliveries;
    address public dairy;
    address addressBookAddress;

    event CheeseProduced(address indexed dairyProductionAddress, address indexed dairy, uint32 quantity);

}
