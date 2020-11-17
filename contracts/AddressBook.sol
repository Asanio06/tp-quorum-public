pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol'; //<1>

/// @title An address book for zip code of participants
contract AddressBook is Ownable { //<2>
    mapping(address => uint32) private participantsZipCode; //<3>
    mapping(string => address) private indexEthereumAddress;
    mapping(string => string) private indexQuorumAddress;
    mapping(address => string) private quorumAddresses;

    event ParticipantAdded(address indexed participant, uint32 zipCode);

    /// Adds a participant zip zip code
    /// @dev should only be called by the owner of this contract
    /// @param name the name of the participant to add
    /// @param participant the participant for which the zip code should be added
    /// @param quorum the private TX address of the participant
    /// @param zipCode the zip code of the participant
    function addParticipantZipCode(string calldata name,
        address participant, string calldata quorum,
        uint32 zipCode) onlyOwner external {
        // add the participants to the mapping <4>
        // tag::implementation[]
        participantsZipCode[participant] = zipCode;
        indexEthereumAddress[name] = participant;
        indexQuorumAddress[name] = quorum;
        quorumAddresses[participant] = quorum; 
        // end::implementation[]
        // emit ParticipantAdded event
        emit ParticipantAdded(participant, zipCode); //<5>
    }

    /// Checks if the participant is in the geo boundaries for the AOP label
    /// @param participant the address of the participant to check
    /// @return true if the participant is in the geo boundaries of the AOP label
    function checkGeoBoundaries(address participant) public view returns (bool) {
        // check if the participant is in the allowed zip codes <6>
        // tag::implementation[]
        uint32 zipCode = participantsZipCode[participant];
        return zipCode == 73620 || zipCode == 73210 || zipCode == 73270;
        // end::implementation[]
    }

    function getEthereumAddress(string memory name) public view returns (address) {
        return indexEthereumAddress[name];
    }

    function getQuorumAddress(string memory name) public view returns (string memory) {
        return indexQuorumAddress[name];
    }

    function getQuorumAddressFromName(address _address) public view returns (string memory) {
        return quorumAddresses[_address];
    }

}
