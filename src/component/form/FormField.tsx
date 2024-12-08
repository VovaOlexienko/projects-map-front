import { Form } from "react-bootstrap";
import { FormErrorMessage } from "./FormErrorMessage.tsx";
import { Children, cloneElement, ReactElement } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { FormFieldStruct } from "../../struct/FormFieldStruct.ts";

export const FormField = ({
  id,
  name,
  children,
  offsetFree = false,
  errorFree = false,
}: FormFieldStruct & { children: ReactElement }) => {
  const { register } = useFormContext();

  return (
    <Form.Group className={classNames("w-100", { "mb-3": !offsetFree })}>
      {name && <Form.Label>{name}</Form.Label>}
      {Children.map(children, (child) => {
        return cloneElement(child, { ...register(id) });
      })}
      {!errorFree && <FormErrorMessage field={id} />}
    </Form.Group>
  );
};
