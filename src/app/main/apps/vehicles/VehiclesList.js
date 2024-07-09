import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import { Icon, IconButton } from '@material-ui/core';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehiclesTable from './VehiclesTable';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { openEditVehicleDialog, selectVehicles, openDeleteVehicleDialog, toggleError } from './store/vehiclesSlice';

function VehiclesList(props) {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const searchText = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.searchText);
  // const user = useSelector(({ vehiclesApp }) => vehiclesApp.user);
  const store = useSelector(state => state.vehiclesApp);
  const error = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.error);

  const handleClose = () => {
    dispatch(toggleError());
  };

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      {
        id: 'active',
        Header: 'Status',
        accessor: d => (d.active ? 'Active' : 'Inactive'),
        sortable: true
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Plate Number',
        accessor: 'plate_number',
        sortable: true
      },
      {
        Header: 'Engine Number',
        accessor: 'engine_number',
        sortable: true
      },
      {
        Header: 'Year',
        accessor: d => d.manufacture_year.slice(0, 4),
        sortable: true
      },
      {
        Header: 'Fuel Type',
        accessor: d =>
          d.fuel_type === 'natural_gas' ? 'Natural Gas' : d.fuel_type.charAt(0).toUpperCase() + d.fuel_type.slice(1),
        sortable: true
      },
      {
        id: 'issues',
        Header: 'Issues',
        accessor: d => d.issues.length,
        sortable: false
      },
      {
        Header: 'Actions',
        id: 'action',
        width: 128,
        sortable: false,
        Cell: ({ row }) => (
          <div className="flex items-center">
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                // dispatch(moreInfo(row.original.id));
              }}
            >
              <Icon>info</Icon>
            </IconButton>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                console.log('Edit');
                console.log(row.original);
                dispatch(openEditVehicleDialog(row.original));
              }}
            >
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              onClick={ev => {
                ev.stopPropagation();
                dispatch(openDeleteVehicleDialog(row.original.id));
                //dispatch(removeVehicle(row.original.id));
              }}
            >
              <Icon>delete</Icon>
            </IconButton>
          </div>
        )
      }
    ],
    // eslint-disable-next-line
    [dispatch, vehicles]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return vehicles;
      }
      return FuseUtils.filterArrayByString(vehicles, _searchText);
    }

    if (vehicles) {
      setFilteredData(getFilteredArray(vehicles, searchText));
    }
  }, [vehicles, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no vehicles!
        </Typography>
      </div>
    );
  }

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={error}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
          Server error!
        </Alert>
      </Snackbar>
      <VehiclesTable columns={columns} data={filteredData} />
    </motion.div>
  );
}

export default VehiclesList;
