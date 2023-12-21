import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY, API_URL } from "../utils/constants";
import { IMeter } from "../utils/types";

export const metersApi = createApi({
  reducerPath: "metersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: { "Content-Type": "application/json", "API-KEY": API_KEY },
  }),
  endpoints: (builder) => ({
    getMeters: builder.query<Array<IMeter>, void>({
      query: () => ``,
    }),
  }),
});

export const { useGetMetersQuery } = metersApi;
