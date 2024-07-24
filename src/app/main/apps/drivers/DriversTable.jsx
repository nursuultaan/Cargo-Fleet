import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfoIcon from '@material-ui/icons/Info';
import { getDriversData, selectDrivers, deleteDriver, openDeleteDriverDialog } from './store/DriversSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


const DriversTable = () => {
  const dispatch = useDispatch();
  const driversData = useSelector(selectDrivers);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);

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
          <IconButton onClick={() => { }}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={(ev) => {
            ev.stopPropagation();
            setDriverToDelete(params.row.id);
            setDeleteDialogOpen(true);
          }}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => { }}>
            <InfoIcon />
          </IconButton>
        </div>
      )
    }
  ];
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Driver"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this driver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={() => {
            dispatch(deleteDriver(driverToDelete));
            setDeleteDialogOpen(false);
          }} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default DriversTable;
