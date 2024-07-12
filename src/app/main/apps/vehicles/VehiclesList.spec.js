import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import VehiclesList from './VehiclesList';
import { openEditVehicleDialog } from './store/vehiclesSlice';
const mockStore = configureStore([]);
const testVehicles = [
  {
    id: 1,
    active: true,
    model: 'Tesla Model S',
    plate_number: 'ABC123',
    engine_number: 'EN12345',
    manufacture_year: '2020-01-01T00:00:00Z',
    fuel_type: 'electric',
    issues: []
  },
  {
    id: 2,
    active: false,
    model: 'Ford Focus',
    plate_number: 'XYZ789',
    engine_number: 'EN67890',
    manufacture_year: '2018-01-01T00:00:00Z',
    fuel_type: 'natural_gas',
    issues: ['engine', 'brakes']
  }
];
const initialState = {
  vehiclesApp: {
    vehicles: {
      searchText: '',
      entities: testVehicles
    }
  }
};
const renderWithProviders = (ui, { reduxState } = {}) => {
  const store = mockStore(reduxState);
  store.dispatch = jest.fn();
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('VehiclesList', () => {
  test('renders with given vehicles', () => {
    renderWithProviders(<VehiclesList />, { reduxState: initialState });
    expect(screen.getByText('Tesla Model S')).toBeInTheDocument();
    expect(screen.getByText('Ford Focus')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  test('displays message when no vehicles are present', () => {
    const emptyState = {
      vehiclesApp: {
        vehicles: {
          searchText: '',
          entities: []
        }
      }
    };
    renderWithProviders(<VehiclesList />, { reduxState: emptyState });
    expect(screen.getByText('There are no vehicles!')).toBeInTheDocument();
  });
  test.skip('filters vehicles based on search text', () => {
    const stateWithSearchText = {
      vehiclesApp: {
        vehicles: {
          searchText: 'Tesla',
          entities: testVehicles
        }
      }
    };
    renderWithProviders(<VehiclesList />, { reduxState: stateWithSearchText });
    expect(screen.getByText('Tesla Model S')).toBeInTheDocument();
    expect(screen.queryByText('Ford Focus')).not.toBeInTheDocument();
  });
  test.skip('calls openEditVehicleDialog on edit button click', () => {
    renderWithProviders(<VehiclesList />, { reduxState: initialState });
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);
    const store = mockStore(initialState);
    expect(store.dispatch).toHaveBeenCalledWith(openEditVehicleDialog(testVehicles[0]));
  });
});
