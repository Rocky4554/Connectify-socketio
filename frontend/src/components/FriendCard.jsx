import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat, setChats } from "../store/userSlice";
import { axiosInstance } from "../lib/axios";

const FriendCard = ({ friend }) => {
  const dispatch = useDispatch();
  const { chats, onlineUsers } = useSelector((state) => state.user);

  // ✔ Check if current friend is online
  const isOnline = onlineUsers?.includes(friend._id);

  const accessChat = async (userId) => {
    try {
      const { data } = await axiosInstance.post(`/chat`, { userId });

      if (!chats.find((c) => c._id === data._id)) {
        dispatch(setChats([data, ...chats]));
      }

      dispatch(setSelectedChat(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">

          {/* Avatar */}
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
            
            {/* Online Status Badge Below Name */}
            {isOnline && (
              <span className="inline-flex items-center justify-center bg-green-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mt-1">
                Online
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
        </div>

        <Link to={"/chatbox"}>
          <button
            className="btn btn-outline w-full"
            onClick={() => accessChat(friend._id)}
          >
            Start Chat
          </button>
        </Link>

      </div>
    </div>
  );
};

export default FriendCard;


export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}