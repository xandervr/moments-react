import React, {
    Component
} from 'react';
import profile from '../../assets/img/profile.jpg';
import addWhite from '../../assets/svg/add-white.svg';
import chat from '../../assets/svg/chat.svg';
import like from '../../assets/svg/like.svg';
import share from '../../assets/svg/share.svg';
import france from '../../assets/img/france.jpg';
import './experience.css';

class Experience extends Component {
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

    openComments = e => {
        const $comments = e.currentTarget.previousElementSibling.previousElementSibling,
            openHtml = `View less comments`,
            closedHtml = `View 4 other comments`;

        $comments.classList.toggle(`open-comments`);
        $comments.classList.toggle(`hide`);

        $comments.classList.contains(`open-comments`) ?
            (e.currentTarget.innerHTML = openHtml) :
            (e.currentTarget.innerHTML = closedHtml);
    };

    openMoments = e => {
        const $moments = e.currentTarget.parentNode,
            openHtml = `See less moments`,
            closedHtml = `See more moments`;

        $moments.classList.toggle(`open-moments`);
        $moments.firstElementChild.classList.toggle(`hide`);

        $moments.classList.contains(`open-moments`) ?
            (e.currentTarget.innerHTML = openHtml) :
            (e.currentTarget.innerHTML = closedHtml);
    };

    showAddComment = e => {
        const $comment = e.currentTarget.parentNode.parentNode.parentNode.querySelector(`.comment-form-holder`);

        console.log($comment);

        $comment.classList.toggle(`hide`);
    };

    render() {
        const {
            experience
        } = this.props;
        return ( <
            article className = "moment" >
            <
            div className = "profile" >
            <
            a href = "#" >
            <
            div className = "user-holder"
            onMouseOver = {
                this.animateUsers
            }
            onMouseOut = {
                this.endAnimateUsers
            } >
            <
            img className = "main-user"
            src = {
                experience.user.picture
            }
            alt = "profile" / >
            <
            div className = "side-users" >
            <
            img className = "side-user more"
            src = {
                addWhite
            }
            alt = "" / >
            <
            img className = "side-user"
            src = {
                profile
            }
            alt = "profile" / >
            <
            img className = "side-user"
            src = {
                profile
            }
            alt = "profile" / >
            <
            img className = "side-user"
            src = {
                profile
            }
            alt = "profile" / >
            <
            /div> < /
            div > <
            p className = "username" > {
                experience.user.surname
            } {
                experience.user.name
            } <
            /p> < /
            a > <
            /div> <
            div className = "head-img img-container" >
            <
            img src = {
                experience.image
            }
            alt = "" / >
            <
            /div> <
            div className = "content" >
            <
            div className = "head" >
            <
            div >
            <
            h2 className = "title" > {
                experience.title
            } < /h2> <
            p className = "location" > Les Orres - France < /p> < /
            div > <
            div className = "actions" >
            <
            div className = "action pointer"
            onClick = {
                this.showAddComment
            } >
            <
            img src = {
                chat
            }
            alt = "comment" / >
            <
            /div> <
            div className = "action pointer" >
            <
            img src = {
                like
            }
            alt = "like" / >
            <
            /div> <
            div className = "action pointer" >
            <
            img src = {
                share
            }
            alt = "share" / >
            <
            /div> < /
            div > <
            /div> <
            div className = "info" >
            <
            p className = "desc" > {
                experience.description
            } < /p> < /
            div > <
            div className = "comments" >
            <
            ul >
            <
            li >
            <
            span className = "username" > JariVerswyvel < /span>&nbsp;&nbsp;Lorem ipsum dolor sit amet,
            consectetur adipiscing elit <
            /li> < /
            ul > <
            ul className = "hide" >
            <
            li >
            <
            span className = "username" > JariVerswyvel < /span>&nbsp;&nbsp;Lorem ipsum dolor sit amet,
            consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit <
            /li> <
            li >
            <
            span className = "username" > CisVercoutren < /span>&nbsp;&nbsp;Lorem ipsum dolor sit amet,
            consectetur adipiscing elit <
            /li> <
            li >
            <
            span className = "username" > WizardVr < /span>&nbsp;&nbsp;Lorem ipsum dolor sit amet,
            consectetur adipiscing elit <
            /li> <
            li >
            <
            span className = "username" > SpaBlauw < /span>&nbsp;&nbsp;Lorem ipsum dolor sit amet,
            consectetur adipiscing elit <
            /li> < /
            ul > <
            div className = "hide comment-form-holder" >
            <
            form action = ""
            className = "comment-form" >
            <
            label className = "username"
            htmlFor = "comment" >
            UserName <
            /label> <
            input id = "comment"
            autoComplete = "off" / >
            <
            /form> < /
            div > <
            p className = "pointer"
            onClick = {
                this.openComments
            } >
            View 4 other comments <
            /p> < /
            div > <
            /div> <
            div className = "content images" >
            <
            div className = "img-list hide" >
            <
            div className = "img-container" >
            <
            img src = {
                france
            }
            alt = "" / >
            <
            /div> <
            div className = "img-container" >
            <
            img src = {
                france
            }
            alt = "" / >
            <
            /div> <
            div className = "img-container" >
            <
            img src = {
                france
            }
            alt = "" / >
            <
            /div> <
            div className = "img-container" >
            <
            img src = {
                france
            }
            alt = "" / >
            <
            /div> < /
            div > <
            p className = "pointer"
            onClick = {
                this.openMoments
            } >
            See more moments <
            /p> < /
            div > <
            /article>
        );
    }
}

export default Experience;