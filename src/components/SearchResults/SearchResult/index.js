import React from 'react';
import './index.css';

const SearchResultExperience = ({result, ...props}) => {
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

const SearchResultUser = ({result, ...props}) => {
    return (
        <li>
            <div className="result-holder">
                <div>
                    <img width="20" alt="" src={result.picture} />
                </div>
                <div className="result-container">
                    <span className="result-text">{result.username}</span>
                </div>
            </div>
        </li>
    );
};

export {SearchResultExperience, SearchResultUser};
