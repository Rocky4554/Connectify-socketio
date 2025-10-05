import { useQuery } from "@tanstack/react-query";
import { UsersIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import FriendCard from "../components/FriendCard";
import { getFriends } from "../lib/api";
import { useNavigate } from "react-router";

const AllFriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data: friends = [], isLoading, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  // Filter friends based on search term
  const filteredFriends = friends.filter(friend =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.nativeLanguage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.learningLanguage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="card bg-error text-error-content p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">Error loading friends</h3>
            <p>Something went wrong while fetching your friends list.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <UsersIcon className="size-8" />
              All Friends
            </h1>
            <p className="text-base-content opacity-70 mt-1">
              {friends.length} {friends.length === 1 ? 'friend' : 'friends'} in your network
            </p>
          </div>
        </div>

        {/* Search Bar */}
        {friends.length > 0 && (
          <div className="relative max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 opacity-50" />
            <input
              type="text"
              placeholder="Search friends by name or language..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          /* No Friends State */
          <div className="card bg-base-200 p-8 text-center">
            <UsersIcon className="size-16 mx-auto opacity-50 mb-4" />
            <h3 className="font-semibold text-xl mb-2">No friends yet</h3>
            <p className="text-base-content opacity-70 mb-4">
              Start connecting with new people to build your network!
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Find Language Partners
            </button>
          </div>
        ) : filteredFriends.length === 0 ? (
          /* No Search Results */
          <div className="card bg-base-200 p-8 text-center">
            <SearchIcon className="size-16 mx-auto opacity-50 mb-4" />
            <h3 className="font-semibold text-xl mb-2">No friends found</h3>
            <p className="text-base-content opacity-70">
              Try adjusting your search terms or clear the search to see all friends.
            </p>
            <button 
              className="btn btn-outline mt-4"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* Friends Grid */
          <>
            {searchTerm && (
              <div className="text-sm opacity-70">
                Showing {filteredFriends.length} of {friends.length} friends
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFriends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllFriendsPage;