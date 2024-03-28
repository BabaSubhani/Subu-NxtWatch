import {Component} from 'react'
import {FiLogOut, FiSun} from 'react-icons/fi'
import {BsMoon} from 'react-icons/bs'
import {CgDetailsMore} from 'react-icons/cg'
import Popup from 'reactjs-popup'
import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  NavContainer,
  NavLogo,
  NavOtherSettingsContainer,
  ListItem,
} from './styledComponent'

import './index.css'

class Header extends Component {
  state = {dark: false}

  render() {
    const {dark} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, toggleTheme} = value
          const color = isDark ? '#181818' : '#f9f9f9'

          return (
            <NavContainer backgroundColor={color}>
              <NavLogo src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
              <NavOtherSettingsContainer>
                {dark ? (
                  <button
                    type="button"
                    aria-label="Toggle Dark Mode"
                    className="color-btn"
                    onClick={toggleTheme}
                  >
                    <BsMoon style={{fontSize: '24px', marginLeft: '0px'}} />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="Toggle Dark Mode"
                    className="color-btn"
                    onClick={toggleTheme}
                  >
                    <FiSun style={{fontSize: '24px', marginLeft: '0px'}} />
                  </button>
                )}

                <Popup
                  className="popup-container"
                  trigger={
                    <button
                      className="trigger-button"
                      type="button"
                      data-testid="close"
                      aria-label="More Options"
                    >
                      <CgDetailsMore
                        style={{fontSize: '24px', marginLeft: '14px'}}
                      />
                    </button>
                  }
                >
                  <div>
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
                </Popup>

                <FiLogOut style={{fontSize: '24px', marginLeft: '14px'}} />
              </NavOtherSettingsContainer>
            </NavContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default Header
