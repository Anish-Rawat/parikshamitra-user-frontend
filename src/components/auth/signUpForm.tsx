"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn, getSession } from "next-auth/react";
import { useAppDispatch } from "@/redux/hook";
import {
  registerUser,
  setTokens,
  setUserInfo,
} from "@/redux/slices/authentication/auth.slice";
import { redirect } from "next/navigation";
import { socialLogin } from "@/utils/helper";
import { toast } from "react-toastify";

// Validation schema
const schema = yup.object().shape({
  userName: yup.string().required("Username is required").trim(),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim(),
});

type FormData = {
  userName: string;
  email: string;
  password: string;
};

export function SignUpForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    const session = await getSession();
    if (res?.ok) {
      toast.success("Registration successful");
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
      };
      dispatch(setUserInfo(userInfo));
    } else {
      toast.error("Login failed");
    }
    redirect("/dashboard");
  };

  const onSubmit = async (data: FormData) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      if (result.success) {
        const credentials = {
          email: data.email,
          password: data.password,
        };
        login(credentials);
        reset();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  const handleGoogleLogin = () => {
    socialLogin("google");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Create Your Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Username"
            fullWidth
            id="username"
            {...register("userName")}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            variant="outlined"
          />

          <TextField
            label="Email"
            fullWidth
            id="email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
          />

          <TextField
            label="Password"
            fullWidth
            id="password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1, py: 1.5 }}
          >
            Sign Up
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
            Already have an account? <Link href="/signIn">Sign In</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
