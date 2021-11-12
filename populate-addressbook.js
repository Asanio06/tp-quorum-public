var AddressBook = artifacts.require("AddressBook")
var addressBookData = require("./data/addressbook.json")

module.exports = async (config) => {
  try {
    //console.log(addressBookData)
    let addressBookAddress = addressBookData.address
    let participants = addressBookData.participants
    console.log(`Getting deployed version of AddressBook at address '${addressBookAddress}'...`)
    let addressBook = await AddressBook.at(addressBookAddress)

    for (var participant in participants) {
      console.log(`Adding participant '${participant}'...`)
      const ethereumAddress = participants[participant].user_account
      const quorumAddress = participants[participant].quorum_pk
      const zipCode = participants[participant].zip
      //console.log(`Should add ${participant}: zip=${zipCode}, Eth=${ethereumAddress}, Quorum=${quorumAddress}`)
      await addressBook.addParticipantZipCode(participant, ethereumAddress, quorumAddress, zipCode)
    }

    let r = await addressBook.checkGeoBoundaries(participants['Coopérative'].user_account)
    console.log(`Checking if cooperative is in the addressbook: ${r}`)

    console.log("Finished!")
  } catch (e) {
    console.log(e)
  }
  process.exit()
}
