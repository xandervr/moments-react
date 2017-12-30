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
        fetchWall(wall => {
            if (wall) this.setState({data: wall});
        });
    };

    componentDidMount() {
        this.updateWall();

        setInterval(() => {
            fetchWall(wall => {
                if (wall) this.setState({data: wall});
            });
        }, 5000);
    }

    render() {
        const experiences = this.state.data ? this.state.data : [];
        const {user} = this.props;
        const experiencesList = experiences.map(el => (
            <Experience currentUser={user} updateWall={this.updateWall} key={el._id} experience={el} />
        ));
        return <main>{experiencesList}</main>;
    }
}

export default Wall;
