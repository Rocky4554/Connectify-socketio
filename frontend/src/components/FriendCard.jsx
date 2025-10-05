import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

import { useSelector, useDispatch } from "react-redux";
import { setSelectedChat, setChats } from "../store/userSlice";
import { axiosInstance } from "../lib/axios";

const FriendCard = ({ friend }) => {
  const dispatch = useDispatch();
  const { user, selectedChat, chats, notification } = useSelector(
    (state) => state.user
  );

  const accessChat = async (userId) => {
    console.log(userId);

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
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          {/* <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span> */}
        </div>

        {/* <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link> */}
        <Link to={"/chatbox"}>
        <button
          className="btn btn-outline w-full"
          onClick={() => {
            console.log("Button clicked!");
            console.log("Friend ID:", friend._id);
            accessChat(friend._id);
          }}
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
