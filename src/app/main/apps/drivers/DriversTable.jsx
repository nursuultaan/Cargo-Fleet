import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';



const columns = [
  { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'firstName', headerName: 'First name', flex: 1, headerAlign: 'center', align: 'center' },
  { field: 'lastName', headerName: 'Last name', flex: 1, headerAlign: 'center', align: 'center' },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
];


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const DriversTable = () => {
  const [driversData, setDriversData] = useState(null);
  // useEffect(async ()=>{
  //
  //   function getDriversData(){
  //     const drivers = axios.get("http://localhost:3000/")
  //   }
  //
  // },[]);


  return (
    <section className="h-full w-full p-10" style={{ height: '100vh' }} >
      <div style={{ height: '80%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </section>
  );
};

export default DriversTable;