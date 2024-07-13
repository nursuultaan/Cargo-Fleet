import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import {
  removeVehicle,
  updateVehicle,
  addVehicle,
  closeNewVehicleDialog,
  closeEditVehicleDialog
} from './store/vehiclesSlice';

function formatDateString(dateString) {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Date format error.');
    return '';
  }
}

const defaultValues = {
  id: '',
  model: '',
  manufacture_year: '',
  image_url: '',
  plate_number: '',
  engine_number: '',
  fuel_type: '',
  created_at: '',
  updated_at: '',
  active: false
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  model: yup.string().required('You must enter a model'),
  manufacture_year: yup.string().required('You must enter a manufacture year'),
  plate_number: yup.string().required('You must enter a plate number'),
  engine_number: yup.string().required('You must enter an engine number'),
  fuel_type: yup.string().required('You must enter a fuel type')
});

function VehicleDialog(props) {
  const dispatch = useDispatch();
  const vehicleDialog = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.vehicleDialog);
  const { data } = vehicleDialog;

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  const id = watch('id');
  const model = watch('model');

  /**
   * Initialize Dialog with Data
   */
  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (vehicleDialog.type === 'edit' && vehicleDialog.data) {
      reset({ ...vehicleDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (vehicleDialog.type === 'new') {
      reset({
        ...defaultValues,
        ...vehicleDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [vehicleDialog.data, vehicleDialog.type, reset]);

  /**
   * On Dialog Open
   */
  useEffect(() => {
    if (vehicleDialog.props.open) {
      initDialog();
    }
  }, [vehicleDialog.props.open, initDialog]);

  /**
   * Close Dialog
   */
  function closeComposeDialog() {
    return vehicleDialog.type === 'edit' ? dispatch(closeEditVehicleDialog()) : dispatch(closeNewVehicleDialog());
  }

  /**
   * Form Submit
   */
  function onSubmit(submitData) {
    if (vehicleDialog.type === 'new') {
      dispatch(addVehicle(submitData));
    } else {
      dispatch(updateVehicle({ ...vehicleDialog.data, ...submitData }));
    }
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
      {...vehicleDialog.props}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {vehicleDialog.type === 'new' ? 'New Vehicle' : 'Edit Vehicle'}
          </Typography>
        </Toolbar>
      </AppBar>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">directions_car</Icon>
            </div>
            <Controller
              control={control}
              name="model"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Model"
                  id="model"
                  error={!!errors.model}
                  helperText={errors?.model?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">calendar_today</Icon>
            </div>
            <Controller
              control={control}
              name="manufacture_year"
              render={({ field }) => (
                <TextField
                  {...field}
                  defaultValue={data != null ? formatDateString(data.manufacture_year) : ''}
                  className="mb-24"
                  label="Manufacture Year"
                  id="manufacture_year"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.manufacture_year}
                  helperText={errors?.manufacture_year?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">image</Icon>
            </div>
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <TextField {...field} className="mb-24" label="Image URL" id="image_url" variant="outlined" fullWidth />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">confirmation_number</Icon>
            </div>
            <Controller
              control={control}
              name="plate_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Plate Number"
                  id="plate_number"
                  error={!!errors.plate_number}
                  helperText={errors?.plate_number?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">settings</Icon>
            </div>
            <Controller
              control={control}
              name="engine_number"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Engine Number"
                  id="engine_number"
                  error={!!errors.engine_number}
                  helperText={errors?.engine_number?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">local_gas_station</Icon>
            </div>
            <Controller
              control={control}
              name="fuel_type"
              render={({ field }) => (
                <Select
                  id="fuel_type"
                  label="Fuel Type"
                  error={!!errors.fuel_type}
                  {...field}
                  variant="outlined"
                  helperText={errors?.fuel_type?.message}
                  placeholder="Fuel type"
                  className="w-full"
                  required
                >
                  <MenuItem value="natural_gas">Natural Gas</MenuItem>
                  <MenuItem value="propane">Propane</MenuItem>
                  <MenuItem value="diesel">Diesel</MenuItem>
                  <MenuItem value="gasoline">Gasoline</MenuItem>
                </Select>
              )}
            />
          </div>
        </DialogContent>

        {vehicleDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16" >
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Add
              </Button>
            </div>
            <IconButton onClick={() => dispatch(closeNewVehicleDialog())}>
              <Icon>cancel</Icon>
            </IconButton>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                Save
              </Button>
            </div>
            <IconButton onClick={() => dispatch(closeNewVehicleDialog())}>
              <Icon>cancel</Icon>
            </IconButton>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default VehicleDialog;
