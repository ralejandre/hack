import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ClassifyTweet from './TweetNN/brain_predict';
import Tweets from './TweetNN/valid_tweets';
// const ClassifyTweet = require('./TweetNN/brain_predict');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Nav = function() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand">&#60;hack&#62; 3.0</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Twuit = function({ text, user }) {
  return (
    <section className="py-5 extra-margin">
      <div className="twitta-container text-center">
        <h2 className="twitter-text animated bounceInRight">{text}</h2>
        <h4 className="text-right text-muted mt-5 twitter-text animated bounceInRight">
          @{user}
        </h4>
      </div>
    </section>
  );
};

const Footer = function() {
  return (
    <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">
          Copyright &copy; Your Website 2018
        </p>
      </div>
    </footer>
  );
};

const Accordion = function() {
  return (
    <div id="accordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Regiones Criticas
            </button>
          </h5>
        </div>

        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Producto Potencial
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
            skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.
            Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
            single-origin coffee nulla assumenda shoreditch et. Nihil anim
            keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
            sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
            occaecat craft beer farm-to-table, raw denim aesthetic synth
            nesciunt you probably haven't heard of them accusamus labore
            sustainable VHS.
          </div>
        </div>
      </div>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    let positions = [];
    positions = this.randomPositions(19.0196607, -98.2448809, 20000);
    const p1 = this.randomPositions(24.5833456, -107.0858151, 2000);
    const p2 = this.randomPositions(19.320931, -99.4328124, 3500);
    const p3 = this.randomPositions(25.6490376, -100.4431832, 1000);
    const p4 = this.randomPositions(26.6490376, -101.4431832, 3000);
    const p5 = this.randomPositions(25.6490376, -111.6431832, 10000);
    positions = positions.concat(p1, p2, p3, p4, p5);

    this.state = {
      positions,
      tweet: {
        full_text: '',
        user: { username: '' }
      }
    };
  }

  randomPositions = (latt, lng, puntos) => {
    let positions = [{ lat: latt, lng: lng }];
    for (var i = 0; i < puntos; i++) {
      positions.push({
        lat:
          latt +
          getRandomInt(
            getRandomInt(getRandomInt(1, 100), 80),
            getRandomInt(getRandomInt(20, 130), 60)
          ) /
            1000,
        lng:
          lng + getRandomInt(getRandomInt(1, 100), getRandomInt(30, 80)) / 1000
      });
    }

    return positions;
  };

  componentDidMount() {
    let randIdx = getRandomInt(0, Tweets.length);
    let randTW = Tweets[randIdx];
    this.setState({ tweet: randTW });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
        <Nav />
        <Twuit
          text={this.state.tweet.full_text}
          user={this.state.tweet.user.screen_name}
        />
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCNiJIcpaoVvP04aLEK5FLOAJSc5VDIl_Y'
            }}
            zoom={this.props.zoom}
            center={this.props.center}
            heatmapLibrary={true}
            heatmap={{
              positions: this.state.positions,
              options: {
                radius: 20,
                opacity: 0.9,
                gradient: [
                  'rgba(0, 255, 255, 0)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(0, 191, 255, 1)',
                  'rgba(0, 127, 255, 1)',
                  'rgba(0, 63, 255, 1)',
                  'rgba(0, 0, 255, 1)',
                  'rgba(0, 0, 223, 1)',
                  'rgba(0, 0, 191, 1)',
                  'rgba(0, 0, 159, 1)',
                  'rgba(0, 0, 127, 1)',
                  'rgba(63, 0, 91, 1)',
                  'rgba(127, 0, 63, 1)',
                  'rgba(191, 0, 31, 1)',
                  'rgba(255, 0, 0, 1)'
                ]
              }
            }}
          />
        </div>
        <Accordion />
        <Footer />
      </div>
    );
  }
}

export default App;
