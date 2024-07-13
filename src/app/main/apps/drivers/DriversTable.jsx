import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getDriversData } from './store/DriversSlice';

const columns = [
  { field: 'email', headerName: 'Email', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'first_name', headerName: 'Full Name', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'phone_number', headerName: 'Phone Number', flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    renderCell: params => (
      <>
        <IconButton onClick={() => {}}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </>
    )
  }
];

const DriversTable = () => {
  const dispatch = useDispatch();
  const driversData = useSelector(state => state.driverAppReducer.data);

  useEffect(() => {
    dispatch(getDriversData());
  }, [dispatch]);
  return (
    <section className="h-full w-full p-10" style={{ height: '100vh' }}>
      {driversData && (
        <div style={{ height: '80%' }}>
          <DataGrid rows={driversData} columns={columns} pageSize={20} pageSizeOptions={[5, 10]} />
        </div>
      )}
    </section>
  );
};

export default DriversTable;
