import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Project } from "../api/project/Project";

type Data = Project[];

type Props = Omit<SelectFieldProps, "options">;

export const ProjectSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/projects",
    async () => {
      const response = await api.get("/api/projects");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.name && item.name.length ? item.name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
