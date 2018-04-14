import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import brain from 'brain.js';
import fs from 'fs';
import parser from '../src/TweetNN/parser';
import myData from './TweetNN/output-trainedmodel.json';
//import ClassifyTweet from './TweetNN/brain_predict';
// const ClassifyTweet = require('./TweetNN/brain_predict');
/*eslint no-restricted-globals: ["error", "event"]*/

const Nav = function() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          Start Bootstrap
        </a>
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
              <a className="nav-link" href="#">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Services
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Twuit = function() {
  return (
    <section className="py-5 extra-margin">
      <div className="twitta-container text-center">
        <h2 className="twitter-text animated bounceInRight">
          Bomberos trabajando en Choque, entre dos autos particulares, calle
          Gabino Barreda y Alfonso Herrera Col. San Rafael. Sin lesionados.
          #SEPUEDE #CDMX #YOSOYBOMBERO
        </h2>
        <h4 className="text-right text-muted mt-5 twitter-text animated bounceInRight">
          @r111kytrigo
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
  state = {
    positions: [{ lat: 19.0196607, lng: -98.2448809 }]
  };
  static defaultProps = {
    center: { lat: 19.0196607, lng: -98.2448809 },
    zoom: 13
  };

  ClassifyTweet = function(tweet) {
    console.log(myData);
    var obj = JSON.parse(myData);

    var net = new brain.NeuralNetwork();

    net.fromJSON(obj);

    var test_tweet = { tweet };
    var formatted_test_tweet = parser.formatTestSet(test_tweet);

    var output = net.run(formatted_test_tweet);

    console.log(output);

    if (output >= 0.6) {
      return true;
    }

    return false;
  };

  componentWillMount = () => {
    var result = this.ClassifyTweet(
      'Nos dirigimos a Choque, Romero esq. Calle Bolivar, Col. Niños Héroes, al mando V-12-1 unidad 0063.'
    );
    console.log(result); //true
    let lat = this.state.positions[length].lat;
    let lng = this.state.positions[length].lng;
    let p = this.state.positions;
    for (var i = 0; i < 150; i++) {
      p.push({
        lat: (lat += 0.00012),
        lng: (lng += 0.00012)
      });
    }
    this.setState({ positions: p });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div>
        <Nav />
        <Twuit />
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
                opacity: 0.7,
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
