import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

const Notifications = ({notifications}) => {
    return (
        <div className="notifications-holder">
            {notifications.map((notification, index) => (
                <Fragment key={index}>
                    <div className="notification">
                        <Link className="notifier" to={`/u/${notification.user_notifier._id}`}>
                            <img src={notification.user_notifier.picture.image} alt="" />
                        </Link>
                        <p>{notification.text}</p>
                        {notification.type === `boost` ||
                            (notification.type === `comment` && (
                                <Link to={`/e/${notification.experience._id}`}>
                                    <img src={notification.experience.media.image} alt="" />
                                </Link>
                            ))}
                    </div>
                    {index !== notifications.length - 1 && <div className="notifications-divider" />}
                </Fragment>
            ))}
        </div>
    );
};

export default Notifications;
