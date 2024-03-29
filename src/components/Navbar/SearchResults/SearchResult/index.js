import React from 'react';
import {Link} from 'react-router-dom';
import Media from '../../../Media';
import './index.css';

import ParticleHolder from '../../../ParticleHolder';

const SearchResultExperience = ({result, hideResults, ...props}) => {
    return (
        <li className="result-list-item">
            <Link onClick={hideResults} to={`/e/${result._id}`}>
                <div className="result-holder">
                    <div>
                        <Media width="20" media={result.media} />
                    </div>
                    <div className="result-container">
                        <span className="result-text">{result.title}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

const SearchResultUser = ({result, hideResults, ...props}) => {
    return (
        <li className="result-list-item">
            <Link onClick={hideResults} to={`/u/${result.username}`}>
                <div className="result-holder">
                    <div>
                        {result.picture ? (
                            <Media width="20" alt="" media={result.picture} />
                        ) : (
                            <ParticleHolder className="search-particle" />
                        )}
                    </div>
                    <div className="result-container">
                        <span className="result-text">{result.username}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export {SearchResultExperience, SearchResultUser};
