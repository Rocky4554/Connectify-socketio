// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   selectedChat: [],
//   user: JSON.parse(localStorage.getItem("userInfo")) || null,
//   notification: [],
//   chats: [],
// };

// const chatSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setSelectedChat: (state, action) => {
//       state.selectedChat = action.payload;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       if (action.payload) {
//         localStorage.setItem("userInfo", JSON.stringify(action.payload));
//       } else {
//         localStorage.removeItem("userInfo");
//       }
//     },
//     setNotification: (state, action) => {
//       state.notification = action.payload;
//     },
//     addNotification: (state, action) => {
//       state.notification.push(action.payload);
//     },
//     removeNotification: (state, action) => {
//       state.notification = state.notification.filter(
//         (notif) => notif._id !== action.payload
//       );
//     },
//     setChats: (state, action) => {
//       state.chats = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.selectedChat = null;
//       state.chats = null;
//       state.notification = [];
//       localStorage.removeItem("userInfo");
//     },
//   },
// });

// export const {
//   setSelectedChat,
//   setUser,
//   setNotification,
//   addNotification,
//   removeNotification,
//   setChats,
//   logout,
// } = chatSlice.actions;

// export default chatSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  user: null,
  notification: [],
  chats: [],
  onlineUsers: [], // <-- Added
};

const chatSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    addNotification: (state, action) => {
      state.notification.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(
        (notif) => notif._id !== action.payload
      );
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },

    // 🔥 New reducer for managing online users
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.selectedChat = null;
      state.chats = [];
      state.notification = [];
      state.onlineUsers = []; // clear online info
    },
  },
});

export const {
  setSelectedChat,
  setUser,
  setNotification,
  addNotification,
  removeNotification,
  setChats,
  setOnlineUsers, // <-- Export added action
  logout,
} = chatSlice.actions;

export default chatSlice.reducer;
