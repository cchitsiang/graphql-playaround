import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Task } from "../api/task/Task";

type Props = { id: string };

export const TaskTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Task,
    AxiosError,
    [string, string]
  >(["get-/api/tasks", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tasks"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tasks"}/${id}`} className="entity-id">
      {data?.title && data?.title.length ? data.title : data?.id}
    </Link>
  );
};
