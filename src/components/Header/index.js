import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'

import {
  NavContainer,
  NavLogo,
  NavOtherSettingsContainer,
  ListItem,
  ModalContainer,
  CloseButton,
  ConfirmButton,
  ModalDesc,
  ButtonsContainer,
  AllRoutersContainer,
  CloseRoutersContainer,
} from './styledComponents'

import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, toggleTheme} = value
      const color = isDark ? '#181818' : '#f9f9f9'
      const iconColor = isDark ? 'white' : 'dark'
      const imageUrl = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <NavContainer backgroundColor={color}>
          <Link to="/">
            <NavLogo src={imageUrl} />
          </Link>

          <NavOtherSettingsContainer>
            {isDark ? (
              <button
                type="button"
                aria-label="Toggle Dark Mode"
                className="color-btn"
                onClick={toggleTheme}
              >
                <BsMoon
                  style={{
                    fontSize: '24px',
                    marginLeft: '0px',
                    color: '#ffffff',
                  }}
                />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Toggle Dark Mode"
                className="color-btn"
                onClick={toggleTheme}
              >
                <BsBrightnessHigh
                  style={{fontSize: '24px', marginLeft: '0px'}}
                />
              </button>
            )}

            <Popup
              modal
              className="popup-container"
              trigger={
                <button
                  className="trigger-button"
                  type="button"
                  data-testid="close"
                  aria-label="More Options"
                >
                  <GiHamburgerMenu
                    style={{fontSize: '24px', marginLeft: '14px'}}
                    className={iconColor}
                  />
                </button>
              }
            >
              {close => (
                <AllRoutersContainer>
                  <CloseRoutersContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Close
                    </CloseButton>
                  </CloseRoutersContainer>
                  <div className="routes-popup-container">
                    <Link to="/" className="link-item">
                      <ListItem>Home</ListItem>
                    </Link>
                    <Link to="/trending" className="link-item">
                      <ListItem>Trending</ListItem>
                    </Link>
                    <Link to="/gaming" className="link-item">
                      <ListItem>Gaming</ListItem>
                    </Link>
                    <Link to="/saved-videos" className="link-item">
                      <ListItem>Saved videos</ListItem>
                    </Link>
                  </div>
                </AllRoutersContainer>
              )}
            </Popup>

            <Popup
              modal
              trigger={
                <button
                  className="trigger-button"
                  type="button"
                  data-testid="close"
                  aria-label="More Options"
                >
                  <FiLogOut
                    style={{fontSize: '24px', marginLeft: '14px'}}
                    className={iconColor}
                  />
                </button>
              }
            >
              {close => (
                <ModalContainer>
                  <ModalDesc>Are you sure you want to logout?</ModalDesc>
                  <ButtonsContainer>
                    <CloseButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                    >
                      Cancel
                    </CloseButton>

                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </ButtonsContainer>
                </ModalContainer>
              )}
            </Popup>
          </NavOtherSettingsContainer>
        </NavContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
