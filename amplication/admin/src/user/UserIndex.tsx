import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { UserList } from "./UserList";
import { CreateUser } from "./CreateUser";
import { User } from "./User";

export const UserIndex = (): React.ReactElement => {
  useBreadcrumbs("/users/", "Users");

  return (
    <Switch>
      <PrivateRoute exact path={"/users/"} component={UserList} />
      <PrivateRoute path={"/users/new"} component={CreateUser} />
      <PrivateRoute path={"/users/:id"} component={User} />
    </Switch>
  );
};
