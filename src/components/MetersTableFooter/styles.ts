import styled from "styled-components";
import { Input, Select } from "antd";

const baseFlexFormStyles = `
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 15%;
`;

export const CreateMeterFormFields = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 648px;
  gap: 15px;
`;

export const CreateMeterFormSubmitting = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const CreateMeterInput = styled(Input)`
  ${baseFlexFormStyles}
`;

export const CreateMeterSelect = styled(Select)`
  ${baseFlexFormStyles}
`;
