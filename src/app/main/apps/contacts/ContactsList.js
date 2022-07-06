import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
// import { openEditContactDialog, removeContact, toggleStarredContact, selectContacts } from './store/contactsSlice';
import { openEditContactDialog, selectContacts } from './store/contactsSlice';

const formatData = vehicles =>
  vehicles.map(vehicle => {
    const totalCost = `$${(vehicle.serviceCost + vehicle.fuelCost).toLocaleString()}`;
    return {
      ...vehicle,
      isAssigned: vehicle.isAssigned ? 'YES' : 'NO',
      totalCost,
      millage: vehicle.millage.toLocaleString()
    };
  });

function ContactsList(props) {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
  // const user = useSelector(({ contactsApp }) => contactsApp.user);

  const [filteredData, setFilteredData] = useState(null);

  const columns = useMemo(
    () => [
      // {
      //   Header: ({ selectedFlatRows }) => {
      //     const selectedRowIds = selectedFlatRows.map(row => row.original.id);

      //     return selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />;
      //   },
      //   accessor: 'avatar',
      //   Cell: ({ row }) => {
      //     return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
      //   },
      //   className: 'justify-center',
      //   width: 64,
      //   sortable: false
      // },
      {
        Header: 'Brand',
        accessor: 'brand',
        className: 'font-medium',
        sortable: true
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'font-medium',
        sortable: true
      },
      // TODO: add Production Year
      // {
      //   Header: 'Production Year',
      //   accessor: 'year',
      //   sortable: true
      // },
      {
        Header: 'Plate Number',
        accessor: 'plateNumber',
        sortable: true
      },
      {
        Header: 'Assigned Status',
        accessor: 'isAssigned',
        sortable: true
      },
      {
        Header: 'Vehicle Status',
        accessor: 'vehicleStatus',
        sortable: true
      },
      {
        Header: 'Total Cost',
        accessor: 'totalCost',
        sortable: true
      },
      {
        Header: 'Millage',
        accessor: 'millage',
        sortable: true
      }

      // {
      //   id: 'action',
      //   width: 128,
      //   sortable: false,
      //   Cell: ({ row }) => (
      //     <div className="flex items-center">
      //       <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(toggleStarredContact(row.original.id));
      //         }}
      //       >
      //         {user.starred && user.starred.includes(row.original.id) ? (
      //           <Icon className="text-yellow-700">star</Icon>
      //         ) : (
      //           <Icon>star_border</Icon>
      //         )}
      //       </IconButton>
      //       {/* <IconButton
      //         onClick={ev => {
      //           ev.stopPropagation();
      //           dispatch(removeContact(row.original.id));
      //         }}
      //       >
      //         <Icon>delete</Icon>
      //       </IconButton> */}
      //     </div>
      //   )
      // }
    ],
    // eslint-disable-next-line
    [dispatch, contacts]
  );

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return contacts;
      }
      return FuseUtils.filterArrayByString(contacts, _searchText);
    }

    if (contacts) {
      setFilteredData(getFilteredArray(contacts, searchText));
    }
  }, [contacts, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no contacts!
        </Typography>
      </div>
    );
  }

  const formattedData = formatData(filteredData);

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
      <ContactsTable
        columns={columns}
        data={formattedData}
        // onRowClick={(ev, row) => {
        //   if (row) {
        //     dispatch(openEditContactDialog(row.original));
        //   }
        // }}
      />
    </motion.div>
  );
}

export default ContactsList;
