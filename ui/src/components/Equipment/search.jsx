import React, {useState} from 'react';
import Scroll from './scroll';
import EquipmentListing from './equipmentListing';

function Search({ items, preFilter, updateSelectedItem }) {
    const [searchField, setSearchField] = useState('');

    if (!items) {
        return <p>Loading...</p>
    }

    console.log("preFilter", preFilter);

    if (!preFilter) {
        preFilter = (item) => item;
    }

    const filteredItems = items.filter(preFilter).filter(item => {
        return (item.name.toLowerCase().includes(searchField.toLowerCase()));
    });

    const handleChange = e => {
        setSearchField(e.target.value);
    }

    function searchList() {
        return (
            <Scroll>
                <EquipmentListing filteredItems={filteredItems} updateSelectedItem={updateSelectedItem} />
            </Scroll>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-center">
                <input 
                    className="border-2 pl-2 border-gray-500 rounded-lg"
                    type="search" 
                    placeholder=" Search for an item" 
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-row justify-center">
                {searchList()}
            </div>
        </div>
    );

}

export default Search;
