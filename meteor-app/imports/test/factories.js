/**
 * test factories.
 * configure our factories here and return the Factory module.
 */
import { Meteor } from 'meteor/meteor'
import faker from 'faker'
import { Factory } from 'meteor/dburles:factory'
import { Random } from 'meteor/random'
import CONSTANTS from '/imports/api/constants'
// publications
import Members from '/imports/api/members/schema'
import Sessions from '/imports/api/sessions/schema'
import Orders from '/imports/api/orders/schema'
import Parts from '/imports/api/parts/schema'
import Products, { Carts } from '/imports/api/products/schema'
import Purchases from '/imports/api/purchases/schema'
import Wwccs from '/imports/api/wwccs/schema'
import Promos from '/imports/api/promos/schema'
import Reports from '/imports/api/reports/schema'
// import { RegExId } from '/imports/api/schema'

import Assessments from '/imports/api/assessments/schema'
import Services from '/imports/api/assessments/schema'
import ServiceItems from '/imports/api/assessments/serviceItems'
import Events from '/imports/api/events/schema'
import Logger from '/imports/api/assessments/logger'
import OrderEmails from '/imports/api/orderemails/schema'

Factory.define('member', Members, {
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  // TODO - the rest of these
  isHere: true,
  avatar: '7.jpg',
  sessions: [{ memberId: 'randomSession' }, { memberId: 'randomSession' }],
  lastIn: new Date(),
  joined: new Date(),
  addressPostcode: '3428',
  addressState: 'VIC',
  addressStreet: '199 Henderson Spur',
  addressSuburb: 'South Melbourne',
  bikesHousehold: 5,
  email: 'Jelly.Belly@smells.nasty.com',
  emergencyContact: 'Everett Mosciski',
  emergencyEmail: 'Ibrahim.Flatley@nomail.bs.bs',
  emergencyMobile: '848-220-5422',
  emergencyPhone: '848-924-0182',
  mobile: '352-485-4816',
  name: 'Orie Kautzer',
  phone: '144-467-2060',
  workStatus: 'Student',
  reasons: `My love of bikes started as a child. It was my transport growing up,
    I had no money to pay for repairs, so I had to fix it myself. My best bike
    was a white Sun 10 speed racer. I saved up for months to buy it. I saved
    money from my paper round, and my dad threw some money in too.
  `,
  primaryBike: 'Racer'
})

Factory.define('session', Sessions, {
  memberId: Random.id(),
  memberName: 'Dave Smith',
  // eventId:
  name: 'Daily volunteering',
  timeIn: new Date(),
  timeOut: new Date(),
  duration: faker.random.number(6)
})

Factory.define('order', Orders, {
  status: CONSTANTS.ORDER_STATUS_NEW,
  orderedParts: [
    {
      name: '700c hybrid Wheel ME, eyeletted',
      price: 5000,
      qty: 1,
      partId: 'frame',
      partNo: 'sadasd',
      addedAt: new Date(),
      userId: '2ueueoaje'
    }
  ],
  totalPrice: 9900 // This is in cents
})

Factory.define('assessment', Assessments, {
  customerDetails: {
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    isRefurbish: faker.random.boolean()
  },
  bikeDetails: {
    make: faker.commerce.productName(),
    model: 'TX-1234',
    color: faker.commerce.color(),
    bikeValue: Math.round(faker.finance.amount()),
    sentimentValue: faker.random.boolean()
  },
  services: {
    serviceItem: [
      {
        name: 'Fix tyre',
        price: 5000
      },
      {
        name: 'Fix handle bar',
        price: 3000
      }
    ],
    baseService: 'Minor Service',
    totalServiceCost: 8000
  },
  parts: {
    partsItem: [
      {
        name: 'Handle Bar',
        price: 2000,
        code: 'F',
        category: 'Other',
        used: false
      }
    ],
    totalPartsCost: 2000
  },
  additionalFees: 1500,
  discount: 2000,
  totalCost: 9500,
  jobNo: 'R001',
  dropoffDate: faker.date.future(),
  pickupDate: faker.date.future(),
  urgent: faker.random.boolean(),
  assessor: faker.name.findName(),
  mechanic: faker.name.findName(),
  comment: 'Thorough cleaning of the bike is required',
  temporaryBike: faker.random.boolean(),
  status: 2,
  search: faker.name.findName()
})

