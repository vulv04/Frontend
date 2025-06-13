import React from "react";
import styled from "@emotion/styled";
const Form = styled.form`
  padding: 24px;
  margin: 20px auto;
  width: 400px;
  border: 1px solid #ccc;
  max-width: 100%;
`;
const FormCommon = ({ handleSubmit, children }) => {
  return (
    <Form action="" onSubmit={handleSubmit}>
      {children}
    </Form>
  );
};

export default FormCommon;
