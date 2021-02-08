import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
  SelectField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserSelect } from "../user/UserSelect";
import { ProjectSelect } from "../project/ProjectSelect";
import { Task as TTask } from "../api/task/Task";
import { TaskUpdateInput } from "../api/task/TaskUpdateInput";

export const Task = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/tasks/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TTask,
    AxiosError,
    [string, string]
  >(["get-/api/tasks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tasks"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TTask, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/tasks"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//tasks");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TTask, AxiosError, TaskUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/tasks"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: TaskUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "assignedTo",
        "estimation",
        "project",
        "startDate",
        "status",
        "title",
      ]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Task"} ${
                  data?.title && data?.title.length ? data.title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
