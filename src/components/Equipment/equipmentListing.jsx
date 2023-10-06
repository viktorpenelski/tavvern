import { type } from "@testing-library/user-event/dist/type";
import useFetch from "../../hooks/useFetch";

const EquipmentListing = ({filteredItems}) => {
    return (
        <div>
            {filteredItems && filteredItems.map(item => 
                <EquipmentListItem key={item.name} item={item} />
            )}
        </div>
    );
};


const EquipmentListItem = ({item}) => {
    return (
        <div
            style={{ '--image-url': `url(${item.img ? item.img : ""})` }} 
            className=" group 
                        bg-contain bg-[image:var(--image-url)]
                        relative h-32 w-32 
                        border-2 m-2 p-2 border-gray-500">
            <p className="text-gray-500">{item.name}</p>
            <span className="   equipment-tooltip group-hover:scale-100 
                            absolute z-50
                            
                            ">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <p className="text-gray-500">{item.type}</p>
                {/*  // TODO: add color */}
                <p className="text-gray-500">{item.rearity}</p>
                <p className="text-white whitespace-pre">{item.properties}</p>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-500 italic font-thin max-w-xs">{item.flavorText}</p>
            </span>
        </div>
    );
};

export default EquipmentListing;