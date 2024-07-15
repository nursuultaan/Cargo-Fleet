import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
    renderCell: params => (
      <div className="flex justify-center">
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => {}}>
          <DeleteIcon />
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
  return (
    <section className="h-full w-full " style={{ height: '100vh' }}>
      {driversData && (
        <div style={{ height: '80%' }} className="p-10">
          <DataGrid rows={driversData} columns={columns} pageSize={20} pageSizeOptions={[5, 10]} />
        </div>
      )}
    </section>
  );
};

export default DriversTable;
