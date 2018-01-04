import React, {Component} from 'react';
import Infinite from 'react-infinite';
import {Experience} from '../WallComponents';
import {fetchWall, fetchWallOffset} from '../../assets/js/lib/tap-client';
import './index.css';

class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isInfiniteLoading: false,
            offset: 0,
            limit: 5
        };
        this.mounted = false;
    }

    updateWall = () => {
        fetchWallOffset(0, this.state.offset + this.state.limit, wall => {
            if (wall) this.setState({data: wall});
        });
    };

    componentDidMount() {
        this.loadWall();
        this.mounted = true;
        this.wallUpdater = setInterval(() => {
            if (this.mounted) this.updateWall();
        }, 5000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.wallUpdater);
    }

    loadWall = advance => {
        fetchWallOffset(this.state.offset + (advance ? advance : 0), this.state.limit, wall => {
            if (wall)
                this.setState({
                    data: this.state.data.concat(wall),
                    offset: this.state.offset + (advance ? advance : 0),
                    isInfiniteLoading: false
                });
        });
    };

    loadMore = () => {
        this.setState({isInfiniteLoading: true});
        this.loadWall(2);
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

        return (
            <main>
                <Infinite
                    elementHeight={600}
                    useWindowAsScrollContainer={true}
                    infiniteLoadBeginEdgeOffset={100}
                    onInfiniteLoad={this.loadMore}
                    loadingSpinnerDelegate={this.loadingInProgress()}
                    isInfiniteLoading={this.state.isInfiniteLoading}
                >
                    {experiencesList}
                </Infinite>
            </main>
        );
    }
}

export default Wall;
