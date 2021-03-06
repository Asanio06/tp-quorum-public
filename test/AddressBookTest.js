var AddressBook = artifacts.require("AddressBook");

contract('AddressBook', function(accounts) {
  const [cheeseMaker, milkProducer1, milkProducer2, milkProducer3] = accounts;

  it("should detect geo boundaries properly", async () => {
    const addressBook = await AddressBook.deployed()

    await addressBook.addParticipantZipCode('cheeseMaker', '0x809e815596abeb3764abf81be2dc39fbbacc9949', 'quorum addr',73620, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('milkProducer1', '0x809e815596abeb3764abf81be2dc39fbbacc9948', 'quorum addr', 73210, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('milkProducer2', '0x809e815596abeb3764abf81be2dc39fbbacc9947', 'quorum addr', 73270, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('milkProducer3', '0x809e815596abeb3764abf81be2dc39fbbacc9946', 'quorum addr', 20200, {from: cheeseMaker})

    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9949'), true, "the first participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9948'), true, "the second participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9947'), true, "the third participants should be in the correct geo boundaries")
    assert.equal(await addressBook.checkGeoBoundaries('0x809e815596abeb3764abf81be2dc39fbbacc9946'), false, "the fourth participant should NOT be in the correct geo boundaries")
  })

  it("should only be allowed to add participants from the owner of the smart-contract", async () => {
    const addressBook = await AddressBook.deployed()
    try {
      await addressBook.addParticipantZipCode('Test', '0x809e815596abeb3764abf81be2dc39fbbacc9949', 'quorum addr', 73210, {from: milkProducer1})
      assert.fail()
    } catch (err) {
      assert.ok(/revert/.test(err.message))
    }
  })

})
