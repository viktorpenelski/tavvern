import { type } from "@testing-library/user-event/dist/type";
import useFetch from "../../hooks/useFetch";

const EquipmentListing = ({filteredItems, updateSelectedItem}) => {
    return (
        <div>
            {filteredItems && filteredItems.map(item => 
                <EquipmentListItem key={item.name} item={item} updateSelectedItem={updateSelectedItem} />
            )}
        </div>
    );
};

export const EquipmentItemHover = ({item}) => {
    return (
        <span className="   equipment-tooltip group-hover:scale-100 absolute z-50 ">
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">{item.type}</p>
            {/*  // TODO: add color */}
            <p className="text-gray-500">{item.rearity}</p>
            <p className="text-white whitespace-pre max-w-xs">{item.properties}</p>
            <p className="text-white max-w-xs">{item.description}</p>
            <p className="text-gray-500 italic font-thin max-w-xs">{item.flavorText}</p>
        </span>
    );
}

const EquipmentListItem = ({item, updateSelectedItem}) => {
    return (
        <div
            className=" group 
                        relative
                        grid grid-cols-2
                        border-2 m-2 p-2 border-gray-500"
            onClick={() => updateSelectedItem(item)}
        >
            <img className="h-16 w-16" src={item.img} alt={item.name} />
            <p className="text-gray-500">{item.name}</p>
            {/* <EquipmentItemHover item={item} /> */}
        </div>
    );
};

export default EquipmentListing;