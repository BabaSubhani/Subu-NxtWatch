import styled from 'styled-components'

export const HomeTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.backgroundColor};
`

export const BannerContainer = styled.div`
  // background-color: #ffffff;
  padding: 20px;
`

export const LogosContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
`

export const NxtLogoImg = styled.img`
  height: 40px;
  margin-top: 20px;
`

export const Paragraph = styled.p`
  font-family: 'Roboto';
  width: 70%;
  font-size: 18px;
`

export const Button = styled.button`
  margin-bottom: 20px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  cursor: pointer;
  outline: none;
  padding: 10px;
  font-weight: 600;
`

export const SearchAndIconContainer = styled.div`
  height: 35px;
  margin: 8px;
  margin-left: 14px;
  margin-right: 14px;
  display: flex;
  margin-top: 20px;
`

export const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  border: 1px solid #222222;
  padding-left: 8px;
  font-family: 'Roboto';
  font-size: 18px;
`

export const SearchIconContainer = styled.button`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #222222;
`

export const VideosUlListContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`

export const RenderingMultipleStates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
