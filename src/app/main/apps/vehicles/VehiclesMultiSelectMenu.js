// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setVehiclesUnstarred, setVehiclesStarred, removeVehicles } from './store/vehiclesSlice';

// function VehiclesMultiSelectMenu(props) {
//   const dispatch = useDispatch();
//   const { selectedVehicleIds } = props;

//   const [anchorEl, setAnchorEl] = useState(null);

//   function openSelectedVehicleMenu(event) {
//     setAnchorEl(event.currentTarget);
//   }

//   function closeSelectedVehiclesMenu() {
//     setAnchorEl(null);
//   }

//   return (
//     <>
//       <IconButton
//         className="p-0"
//         aria-owns={anchorEl ? 'selectedVehiclesMenu' : null}
//         aria-haspopup="true"
//         onClick={openSelectedVehicleMenu}
//       >
//         <Icon>more_horiz</Icon>
//       </IconButton>
//       <Menu id="selectedVehiclesMenu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeSelectedVehiclesMenu}>
//         <MenuList>
//           <MenuItem
//             onClick={() => {
//               dispatch(removeVehicles(selectedVehicleIds));
//               closeSelectedVehiclesMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>delete</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Remove" />
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               dispatch(setVehiclesStarred(selectedVehicleIds));
//               closeSelectedVehiclesMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>star</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               dispatch(setVehiclesUnstarred(selectedVehicleIds));
//               closeSelectedVehiclesMenu();
//             }}
//           >
//             <ListItemIcon className="min-w-40">
//               <Icon>star_border</Icon>
//             </ListItemIcon>
//             <ListItemText primary="Unstarred" />
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     </>
//   );
// }

// export default VehiclesMultiSelectMenu;
