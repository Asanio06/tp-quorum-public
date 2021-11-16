pragma solidity ^0.5.0;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

/// @title An address book for zip code of participants
contract AddressBook is Ownable {
  mapping(address => uint32) private participantsZipCode;
  mapping(string => address) private indexEthereumAddress;
  mapping(string => string) private indexQuorumAddress;
  mapping(address => string) private quorumAddresses;
  mapping(uint32 => bool) private isValidZipCode;

  constructor() public {
    isValidZipCode[73620] = true;
    isValidZipCode[73210] = true;
    isValidZipCode[73270] = true;

  }

  event ParticipantAdded(address indexed participant, uint32 zipCode);

  /// Adds a participant zip zip code
  /// @dev should only be called by the owner of this contract
  /// @param participant the participant for which the zip code should be added
  /// @param zipCode the zip code of the participant
  function addParticipantZipCode(string calldata name,address participant, string calldata quorum, uint32 zipCode) onlyOwner external {
    // add the participants to the mapping
    participantsZipCode[participant] = zipCode;
    // emit ParticipantAdded event
    emit ParticipantAdded(participant, zipCode);
  }

  /// Checks if the participant is in the geo boundaries for the AOP label
  /// @param participant the address of the participant to check
  /// @return true if the participant is in the geo boundaries of the AOP label
  function checkGeoBoundaries(address participant) public view returns (bool) {
    // check if the participant is in the allowed zip codes
    return isValidZipCode[participantsZipCode[participant]];
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
