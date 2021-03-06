import Request from 'request';
import faker from 'faker';

import User from '../../src/models/User';
import run from '../../src/server';

const urlPrefixV1 = 'http://localhost:5000/api/v1';

// Creating a new parce;
describe('parcel', () => {
  let server;
  let parcelId;
  let parcelUserId;
  beforeAll(() => {
    server = run(5000);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });
  afterAll(() => {
    server.close();
  });
  describe('create an order POST /api/v1/parcels', () => {
    const data = {};
    beforeAll((done) => {
      let user = new User();
      user = user.findByEmail('user@email.com');
      const parcel = {
        userId: user.id,
        fromGeoZone: 'southwest',
        fromState: 'Lagos',
        toGeoZone: 'southsouth',
        toState: 'Delta',
        receiverNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
        receiverPhone: '234-7066813688',
        receiverAddress: faker.address.streetAddress(),
        weight: faker.random.number(),
      };

      Request.post(`${urlPrefixV1}/parcels`,
        { json: true, form: parcel }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            console.log(parcel);
            data.token = body.token;
            data.success = body.success;
            data.data = body.data;
            parcelId = body.data.id;
            parcelUserId = body.data.userId;
          }
          done();
        });
    });
    it('Status 201', () => {
      expect(data.status).toBe(201);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });
  });

  // Fetch parcels
  describe('fetch parcels GET /api/v1/parcels', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`${urlPrefixV1}/parcels`,
        { json: true }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
          }
          done();
        });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(typeof data.data).toBe('object');
    });
  });

  // Fetch a single parcel
  describe('fetch single parcel GET /api/v1/parcels/<parcelId>', () => {
    const data = {};
    beforeAll((done) => {
      Request.get(`${urlPrefixV1}/parcels/${parcelId}`,
        { json: true }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.data = body.data;
          }
          done();
        });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
    });
  });

  // Cancel a parcel
  describe('cancel a parcel PUT /api/v1/parcels/<parcelId>/cancel', () => {
    const data = {};
    beforeAll((done) => {
      // Login the new user
      Request.put(`${urlPrefixV1}/parcels/${parcelId}/cancel`,
        { json: true, form: { userId: parcelUserId } }, (err, res, body) => {
          data.status = res.statusCode;
          if (!err) {
            data.success = body.success;
            data.message = body.msg;
          }
          done();
        });
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
    it('Body', () => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('Parcel cancelled successfully');
    });
  });
});
