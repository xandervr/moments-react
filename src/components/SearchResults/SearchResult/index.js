import React from 'react';

const SearchResultExperience = ({result, ...props}) => {
    return (
        <li>
            <span className="result-title">{result.title}</span>
        </li>
    );
};

const SearchResultUser = ({result, ...props}) => {
    return (
        <li>
            <img width="20" src={result.picture} />
            <span className="result-title">{result.username}</span>
        </li>
    );
};

export {SearchResultExperience, SearchResultUser};
