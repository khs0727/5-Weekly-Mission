import styled from "styled-components";

const StyledButton = styled.button`
  background-image: ${({ type }) =>
    type === "primary"
      ? "linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%)"
      : "#6d6afe"};
  background-color: ${({ type }) => (type === "red" ? "#FF5B56" : "#6d6afe")};
  color: #f5f5f5;
  border: none;
  border-radius: 8px;
  width: 280px;
  height: 51px;

  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledButton;
