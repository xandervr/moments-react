import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Media from '../../Media';
import {enableScroll, disableScroll} from '../../../assets/js/lib/helpers';
import './index.css';

const Notifications = ({notifications}) => {
    return (
        <div className="notifications-holder" onClick={enableScroll} onMouseOver={disableScroll} onMouseOut={enableScroll}>
            {/* <header>Notifications</header> */}
            {notifications.map((notification, index) => (
                <Fragment key={index}>
                    <div className="notification">
                        <Link className="notifier" to={`/u/${notification.user_notifier._id}`}>
                            <Media media={notification.user_notifier.picture} />
                        </Link>
                        <p className="notification-content">
                            {notification.type === `comment` && (
                                <Fragment>
                                    <Link to={`/u/${notification.user_notifier._id}`}>{notification.user_notifier.fullname}</Link>{' '}
                                    commented on your experience:{' '}
                                    <Link to={`/e/${notification.experience._id}`}>{notification.experience.title}</Link>
                                </Fragment>
                            )}
                            {notification.type === `boost` && (
                                <Fragment>
                                    <Link to={`/u/${notification.user_notifier._id}`}>{notification.user_notifier.fullname}</Link>{' '}
                                    <i class="fas fa-fire" /> your experience:{' '}
                                    <Link to={`/e/${notification.experience._id}`}>{notification.experience.title}</Link>
                                </Fragment>
                            )}
                        </p>

                        {(notification.type === `boost` || notification.type === `comment`) && (
                            <Link to={`/e/${notification.experience._id}`}>
                                <Media className="notification-dest" media={notification.experience.media} />
                            </Link>
                        )}
                    </div>
                    {index !== notifications.length - 1 && <div className="notifications-divider" />}
                </Fragment>
            ))}
        </div>
    );
};

export default Notifications;
