import React, {Component} from 'react';
import '../Navbar/index.css';

const Search = ({searchValue, onChangeSearchValue, children }) => {
    return (
        <div className="search flex-item">
            <div className="input-holder">
                <h4>{searchValue}</h4>
                <input onChange={onChangeSearchValue} type="search" name={children} placeholder={children}></input>
            </div>
        </div>
    )
};

export default Search;