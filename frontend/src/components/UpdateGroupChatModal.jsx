// // 

// import { ViewIcon } from "@chakra-ui/icons";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   useDisclosure,
//   FormControl,
//   Input,
//   useToast,
//   Box,
//   IconButton,
//   Spinner,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedChat } from "../store/userSlice";
// import UserBadgeItem from "./userAvatar/UserBadgeItem";
// import UserListItem from "./userAvatar/UserListItem";

// const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [groupChatName, setGroupChatName] = useState("");
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [renameloading, setRenameLoading] = useState(false);
//   const toast = useToast();

//   const dispatch = useDispatch();
//   const { selectedChat, user } = useSelector((state) => state.user);

//   const handleSearch = async (query) => {
//     setSearch(query);
//     if (!query) return;

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.get(`/api/user?search=${query}`, config);
//       setSearchResult(data);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Search Results",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//       setLoading(false);
//     }
//   };

//   const handleRename = async () => {
//     if (!groupChatName) return;

//     try {
//       setRenameLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.put(
//         `/api/chat/rename`,
//         {
//           chatId: selectedChat._id,
//           chatName: groupChatName,
//         },
//         config
//       );

//       dispatch(setSelectedChat(data));
//       setFetchAgain(!fetchAgain);
//       setRenameLoading(false);
//       setGroupChatName("");
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response?.data?.message || "Rename failed",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setRenameLoading(false);
//     }
//   };

//   const handleAddUser = async (user1) => {
//     if (selectedChat.users.find((u) => u._id === user1._id)) {
//       toast({
//         title: "User already in group!",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     if (selectedChat.groupAdmin._id !== user._id) {
//       toast({
//         title: "Only admins can add someone!",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.put(
//         `/api/chat/groupadd`,
//         {
//           chatId: selectedChat._id,
//           userId: user1._id,
//         },
//         config
//       );

//       dispatch(setSelectedChat(data));
//       setFetchAgain(!fetchAgain);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response?.data?.message || "Failed to add user",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (user1) => {
//     if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
//       toast({
//         title: "Only admins can remove someone!",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//       const { data } = await axios.put(
//         `/api/chat/groupremove`,
//         {
//           chatId: selectedChat._id,
//           userId: user1._id,
//         },
//         config
//       );

//       if (user1._id === user._id) {
//         dispatch(setSelectedChat(null));
//       } else {
//         dispatch(setSelectedChat(data));
//       }

//       setFetchAgain(!fetchAgain);
//       fetchMessages();
//       setLoading(false);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response?.data?.message || "Failed to remove user",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <IconButton
//         display={{ base: "flex" }}
//         icon={<ViewIcon />}
//         onClick={onOpen}
//         aria-label="View group details"
//       />

//       <Modal onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader
//             fontSize="35px"
//             fontFamily="Work Sans"
//             display="flex"
//             justifyContent="center"
//           >
//             {selectedChat.chatName}
//           </ModalHeader>

//           <ModalCloseButton />
//           <ModalBody display="flex" flexDirection="column" alignItems="center">
//             <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
//               {selectedChat.users.map((u) => (
//                 <UserBadgeItem
//                   key={u._id}
//                   user={u}
//                   admin={selectedChat.groupAdmin}
//                   handleFunction={() => handleRemove(u)}
//                 />
//               ))}
//             </Box>

//             <FormControl display="flex" mb={3}>
//               <Input
//                 placeholder="Chat Name"
//                 value={groupChatName}
//                 onChange={(e) => setGroupChatName(e.target.value)}
//               />
//               <Button
//                 variant="solid"
//                 colorScheme="teal"
//                 marginLeft={2}
//                 isLoading={renameloading}
//                 onClick={handleRename}
//               >
//                 Update
//               </Button>
//             </FormControl>

//             <FormControl>
//               <Input
//                 placeholder="Add User to group"
//                 mb={1}
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//             </FormControl>

//             {loading ? (
//               <Spinner size="lg" />
//             ) : (
//               searchResult?.map((user) => (
//                 <UserListItem
//                   key={user._id}
//                   user={user}
//                   handleFunction={() => handleAddUser(user)}
//                 />
//               ))
//             )}
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={() => handleRemove(user)} colorScheme="red">
//               Leave Group
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default UpdateGroupChatModal;

import React, { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Field } from "@chakra-ui/react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat } from "../store/userSlice";
import UserBadgeItem from "./userAvatar/UserBadgeItem";
import UserListItem from "./userAvatar/UserListItem";
import { axiosInstance } from "../lib/axios";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const dispatch = useDispatch();
  const { selectedChat, user } = useSelector((state) => state.user);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axiosInstance.get(`/user?search=${query}`);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to Load the Search Results:", error);
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = axiosInstance.put(
        `/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        }
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      setGroupChatName("");
    } catch (error) {
      console.error("Rename failed:", error.response?.data?.message || error.message);
      setRenameLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      console.warn("User already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      console.warn("Only admins can add someone!");
      return;
    }

    try {
      setLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axiosInstance.put(
        `/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }
      );

      dispatch(setSelectedChat(data));
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error("Failed to add user:", error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      console.warn("Only admins can remove someone!");
      return;
    }

    try {
      setLoading(true);
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // };
      const { data } = await axiosInstance.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        }
      );

      if (user1._id === user._id) {
        dispatch(setSelectedChat(null));
      } else {
        dispatch(setSelectedChat(data));
      }

      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.error("Failed to remove user:", error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={onOpen} aria-label="View group details">
        <ViewIcon />
      </IconButton>

      <Modal onClose={onClose} open={isOpen} centered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <Field.Root display="flex" mb={3} width="100%">
              <Input
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                marginLeft={2}
                loading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </Field.Root>

            <Field.Root width="100%">
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Field.Root>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;