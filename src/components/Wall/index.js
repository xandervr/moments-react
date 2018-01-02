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
        this.mounted = false;
    }

    updateWall = () => {
        fetchWall(wall => {
            if (wall) this.setState({data: wall});
        });
    };

    componentDidMount() {
        this.updateWall();
        this.mounted = true;
        this.wallUpdater = setInterval(() => {
            if (this.mounted)
                fetchWall(wall => {
                    if (wall) this.setState({data: wall});
                });
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.wallUpdater);
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
