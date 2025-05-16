"use client";
import {
  setTokens,
  setUserInfo,
} from "@/redux/slices/authentication/auth.slice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TokenLoader = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  console.log("SEsssion",session);
  useEffect(() => {
    // Check if session and tokens are available
    if (session?.user?.accessToken && session?.user?.refreshToken) {
      try {
        dispatch(
          setTokens({
            accessToken: session.user.accessToken,
            refreshToken: session.user.refreshToken,
          })
        );
        const userInfo = {
          _id : session?.user?.id,
          userName: session?.user?.name ?? "",
          email: session?.user?.email ?? "",
          status: session?.user?.status ?? "active",
          profilePicture: session?.user?.image ?? "",
        };
        dispatch(setUserInfo(userInfo));
      } catch (error) {
        console.error("Error dispatching tokens:", error);
      }
    } else {
      // Optionally clear tokens from store if unauthenticated
      dispatch(
        setTokens({
          accessToken: "",
          refreshToken: "",
        })
      );
      dispatch(
        setUserInfo({
          _id:"",
          userName: "",
          email: "",
          status: "active",
          profilePicture: "",
        })
      );
    }
  }, [session, status, dispatch]);

  return null;
};

export default TokenLoader;
