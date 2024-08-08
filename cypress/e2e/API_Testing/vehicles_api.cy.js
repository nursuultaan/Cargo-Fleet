const { it } = require('date-fns/locale');

describe('Vehicles HTTP Requests', () => {
  const TOKEN = 'Zb84MzAROCrhmF6t';
  const VEHICLES_URL = 'https://cargofleet-api.fly.dev/team1/api/vehicles';
  // GET all vehicles endpoint
  it('GET All Vehicles', () => {
    cy.request({
      method: 'GET',
      url: `${VEHICLES_URL}`,
      headers: {
        Authorization: TOKEN
      }
    })
      .its('status')
      .should('equal', 200);
  });

  // GET vehicle by ID
  it('GET All Vehicles', () => {
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

  // Create vehicle with POST method
  it('Create vehicle', () => {
    cy.request({
      method: 'POST',
      url: `${VEHICLES_URL}`,
      headers: {
        Authorization: TOKEN,
        ContentType: 'application/json'
      },
      body: {
        model: 'CargoFleet24 CypressAPI',
        manufacture_year: '2004-09-22',
        image_url: 'https://loremflickr.com/300/300/truck',
        plate_number: 'TAYBADVZ',
        engine_number: 'JZ4M0ZL6N3JRBEE4',
        fuel_type: 'gasoline',
        created_at: '2023-12-29T03:40:52.975Z',
        updated_at: '2023-12-29T03:40:52.975Z',
        active: true,
        issues: [{}]
      }
    })
      .its('status')
      .should('equal', 201);
  });

  // Update vehicle info

  // Remove vehicle using ID
});
