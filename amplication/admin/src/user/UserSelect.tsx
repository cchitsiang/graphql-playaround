import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { User } from "../api/user/User";

type Data = User[];

type Props = Omit<SelectFieldProps, "options">;

export const UserSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/users", async () => {
    const response = await api.get("/api/users");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.firstName && item.firstName.length ? item.firstName : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
