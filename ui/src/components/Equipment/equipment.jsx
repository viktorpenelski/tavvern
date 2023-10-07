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

    return (
        <div className="lg:col-start-2 col-span-1 border-indigo-800">
            <h1 className="text-2xl font-bold">Equipment</h1>

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
            <div id="item-head" className="flex flex-row justify-center">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.helmet})}
                               currentItem={selectedItems.head}
                               onClick={searchForItem} />
            </div>
            <div className="flex float-left flex-col justify-center">
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleMain})}
                    currentItem={selectedItems.meleMain}  
                    onClick={searchForItem}            
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleOffHand}) } 
                    currentItem={selectedItems.meleOffHand}
                    onClick={searchForItem}
                />}
            </div>
            <div className="flex float-right flex-col justify-right">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedMain}) } currentItem={selectedItems.rangedMain} onClick={searchForItem} />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedOffHand})} currentItem={selectedItems.rangedOffHand} onClick={searchForItem}/>
            </div>
        </div>
    );
};


const EquipmentSlot = ({slotConfig, currentItem, onClick}) => {
    if (!currentItem) {
        return (
            <div className="relative h-32 w-32 border-2 m-2 p-2 border-gray-500" onClick={() => onClick(slotConfig)}>
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
                        border-2 m-2 p-2 border-gray-500"
                        onClick={() => onClick(slotConfig)}>
            <p className="text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentItem.name}</p>
            <EquipmentItemHover item={currentItem} />
        </div>
    );
};

export default Equipment;