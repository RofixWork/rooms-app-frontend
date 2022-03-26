import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/index";

export const createRoom = createAsyncThunk(
  "/rooms/create",
  async ({ room, token }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .post("/room/add-room", { ...room }, config)
      .catch((err) => console.log(err.message));
  }
);

export const getAllRooms = createAsyncThunk(
  "/rooms",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { rooms },
      } = await axios.get("/rooms", config);
      return rooms;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeRoom = createAsyncThunk(
  "/room/delete",
  async ({ id, token }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .delete(`/room/delete/${id}`, config)
      .catch((err) => console.log(err.message));
  }
);

export const updateRoom = createAsyncThunk(
  "room/update",
  async ({ id, name, token }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .patch(`/room/update/${id}`, { name }, config)
      .catch((err) => console.log(err.message));
  }
);

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async ({ id, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { room },
      } = await axios.get(`/room/${id}`, config);
      return room;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  "/message/create-message",
  async ({ data, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("/create-message", { ...data }, config);
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "/room/messages",
  async ({ id, token }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { messages },
      } = await axios.get(`/messages/${id}`, config);
      return messages;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const RoomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    room: "",
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });

    builder
      .addCase(getRoom.pending, (state, action) => {
        state.room = "";
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.room = action.payload;
      });

    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const {} = RoomSlice.actions;

export default RoomSlice.reducer;
