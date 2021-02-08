import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { ProjectList } from "./ProjectList";
import { CreateProject } from "./CreateProject";
import { Project } from "./Project";

export const ProjectIndex = (): React.ReactElement => {
  useBreadcrumbs("/projects/", "Projects");

  return (
    <Switch>
      <PrivateRoute exact path={"/projects/"} component={ProjectList} />
      <PrivateRoute path={"/projects/new"} component={CreateProject} />
      <PrivateRoute path={"/projects/:id"} component={Project} />
    </Switch>
  );
};
