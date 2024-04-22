import styled from 'styled-components'

export const TrendingTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
`

export const TrendingNameAndImgContainer = styled.div`
  background-color: #cccccc;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 40px;
`

export const VideosUlListContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const TrendingText = styled.h1`
  font-family: 'Roboto';
  font-size: 24px;
  margin: 0px;
  margin-left: 10px;
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

export const SearchIconContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #222222;
`

export const RenderingMultipleStates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
