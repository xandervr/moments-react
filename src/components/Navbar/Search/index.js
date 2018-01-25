import React from 'react';
import search from '../../../assets/svg/search.svg';
import '../index.css';

const Search = ({onChangeSearchValue, searchValue, children, onKeyDown, ...rest}) => {
    return (
        <div className="search flex-item">
            <div className="search-input-holder">
                <img src={search} alt="search" />
                <input
                    onChange={onChangeSearchValue}
                    onKeyDown={onKeyDown}
                    type="search"
                    results="5"
                    name={children}
                    placeholder={children}
                    value={searchValue}
                    autoComplete="off"
                    spellCheck="false"
                />
            </div>
        </div>
    );
};

export default Search;
