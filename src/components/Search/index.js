import React, {Component} from 'react';
import search from '../../assets/svg/search.svg';
import '../Navbar/index.css';

const Search = ({searchValue, onChangeSearchValue, children }) => {
    return (
        <div className="search flex-item">
            <div className="search-input-holder">
                <img src={search} alt="search"/>
                <input onChange={onChangeSearchValue} type="search" name={children} placeholder={children}></input>
                <p>{searchValue}</p>
            </div>
        </div>
    )
};

export default Search;
