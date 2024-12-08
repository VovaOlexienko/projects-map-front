import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

const errorMessages = {
  required: "Поле обов'язкове для заповнення",
  minLength: "Веденне значення занадто коротке для цього поля",
  maxLength: "Веденне значення занадто довге для цього поля",
};
const defaultErrorMessage = "Неправильне значення для цього поля";

export const FormErrorMessage = ({ field }: { field: string }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorType = errors[field]?.type as string;

  return (
    <div>
      {errors[field] && (
        <Form.Text className="text-danger">
          {errorType in errorMessages ? errorMessages[errorType as keyof typeof errorMessages] : defaultErrorMessage}
        </Form.Text>
      )}
    </div>
  );
};
