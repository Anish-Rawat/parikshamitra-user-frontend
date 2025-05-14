"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Divider } from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc"; // Google icon
import { useAppDispatch } from "@/redux/hook";
import { socialLogin } from "@/utils/helper";
import { getSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { setTokens, setUserInfo } from "@/redux/slices/authentication/auth.slice";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup
    .string()
    .required("Password is required"),
});

type SignInData = {
  email: string;
  password: string;
};

export function SignInForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignInData) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok === false) {
      if (res.error === "CredentialsSignin") {
        toast.error("Invalid credentials");
      } else {
        toast.error(res.error);
      }
    } else {
      const session = await getSession();
      dispatch(
        setTokens({
          accessToken: session?.user?.accessToken ?? "",
          refreshToken: session?.user?.refreshToken ?? "",
        })
      );
      const userInfo = {
        userName: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        status: session?.user?.status ?? "active",
      }
      dispatch(setUserInfo(userInfo));
      redirect("/dashboard");
    }
  };

  const handleGoogleLogin = () => {
   socialLogin("google");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" textAlign="center" fontWeight="bold">
        Sign In
      </Typography>

      <TextField
        label="Email"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button type="submit" variant="contained" size="large">
        Sign In
      </Button>

      <Divider>or</Divider>

      <Button
        onClick={handleGoogleLogin}
        variant="outlined"
        fullWidth
        startIcon={<FcGoogle />}
        sx={{
          textTransform: "none",
          fontWeight: 500,
          bgcolor: "white",
          borderColor: "#ccc",
        }}
      >
        Continue with Google
      </Button>

      <Typography textAlign="center" variant="body2">
        Don&apos;t have an account? <Link href="/signUp">Sign Up</Link>
      </Typography>
    </Box>
  );
}
