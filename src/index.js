import 'aframe';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

import name_info from './data_3D_sample.json';

const scaleX = 5,
    scaleY = 5,
    scaleZ = 5;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        scene: undefined,
    };
  }

  componentDidMount() {
    this.createScene();
  }   

  perc2color(perc,min,max) {
    var base = (max - min);

    if (base == 0) { perc = 100; }
    else {
        perc = (perc - min) / base * 100; 
    }
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

  createScene() {
    let names = [];
    for (let name of name_info) {
        let size = Math.log(parseInt(name.count)) / 250;
        names.push(<Entity 
            primitive="a-box" 
            position={name.x/scaleX + " " + name.y/scaleY + " " + name.z/scaleZ} 
            height={size}
            width={size}
            depth={size}
            color={this.perc2color(parseInt(name.idxmax), 1900, 2019)}
        />)
    }
    this.setState({
        scene: names
    })
  }

  render() {
    return (
        <Scene>
            <a-sky color="#000000"></a-sky>
            <Entity primitive="a-light" type="ambient" color="#445451"/>
            <Entity primitive="a-light" type="directional" position="0 0 0" rotation="-90 0 0" target="#directionaltarget">
                <Entity primitive="a-entity" id="directionaltarget" position="-1 -0.5 -0.75"></Entity>
            </Entity>
            {this.state.scene}
        </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
