import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

export const useAppForm = ({
  defaultValues,
  validationSchema = object(),
  onFormSubmit = () => {},
}: {
  defaultValues: any;
  validationSchema?: any;
  onFormSubmit?: (values: any) => void;
  resetFieldIds?: string[];
}): {
  formInstance: UseFormReturn<any>;
  submitForm: () => void;
} => {
  const formInstance = useForm({
    mode: "onTouched",
    reValidateMode: "onBlur",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const submitForm = () => {
    formInstance.handleSubmit(onFormSubmit)();
  };

  return { formInstance, submitForm };
};
