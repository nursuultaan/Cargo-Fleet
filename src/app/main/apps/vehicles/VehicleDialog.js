// import FuseUtils from '@fuse/utils/FuseUtils';
// import { yupResolver } from '@hookform/resolvers/yup';
// import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { useCallback, useEffect } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';

// import _ from '@lodash';
// import * as yup from 'yup';

// // import {
// //   removeVehicle,
// //   updateVehicle,
// //   addVehicle,
// //   closeNewVehicleDialog,
// //   closeEditVehicleDialog
// // } from './store/vehiclesSlice';

// const defaultValues = {
//   id: '',
//   name: '',
//   lastName: '',
//   avatar: 'assets/images/avatars/profile.jpg',
//   nickname: '',
//   company: '',
//   jobTitle: '',
//   email: '',
//   phone: '',
//   address: '',
//   birthday: '',
//   notes: ''
// };

// /**
//  * Form Validation Schema
//  */
// const schema = yup.object().shape({
//   name: yup.string().required('You must enter a name')
// });

// function VehicleDialog(props) {
//   const dispatch = useDispatch();
//   const vehicleDialog = useSelector(({ vehiclesApp }) => vehiclesApp.vehicles.vehicleDialog);

//   const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
//     mode: 'onChange',
//     defaultValues,
//     resolver: yupResolver(schema)
//   });

//   const { isValid, dirtyFields, errors } = formState;

//   const id = watch('id');
//   const name = watch('name');
//   const avatar = watch('avatar');

//   /**
//    * Initialize Dialog with Data
//    */
//   const initDialog = useCallback(() => {
//     /**
//      * Dialog type: 'edit'
//      */
//     if (vehicleDialog.type === 'edit' && vehicleDialog.data) {
//       reset({ ...vehicleDialog.data });
//     }

//     /**
//      * Dialog type: 'new'
//      */
//     if (vehicleDialog.type === 'new') {
//       reset({
//         ...defaultValues,
//         ...vehicleDialog.data,
//         id: FuseUtils.generateGUID()
//       });
//     }
//   }, [vehicleDialog.data, vehicleDialog.type, reset]);

//   /**
//    * On Dialog Open
//    */
//   useEffect(() => {
//     if (vehicleDialog.props.open) {
//       initDialog();
//     }
//   }, [vehicleDialog.props.open, initDialog]);

//   /**
//    * Close Dialog
//    */
//   function closeComposeDialog() {
//     return vehicleDialog.type === 'edit' ? dispatch(closeEditVehicleDialog()) : dispatch(closeNewVehicleDialog());
//   }

//   /**
//    * Form Submit
//    */
//   function onSubmit(data) {
//     if (vehicleDialog.type === 'new') {
//       dispatch(addVehicle(data));
//     } else {
//       dispatch(updateVehicle({ ...vehicleDialog.data, ...data }));
//     }
//     closeComposeDialog();
//   }

//   /**
//    * Remove Event
//    */
//   function handleRemove() {
//     dispatch(removeVehicle(id));
//     closeComposeDialog();
//   }

//   return (
//     <Dialog
//       classes={{
//         paper: 'm-24'
//       }}
//       {...vehicleDialog.props}
//       // onClose={closeComposeDialog}
//       fullWidth
//       maxWidth="xs"
//     >
//       <AppBar position="static" elevation={0}>
//         <Toolbar className="flex w-full">
//           <Typography variant="subtitle1" color="inherit">
//             {vehicleDialog.type === 'new' ? 'New Vehicle' : 'Edit Vehicle'}
//           </Typography>
//         </Toolbar>
//         <div className="flex flex-col items-center justify-center pb-24">
//           <Avatar className="w-96 h-96" alt="vehicle avatar" src={avatar} />
//           {vehicleDialog.type === 'edit' && (
//             <Typography variant="h6" color="inherit" className="pt-8">
//               {name}
//             </Typography>
//           )}
//         </div>
//       </AppBar>
//       <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
//         <DialogContent classes={{ root: 'p-24' }}>
//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">account_circle</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="name"
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Name"
//                   id="name"
//                   error={!!errors.name}
//                   helperText={errors?.name?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20" />

//             <Controller
//               control={control}
//               name="lastName"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Last name" id="lastName" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">star</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="nickname"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Nickname" id="nickname" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">phone</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="phone"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Phone" id="phone" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">email</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Email" id="email" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">domain</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="company"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Company" id="company" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">work</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="jobTitle"
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Job title"
//                   id="jobTitle"
//                   name="jobTitle"
//                   variant="outlined"
//                   fullWidth
//                 />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">cake</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="birthday"
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   id="birthday"
//                   label="Birthday"
//                   type="date"
//                   InputLabelProps={{
//                     shrink: true
//                   }}
//                   variant="outlined"
//                   fullWidth
//                 />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">home</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="address"
//               render={({ field }) => (
//                 <TextField {...field} className="mb-24" label="Address" id="address" variant="outlined" fullWidth />
//               )}
//             />
//           </div>

//           <div className="flex">
//             <div className="min-w-48 pt-20">
//               <Icon color="action">note</Icon>
//             </div>
//             <Controller
//               control={control}
//               name="notes"
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Notes"
//                   id="notes"
//                   variant="outlined"
//                   multiline
//                   rows={5}
//                   fullWidth
//                 />
//               )}
//             />
//           </div>
//         </DialogContent>

//         {vehicleDialog.type === 'new' ? (
//           <DialogActions className="justify-between p-4 pb-16">
//             <div className="px-16">
//               <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
//                 Add
//               </Button>
//             </div>
//           </DialogActions>
//         ) : (
//           <DialogActions className="justify-between p-4 pb-16">
//             <div className="px-16">
//               <Button variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
//                 Save
//               </Button>
//             </div>
//             <IconButton onClick={handleRemove}>
//               <Icon>delete</Icon>
//             </IconButton>
//           </DialogActions>
//         )}
//       </form>
//     </Dialog>
//   );
// }

// export default VehicleDialog;
