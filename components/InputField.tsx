import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  Textarea,
  ComponentWithAs,
  TextareaProps
} from "@chakra-ui/react";

type InputFieldProps = InputProps &
  TextareaProps & {
    name: string;
    label: string;
    textarea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, { error, touched }] = useField(props.name);

  let InputOrTextarea:
    | ComponentWithAs<"input", InputProps>
    | ComponentWithAs<"textarea", TextareaProps> = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }

  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
