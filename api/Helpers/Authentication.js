const AddressBook = require('../../data/addressbook')

const getInurl = (participant) => {
  return AddressBook.participants[participant].quorum_url
}

const getNameFromPublicAddress = (addr) => {
  // TODO : Changer le case
  switch (addr.toLowerCase()) {
    case AddressBook.participants['Coopérative'].user_account:
      return 'Coopérative'
    case AddressBook.participants['Laiterie Beaufort'].user_account:
      return 'Laiterie Beaufort'
    case AddressBook.participants['Eleveur Hauteluce'].user_account:
      return 'Eleveur Hauteluce'
    case AddressBook.participants['Eleveur Parly'].user_account:
      return 'Eleveur Parly'
    case AddressBook.participants['Eleveur Bastia'].user_account:
      return 'Eleveur Bastia'
  }
}

const getPublicAddressFromName = (participant) => {
  // console.log(`Searching addressbook for user account of participant ${participant}...`)
  return AddressBook.participants[participant].user_account
}

const getPrivateAddressFromName = (participant) => {
  return AddressBook.participants[participant].quorum_pk
}

const getPrivateAddressFromPublicAddress = (publicAddress) => {
  return Object.values(AddressBook.participants)
    .filter(p => p.user_account === publicAddress)
    .map(p => p.quorum_pk)
}

module.exports = {
  getInurl,
  getNameFromPublicAddress,
  getPublicAddressFromName,
  getPrivateAddressFromName,
  getPrivateAddressFromPublicAddress
}
