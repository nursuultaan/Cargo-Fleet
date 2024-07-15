import React from 'react';
import DriversTable from './DriversTable';
import DriverHeader from './DriverHeader';

const DriverApp = () => {
  return (
    <section className={"py-20"}>
      <DriverHeader/>
      <div className={"p-20"}>

        <DriversTable />

      </div>
    </section>
  );
};

export default DriverApp;