Factory.define('logs', Logger, {
  user: faker.name.findName(),
  aId: '34G5785heY6262',
  status: 1,
  eventType: 2
})

Factory.define('parts', ServiceItems, {
  name: faker.commerce.productName(),
  price: Math.round(faker.commerce.price() * 100),
  code: 'F',
  category: 'Other',
  used: false
})

Factory.define('services', Services, {
  name: faker.commerce.productName(),
  price: Math.round(faker.commerce.price()),
  package: 'Minor'
})

Factory.define('part', Parts, {
  imageUrl: '/public/images/logo-large.jpg',
  retailPrice: 6666, // This is in cents
  wholesalePrice: 3333,
  partNo: 'pt-123',
  name: 'carbonfibre frame',
  barcode: '22413000022413',
  status: CONSTANTS.PART_STATUS_NEW
})

Factory.define('product', Products, {
  name: '3 Month membership for Back2Bikes',
  description: 'Passes allow you to use Back 2 Bikes',
  type: 'membership',
  code: 'B2B-MEMB-3',
  duration: 3,
  price: 5000,
  image: '/public/images/gym.jpg',
  active: true,
  autoRenew: true,
  startDate: faker.date.past(1),
  endDate: faker.date.future(1)
})

Factory.define('10pass', Products, {
  name: '10 pass',
  description: 'Passes allow you to use PA',
  type: 'pass',
  code: 'PA-PASS-MULTI-10',
  duration: 3,
  price: 15000,
  image: '/public/images/gym.jpg',
  active: true,
  autoRenew: true,
  startDate: faker.date.past(1),
  endDate: faker.date.future(1)
})

Factory.define('purchase', Purchases, {
  price: 96000,
  code: 'PA-MEMB-12',
  expiry: faker.date.future(),
  txnDate: faker.date.past(),
  purchaser: 'Mike King',
  productId: 'EKFJq9mrEjPer3PHW',
  productName: 'PA 12 month membership',
  paymentMethod: 'credit card',
  status: 'current'
})

Factory.define('purchase10pass', Purchases, {
  price: 96000,
  code: 'PA-PASS-MULTI-10',
  expiry: faker.date.future(),
  txnDate: faker.date.past(),
  purchaser: 'Mike King',
  productId: 'EKFJq9mrEjPer3PHW',
  productName: '10 session pass',
  paymentMethod: 'credit card',
  status: 'current'
})

Factory.define('event', Events, {
  name: 'Evening workshop',
  location: 'Back2bikes',
  when: new Date(),
  active: true,
  duration: 2,
  price: 200,
  type: 'monthly'
})

Factory.define('test-event', Events, {
  name: 'Squad training',
  location: 'Sandridge',
  when: new Date(),
  active: true,
  duration: 2,
  type: 'day',
  days: [1, 2, 3, 4, 5, 6, 7],
  price: 3000
})

Factory.define('wwcc', Wwccs, {
  wwcc: '01819845',
  wwccSurname: 'King',
  memberId: 'SYdWnRL5LmZXT4GxE',
  wwccOk: true
})

Factory.define('cart', Carts, {
  memberId: 'SYdWnRL5LmZXT4GxE',
  email: 'mike@nesmith.com',
  customerName: 'Mike Nesmith',
  price: 5000,
  totalqty: 1,
  prodqty: {},
  products: [Factory.create('product')],
  status: 'complete',
  customerResponse: {},
  chargeResponse: {}
})

Factory.define('promo', Promos, {
  code: 'BLACK-FRIDAY',
  description: 'Black Friday 50% off',
  discount: 50,
  admin: false,
  start: new Date()
})

Factory.define('report', Reports, {
  name: 'This is a report',
  details: 'This is the details of the report, blah, blah blah'
})

Factory.define('orderemails', OrderEmails, {
  name: 'order emails',
  description: 'order emails'
})

export default Factory
