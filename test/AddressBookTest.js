var AddressBook = artifacts.require("AddressBook");

contract('AddressBook', function(accounts) {
  const [cheeseMaker, milkProducer1, milkProducer2, milkProducer3] = accounts;

  it("should detect geo boundaries properly", async () => {
    const addressBook = await AddressBook.deployed()

    await addressBook.addParticipantZipCode('Laiterie Beaufort', cheeseMaker, cheeseMaker.toString(), 73620, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Hauteluce', milkProducer1, milkProducer1.toString(), 73210, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Parly', milkProducer2, milkProducer2.toString(), 73270, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Bastia', milkProducer3, milkProducer3.toString(), 20200, {from: cheeseMaker})

    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9949'), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9948'), true, "the second participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9947'), true, "the third participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9946'), false, "the fourth participant should NOT be in the correct geo boundaries")
  })

  it("should only be allowed to add participants from the owner of the smart-contract", async () => {
    let addressBook = await AddressBook.new({from: cheeseMaker})
    try {
      await addressBook.addParticipantZipCode('Eleveur Hauteluce', milkProducer1, milkProducer1.toString(), 73210, {from: milkProducer1})
      assert.fail()
    } catch (err) {
      assert.ok(/revert/.test(err.message))
    }
  })

})
