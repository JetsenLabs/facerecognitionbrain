import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: '78dfcedee7c64544b463e78a5e75d3bb'
});

const particlesOptions = {
            "particles": {
                "number": {
                    "value": 160,
                    "density": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "speed": 4,
                        "size_min": 0.3
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "random": true,
                    "speed": 1,
                    "direction": "top",
                    "out_mode": "out"
                }
            },
            "interactivity": {
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "bubble"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "repulse"
                    }
                },
                "modes": {
                    "bubble": {
                        "distance": 250,
                        "duration": 2,
                        "size": 0,
                        "opacity": 0
                    },
                    "repulse": {
                        "distance": 400,
                        "duration": 4
                    }
                }
            }
        }



class App extends Component {
    constructor (){
        super();
        this.state = {
            input: '',
        }
    }

    onInputChange = (event) =>{
        console.log(event.target.value);
    }

    onButtonSubmit = () =>{
        console.log('click');
        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
      })
      .then(response => {
        console.log(response);
        var concepts = response['outputs'][0]['data']['concepts']
      })
    }



  render() {
    return (
      <div className="App">
          <Particles className='particles'
          params={particlesOptions} />
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          {/*<FaceRecogition />*/}
      </div>
    );
  }
}

export default App;
