// import { Avatar, Tooltip } from "@chakra-ui/react";

// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../lib/ChatLogics";
// import { useSelector} from "react-redux";

// const ScrollableChat = ({ messages }) => {
//     const {user} = useSelector(
//         (state) => state.user
//       );

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;
import ScrollableFeed from "react-scrollable-feed";
import { useSelector } from "react-redux";
import { formatMessageDate } from "../lib/formatDate";
import { isLastMessage, isSameSender } from "../lib/ChatLogics";

const ScrollableChat = ({ messages }) => {
  const { user } = useSelector((state) => state.user);

  let lastDate = null;

  return (
    <ScrollableFeed className="p-4">
      {messages &&
        messages.map((m, i) => {
          const currentDate = formatMessageDate(m.createdAt);
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;

          const isMine = m.sender._id === user._id;
          const showAvatar = !isMine && (isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id));

          return (
            <div key={m._id}>
              {/* DATE SEPARATOR */}
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="text-gray-500 text-xs bg-gray-200 px-3 py-1 rounded-full shadow-sm">
                    {currentDate}
                  </span>
                </div>
              )}

              {/* MESSAGE ROW */}
              <div
                className={`flex items-end gap-2 mb-1 ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar for other users - with proper spacing */}
                {!isMine && (
                  <div className="w-8 h-8 flex-shrink-0">
                    {showAvatar ? (
                      <img
                        src={m.sender.profilePic || ""}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover select-none"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                )}

                {/* MESSAGE BUBBLE */}
                <div
                  className={`relative max-w-[65%] px-3 py-2 pb-5 rounded-xl text-[14px] shadow-sm 
                  ${
                    isMine
                      ? "bg-[#DCF8C6] text-black rounded-br-sm"
                      : "bg-white text-gray-900 rounded-bl-sm"
                  }`}
                >
                  <span className="whitespace-pre-line break-words leading-relaxed">
                    {m.content}
                  </span>

                  {/* TIME - Bottom right corner */}
                  <div className="absolute bottom-1 right-2 text-[10px] text-gray-500">
                    <span>
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ScrollableChat;