import faker from 'faker';

// default parcel
const parcel = {
  id: 'd6d6a11b-6035-4373-ad76-9dd2556cd5cc',
  userId: '97cf377c-5735-4f5d-8645-c8fb4b5c5af3',
  fromGeoZone: 'southwest',
  fromState: 'Lagos',
  toGeoZone: 'southsouth',
  toState: 'Delta',
  receiverNames: `${faker.name.firstName()} ${faker.name.lastName()}`,
  receiverPhone: '234-7066813688',
  receiverAddress: faker.address.streetAddress(),
  weight: faker.random.number(),
  cancelled: false,
  location: 'Nyarungege',
  parcelStatus: 'in-transit',
};
const initParcels = () => {
  global.parcels = [parcel];
};

export default initParcels;
