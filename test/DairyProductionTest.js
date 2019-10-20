var DairyProduction = artifacts.require("DairyProduction")
var AddressBook = artifacts.require("AddressBook")
var MilkDelivery = artifacts.require("MilkDelivery")

contract('DairyProduction', function (accounts) {
  const [cheeseMaker, milkProducer1, milkProducer2, milkProducer3] = accounts;

  it("should make a cheese and consume milk deliveries", async () => {
    let addressBook = await AddressBook.deployed()

    let milkDelivery1 = await MilkDelivery.new(cheeseMaker, {from: milkProducer1})
    let milkDelivery2 = await MilkDelivery.new(cheeseMaker, {from: milkProducer2})

    let dairyProduction = await DairyProduction.new(addressBook.address, {from: cheeseMaker})
    await dairyProduction.makeCheese(1000, [milkDelivery1.address, milkDelivery2.address], {from: cheeseMaker})

    assert.equal(await milkDelivery1.consumed(), true, "the milk deliveries should be marked as consumed")
    assert.equal(await milkDelivery2.consumed(), true, "the milk deliveries should be marked as consumed")
  })

  it("should check geo boundaries correctly", async () => {
    let addressBook = await AddressBook.new({from: cheeseMaker})

    await addressBook.addParticipantZipCode('Laiterie Beaufort', cheeseMaker, cheeseMaker.toString(), 73620, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Hauteluce', milkProducer1, milkProducer1.toString(), 73210, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Parly', milkProducer2, milkProducer2.toString(), 73270, {from: cheeseMaker})
    await addressBook.addParticipantZipCode('Eleveur Bastia', milkProducer3, milkProducer3.toString(), 20200, {from: cheeseMaker})

    let md1 = await MilkDelivery.new(cheeseMaker, {from: milkProducer1})
    let dairyProduction1 = await DairyProduction.new(addressBook.address, {from: cheeseMaker})
    await dairyProduction1.makeCheese(1000, [md1.address], {from: cheeseMaker})

    let md2 = await MilkDelivery.new(cheeseMaker, {from: milkProducer2})
    let md3 = await MilkDelivery.new(cheeseMaker, {from: milkProducer3})
    let dairyProduction2 = await DairyProduction.new(addressBook.address, {from: cheeseMaker})
    await dairyProduction2.makeCheese(1000, [md2.address, md3.address], {from: cheeseMaker})

    assert.equal(await dairyProduction1.checkGeoBoundaries(), true, "the first cheese should be AOP")
    assert.equal(await dairyProduction2.checkGeoBoundaries(), false, "the second cheese should not be AOP")
  })

})
