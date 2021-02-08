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
import { Project as TProject } from "../api/project/Project";
import { ProjectUpdateInput } from "../api/project/ProjectUpdateInput";

export const Project = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/projects/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TProject,
    AxiosError,
    [string, string]
  >(["get-/api/projects", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/projects"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TProject, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/projects"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//projects");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TProject, AxiosError, ProjectUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/projects"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ProjectUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.name);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, [
        "description",
        "dueDate",
        "location",
        "name",
        "owner",
        "startDate",
        "type",
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
                title={`${"Project"} ${
                  data?.name && data?.name.length ? data.name : data?.id
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
              <TextField label="Description" name="description" textarea />
            </div>
            <div>
              <TextField type="date" label="Due Date" name="dueDate" />
            </div>
            <div>
              <TextField label="Location" name="location" />
            </div>
            <div>
              <TextField label="Name" name="name" />
            </div>
            <div>
              <UserSelect label="Owner" name="owner.id" />
            </div>
            <div>
              <TextField type="date" label="Start Date" name="startDate" />
            </div>
            <div>
              <SelectField
                label="Type"
                name="type"
                options={[{ label: "label1", value: "Label1" }]}
              />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
