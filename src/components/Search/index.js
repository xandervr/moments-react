import React from 'react';
import search from '../../assets/svg/search.svg';
import '../Navbar/index.css';

const Search = ({searchValue, onChangeSearchValue, children}) => {
    return (
        <div className="search flex-item">
            <div className="search-input-holder">
                <img src={search} alt="search" />
                <input
                    onChange={onChangeSearchValue}
                    type="search"
                    results="5"
                    name={children}
                    placeholder={children}
                />
            </div>
        </div>
    );
};

export default Search;
