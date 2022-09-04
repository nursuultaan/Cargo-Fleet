import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const getContacts = createAsyncThunk('chatApp/contacts/getContacts', async params => {
  const response = await axios.get('/api/chat/contacts', { params });
  const data = await response.data;

  return data;
});

// Check out this video for createEntity in Redux: https://www.youtube.com/watch?v=dDWj1uL8raU&ab_channel=Rowadz
const contactsAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id
});

export const { selectAll: selectContacts, selectById: selectContactById } = contactsAdapter.getSelectors(
  state => state.chatApp.contacts
);

const contactsSlice = createSlice({
  name: 'chatApp/contacts',
  initialState: contactsAdapter.getInitialState({
    selectedContactId: null
  }),
  reducers: {
    setSelectedContactId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    removeSelectedContactId: (state, action) => {
      state.selectedContactId = null;
    }
  },
  extraReducers: {
    [getContacts.fulfilled]: contactsAdapter.setAll
  }
});

export const { setSelectedContactId, removeSelectedContactId } = contactsSlice.actions;

export default contactsSlice.reducer;
