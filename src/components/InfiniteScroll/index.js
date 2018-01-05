import React, {Component} from 'react';
import loadingImage from '../../assets/img/loading.gif';
import './index.css';

class InfiniteScroll extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.isLoading = false;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const {loadMoreOffset, loadMore} = this.props;
        const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset + loadMoreOffset;
        if (windowBottom >= docHeight) {
            if (!this.isLoading) {
                this.isLoading = true;
                loadMore(() => {
                    this.isLoading = false;
                });
            }
        }
    };

    render() {
        const {children} = this.props;
        // if (this.isLoading) {
        //     return (
        //         <div>
        //             {children}
        //             <div className="infinite-loader-container">
        //                 <img className="infinite-loader" src={loadingImage} />
        //             </div>
        //         </div>
        //     );
        // } else return children;
        return children;
    }
}

export default InfiniteScroll;
