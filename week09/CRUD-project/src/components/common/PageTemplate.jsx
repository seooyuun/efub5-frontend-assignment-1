import React from "react";
import styled from "styled-components";

const PageTemplateBlock = styled.div`
  width: 700px;
  max-width: 960px;
  min-height: 80vh;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function PageTemplate({ children }) {
  return <PageTemplateBlock>{children}</PageTemplateBlock>;
}

export default PageTemplate;
