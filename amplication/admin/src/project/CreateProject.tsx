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
import { Project } from "../api/project/Project";
import { ProjectCreateInput } from "../api/project/ProjectCreateInput";

const INITIAL_VALUES = {} as ProjectCreateInput;

export const CreateProject = (): React.ReactElement => {
  useBreadcrumbs("/projects/new", "Create Project");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Project,
    AxiosError,
    ProjectCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/projects", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/projects"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: ProjectCreateInput) => {
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
            <FormHeader title={"Create Project"}>
              <Button type="submit" disabled={isLoading}>
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
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
