export type FetchRequest<T> = {
  status: "error" | "success";
  data: T | null;
  errorMessage?: string;
  successMessage?: string;
};
