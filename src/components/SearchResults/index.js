import React from 'react';
import './index.css';
import {SearchResultExperience, SearchResultUser} from './SearchResult';

const SearchResults = ({experienceResults, userResults, hideResults, ...props}) => {
    const experienceResultList = experienceResults.map(experience => (
        <SearchResultExperience key={experience._id} result={experience} />
    ));
    const userResultList = userResults.map(user => <SearchResultUser hideResults={hideResults} key={user._id} result={user} />);

    return (
        <div className="search-results">
            <ul className="experience-results">
                {experienceResults.length > 0 ? (
                    <li className="search-result-title">Experience{experienceResults.length > 1 ? `s` : ``}</li>
                ) : null}
                {experienceResultList}
            </ul>
            <ul className="user-results">
                {userResults.length > 0 ? <li className="search-result-title">User{userResults.length > 1 ? `s` : ``}</li> : null}
                {userResultList}
            </ul>
        </div>
    );
};

export default SearchResults;
