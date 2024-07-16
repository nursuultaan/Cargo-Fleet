import React from 'react';
import DriversTable from './DriversTable';
import DriverHeader from './DriverHeader';
import FusePageSimple from '../../../../@fuse/core/FusePageSimple';

const DriverApp = () => {
  return (
    <>
      <FusePageSimple
        classes={{
          contentWrapper: 'p-0 sm:p-24 h-full',
          content: 'flex flex-col h-full',
          leftSidebar: 'w-256 border-0',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
          wrapper: 'min-h-0'
        }}
        header={<DriverHeader />}
        content={<DriversTable />}
        // leftSidebarContent={<VehiclesSidebarContent />}
        sidebarInner
        innerScroll
      />
    </>
  );
};

export default DriverApp;
