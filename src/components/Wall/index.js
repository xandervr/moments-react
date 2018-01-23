import React, {Component} from 'react';
import {Experience} from '../WallComponents';
import InfiniteScroll from '../InfiniteScroll';
import {fetchWallOffset} from '../../assets/js/lib/tap-client';
import './index.css';

class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasMore: true,
            offset: 0,
            limit: 4
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

    loadWall = (advance, cb) => {
        fetchWallOffset(this.state.offset + (advance ? advance : 0), this.state.limit, wall => {
            if (wall && wall.length > 0)
                this.setState(
                    {
                        data: this.state.data.concat(wall),
                        offset: this.state.offset + (advance ? advance : 0),
                        hasMore: true
                    },
                    cb
                );
            else this.setState({hasMore: false}, cb);
        });
    };

    loadMore = cb => {
        this.loadWall(4, cb);
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
                <InfiniteScroll loadMore={this.loadMore} loadMoreOffset={600}>
                    {experiencesList}
                </InfiniteScroll>
            </main>
        );
    }
}

export default Wall;
