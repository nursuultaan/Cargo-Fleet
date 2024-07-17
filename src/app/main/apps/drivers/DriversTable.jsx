import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import { getDriversData, selectDrivers } from './store/DriversSlice';

const columns = [
  { field: 'email', headerName: 'Email', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'first_name', headerName: 'Full Name', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    align: 'center',
    sortable: false,
    filterable: false,
    renderCell: params => (
      <div className="flex items-center justify-center">
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => {}}>
          <InfoIcon />
        </IconButton>
      </div>
    )
  }
];
const DriversTable = () => {
  const dispatch = useDispatch();
  const driversData = useSelector(selectDrivers);
  useEffect(() => {
    dispatch(getDriversData());
  }, [dispatch]);
  if (driversData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <CircularProgress />
      </div>
    );
  }

  return (
    <section className=" w-full p-10 ">
      {driversData && (
        <DataGrid
          rows={driversData}
          columns={columns}
          pageSize={driversData.size}
          pageSizeOptions={[5, 20]}
          autoHeight
        />
      )}
    </section>
  );
};

export default DriversTable;
