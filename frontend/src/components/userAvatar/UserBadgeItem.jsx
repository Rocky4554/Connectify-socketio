// import { CloseIcon } from "@chakra-ui/icons";
// import { Badge } from "@chakra-ui/react";

// const UserBadgeItem = ({ user, handleFunction, admin }) => {
//   return (
//     <Badge
//       px={2}
//       py={1}
//       borderRadius="lg"
//       m={1}
//       mb={2}
//       variant="solid"
//       fontSize={12}
//       colorScheme="purple"
//       cursor="pointer"
//       onClick={handleFunction}
//     >
//       {user.name}
//       {admin === user._id && <span> (Admin)</span>}
//       <CloseIcon pl={1} />
//     </Badge>
//   );
// };

// export default UserBadgeItem;

import { CloseIcon } from "@chakra-ui/icons";
import { Badge, Icon } from "@chakra-ui/react";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px="2"
      py="1"
      borderRadius="lg"
      m="1"
      mb="2"
      variant="solid"
      fontSize="sm"
      colorScheme="purple"
      cursor="pointer"
      display="flex"
      alignItems="center"
      gap="1"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span>(Admin)</span>}
      <Icon as={CloseIcon} boxSize={3} />
    </Badge>
  );
};

export default UserBadgeItem;

