import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Project } from "../api/project/Project";

type Props = { id: string };

export const ProjectTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Project,
    AxiosError,
    [string, string]
  >(["get-/api/projects", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/projects"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/projects"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
