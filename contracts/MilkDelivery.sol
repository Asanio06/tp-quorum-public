pragma solidity ^0.5.0;


contract MilkDelivery {
    uint32 public liters;
    uint32 public price;
    bool public dairyApproval;
    bool public consumed;
    address public milkProducerAddress;
    address public dairyAddress;

    event MilkDelivered(address indexed milkDeliveryAddress,
        address indexed milkProducer,
        address dairyAddress,
        uint32 liters, uint32 price);

    constructor(address _dairyAddress) public {
        require(_dairyAddress != address(0));
        milkProducerAddress = msg.sender;
        dairyAddress = _dairyAddress;

        // TODO: initialize dairyApproval to a meaningful value
        // TODO: initialize consumed to a meaningful value
    }

    /// Keeps track of a milk delivery
    /// @dev should only be called by the milk producers of this contract
    function sendMilk(uint32 _liters, uint32 _price) public onGoing() {
        price = _price;
        liters = _liters;
        emit MilkDelivered(address(this),milkProducerAddress,dairyAddress,_liters,_price);
    }

    /// Mark the delivery as accepted by the dairy
    function validateDelivery() onGoing() dairyOnly() public {
        // TODO: implement this!
        dairyApproval = true;
    }

    /// Return true if the delivery was acknowledged by the dairy (laiterie)
    function checkDeliveryApproval() public view returns (bool) {
        // TODO: implement this!
        return dairyApproval;
    }

    /// Mark the delivery as consumed (used in order to make some cheese)
    function consume() external {
        consumed = true;
        // TODO: implement this!
    }

    /// Modifier based on the value of consumed.
    /// @dev if consumed, then the delivery is not onGoing
    modifier onGoing() {
        require(!consumed,"Consumed");
        _;
        // TODO: implement this!
    }

    /// Modifier ensuring that only the dairy of this milk delivery can make a call
    modifier dairyOnly() {
        require(msg.sender == dairyAddress,"Only dairy");
        _;
        // TODO: implement this!
    }

}
