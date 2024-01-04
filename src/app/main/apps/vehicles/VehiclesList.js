import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VehiclesTable from './VehiclesTable';
import { openEditContactDialog, selectVehicles } from './store/vehiclesSlice';

const formatData = vehicles =>
  vehicles.map(vehicle => {
    const totalCost = `$${(vehicle.serviceCost + vehicle.fuelCost).toLocaleString()}`;
    return {
      ...vehicle,
      isAssigned: vehicle.isAssigned ? 'YES' : 'NO',
      totalCost,
      millage: vehicle.millage.toLocaleString()
    };
  });

function VehiclesList(props) {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectVehicles);
  const searchText = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.searchText);
  // const user = useSelector(({ vehiclesApp }) => vehiclesApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map(row => row.original.id);

      //     return selectedFlatRows.length > 0 && <VehiclesMultiSelectMenu selectedContactIds={selectedRowIds} />;
      //   },
      //   accessor: 'avatar',
      //   Cell: ({ row }) => {
      //     return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
      //   },
      //   className: 'justify-center',
      //   width: 64,
      //   sortable: false
      // },
      {
        Header: 'Brand',
        accessor: 'brand',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      // TODO: add Production Year
      // {
      //   Header: 'Production Year',
      //   accessor: 'year',
      //   sortable: true
      // },
      {
        Header: 'Plate Number',
        accessor: 'plateNumber',
        sortable: true
      },
      {
        Header: 'Assigned Status',
        accessor: 'isAssigned',
        sortable: true
      },
      {
        Header: 'Vehicle Status',
        accessor: 'vehicleStatus',
        sortable: true
      },
      {
        Header: 'Total Cost',
        accessor: 'totalCost',
        sortable: true
      },
      {
        Header: 'Millage',
        accessor: 'millage',
        sortable: true
      }

      // {
      //   id: 'action',
      //   width: 128,
      //   sortable: false,
      //   Cell: ({ row }) => (
      //     <div className="flex items-center">
      //       <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(toggleStarredContact(row.original.id));
      //         }}
      //       >
      //         {user.starred && user.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       {/* <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(removeContact(row.original.id));
      //         }}
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton> */}
      //     </div>
      //   )
      // }
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

  const formattedData = formatData(filteredData);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <VehiclesTable
        columns={columns}
        data={formattedData}
        // onRowClick={(ev, row) => {
        //   if (row) {
        //     dispatch(openEditContactDialog(row.original));
        //   }
        // }}
      />
    </motion.div>
  );
}

export default VehiclesList;
