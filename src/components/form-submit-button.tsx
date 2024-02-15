"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormSubmitButtonProps extends ButtonProps {}

function FormSubmitButton({ children, type, ...props }: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} {...props}>
      {children}
    </Button>
  );
}

export default FormSubmitButton;
