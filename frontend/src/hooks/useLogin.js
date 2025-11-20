// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login } from "../lib/api";


// const useLogin = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isPending, error } = useMutation({
//     mutationFn: login,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   });

//   return { error, isPending, loginMutation: mutate };
// };

// export default useLogin;


////////////

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL);

const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
     
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Emit WebSocket event when login successful
      if (data?.user?._id) {
        socket.emit("user-connected", data.user._id);
      }
    },
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
