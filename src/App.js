import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import ThemeContext from './context/ThemeContext'

import './App.css'

class App extends Component {
  state = {
    isDark: false,
    savedItems: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  updateItems = id => {
    console.log(id)
    this.setState(prevState => ({
      savedItems: [...prevState.savedItems, id],
    }))
  }

  render() {
    const {isDark, savedItems} = this.state
    console.log(savedItems)

    return (
      <ThemeContext.Provider
        value={{
          isDark,
          toggleTheme: this.toggleTheme,
          savedItems,
          updateItems: this.updateItems,
        }}
      >
        <div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/videos/:id" component={VideoItemDetails} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path="/gaming" component={Gaming} />
          </Switch>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default App
