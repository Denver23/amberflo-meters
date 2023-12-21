import { IMeter } from "../../utils/types";
import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from "@reduxjs/toolkit/query";

export interface IMeterDetailsProps {
  operations: {
    updateMeter: (meterId: string, data: IMeter) => void;
  };
  meters: Array<IMeter> | undefined;
  metersQuery: UseQueryHookResult<
    QueryDefinition<
      void,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        {},
        FetchBaseQueryMeta
      >,
      never,
      IMeter[],
      "metersApi"
    >,
    any
  >;
}
