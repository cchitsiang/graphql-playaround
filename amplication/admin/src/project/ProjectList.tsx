import * as React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";

import {
  DataGrid,
  DataField,
  SortData,
  DataGridRow,
  DataGridCell,
  EnumTitleType,
  Button,
  Snackbar,
  TimeSince,
} from "@amplication/design-system";

import { UserTitle } from "../user/UserTitle";
import { Project } from "../api/project/Project";

type Data = Project[];

const SORT_DATA: SortData = {
  field: null,
  order: null,
};

const FIELDS: DataField[] = [
  {
    name: "id",
    title: "ID",
    sortable: false,
  },
  {
    name: "createdAt",
    title: "Created At",
    sortable: false,
  },
  {
    name: "description",
    title: "Description",
    sortable: false,
  },
  {
    name: "dueDate",
    title: "Due Date",
    sortable: false,
  },
  {
    name: "location",
    title: "Location",
    sortable: false,
  },
  {
    name: "name",
    title: "Name",
    sortable: false,
  },
  {
    name: "owner",
    title: "Owner",
    sortable: false,
  },
  {
    name: "startDate",
    title: "Start Date",
    sortable: false,
  },
  {
    name: "type",
    title: "Type",
    sortable: false,
  },
  {
    name: "updatedAt",
    title: "Updated At",
    sortable: false,
  },
];

export const ProjectList = (): React.ReactElement => {
  const { data, error, isError } = useQuery<Data, AxiosError>(
    "list-/api/projects",
    async () => {
      const response = await api.get("/api/projects");
      return response.data;
    }
  );

  return (
    <>
      <DataGrid
        fields={FIELDS}
        titleType={EnumTitleType.PageTitle}
        title={"Projects"}
        loading={false}
        sortDir={SORT_DATA}
        toolbarContentEnd={
          <Link to={"/projects/new"}>
            <Button>Create Project </Button>
          </Link>
        }
      >
        {data &&
          data.map((item: Project) => {
            return (
              <DataGridRow key={item.id} clickData={item}>
                <DataGridCell>
                  <Link className="entity-id" to={`${"/projects"}/${item.id}`}>
                    {item.id}
                  </Link>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.createdAt} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.description}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.dueDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.location}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.name}</>
                </DataGridCell>
                <DataGridCell>
                  <UserTitle id={item.owner?.id} />
                </DataGridCell>
                <DataGridCell>
                  <>{item.startDate}</>
                </DataGridCell>
                <DataGridCell>
                  <>{item.type}</>
                </DataGridCell>
                <DataGridCell>
                  <TimeSince time={item.updatedAt} />
                </DataGridCell>
              </DataGridRow>
            );
          })}
      </DataGrid>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
