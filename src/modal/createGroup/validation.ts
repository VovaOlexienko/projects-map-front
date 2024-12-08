import { object, string } from "yup";

export default object({
  name: string().required().min(1).max(50),
});
