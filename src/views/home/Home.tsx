import './Home.css'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="Home-homeContainer">
      <div className="Home-formController">
        <div className="home-logo">
          <div>
            <img
              src={require('../../assets/img_virtuallearn logo_splash 2.png')}
              alt=""
              className="home-logoImg"
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
