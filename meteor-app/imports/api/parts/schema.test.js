import { resetDatabase } from '/imports/test/util-test'
import { expect } from 'chai'

// Don't mention ze war! (or ze debu g g e r!)
import CONSTANTS from '/imports/api/constants'
import Parts from '/imports/api/parts/schema'
import Factory from '/imports/test/factories'

const badParts = [
  {
    imageUrl: '/public/images/logo-large.jpg',
    wholesalePrice: 3000, // in cents
    partNo: '12345',
    name: 'golden bell',
    barcode: '0001000010102345',
    status: CONSTANTS.PART_STATUS_OK
  },

  {
    imageUrl: '/public/images/logo-large.jpg',
    retailPrice: 5070,
    wholesalePrice: 33.4,
    name: 'golden bell',
    barcode: '0102345001000010',
    status: CONSTANTS.PART_STATUS_OK
  },

  {
    imageUrl: '/public/images/logo-large.jpg',
    retailPrice: 9690,
    partNo: '101',
    name: 'bmx pegs',
    barcode: '11100011102',
    status: CONSTANTS.PART_STATUS_OK
  },

  {
    retailPrice: 7865,
    wholesalePrice: null, // Fails on this
    partNo: '1010',
    name: 'brake line',
    barcode: '11100011102',
    status: CONSTANTS.PART_STATUS_OK
  },

  {
    imageUrl: '/public/images/logo-large.jpg',
    retailPrice: null, // Fails on this
    wholesalePrice: 3000,
    partNo: '12345',
    name: 'golden bell',
    barcode: '0001000010102345',
    status: CONSTANTS.PART_STATUS_OK
  }
]

const goodParts = [
  {
    imageUrl: '/public/images/logo-large.jpg',
    retailPrice: 5000,
    wholesalePrice: 3000,
    partNo: '12345',
    name: 'golden bell',
    barcode: '0001000010102345',
    status: CONSTANTS.PART_STATUS_OK
  },

  {
    imageUrl: '/public/images/logo-large.jpg',
    retailPrice: 600.0,
    wholesalePrice: 34000,
    partNo: '12345'
  },

  {
    retailPrice: 34500,
    wholesalePrice: 333000,
    partNo: '54321',
    name: 'pink pedals'
  }
]

goodParts.push(Factory.build('part'))

describe('schema', () => {
  beforeEach(resetDatabase)

  goodParts.forEach((good, i) => {
    describe('PartsSchema good parts', () => {
      it(`Succeeds on GOOD Parts insert ${i + 1}`, () => {
        expect(() => Parts.insert(good)).not.to.throw()
      })
    })

    describe('query database good parts', () => {
      it('success if database query matches', () => {
        const partId = Parts.insert(good)
        const part = Parts.findOne(partId)

        expect(part._id).to.equal(good._id)
        expect(part.retailPrice).to.equal(good.retailPrice)
        expect(part.partNo).to.equal(good.partNo)
      })
    })

    badParts.forEach((bad, i) => {
      describe('PartsSchema bad parts', () => {
        it(`Succeeds on BAD Parts insert ${i + 1}`, () => {
          expect(() => Parts.insert(bad)).to.throw()
        })
      })
    })

    describe('Part Status', () => {
      it('Checks on part status values', () => {
        // fails validation, throws
        let l = Factory.build('part')
        l.status = 98
        expect(() => Parts.insert(l)).to.throw()

        l = Factory.build('part')
        l.status = 0
        expect(() => Parts.insert(l)).to.throw()

        l = Factory.build('part')
        l.status = toString(3)
        expect(() => Parts.insert(l)).to.throw()

        l = Factory.build('part')
        l.status = CONSTANTS.PART_STATUS_OK
        expect(() => Parts.insert(l)).not.to.throw()

        l = Factory.build('part')
        l.status = CONSTANTS.PART_STATUS_DELETED
        expect(() => Parts.insert(l)).not.to.throw()

        l = Factory.build('part')
        l.status = CONSTANTS.PART_STATUS_AUTO_CREATED
        expect(() => Parts.insert(l)).not.to.throw()
      })
    })
  })
})
