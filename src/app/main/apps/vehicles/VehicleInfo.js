import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicle, selectVehiclesById } from './store/vehiclesSlice';
import { useParams } from 'react-router-dom';
// import BasicTable from './VehicleMaintanceInfo';

function VehicleInfo() {
  // const vehicles = useSelector(state => state.vehiclesApp.vehicles.vehicleDialog.selectedRow);
  // const status = vehicles.active

  const dispatch = useDispatch();
  const routeParams = useParams();

  const store = useSelector(state => state.vehiclesApp)
  const selectedVehicle = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.selectedVehicle);

  // const selectedVehicle = useSelector(selectVehiclesById);

  useEffect(() => {
    dispatch(getVehicle(routeParams))
  }, [])

  return (
    <>
      <div>
        <h1>Vehicles details</h1>
        <h3>Status:{status ? 'Available' : 'Unavailable'}</h3>
        <h3>Plate number:{vehicles.plate_number}</h3>
        <h3>Model:{vehicles.model}</h3>
        <h3>Engine number:{vehicles.engine_number}</h3>
        <h3>Manufacture year:{vehicles.manufacture_year}</h3>
        <h3>Fuel type:{vehicles.fuel_type}</h3>
      </div>
      <div>
        <img src={vehicles.image_url}></img>
      </div>
    </>
  );
}
export default VehicleInfo;