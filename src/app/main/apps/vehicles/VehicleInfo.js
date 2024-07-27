import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { getVehicle, vehicleInfo } from './store/vehicleSlice';
import VehicleMaintanceTable from './VehicleMaintanceTable';
import reducer from './store';

import '../../../../styles/vehicle-info.css';

function VehicleInfo() {
  const vehicles = useSelector(vehicleInfo);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVehicle({ id }));
  }, [dispatch, id]);

  return (
    <>
      <div className="header">
        <p>Vehicles details</p>
      </div>
      {vehicles ? (
        <div className="main-container-info">
          <div className="container-info">
            <div>
              <h3 className="text-info">Status: {vehicles.active ? 'Available' : 'Unavailable'}</h3>
              <h3 className="text-info">Plate number: {vehicles.plate_number}</h3>
              <h3 className="text-info">Model: {vehicles.model}</h3>
              <h3 className="text-info">Engine number: {vehicles.engine_number}</h3>
              <h3 className="text-info">Manufacture year: {vehicles.manufacture_year}</h3>
              <h3 className="text-info">Fuel type: {vehicles.fuel_type}</h3>
            </div>

            <div className="img-info">
              <img src={vehicles.image_url} alt="no found" />
            </div>
          </div>
          <div>
            <h1>Maintenances</h1>
            {vehicles.issues[0] ? <VehicleMaintanceTable issues={vehicles.issues} /> : <>No Maintenances yet...</>}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
export default withReducer('vehiclesApp', reducer)(VehicleInfo);
