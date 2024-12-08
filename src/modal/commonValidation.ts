import { string } from "yup";

export const projectSchema = {
  name: string().required().nonNullable().min(1).max(25),
  webAddress: string().required().nonNullable().min(1).max(100),
  groupId: string().required().nonNullable(),
};
