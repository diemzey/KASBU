import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
import { redirect } from "react-router-dom";
const baseURL = "http://pkk0k4g4kwooc8ccocswo040.98.81.211.244.sslip.io";
export const authClient = createAuthClient({
  baseURL: baseURL,
  plugins: [usernameClient()],
});

// Google sign-in function with proper error handling
export const googleSignIn = async (username: string) => {
  const { data, error } = await authClient.signIn.social(
    {
      provider: "google",
      callbackURL: "kasbu.com/app",
    },
    {
      onSuccess: async (ctx) => {
        console.log("Google sign-in successful:", ctx);
        try {
          const response = await fetch(`${baseURL}/api/user/update-username`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ username: username }),
          });
          const result = await response.json();
          if (result.success) {
            console.log(result.message);
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Failed to update username:", error);
        }
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
  try {
    const data = await authClient.signIn.email({
      email,
      password,
    });
    return data;
  } catch (error) {
    console.error("Email sign-in error:", error);
    throw error;
  }
};

export const emailSignUp = async (
  email: string,
  password: string,
  username: string,
  name: string,
) => {
  try {
    const data = await authClient.signUp.email({
      email,
      password,
      username,
      name,
    });
    redirect("/");
    return data;
  } catch (error) {
    console.error("Email sign-up error:", error);
    throw error;
  }
};

// Sign out function
export const signOut = async () => {
  const { error } = await authClient.signOut(
    {},
    {
      onSuccess: () => {
        redirect("/");
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
