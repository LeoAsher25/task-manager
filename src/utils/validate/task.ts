import * as yup from "yup";

export const addTaskSchema = yup.object().shape({
  name: yup.string().required("Task name is required"),
});
