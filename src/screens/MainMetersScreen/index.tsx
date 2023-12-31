import React, { FC, useCallback, useMemo, useState } from "react";
import { Breadcrumb, Button, message, Table, Tag } from "antd";
import { useColumnSearchProps } from "../../utils/table-helpers";
import { AnyObject } from "antd/es/_util/type";
import { MetersTableFooter } from "../../components";
import { useNavigate } from "react-router-dom";
import { IMainMetersProps } from "./props";
import { BreadCrumbsBlock } from "../../styles";
import { MeterTypeEnum } from "../../utils/types";
import { getErrorMessage, sorter } from "../../utils/helpers";

export const MainMetersScreen: FC<IMainMetersProps> = ({
  metersQuery: { isLoading: isMetersLoading },
  meters,
  operations: { deleteMeter, addNewMeter },
}) => {
  const navigate = useNavigate();

  const nameSearchProps = useColumnSearchProps("display_name");
  const apiNameSearchProps = useColumnSearchProps("api_name");
  const [isOperationsMeterLoading, setLoading] = useState<boolean>(false);
  const isLoading = isOperationsMeterLoading || isMetersLoading;

  const deleteButtonHandler = useCallback(
    async (event: any, meterId: string) => {
      try {
        event.stopPropagation();
        setLoading(true);
        await deleteMeter(meterId);
        message.success("Row was successfully deleted");
      } catch (err: unknown) {
        message.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [deleteMeter, setLoading],
  );

  const columns = useMemo(
    () => [
      {
        title: "Name",
        dataIndex: "display_name",
        key: "display_name",
        width: "20%",
        sorter: sorter("display_name"),
        ...nameSearchProps,
      },
      {
        title: "Api Name",
        dataIndex: "api_name",
        key: "api_name",
        width: "20%",
        sorter: sorter("api_name"),
        ...apiNameSearchProps,
      },
      {
        title: "Active",
        dataIndex: "active",
        key: "active",
        filters: [
          {
            text: "True",
            value: "true",
          },
          {
            text: "False",
            value: "false",
          },
        ],
        filterMode: "menu" as const,
        filterSearch: true,
        onFilter: (value: any, record: AnyObject) =>
          record.active.toString() === value,
        sorter: sorter("active"),
        render: (value: boolean) => (
          <Tag color={value ? "green" : "red"}>{value.toString()}</Tag>
        ),
      },
      {
        title: "Used for billing",
        dataIndex: "used_for_billing",
        key: "used_for_billing",
        width: "20%",
        filters: [
          {
            text: "True",
            value: "true",
          },
          {
            text: "False",
            value: "false",
          },
        ],
        filterMode: "menu" as const,
        filterSearch: true,
        sorter: sorter("used_for_billing"),
        onFilter: (value: any, record: AnyObject) =>
          record.used_for_billing.toString() === value,
        render: (value: boolean) => (
          <Tag color={value ? "green" : "red"}>{value.toString()}</Tag>
        ),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "20%",
        filters: Object.values(MeterTypeEnum).map((meterType) => ({
          text: meterType,
          value: meterType,
        })),
        filterMode: "menu" as const,
        filterSearch: true,
        sorter: sorter("type"),
        onFilter: (value: any, record: AnyObject) => record.type === value,
      },
      {
        title: "Action",
        dataIndex: "id",
        key: "id",
        width: "20%",
        render: (meterId: string) => {
          return (
            <Button
              onClick={async (event) => deleteButtonHandler(event, meterId)}
              type="primary"
              danger
            >
              Delete
            </Button>
          );
        },
      },
    ],
    [nameSearchProps, apiNameSearchProps],
  );

  return (
    <>
      <BreadCrumbsBlock>
        <Breadcrumb
          items={[
            {
              title: "Home",
            },
          ]}
        />
      </BreadCrumbsBlock>
      <Table
        style={{ maxWidth: "900px", margin: "0 auto" }}
        loading={isLoading}
        dataSource={meters}
        columns={columns}
        pagination={false}
        footer={() => (
          <MetersTableFooter
            setLoading={setLoading}
            addNewMeterToList={addNewMeter}
          />
        )}
        onRow={(record) => {
          return {
            onClick: () => navigate(`/${record.id}`),
          };
        }}
      />
    </>
  );
};
