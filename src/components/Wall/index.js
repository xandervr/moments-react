import React, {Component} from 'react';
import {Experience} from '../WallComponents';
import {fetchWall} from '../../assets/js/lib/tap-client';
import './index.css';

class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    updateWall = () => {
        fetchWall()
            .then(result => {
                this.setState({data: result.experiences});
            })
            .catch(e => e);
    };

    componentDidMount() {
        this.updateWall();

        setInterval(() => {
            fetchWall()
                .then(result => {
                    this.setState({data: result.experiences});
                })
                .catch(e => e);
        }, 5000);
    }

    render() {
        const experiences = this.state.data ? this.state.data : [];
        const experiencesList = experiences.map(el => (
            <Experience updateWall={this.updateWall} key={el._id} experience={el} />
        ));
        return <main>{experiencesList}</main>;
    }
}

export default Wall;
