import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { User } from "../api/user/User";

type Props = { id: string };

export const UserTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    User,
    AxiosError,
    [string, string]
  >(["get-/api/users", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/users"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/users"}/${id}`} className="entity-id">
      {data?.firstName && data?.firstName.length ? data.firstName : data?.id}
    </Link>
  );
};
