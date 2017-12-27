import React, {Component} from 'react';
import profile from '../../svg/profile.jpg';
import addWhite from '../../svg/add-white.svg';
import chat from '../../svg/chat.svg';
import like from '../../svg/like.svg';
import share from '../../svg/share.svg';
import france from '../../svg/france.jpg';
import './experience.css';

class Experience extends Component {
    render() {
        return (
            <article class="moment">
                    <div class="profile">
                        <a href="#">
                            <div class="user-holder" onmouseover="animateUsers()" onmouseout="endAnimateUsers()">
                                <img class="main-user" src={profile} alt="profile"/>
                                    <div class="side-users">
                                        <img class="side-user more" src={addWhite} alt=""/>
                                            <img class="side-user" src={profile} alt="profile"/>
                                                <img class="side-user" src={profile} alt="profile"/>
                                                    <img class="side-user" src={profile} alt="profile"/>
                                    </div>
                            </div>
                            <p class="username">JariVerswyvel</p>
                        </a>
                    </div>
                    <div class="head-img img-container">
                        <img src={france} alt=""/>
                    </div>
                    <div class="content">
                        <div class="head">
                            <div>
                                <h2 class="title">Skivakantie</h2>
                                <p class="location">Les Orres - France</p>
                            </div>
                            <div class="actions">
                                <div class="action pointer">
                                    <img src={chat} alt="comment"/>
                                </div>
                                <div class="action pointer">
                                    <img src={like} alt="like"/>
                                </div>
                                <div class="action pointer">
                                    <img src={share} alt="share"/>
                                </div>
                            </div>
                        </div>
                        <div class="info">
                            <p class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
                        </div>
                        <div class="comments">
                            <ul>
                                <li><span class="username">JariVerswyvel</span>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            </ul>
                            <ul class="hide">
                                <li><span class="username">JariVerswyvel</span>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                <li><span class="username">CisVercoutre</span>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                <li><span class="username">WizardVr</span>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                                <li><span class="username">SpaBlauw</span>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                            </ul>
                            <p class="pointer" onclick="openComments(this)">View 4 other comments</p>
                        </div>
                    </div>
                    <div class="content images">
                        <div class="img-list hide">
                            <div class="img-container">
                                <img src={france} alt=""/>
                            </div>
                            <div class="img-container">
                                <img src={france} alt=""/>
                            </div>
                            <div class="img-container">
                                <img src={france} alt=""/>
                            </div>
                            <div class="img-container">
                                <img src={france} alt=""/>
                            </div>
                        </div>
                        <p class="pointer" onclick="openMoments(this)">See more moments</p>
                    </div>
                </article>
        )
    }
}

export default Experience;