import React, {useState} from 'react';
import Scroll from './scroll';
import EquipmentListing from './equipmentListing';

function Search({ items, updateSelectedItem }) {
    const [searchField, setSearchField] = useState('');

    if (!items) {
        return <p>Loading...</p>
    }

    const filteredItems = items.filter(item => {
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
                    className="border-2 border-gray-500 rounded-lg"
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