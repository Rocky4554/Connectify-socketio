// import { Avatar, Box, Text } from "@chakra-ui/react";

// import { useSelector} from "react-redux";

// const UserListItem = ({ handleFunction }) => {
//   const { user } = useSelector((state)=>state.user);

//   return (
//     <Box
//       onClick={handleFunction}
//       cursor="pointer"
//       bg="#E8E8E8"
//       _hover={{
//         background: "#38B2AC",
//         color: "white",
//       }}
//       w="100%"
//       d="flex"
//       alignItems="center"
//       color="black"
//       px={3}
//       py={2}
//       mb={2}
//       borderRadius="lg"
//     >
//       <Avatar
//         mr={2}
//         size="sm"
//         cursor="pointer"
//         name={user.name}
//         src={user.pic}
//       />
//       <Box>
//         <Text>{user.name}</Text>
//         <Text fontSize="xs">
//           <b>Email : </b>
//           {user.email}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default UserListItem;

import { Avatar, Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserListItem = ({ handleFunction }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        bg: "#38B2AC",
        color: "white",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
      transition="all 0.2s ease"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user?.name}
        src={user?.pic}
      />
      <Box>
        <Text fontWeight="medium">{user?.name}</Text>
        <Text fontSize="xs" color="gray.600" _hover={{ color: "white" }}>
          <b>Email:</b> {user?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

