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
//   IconButton,
//   Text,
//   Image,
// } from "@chakra-ui/react";

// const ProfileModal = ({ user, children }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       {children ? (
//         <span onClick={onOpen}>{children}</span>
//       ) : (
//         <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
//       )}
//       <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
//         <ModalOverlay />
//         <ModalContent h="410px">
//           <ModalHeader
//             fontSize="40px"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent="center"
//           >
//             {user.name}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             d="flex"
//             flexDir="column"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Image
//               borderRadius="full"
//               boxSize="150px"
//               src={user.pic}
//               alt={user.name}
//             />
//             <Text
//               fontSize={{ base: "28px", md: "30px" }}
//               fontFamily="Work sans"
//             >
//               Email: {user.email}
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button onClick={onClose}>Close</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default ProfileModal;
import { ViewIcon } from "@chakra-ui/icons";
import { 
  Button, 
  IconButton, 
  Text, 
  Image,
} from "@chakra-ui/react";
import {useState} from 'react'

const ProfileModal = ({ user = {}, children = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  // For now, let's create a simple modal using a div overlay
  // This avoids the Chakra UI v3 Modal import issues
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          onClick={onOpen}
          aria-label="View Profile"
        >
          <ViewIcon />
        </IconButton>
      )}

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={onClose}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontFamily: 'Work Sans, sans-serif', margin: 0 }}>
                {user?.fullName || user?.name || 'User Profile'}
              </h2>
              <button 
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user?.profilePic || user?.pic || ''}
                alt={user?.fullName || user?.name || 'User'}
                mb={4}
                style={{ margin: '0 auto 16px auto' }}
              />
              <Text fontSize={{ base: "18px", md: "20px" }} fontFamily="Work Sans">
                <b>Email:</b> {user?.email || 'No email provided'}
              </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;