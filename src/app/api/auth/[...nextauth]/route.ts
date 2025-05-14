import NextAuth, { Account, Profile, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URIS } from "@/utils/contant";
import { JWT } from "next-auth/jwt";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.auth.login}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );
  return res;
};

const registerUser = async ({
  email,
  userName,
  password,
}: {
  email: string;
  userName: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_URL}/${API_URIS.auth.register}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, userName, password }),
    }
  );
  return res;
};

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        try {
          const res = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });
          if (res.ok) {
            const user = await res.json();
            return user.data;
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn() {
      return true; // for all users
    },
    async jwt({
      token,
      account,
      profile,
      user,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile;
      user?: User | null;
    }) {
      // Google OAuth
      if (account) {
        if (account.provider === "google" && profile && account.id_token) {
          // call login api
          try {
            const res = await loginUser({
              email: profile.email as string,
              password: account.id_token,
            });
            if (res.ok) {
              const user = await res.json();
              token.accessToken = user.data.accessToken;
              token.refreshToken = user.data.refreshToken;
              token.email = user.data.email;
              token.picture = profile?.picture as string;
              token.name = user.data.userName;
              token.id = user.data._id;
            } else {
              // register user
              const res = await registerUser({
                email: profile.email as string,
                userName: profile.name as string,
                password: account.id_token,
              });
              if (res.ok) {
                const user = await res.json();
                const loggedInUser = await loginUser({
                  email: user.data.email,
                  password: account.id_token,
                });
                if (loggedInUser.ok) {
                  const user = await loggedInUser.json();
                  token.accessToken = user.data.accessToken;
                  token.refreshToken = user.data.refreshToken;
                  token.email = user.data.email;
                  token.name = user.data.userName;
                  token.id = user.data._id;
                }
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
        // Credentials
        if (account.provider === "credentials") {
          token.name = user?.userName;
          token.email = user?.email;
          token.picture = "";
          token.accessToken = user?.accessToken;
          token.id = user?._id;
          token.status = user?.status;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.status = token.status as "active" | "inactive";
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
