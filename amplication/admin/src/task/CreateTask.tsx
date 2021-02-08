import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
  SelectField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { ProjectSelect } from "../project/ProjectSelect";
import { Task } from "../api/task/Task";
import { TaskCreateInput } from "../api/task/TaskCreateInput";

const INITIAL_VALUES = {} as TaskCreateInput;

export const CreateTask = (): React.ReactElement => {
  useBreadcrumbs("/tasks/new", "Create Task");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Task,
    AxiosError,
    TaskCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tasks", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tasks"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TaskCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Task"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <UserSelect label="Assigned To" name="assignedTo.id" />
          </div>
          <div>
            <TextField
              type="number"
              step={1}
              label="Estimation (days)"
              name="estimation"
            />
          </div>
          <div>
            <ProjectSelect label="Project" name="project.id" />
          </div>
          <div>
            <TextField type="date" label="Start Date" name="startDate" />
          </div>
          <div>
            <SelectField
              label="Status"
              name="status"
              options={[
                { label: "New", value: "new" },
                { label: "Pending", value: "pending" },
                { label: "On Hold", value: "onHold" },
                { label: "Ongoing", value: "ongoing" },
                { label: "Done", value: "done" },
              ]}
            />
          </div>
          <div>
            <TextField label="Title" name="title" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
