import React, {Component} from 'react';

//Assets
import profile from '../../assets/img/profile.jpg';
import addWhite from '../../assets/svg/add-white.svg';
import chat from '../../assets/svg/chat.svg';
import like from '../../assets/svg/like.svg';
import share from '../../assets/svg/share.svg';
import france from '../../assets/img/france.jpg';

//Styling
import './experience.css';

//Components
import Comments from './Comments';
import TimeAgo from 'react-timeago';

class Experience extends Component {
    constructor(props) {
        super(props);
    }

    animateUsers = e => {
        const $users = [...e.currentTarget.querySelectorAll(`.side-user`)],
            userCSS = [`zero`, `first`, `second`, `third`];

        for (let i = 0; i < $users.length; i++) {
            $users[i].classList.add(`${userCSS[i]}`);
        }
    };

    endAnimateUsers = e => {
        const $users = [...e.currentTarget.querySelectorAll(`.side-user`)],
            userCSS = [`zero`, `first`, `second`, `third`];

        for (let i = 0; i < $users.length; i++) {
            $users[i].classList.remove(`${userCSS[i]}`);
        }
    };

    openMoments = e => {
        const $moments = e.currentTarget.parentNode,
            openHtml = `See less moments`,
            closedHtml = `See more moments`;

        $moments.classList.toggle(`open-moments`);
        $moments.firstElementChild.classList.toggle(`hide`);

        $moments.classList.contains(`open-moments`)
            ? (e.currentTarget.innerHTML = openHtml)
            : (e.currentTarget.innerHTML = closedHtml);
    };

    showAddComment = e => {
        const $comment = e.currentTarget.parentNode.parentNode.parentNode.querySelector(`.comment-form-holder`);

        $comment.classList.toggle(`hide`);
    };

    render() {
        const {experience, updateWall, currentUser} = this.props;
        const ownerId = experience.user._id;
        console.log(ownerId);
        const adminPictures = experience.access.admin.filter(admin => admin._id !== ownerId).map(user => user.picture);
        const writePictures = experience.access.write.map(user => user.picture);
        const userPictures = [...adminPictures, ...writePictures];

        const usersShow = userPictures.map((userPicture, i) => {
            while (i < 3) {
                return <img className="side-user" key={i} src={userPicture} alt="profile" />;
            }
        });

        return (
            <article className="moment">
                <div className="profile">
                    <a href="">
                        <div className="user-holder" onMouseOver={this.animateUsers} onMouseOut={this.endAnimateUsers}>
                            <img className="main-user" src={experience.user.picture} alt="profile" />
                            <div className="side-users">
                                <img className="side-user more" src={addWhite} alt="" /> {usersShow}
                            </div>
                        </div>
                        <div className="experience-title">
                            <div>
                                <span className="username">
                                    <span>{experience.user.surname}</span>
                                    <span>{experience.user.name}</span>
                                </span>
                            </div>
                            <TimeAgo date={experience.created_on} />
                        </div>
                    </a>
                </div>
                <div className="head-img img-container">
                    <img src={experience.image} alt="" />
                </div>
                <div className="content">
                    <div className="head">
                        <div>
                            <h2 className="title">{experience.title}</h2>
                            <p className="location">Les Orres - France</p>
                        </div>
                        <div className="actions">
                            {/* <div className="action pointer" onClick={this.showAddComment}>
                                <img src={chat} alt="comment" />
                            </div> */}
                            <div className="action pointer">
                                <i className="fas fa-fire" />
                            </div>
                            <div className="action pointer">
                                <i className="fas fa-share-alt" />
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <p className="desc">{experience.description}</p>
                    </div>
                    <Comments
                        currentUser={currentUser}
                        experience={experience}
                        updateWall={updateWall}
                        comments={experience.comments}
                    />
                </div>
                <div className="content images">
                    <div className="img-list hide">
                        <div className="img-container">
                            <img src={france} alt="" />
                        </div>
                        <div className="img-container">
                            <img src={france} alt="" />
                        </div>
                        <div className="img-container">
                            <img src={france} alt="" />
                        </div>
                        <div className="img-container">
                            <img src={france} alt="" />
                        </div>
                    </div>
                    <p className="pointer" onClick={this.openMoments}>
                        See more moments
                    </p>
                </div>
            </article>
        );
    }
}

export default Experience;
