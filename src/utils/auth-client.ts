import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
const baseURL = "https://back.kasbu.com";

export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [usernameClient()],
  cookies: {
    sameSite: 'None',
    secure: true,
    path: '/',
    prefix: '__Secure-',
    crossDomain: true,
    credentials: 'include'
  }
});
export const googleSignUp = async () => {
  const { data, error } = await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "https://kasbu.com/beta",
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
        window.location.href = '/app';
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
        window.location.href = '/app';
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
        window.location.href = '/';
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
