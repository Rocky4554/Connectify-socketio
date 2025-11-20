// import { Box } from "@chakra-ui/react";
// import SingleChat from "../components/SingleChat";
// import { useSelector } from "react-redux";

// function Chatbox({ fetchAgain, setFetchAgain }) {
//   const { selectedChat } = useSelector((state) => state.user);

//   return (
//     <Box
//       display={{ base: selectedChat ? "flex" : "none", md: "flex" }} // ✅ Changed 'd' to 'display'
//       alignItems="center"
//       flexDir="column"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "68%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//     </Box>
//   );
// }

// export default Chatbox;

"use client";
import { Box } from "@chakra-ui/react";
import SingleChat from "../components/SingleChat";
import { useSelector } from "react-redux";

function Chatbox({ fetchAgain, setFetchAgain }) {
  const { selectedChat } = useSelector((state) => state.user);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="#1D232A"
      w={{ base: "100%",md: "100%" }}
      h={"100%"}
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="md"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
}

export default Chatbox;
