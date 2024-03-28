import styled from 'styled-components'

export const NxtAppLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: #f8fafc;
  height: 100vh;
  padding: 10px;
`

export const NxtAppLogoAndFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
  padding-bottom: 50px;
`

export const LogoImg = styled.img`
  width: 130px;
  margin-bottom: 30px;
`

export const FormContainer = styled.form`
  width: 100%;
  padding: 10px;
`

export const LabelAndInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`

export const Label = styled.label`
  font-family: 'Roboto';
  margin-bottom: 5px;
`

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #475569;
  border-radius: 5px;
`

export const RadioAndShowPasswordContainer = styled.div`
  display: flex;
  align-items: center;
`

export const RadioInput = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border: 1px solid black;
  border-radius: 10px;
`

export const ShowPassText = styled.p`
  font-family: 'Roboto';
`

export const LoginBtn = styled.button`
  font-family: 'Roboto';
  padding: 10px;
  cursor: pointer;
  outline: none;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 500;
  width: 100%;
  font-size: 16px;
  border: 0px solid;
  border-radius: 5px;
`

export const ErrorMsg = styled.p`
  font-family: 'Roboto';
  color: red;
`
