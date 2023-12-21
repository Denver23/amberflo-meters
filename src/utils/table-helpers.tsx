import React, { useCallback, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { Button, Input, InputRef, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import { IMeter } from "./types";
import { FilterConfirmProps } from "antd/es/table/interface";
import { AnyObject } from "antd/es/_util/type";

export const useColumnSearchProps = (
  dataIndex: keyof IMeter,
): ColumnType<AnyObject> => {
  const searchInput = useRef<InputRef>(null);

  const handleSearch = useCallback(
    (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void) => {
      confirm();
    },
    [],
  );

  const handleReset = useCallback(
    (
      clearFilters: () => void,
      confirm: (param?: FilterConfirmProps) => void,
    ) => {
      clearFilters();
      confirm({ closeDropdown: false });
    },
    [],
  );

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput?.current?.select(), 100);
      }
    },
  };
};
