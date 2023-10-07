import useFetch from "../../hooks/useFetch";
import { ItemTypeMapping, EquipmentSlotConfig, ItemTypes } from "./sharedTypes";
import {EquipmentListing, EquipmentItemHover} from "./equipmentListing";
import Search from "./search";
import Modal from "./modal";
import { useState } from "react";




const Equipment = () => {

    const [items, error] = useFetch(`http://localhost:3000/act1_items.json`);
    const [selectedItems, setSelectedItem] = useState(Object.keys(ItemTypes).map((key) => [key, null]));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [modalPreFilter, setModalPreFilter] = useState(null);

    const targetEl = document.getElementById('defaultModal');
    const _openModal = (slotConfig) => {
        setSelectedSlot(slotConfig.type);
        targetEl.classList.remove('hidden');
    };
    const closeModal = () => {
        setSelectedSlot(null);
        targetEl.classList.add('hidden');
      };


    const searchForItem = (slotConfig) => {

        const filter = (item) => {
            return ItemTypeMapping[slotConfig.type].has(item.type.toLowerCase());
        };

        setModalPreFilter(() => filter);
        _openModal(slotConfig);
    };

    const updateSelectedItem = (newItem) => {
        setSelectedItem({...selectedItems, [selectedSlot]: newItem});
        setModalPreFilter(null);
        closeModal();
    };

    const clearSlot = (event, slotConfig) => {
        console.log("clearSlot", slotConfig.type)
        event.stopPropagation();
        setSelectedItem({...selectedItems, [slotConfig.type]: null});
    }

    return (
        <div className="grid grid-cols-7 lg:col-start-2 col-span-1 border-indigo-800">
            <h1 className="row-start-1 col-start-4 text-2xl font-bold justify-center">Equipment</h1>

            <Modal
                className="fade-up"
                id={"defaultModal"}
                closeModalFunction={closeModal}>
                <div className="flex flex-row justify-center">
                    {error && <p>Error loading equipment data.</p>}
                    {!items && <p>Loading...</p>}
                    {items && <Search items={items} preFilter={modalPreFilter} updateSelectedItem={updateSelectedItem}/>}
                </div>
            </Modal>
            <div id="item-head" className="row-start-3 col-start-4 col-span-1 grid-flow-row justify-center">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.helmet})}
                               currentItem={selectedItems.helmet}
                               fnSearch={searchForItem} fnClearSlot={clearSlot} />
            </div>
            <div className="row-start-5 col-start-3 gap-1 col-span-1 justify-center">
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleMain})}
                    currentItem={selectedItems.meleMain}  
                    fnSearch={searchForItem} fnClearSlot={clearSlot}       
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleOffHand}) } 
                    currentItem={selectedItems.meleOffHand}
                    fnSearch={searchForItem} fnClearSlot={clearSlot}
                />}
            </div>
            <div className="row-start-5 col-start-5 gap-1 col-span-1 justify-right">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedMain}) } currentItem={selectedItems.rangedMain} fnSearch={searchForItem} fnClearSlot={clearSlot} />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedOffHand})} currentItem={selectedItems.rangedOffHand} fnSearch={searchForItem} fnClearSlot={clearSlot}/>
            </div>
        </div>
    );
};


const EquipmentSlot = ({slotConfig, currentItem, fnSearch, fnClearSlot}) => {
    if (!currentItem) {
        return (
            <div className="relative h-32 w-32 border-2 m-2 p-2 border-gray-500" onClick={() => fnSearch(slotConfig)}>
                <p className="text-gray-500">{slotConfig.type}</p>
            </div>
        );
    }
    return (
        <div
            style={{ '--image-url': `url(${currentItem.imgUrl ? currentItem.imgUrl : ""})` }} 
            className=" group 
                        bg-contain bg-[image:var(--image-url)]
                        relative h-32 w-32 
                        border-2 m-2 p-2 border-gray-500"
                        onClick={() => fnSearch(slotConfig)}>
            <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentItem.name}</p>
            {/* create a span that is a small X in the top right corner */}
            <span className="absolute top-0 right-1.5 cursor-pointer
                           text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-2xl font-bold"
                    onClick={event => fnClearSlot(event, slotConfig)}
                    >X</span>
            <EquipmentItemHover item={currentItem} />
        </div>
    );
};

export default Equipment;