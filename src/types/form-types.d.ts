import { z } from "zod";
import { loginFormSchema } from "@/schemas/loginFormSchema";
import { signupFormSchema } from "@/schemas/signupFormSchema";

export type loginFormType = z.infer<typeof loginFormSchema>;
export type signupFormType = z.infer<typeof signupFormSchema>;

export type signupFormResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

export type logoutFormResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errors: {
    _form?: string[];
  };
};

export type loginFormResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};

export type oAuthResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errors: {
    _form?: string[];
  };
};

export type songUploadResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errors: {
    songTitle?: string[];
    songAuthor?: string[];
    songFile?: string[];
    songImage?: string[];
    _form?: string[];
  };
};

export type songLikeResponseType = {
  status: "success" | "error" | "idle";
  successMessage?: string;
  errorMessage?: string;
};
