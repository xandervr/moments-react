import React, {Component} from 'react';
import {Infinite} from 'react-infinite';
import {Experience} from '../WallComponents';
import {fetchWall, fetchWallOffset} from '../../assets/js/lib/tap-client';
import './index.css';

class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isInfiniteLoading: false,
            offset: 0,
            limit: 10
        };
        this.mounted = false;
    }

    updateWall = () => {
        fetchWall(wall => {
            if (wall) this.setState({data: wall});
        });
    };

    componentDidMount() {
        this.loadWall();
        this.mounted = true;
        this.wallUpdater = setInterval(() => {
            if (this.mounted) this.loadWall();
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.wallUpdater);
    }

    loadWall = advance => {
        fetchWallOffset(this.state.offset, this.state.limit + advance ? advance : 0, wall => {
            if (wall) this.setState({data: wall, limit: this.state.limit + advance ? advance : 0});
        });
    };

    loadMore = () => {
        this.loadWall(10);
    };

    loadingInProgress = () => {
        return <div className="infinite-list-item">Loading...</div>;
    };

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
