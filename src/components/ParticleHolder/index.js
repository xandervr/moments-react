import React, {Component} from 'react';
import Particles from 'react-particles-js';
import './index.css';

export default class ParticleHolder extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>
                <Particles
                    className={this.props.full ? 'particle particle-full' : 'particle particle-round'}
                    canvasClassName={
                        this.props.full ? 'particle particle-canvas particle-full' : 'particle particle-canvas particle-round'
                    }
                    params={{
                        particles: {
                            line_linked: {enable: true, color: '#000000', width: 2},
                            move: {enable: true, out_mode: 'bounce', random: true, speed: 2},
                            number: {value: this.props.particles || 6, density: {enabled: true, value_area: 5000}}
                        },
                        interactivity: {
                            events: {
                                onhover: {enable: true, mode: 'grab'}, //     enable: true, // onclick: {
                                //     mode: 'push'
                                // },
                                resize: true
                            },
                            detect_on: 'canvas'
                        },
                        retina_detect: true
                    }}
                />
            </div>
        );
    }
}
