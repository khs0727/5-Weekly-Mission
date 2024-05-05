import styled from "styled-components";

export const AddFolderLink_Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 20px;
`;

export const Input = styled.input`
  width: 100%;
  height: 69px;
  border: 1px solid #6d6afe;
  border-radius: 15px;
  padding: 16px 50px;
  font-size: 16px;
  font-weight: 400;
  color: #9fa6b2;
  outline: none;
`;

export const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  margin-right: 10px;
`;

export const AddButton = styled.button`
  background-image: linear-gradient(90.99deg, #6d6afe 0.12%, #6ae3fe 101.84%);
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);

  width: 80px;
  height: 37px;
  padding: 10px 16px;

  color: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;

  display: flex;
  justify-content: center;
`;
