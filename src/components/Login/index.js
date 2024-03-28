import {Component} from 'react'
import Cookies from 'js-cookie'
import {
  NxtAppLoginContainer,
  NxtAppLogoAndFormContainer,
  LogoImg,
  FormContainer,
  LabelAndInputContainer,
  Label,
  Input,
  RadioAndShowPasswordContainer,
  RadioInput,
  ShowPassText,
  LoginBtn,
  ErrorMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  handleInputChange = event => {
    console.log(event.target)
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleCheckboxChange = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      showSubmitError,
      errorMsg,
    } = this.state

    return (
      <NxtAppLoginContainer>
        <NxtAppLogoAndFormContainer>
          <LogoImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="light theme"
          />
          <FormContainer onSubmit={this.handleSubmit}>
            <LabelAndInputContainer>
              <Label>USERNAME</Label>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </LabelAndInputContainer>
            <LabelAndInputContainer>
              <Label>PASSWORD</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </LabelAndInputContainer>
            <RadioAndShowPasswordContainer>
              <RadioInput
                type="checkbox"
                checked={showPassword}
                onChange={this.handleCheckboxChange}
              />
              <ShowPassText>Show Password</ShowPassText>
            </RadioAndShowPasswordContainer>
            <LoginBtn type="submit">Login</LoginBtn>
            {showSubmitError && <ErrorMsg>{errorMsg}</ErrorMsg>}
          </FormContainer>
        </NxtAppLogoAndFormContainer>
      </NxtAppLoginContainer>
    )
  }
}

export default Login
