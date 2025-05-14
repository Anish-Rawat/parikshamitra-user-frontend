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
