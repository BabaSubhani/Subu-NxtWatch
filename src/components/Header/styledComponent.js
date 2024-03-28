import styled from 'styled-components'

export const NavContainer = styled.nav`
  padding: 15px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const NavLogo = styled.img`
  height: 27px;
`

export const NavOtherSettingsContainer = styled.div``

export const ListItem = styled.li`
  font-family: 'Roboto';
  list-style-type: none;
  margin: 10px;
`
