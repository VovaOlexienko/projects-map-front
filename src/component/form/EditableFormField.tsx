import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { Controller, useFormContext } from "react-hook-form";
import { FormErrorMessage } from "./FormErrorMessage.tsx";
import classNames from "classnames";
import { Form } from "react-bootstrap";
import { toPureText } from "../../util/textUtil.ts";
import { FormFieldStruct } from "../../struct/FormFieldStruct.ts";

export const EditableFormField = ({
  id,
  name,
  offsetFree,
  errorFree,
  onBlur,
  className,
  maxLength,
}: FormFieldStruct & { onBlur: () => void; className?: string; maxLength?: number }) => {
  const { setValue, control } = useFormContext();

  return (
    <Form.Group className={classNames("w-100 d-block", { "mb-3": !offsetFree })}>
      {name && <Form.Label>{name}</Form.Label>}
      <Controller
        render={({ field }) => (
          <ContentEditable
            {...field}
            html={field.value}
            onBlur={onBlur}
            onChange={(e: ContentEditableEvent) => {
              if (field.value !== e.target.value) {
                setValue(id, toPureText(e.target.value).substring(0, maxLength), { shouldValidate: true });
              }
            }}
            style={{ outlineWidth: 0, whiteSpace: "pre-line" }}
            className={className}
          />
        )}
        control={control}
        name={id}
      />
      {!errorFree && <FormErrorMessage field={id} />}
    </Form.Group>
  );
};
