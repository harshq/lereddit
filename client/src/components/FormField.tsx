import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const FormField: React.FC<FormFieldProps> = ({ label, size, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>User Name</FormLabel>
      <Input id={field.name} {...props} {...field} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
