import React, {Component} from "react";

//Assets
import profile from "../../assets/img/profile.jpg";
import addWhite from "../../assets/svg/add-white.svg";
import chat from "../../assets/svg/chat.svg";
import like from "../../assets/svg/like.svg";
import share from "../../assets/svg/share.svg";
import france from "../../assets/img/france.jpg";

//Styling
import "./experience.css";

//Components
import Comments from "./Comments";
import TimeAgo from "react-timeago";

class Experience extends Component {
    animateUsers = e => {
        const $users = [
                ...e
                    .currentTarget
                    .querySelectorAll(`.side-user`)
            ],
            userCSS = [`zero`, `first`, `second`, `third`];

        for (let i = 0; i < $users.length; i++) {
            $users[i]
                .classList
                .add(`${userCSS[i]}`);
        }
    };

    endAnimateUsers = e => {
        const $users = [
                ...e
                    .currentTarget
                    .querySelectorAll(`.side-user`)
            ],
            userCSS = [`zero`, `first`, `second`, `third`];

        for (let i = 0; i < $users.length; i++) {
            $users[i]
                .classList
                .remove(`${userCSS[i]}`);
        }
    };

    openComments = e => {
        const $comments = e.currentTarget.previousElementSibling.previousElementSibling,
            openHtml = `View less comments`,
            closedHtml = `View ${this.props.experience.comments.length - 1} other comments`;

        $comments
            .classList
            .toggle(`open-comments`);
        $comments
            .classList
            .toggle(`hide`);

        $comments
            .classList
            .contains(`open-comments`)
            ? (e.currentTarget.innerHTML = openHtml)
            : (e.currentTarget.innerHTML = closedHtml);
    };

    openMoments = e => {
        const $moments = e.currentTarget.parentNode,
            openHtml = `See less moments`,
            closedHtml = `See more moments`;

        $moments
            .classList
            .toggle(`open-moments`);
        $moments
            .firstElementChild
            .classList
            .toggle(`hide`);

        $moments
            .classList
            .contains(`open-moments`)
            ? (e.currentTarget.innerHTML = openHtml)
            : (e.currentTarget.innerHTML = closedHtml);
    };

    showAddComment = e => {
        const $comment = e
            .currentTarget
            .parentNode
            .parentNode
            .parentNode
            .querySelector(`.comment-form-holder`);

        $comment
            .classList
            .toggle(`hide`);
    };

    render() {
        const {experience} = this.props;
        const adminPictures = experience
            .access
            .admin
            .map(user => user.picture);
        const writePictures = experience
            .access
            .write
            .map(user => user.picture);
        const userPictures = [
            ...adminPictures,
            ...writePictures
        ];

        const usersShow = userPictures.map((userPicture, i) => {
            while (i < 3) {
                return (<img className="side-user" key={i} src={userPicture} alt="profile"/>);
            }
        });

        return (
            <article className="moment">
                <div className="profile">
                    <a href="#">
                        <div
                            className="user-holder"
                            onMouseOver={this.animateUsers}
                            onMouseOut={this.endAnimateUsers}>
                            <img className="main-user" src={experience.user.picture} alt="profile"/>
                            <div className="side-users">
                                <img className="side-user more" src={addWhite} alt=""/>{" "} {usersShow}
                            </div>
                        </div>
                        <p className="username">
                            {experience.user.surname}
                            {experience.user.name}
                            <TimeAgo
                                style={{
                                marginLeft: "20rem"
                            }}
                                date={experience.created_on}/>
                        </p>
                    </a>
                </div>
                <div className="head-img img-container">
                    <img src={experience.image} alt=""/>
                </div>
                <div className="content">
                    <div className="head">
                        <div>
                            <h2 className="title">{experience.title}</h2>
                            <p className="location">Les Orres - France</p>
                        </div>
                        <div className="actions">
                            <div className="action pointer" onClick={this.showAddComment}>
                                <img src={chat} alt="comment"/>
                            </div>
                            <div className="action pointer">
                                <img src={like} alt="like"/>
                            </div>
                            <div className="action pointer">
                                <img src={share} alt="share"/>
                            </div>
                        </div>
                    </div>
                    <div className="info">
                        <p className="desc">{experience.description}</p>
                    </div>
                    <Comments openComments={this.openComments} comments={experience.comments}/>
                </div>
                <div className="content images">
                    <div className="img-list hide">
                        <div className="img-container">
                            <img src={france} alt=""/>
                        </div>
                        <div className="img-container">
                            <img src={france} alt=""/>
                        </div>
                        <div className="img-container">
                            <img src={france} alt=""/>
                        </div>
                        <div className="img-container">
                            <img src={france} alt=""/>
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
