import { type } from "@testing-library/user-event/dist/type";
import useFetch from "../../hooks/useFetch";
import { EquipedItem, EquipmentSlotConfig, WeaponTypes } from "./sharedTypes";
import EquipmentListing from "./equipmentListing";
import Search from "./search";

const Equipment = () => {

    const [items, error] = useFetch(`http://localhost:3000/equipment_stubs.json`);
    

    return (
        // center the div using tailwing in the middle of the page
        <div className="lg:col-start-2 col-span-1 border-indigo-800">
            <h1 className="text-2xl font-bold">Equipment</h1>
            {/* for each item from items in the hook above, list it in a new row */}
            <div className="flex flex-row justify-center">
                {error && <p>Error loading equipment data.</p>}
                {!items && <p>Loading...</p>}
                {items && <Search items={items}/>}
            </div>
            <div className="flex flex-row justify-center">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: WeaponTypes.head}) } />
            </div>
            <div className="flex float-left flex-col justify-center">
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: WeaponTypes.meleMain})}
                    currentItem={new EquipedItem(items[0])}              
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: WeaponTypes.meleOffHand}) } 
                    currentItem={new EquipedItem(items[1])}
                />}
            </div>
            <div className="flex float-right flex-col justify-right">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: WeaponTypes.rangedMain}) } />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: WeaponTypes.rangedOffHand}) } />
            </div>
        </div>
    );
};



const EquipmentSlot = ({slotConfig, currentItem}) => {
    if (!currentItem) {
        return (
            <div className="relative h-32 w-32 border-2 m-2 p-2 border-gray-500"
                 >
                <p className="text-gray-500">{slotConfig.type}</p>
            </div>
        );
    }
    return (
        <div
            style={{ '--image-url': `url(${currentItem.img ? currentItem.img : ""})` }} 
            className=" group 
                        bg-contain bg-[image:var(--image-url)]
                        relative h-32 w-32 
                        border-2 m-2 p-2 border-gray-500">
            <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentItem.name}</p>
            <span className="   equipment-tooltip group-hover:scale-100 
                            absolute z-50
                            
                            ">
                <h1 className="text-2xl font-bold">{currentItem.name}</h1>
                <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)]">{currentItem.type}</p>
                {/*  // TODO: add color */}
                <p className="text-gray-500">{currentItem.rearity}</p>
                <p className="text-white whitespace-pre max-w-xs">{currentItem.properties}</p>
                <p className="text-white max-w-xs">{currentItem.description}</p>
                <p className="text-gray-500 italic font-thin max-w-xs">{currentItem.flavorText}</p>
            </span>
        </div>
    );
};

export default Equipment;