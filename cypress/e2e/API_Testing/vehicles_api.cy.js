describe('Vehicles HTTP Requests', () => {
  const TOKEN = 'Zb84MzAROCrhmF6t';
  const VEHICLES_URL = 'https://cargofleet-api.fly.dev/team1/api/vehicles';
  // GET all vehicles endpoint
  it('GET Vehicles', () => {
    cy.request({
      method: 'GET',
      url: `${VEHICLES_URL}`,
      headers: {
        Authorization: TOKEN
      }
    })
      // .its('status')
      // .should('equal', 200);
      .then(resp => {
        expect(resp.status).to.eq(200);
        expect(resp.body.page).to.eq(1);
        expect(resp.body.limit).to.eq(20);
        expect(resp.body.data).has.length(20);
        expect(resp.body).have.property('total');
        expect(resp.body.links).have.property('self');
      });
  });

  // GET vehicle by ID
  it('GET Vehicle by ID', () => {
    cy.request({
      method: 'GET',
      url: `${VEHICLES_URL}/99`,
      headers: {
        Authorization: TOKEN
      }
    })
      .its('status')
      .should('equal', 200);
  });

  // GET vehicles with Query Parameters
  it('GET Vehicles by Query Parameters', () => {
    const queryParam = '?sort=model&direction=asc';
    cy.request({
      method: 'GET',
      url: `${VEHICLES_URL}${queryParam}`,
      headers: {
        Authorization: TOKEN
      }
    }).then(resp => {
      expect(resp.status).equal(200);
      expect(resp.body.data[0]).has.property('id', 22);
      expect(resp.body.data[0]).has.property('model', 'Ashok Leyland Captain');
    });
  });

  // testID will be saved when create vehicle, used when update and delete requests
  let testId;

  // Create vehicle with POST method
  it('POST - Create Vehicle', () => {
    // Hardcoded data + dynamic data for model:
    // const createVehicleData = {
    //   // model: 'CF24 Created by CypressAPI',
    //   model: Math.random().toString(5).substring(2),
    //   manufacture_year: '2004-09-22',
    //   image_url: 'https://loremflickr.com/300/300/truck',
    //   plate_number: 'TAYBADVZ',
    //   engine_number: 'JZ4M0ZL6N3JRBEE4',
    //   fuel_type: 'gasoline',
    //   active: true,
    //   issues: [{}]
    // };
    cy.fixture('createVehicle').then(fixtureData => {
      const createVehicleData = fixtureData;
      cy.request({
        method: 'POST',
        url: `${VEHICLES_URL}`,
        headers: {
          Authorization: TOKEN,
          ContentType: 'application/json'
        },
        body: createVehicleData
      })
        // .its('status')
        // .should('equal', 201)
        .then(response => {
          expect(response.status).to.eq(201);
          // data validation from response
          expect(response.body.model).to.eq(createVehicleData.model);
          // property name and data validation:
          expect(response.body).has.property('model', createVehicleData.model);
          // testID saved and will be used for update and delete requests
          testId = response.body.id;
        });
    });
  });

  // Update vehicle info with PUT method
  it('PUT - Update Vehicle', () => {
    console.log('testId to update', testId);
    cy.fixture('updateVehicle').then(fixtureData => {
      const updateVehicleData = fixtureData;

      cy.request({
        method: 'PUT',
        url: `${VEHICLES_URL}/${testId}`,
        headers: {
          Authorization: TOKEN,
          ContentType: 'application/json'
        },
        body: updateVehicleData
      })
        // .its('status')
        // .should('equal', 200);
        .then(response => {
          expect(response.status).to.eq(200);
          expect(response.body.model).to.eq(updateVehicleData.model);
        });
    });
  });

  // Remove vehicle using ID
  it('DELETE Vehicle', () => {
    console.log('testId to delete', testId);
    cy.request({
      method: 'DELETE',
      url: `${VEHICLES_URL}/${testId}`,
      headers: {
        Authorization: TOKEN,
        ContentType: 'application/json'
      }
    })
      // .its('status')
      // .should('equal', 204);
      .then(response => {
        expect(response.status).to.eq(204);
      });
  });
});
