import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';
import { closeDeleteVehicleDialog, removeVehicle } from './store/vehiclesSlice';

function ConfirmDialog(props) {
  const dispatch = useDispatch();
  const confirmDialog = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.confirmDialog);
  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    dispatch(closeDeleteVehicleDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    // if (vehicleDialog.type === 'new') {
    //   dispatch(addVehicle(data));
    // } else {
    //   dispatch(updateVehicle({ ...vehicleDialog.data, ...data }));
    // }

    //console.log('data', data);

    dispatch(removeVehicle(confirmDialog.data));
    closeComposeDialog();
  }

  /**
   * Remove Event
   */
  function handleRemove() {
    dispatch(removeVehicle(id));
    closeComposeDialog();
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24'
      }}
      {...confirmDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Do you really want to delete this vehicle?
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={onSubmit} className="flex flex-col md:overflow-hidden">
        <DialogActions className="justify-between p-4 pb-16">
          <div className="px-16">
            <Button variant="contained" color="secondary" onClick={() => closeComposeDialog()}>
              Cancel
            </Button>
          </div>
          <div className="px-16">
            <Button variant="contained" color="danger" type="submit">
              Delete
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ConfirmDialog;
