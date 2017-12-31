import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

const SearchResultExperience = ({result, hideResults, ...props}) => {
    return (
        <li>
            <div className="result-holder">
                <div>
                    <img width="20" alt="" src={result.image} />
                </div>
                <div className="result-container">
                    <span className="result-text">{result.title}</span>
                </div>
            </div>
        </li>
    );
};

const SearchResultUser = ({result, hideResults, ...props}) => {
    return (
        <li>
            <Link onClick={hideResults} to={`/u/${result.username}`}>
                <div className="result-holder">
                    <div>
                        <img width="20" alt="" src={result.picture} />
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
