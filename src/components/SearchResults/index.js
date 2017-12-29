import React from 'react';
import './index.css';
import {SearchResultExperience, SearchResultUser} from './SearchResult';

const SearchResults = ({experienceResults, userResults, ...props}) => {
    const experienceResultList = experienceResults.map(experience => (
        <SearchResultExperience key={experience._id} result={experience} />
    ));
    const userResultList = userResults.map(user => <SearchResultUser key={user._id} result={user} />);

    return (
        <div className="search-results">
            <ul className="experience-results">{experienceResultList}</ul>
            <ul className="user-results">{userResultList}</ul>
        </div>
    );
};

export default SearchResults;
