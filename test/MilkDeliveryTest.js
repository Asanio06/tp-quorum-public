var DairyProduction = artifacts.require("DairyProduction")
var AddressBook = artifacts.require("AddressBook")
var MilkDelivery = artifacts.require("MilkDelivery")
const truffleAssert = require('truffle-assertions')

contract('MilkDelivery', function (accounts) {
  const [cheeseMaker, milkProducer1, milkProducer2, milkProducer3] = accounts

  it("should make a milk delivery", async () => {
    let milkDelivery1 = await MilkDelivery.new(cheeseMaker, {from: milkProducer2})

    assert.equal(await milkDelivery1.consumed(), false, "the milk delivery should be not be marked as consumed")
    assert.equal(await milkDelivery1.dairyApproval(), false, "the milk delivery should be not be marked as approved")
    assert.equal(await milkDelivery1.milkProducerAddress(), milkProducer2, "the milkProducerAddress should be milkProducer1")
    assert.equal(await milkDelivery1.dairyAddress(), cheeseMaker, "the milkProducerAddress should be milkProducer1")
  })

  it("should not be possible for a milk producer to validate the milk delivery", async () => {
    let milkDelivery1 = await MilkDelivery.new(cheeseMaker, {from: milkProducer1})
    await milkDelivery1.sendMilk(1000, 1, {from: milkProducer1})
    truffleAssert.eventEmitted
    try {
      await milkDelivery1.validateDelivery({from: milkProducer1})
      assert.fail()
    } catch (err) {
      assert.ok(/revert/.test(err.message))
    }
  })

  it("should be possible for a dairy to validate a delivery", async () => {
    let milkDelivery1 = await MilkDelivery.new(cheeseMaker, {from: milkProducer1})
    await milkDelivery1.sendMilk(1000, 1, {from: milkProducer1})
    truffleAssert.eventEmitted
    await milkDelivery1.validateDelivery({from: cheeseMaker})
    assert.equal(await milkDelivery1.checkDeliveryApproval(), true, "the milk delivery should have a delivery approved")
  })

})
