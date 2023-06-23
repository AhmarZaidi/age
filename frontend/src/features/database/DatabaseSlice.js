/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const connectToDatabase = createAsyncThunk(
  'database/connectToDatabase',
  async (formData) => {
    formData.port = parseInt(formData.port);
    const appendForm = {
      ssl: 'disable',
      graph_init: false,
      version: 11,
    };

    const updateFormData = { ...formData, ...appendForm };

    try {
      // const response = await fetch('http://localhost:8081/api/connect', {
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateFormData),
      });
      if (response.ok) {
        console.log("Connect Response: ", response);
        // console.log("Connect Response Get Cookie: ", response.headers.get('Set-Cookie'));
        // console.log("Connect Response Headers: ", response.headers);
        // cookies = response.headers.get('Custom-Set-Cookie'); // Save the cookies from the response
        return await response.json();
      }
      throw response;
    } catch (error) {
      const errorJson = await error.json();
      console.log("Connect Error: ", errorJson);
      const errorDetail = {
        name: 'Failed to Retrieve Connection Information',
        message: `[${errorJson.severity}]:(${errorJson.code}) ${errorJson.message} `,
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  }
);


export const disconnectToDatabase = createAsyncThunk(
  'database/disconnectToDatabase',
  async () => {
    // console.log("Cookies DatabaseSlice.js: ", cookies)
    // fetch('http://localhost:8081/api/disconnect', {
    fetch('api/disconnect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // credentials: 'include',
        // 'Cookie': cookies, // Send the cookies from the previous connection
      },
    })
      .then(response => {
        console.log("Disconnect Response: ", response);
        // cookies = ""; // Clear the cookies variable
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
);

export const getConnectionStatus = createAsyncThunk(
  'database/getConnectionStatus',
  async () => {
    try {
      // const response = await fetch('http://localhost:8081/api/status', {
      const response = await fetch('/api/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Cookie': cookies,
        },
      })
      if (response.ok) {
        return await response.json();
      }
      throw response;
    } catch (error) {
      const errorJson = await error.json();
      const errorDetail = {
        name: 'Failed to Retrieve Connection Information',
        message: `[${errorJson.severity}]:(${errorJson.code}) ${errorJson.message} `,
        statusText: error.statusText,
      };
      throw errorDetail;
    }
  }
);

const DatabaseSlice = createSlice({
  name: 'database',
  initialState: {
    status: 'init',
  },
  reducers: {
    changeGraph: (state, action) => ({
      ...state,
      graph: action.payload.graphName,
    }),
  },
  extraReducers: {
    [connectToDatabase.fulfilled]: (state, action) => ({
      host: action.payload.Host,
      port: action.payload.Port,
      user: action.payload.User,
      password: action.payload.Password,
      database: action.payload.Database,
      graph: action.payload.Graphs,
      status: 'connected',
    }),
    [connectToDatabase.rejected]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      status: 'disconnected',
    }),
    [disconnectToDatabase.fulfilled]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      status: 'disconnected',
    }),
    [getConnectionStatus.fulfilled]: (state, action) => ({
      host: action.payload.Host,
      port: action.payload.Port,
      user: action.payload.User,
      password: action.payload.Password,
      database: action.payload.Database,
      graph: action.payload.Graphs,
      status: 'connected',
    }),
    [getConnectionStatus.rejected]: () => ({
      host: '',
      port: '',
      user: '',
      password: '',
      database: '',
      graph: '',
      status: 'disconnected',
    }),
  },
});
export const { changeGraph } = DatabaseSlice.actions;

export default DatabaseSlice.reducer;
