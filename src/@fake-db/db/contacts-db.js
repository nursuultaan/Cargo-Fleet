import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import mock from '../mock';

const vehiclesDB = {
  vehicles: [
    {
      id: 1,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK2034',
      isAssigned: true,
      vehicleStatus: 'active',
      serviceCost: 3317.44,
      fuelCost: 118.65,
      millage: 36292
    },
    {
      id: 2,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK4046',
      isAssigned: false,
      vehicleStatus: 'inactive',
      serviceCost: 3499.72,
      fuelCost: 126.17,
      millage: 38665
    },
    {
      id: 3,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK8926',
      isAssigned: true,
      vehicleStatus: 'active',
      serviceCost: 2041.88,
      fuelCost: 121.42,
      millage: 38043
    },
    {
      id: 3,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK375',
      isAssigned: true,
      vehicleStatus: 'active',
      serviceCost: 1615.12,
      fuelCost: 102.72,
      millage: 30564
    },
    {
      id: 4,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK8876',
      isAssigned: true,
      vehicleStatus: 'inactive',
      serviceCost: 1298.46,
      fuelCost: 135.24,
      millage: 22678
    },
    {
      id: 5,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK7755',
      isAssigned: false,
      vehicleStatus: 'active',
      serviceCost: 3882.41,
      fuelCost: 146.11,
      millage: 22158
    },
    {
      id: 6,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK4547',
      isAssigned: false,
      vehicleStatus: 'inactive',
      serviceCost: 1292.07,
      fuelCost: 107.07,
      millage: 33830
    },
    {
      id: 7,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK7277',
      isAssigned: true,
      vehicleStatus: 'inactive',
      serviceCost: 2742.61,
      fuelCost: 132.64,
      millage: 21731
    },
    {
      id: 8,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK8212',
      isAssigned: false,
      vehicleStatus: 'inactive',
      serviceCost: 3125.85,
      fuelCost: 114.46,
      millage: 25788
    },
    {
      id: 9,
      brand: 'TOYOTA',
      model: 'HIACE',
      plateNumber: 'CK1009',
      isAssigned: false,
      vehicleStatus: 'inShop',
      serviceCost: 2176.15,
      fuelCost: 127.61,
      millage: 24222
    }
  ]
};

mock.onGet('/api/vehicle-list-app/vehicles').reply(config => {
  const { id } = config.params;
  let response = [];
  switch (id) {
    case 'frequent': {
      response = vehiclesDB.vehicles.filter(contact => vehiclesDB.user[0].frequentContacts.includes(contact.id));
      break;
    }
    case 'starred': {
      response = vehiclesDB.vehicles.filter(contact => vehiclesDB.user[0].starred.includes(contact.id));
      break;
    }
    default: {
      response = vehiclesDB.vehicles;
    }
  }
  return [200, response];
});

// mock.onGet('/api/contacts-app/user').reply(config => {
//   return [200, contactsDB.user[0]];
// });

// mock.onPost('/api/contacts-app/add-contact').reply(request => {
//   const { contact } = JSON.parse(request.data);
//   const newContact = {
//     ...contact,
//     id: FuseUtils.generateGUID()
//   };
//   contactsDB.contacts = [...contactsDB.contacts, newContact];
//   return [200, newContact];
// });

// mock.onPost('/api/contacts-app/update-contact').reply(request => {
//   const { contact } = JSON.parse(request.data);

//   contactsDB.contacts = contactsDB.contacts.map(_contact => {
//     if (contact.id === _contact.id) {
//       return contact;
//     }
//     return _contact;
//   });

//   return [200, contact];
// });

// mock.onPost('/api/contacts-app/remove-contact').reply(request => {
//   const { contactId } = JSON.parse(request.data);
//   contactsDB.contacts = contactsDB.contacts.filter(contact => contactId !== contact.id);

//   return [200, contactId];
// });

// mock.onPost('/api/contacts-app/remove-contacts').reply(request => {
//   const { contactIds } = JSON.parse(request.data);
//   contactsDB.contacts = contactsDB.contacts.filter(contact => !contactIds.includes(contact.id));
//   return [200, contactIds];
// });

// mock.onPost('/api/contacts-app/toggle-starred-contact').reply(request => {
//   const { contactId } = JSON.parse(request.data);
//   contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, [contactId]);
//   return [200, contactId];
// });

// mock.onPost('/api/contacts-app/toggle-starred-contacts').reply(request => {
//   const { contactIds } = JSON.parse(request.data);
//   contactsDB.user[0].starred = _.xor(contactsDB.user[0].starred, contactIds);
//   return [200, contactIds];
// });

// mock.onPost('/api/contacts-app/set-contacts-starred').reply(request => {
//   const { contactIds } = JSON.parse(request.data);

//   contactsDB.user[0].starred = [...contactsDB.user[0].starred, ...contactIds];

//   return [200, contactIds];
// });

// mock.onPost('/api/contacts-app/set-contacts-unstarred').reply(request => {
//   const { contactIds } = JSON.parse(request.data);

//   contactsDB.user[0].starred = contactsDB.user[0].starred.filter(contactId => !contactIds.includes(contactId));

//   return [200, contactIds];
// });
