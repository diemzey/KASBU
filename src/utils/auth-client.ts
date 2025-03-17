import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
const baseURL = "https://kasbu.batarse.dev";

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [usernameClient()],
});

export const googleSignUp = async () => {
  const { data, error } = await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "https://kasbu.com/app",
    },
    {
      onSuccess: (ctx) => {
        console.log("Google sign-in successful:", ctx);
      },
      onError: (ctx) => {
        console.error("Google sign-in error:", ctx.error);
      },
    },
  );

  if (error) {
    throw error;
  }

  return data;
};

export const emailSignIn = async (email: string, password: string) => {
  const { data, error } = await authClient.signIn.email(
    {
      email,
      password,
    },
    {
      onSuccess: (ctx) => {
        console.log("Email sign-in successful:", ctx);
      },
      onError: (ctx) => {
        console.error("Email sign-in error:", ctx.error);
      },
    },
  );

  if (error) {
    throw error;
  }

  return data;
};

export const emailSignUp = async (
  email: string,
  password: string,
  username: string,
  name: string,
) => {
  const { data, error } = await authClient.signUp.email(
    {
      email,
      password,
      username,
      name,
    },
    {
      onSuccess: (ctx) => {
        console.log("Email sign-up successful:", ctx);
      },

      onError: (ctx) => {
        console.error("Email sign-up error:", ctx.error);
      },
    },
  );

  if (error) {
    throw error;
  }

  return data;
};

// Sign out function
export const signOut = async () => {
  const { error } = await authClient.signOut(
    {},
    {
      onSuccess: () => {
        console.log("Sign-out successful");
      },
      onError: (ctx) => {
        console.error("Sign-out error:", ctx.error);
      },
    },
  );

  if (error) {
    throw error;
  }
};

// Export error codes for translation or custom error messages
export const ERROR_CODES = authClient.$ERROR_CODES;
