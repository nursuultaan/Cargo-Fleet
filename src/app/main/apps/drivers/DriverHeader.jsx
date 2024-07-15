import React from 'react';
import Icon from '@material-ui/core/Icon';
import { motion } from 'framer-motion';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from '../../../store/fuse/settingsSlice';
import { openNewVehicleDialog } from '../vehicles/store/vehiclesSlice';

const DriverHeader = ({ props }) => {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);

  return (
    <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
      <div className="flex flex-shrink items-center sm:w-224">
        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            account_box
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
          >
            Drivers
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
        <ThemeProvider theme={mainTheme}>
          <Button
            variant="contained"
            color="success"
            className="flex flex-2 m-16"
            onClick={() => dispatch(openNewVehicleDialog())}
          >
            Add New Driver
          </Button>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search for anything"
              className="flex flex-1 px-16"
              disableUnderline
              fullWidth
              inputProps={{
                'aria-label': 'Search'
              }}
            />
          </Paper>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default DriverHeader;
