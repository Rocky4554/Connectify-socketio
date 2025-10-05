// import { FormControl, Input, Box, Text } from "@chakra-ui/react";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../lib/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon } from "@chakra-ui/icons";
// import ProfileModal from "./ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";

// import io from "socket.io-client";
// import UpdateGroupChatModal from "./UpdateGroupChatModal";
// import { useSelector, useDispatch } from "react-redux"; 
// import { setSelectedChat, setNotification } from "../store/userSlice";

// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
// var socket, selectedChatCompare;

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [istyping, setIsTyping] = useState(false);
//   const toast = useToast();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };

//   // ✅ redux state
//   const dispatch = useDispatch();
//   const { selectedChat, user, notification } = useSelector((state) => state.user);

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
//         setNewMessage("");
//         const { data } = await axios.post(
//           "/message",
//           {
//             content: newMessage,
//             // chatId: selectedChat,
//             chatId: selectedChat._id
//           },
//           config
//         );
//         socket.emit("new message", data);
//         setMessages([...messages, data]);
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = selectedChat;
//     // eslint-disable-next-line
//   }, [selectedChat]);

//   useEffect(() => {
//     socket.on("message recieved", (newMessageRecieved) => {
//       if (
//         !selectedChatCompare || // if chat is not selected or doesn't match current chat
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(newMessageRecieved)) {
//           dispatch(setNotification([newMessageRecieved, ...notification])); // ✅ redux
//           setFetchAgain(!fetchAgain);
//         }
//       } else {
//         setMessages([...messages, newMessageRecieved]);
//       }
//     });
//   });

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}
//               icon={<ArrowBackIcon />}
//               onClick={() => dispatch(setSelectedChat(""))} // ✅ redux
//             />
//             {messages &&
//               (!selectedChat.isGroupChat ? (
//                 <>
//                   {getSender(user, selectedChat.users)}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}
//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName.toUpperCase()}
//                   <UpdateGroupChatModal
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (
//               <div className="messages">
//                 <ScrollableChat messages={messages} />
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}
//               id="first-name"
//               isRequired
//               mt={3}
//             >
//               {istyping ? (
//                 <div>
//                   <Lottie
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (
//                 <></>
//               )}
//               <Input
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (
//         // to get socket.io on same page
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;


import {
  Input,
  Box,
  Text,
  IconButton,
  Spinner,
  Field,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "./styles.css";
import { getSender, getSenderFull } from "../lib/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileModal from "./ProfileModal";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import io from "socket.io-client";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat, setNotification } from "../store/userSlice";
import { axiosInstance } from "../lib/axios";

const ENDPOINT = "http://localhost:5000"; // Change to your backend after deployment
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();
  const { selectedChat, user, notification } = useSelector((state) => state.user);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat || !selectedChat._id) {
      console.log("No selectedChat or chatId found");
      return;
    }
    try {
      setLoading(true);
      console.log("Fetching messages for chat:", selectedChat._id);
      const { data } = await axiosInstance.get(`/message/${selectedChat._id}`);
      setMessages(data);
      setLoading(false);
      if (socket) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      setLoading(false);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage && selectedChat && selectedChat._id) {
      const messageContent = newMessage.trim();
      if (!messageContent) return;
      
      if (socket) {
        socket.emit("stop typing", selectedChat._id);
      }
      
      // Clear the input immediately to prevent double sending
      setNewMessage("");
      
      try {
        const { data } = await axiosInstance.post(
          "/message",
          {
            content: messageContent,
            chatId: selectedChat._id,
          }
        );
        
        // Add the message to your own chat immediately for better UX
        setMessages((prev) => {
          const messageExists = prev.some(msg => msg._id === data._id);
          if (messageExists) {
            return prev;
          }
          return [...prev, data];
        });
        
        if (socket) {
          socket.emit("new message", data);
        }
      } catch (error) {
        console.error("Failed to send the message:", error);
        // Restore the message if sending failed
        setNewMessage(messageContent);
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (user && user._id) {
      socket = io(ENDPOINT, {
        transports: ['polling', 'websocket'],
        timeout: 20000,
        forceNew: true,
      });
      
      socket.emit("setup", user);
      
      const handleConnected = () => {
        console.log("Socket connected successfully");
        setSocketConnected(true);
      };
      
      const handleTyping = () => setIsTyping(true);
      const handleStopTyping = () => setIsTyping(false);
      
      const handleConnectError = (error) => {
        console.error("Socket connection error:", error);
      };
      
      const handleDisconnect = () => {
        console.log("Socket disconnected");
        setSocketConnected(false);
      };
      
      socket.on("connected", handleConnected);
      socket.on("typing", handleTyping);
      socket.on("stop typing", handleStopTyping);
      socket.on("connect_error", handleConnectError);
      socket.on("disconnect", handleDisconnect);
      
      return () => {
        if (socket) {
          socket.off("connected", handleConnected);
          socket.off("typing", handleTyping);
          socket.off("stop typing", handleStopTyping);
          socket.off("connect_error", handleConnectError);
          socket.off("disconnect", handleDisconnect);
          socket.disconnect();
          socket = null;
        }
      };
    } else {
      // If no user, ensure socket is cleaned up
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.find((n) => n._id === newMessageRecieved._id)) {
          dispatch(setNotification([newMessageRecieved, ...notification]));
          setFetchAgain(!fetchAgain);
        }
      } else {
        // Check if message already exists to prevent duplicates
        setMessages((prev) => {
          const messageExists = prev.some(msg => msg._id === newMessageRecieved._id);
          if (messageExists) {
            console.log("Duplicate message prevented:", newMessageRecieved._id);
            return prev;
          }
          return [...prev, newMessageRecieved];
        });
      }
    };

    socket.on("message recieved", handleMessageReceived);

    return () => {
      if (socket) {
        socket.off("message recieved", handleMessageReceived);
      }
    };
  }, [socket, selectedChatCompare, notification, fetchAgain, dispatch]);

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "24px", md: "28px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              onClick={() => dispatch(setSelectedChat(""))}
              aria-label="Go back"
            >
              <ArrowBackIcon />
            </IconButton>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </Text>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                alignSelf="center"
                margin="auto"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <Field.Root
              onKeyDown={sendMessage}
              id="message-input"
              required
              mt={3}
            >
              {isTyping && (
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              )}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
              />
            </Field.Root>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          w="100%"
        >
          <Text fontSize="3xl" fontFamily="Work Sans" color="gray.600">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;