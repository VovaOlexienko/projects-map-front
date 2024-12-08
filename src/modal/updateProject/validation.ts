import { object, string } from "yup";
import { projectSchema } from "../commonValidation.ts";

export default object({
  projectId: string().required().nonNullable(),
  ...projectSchema,
});
