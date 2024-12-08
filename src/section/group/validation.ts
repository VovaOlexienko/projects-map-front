import { object, string } from "yup";

export default object({
  id: string().required().nonNullable(),
  name: string().required().nonNullable().min(1).max(50),
});
