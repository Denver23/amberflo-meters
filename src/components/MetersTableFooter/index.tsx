import React, { FC, useCallback } from "react";
import { Button, message } from "antd";
import { useFormik } from "formik";
import { IMeterForm, MeterTypeEnum } from "../../utils/types";
import { getErrorMessage } from "../../utils/helpers";
import { meterFormValidator } from "../../utils/validators";
import {
  CreateMeterFormFields,
  CreateMeterInput,
  CreateMeterSelect,
} from "./styles";
import { BaseOptionType, DefaultOptionType } from "antd/es/select";
import { metersAPI } from "../../utils/api";
import { IMetersTableFooterProps } from "./props";
import { isEqual } from "lodash";

const initMeterFormValues: IMeterForm = {
  display_name: "",
  api_name: "",
  active: 1,
  type: MeterTypeEnum.Sum,
  used_for_billing: 1,
};

export const MetersTableFooter: FC<IMetersTableFooterProps> = ({
  addNewMeterToList,
  setLoading,
}) => {
  const handleSelectChange = useCallback((param: string) => {
    return (
      value: unknown,
      option:
        | DefaultOptionType
        | BaseOptionType
        | (DefaultOptionType | BaseOptionType)[],
    ): void => {
      setFieldValue(param, value);
    };
  }, []);

  const {
    values: { display_name, api_name, active, type, used_for_billing },
    handleChange,
    errors,
    handleSubmit,
    handleBlur,
    touched,
    setFieldValue,
    resetForm,
    isValid,
  } = useFormik<IMeterForm>({
    onSubmit: async (
      { display_name, api_name, active, type, used_for_billing },
      { resetForm },
    ) => {
      try {
        setLoading(true);
        const { data } = await metersAPI.createNewMeter({
          active: Boolean(active),
          used_for_billing: Boolean(used_for_billing),
          display_name,
          api_name,
          type,
        });
        addNewMeterToList(data);
        message.success("Meter was successfully added.");
        resetForm({ values: initMeterFormValues });
      } catch (err: unknown) {
        message.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    initialValues: initMeterFormValues,
    validate: meterFormValidator,
  });

  return (
    <form onSubmit={handleSubmit}>
      <CreateMeterFormFields>
        <CreateMeterInput
          placeholder="Name"
          name={"display_name"}
          value={display_name}
          onChange={handleChange}
          onBlur={handleBlur}
          status={
            touched.display_name && errors.display_name ? "error" : undefined
          }
        />
        <CreateMeterInput
          placeholder="Api Name"
          name={"api_name"}
          value={api_name}
          onChange={handleChange}
          onBlur={handleBlur}
          status={touched.api_name && errors.api_name ? "error" : undefined}
        />
        <CreateMeterSelect
          value={active}
          onChange={handleSelectChange("active")}
          options={[
            { value: 1, label: "True" },
            { value: 0, label: "False" },
          ]}
        />
        <CreateMeterSelect
          value={used_for_billing}
          onChange={handleSelectChange("used_for_billing")}
          options={[
            { value: 1, label: "True" },
            { value: 0, label: "False" },
          ]}
        />
        <CreateMeterSelect
          value={type}
          onChange={handleSelectChange("type")}
          options={Object.values(MeterTypeEnum).map((value) => ({
            value,
            label: value,
          }))}
        />
        <Button
          disabled={!isValid}
          onClick={() => handleSubmit()}
          type={"primary"}
        >
          Save
        </Button>
        <Button
          onClick={() => resetForm({ values: initMeterFormValues })}
          type={"primary"}
          disabled={isEqual(initMeterFormValues, {
            display_name,
            api_name,
            active,
            type,
            used_for_billing,
          })}
          danger
        >
          Reset
        </Button>
      </CreateMeterFormFields>
    </form>
  );
};
