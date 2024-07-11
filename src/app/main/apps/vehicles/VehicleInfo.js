import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVehicle, vehicleInfo } from './store/vehiclesSlice';
import VehicleMaintanceTable from './VehicleMaintanceTable';
import '../../../../styles/vehicle-info.css';
// import BasicTable from './VehicleMaintanceInfo';

function VehicleInfo() {
  // const vehicles = useSelector(state => state.vehiclesApp.vehicles.vehicleDialog.selectedRow);
  const vehicles = useSelector(vehicleInfo);
  console.log('data>>', vehicles && vehicles);

  const dispatch = useDispatch();
  const { id } = useParams();

  // const store = useSelector(state => state.vehiclesApp);
  // const selectedVehicle = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.selectedVehicle);

  // const selectedVehicle = useSelector(selectVehiclesById);

  useEffect(() => {
    dispatch(getVehicle({ id }));
  }, [dispatch, id]);
  // let status = vehicles.active;

  // if (!vehicles) {
  //   return <div>Not found</div>;
  // }

  return (
    <>
      {vehicles ? (
        <div className="main-container-info">
          <div className="container-info">
            <div>
              <h1>Vehicles details</h1>
              <h3 className="text-info">Status: {vehicles.active ? 'Available' : 'Unavailable'}</h3>
              <h3 className="text-info">Plate number: {vehicles.plate_number}</h3>
              <h3 className="text-info">Model: {vehicles.model}</h3>
              <h3 className="text-info">Engine number: {vehicles.engine_number}</h3>
              <h3 className="text-info">Manufacture year: {vehicles.manufacture_year}</h3>
              <h3 className="text-info">Fuel type: {vehicles.fuel_type}</h3>
            </div>
            <div className="img-info">
              <img src={vehicles.image_url} alt="no image"></img>
            </div>
          </div>
          <div>
            <h1>Maintenances</h1>
            {vehicles.issues[0] ? <VehicleMaintanceTable issues={vehicles.issues} /> : <>No Maintenances yet...</>}
          </div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </>
  );
}
export default VehicleInfo;
