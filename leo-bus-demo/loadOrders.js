const path = require('path')
process.env.LEO_LOCAL = true
process.env.NODE_ENV = 'local'
process.env.LEO_LOGGER = '/.*/tide'
process.env.leo_config_bootstrap_path = process.cwd()+ path.sep + 'leo_config.js'

let leo = require('leo-sdk')
let faker = require('faker')
let botId = 'wingtonProducerId'
let queueName = 'loadOrderQueue'
let stream = leo.load(botId, queueName)

setInterval(()=>{
  stream.write({
  customerId: faker.random.number(100),
    orderId: faker.random.uuid(),
    product: faker.commerce.product(),
    dateOfSale: faker.date.past(),
    color: faker.commerce.color(),
    department: faker.commerce.department(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    salesAgenId: faker.random.number(10),
    salesZip: faker.address.zipCode(),
    shippingAddress: {
      address1: faker.address.streetAddress(),
      address2: faker.address.secondaryAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode()
    }
  })
}, 60000)
