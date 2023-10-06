import { type } from "@testing-library/user-event/dist/type";
import useFetch from "../../hooks/useFetch";
import { EquipedItem, EquipmentSlotConfig, ItemTypes } from "./sharedTypes";
import {EquipmentListing, EquipmentItemHover} from "./equipmentListing";
import Search from "./search";
import Modal from "./modal";
import { useState } from "react";

const Equipment = () => {

    const [items, error] = useFetch(`http://localhost:3000/equipment_stubs.json`);
    const [selectedItem, setSelectedItem] = useState(null);

    const updateSelectedItem = (newItem) => {
        setSelectedItem(newItem);
        closeModal();
    };

    const targetEl = document.getElementById('defaultModal');
    // open and hide modaal
    const openModal = (element) => {
      targetEl.classList.remove('hidden');
    };
    const closeModal = () => {
      targetEl.classList.add('hidden');
    };

    return (
        // center the div using tailwing in the middle of the page
        <div className="lg:col-start-2 col-span-1 border-indigo-800">
            <h1 className="text-2xl font-bold">Equipment</h1>

            <Modal
                className="fade-up"
                id={"defaultModal"}
                closeModalFunction={closeModal}>
                <div className="flex flex-row justify-center">
                    {error && <p>Error loading equipment data.</p>}
                    {!items && <p>Loading...</p>}
                    {items && <Search items={items} updateSelectedItem={updateSelectedItem}/>}
                </div>
            </Modal>
            <div id="item-head" className="flex flex-row justify-center" onClick={openModal}>
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.head})} 
                               currentItem={selectedItem} />
            </div>
            <div className="flex float-left flex-col justify-center">
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleMain})}
                    currentItem={new EquipedItem(items[0])}              
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.meleOffHand}) } 
                    currentItem={new EquipedItem(items[1])}
                />}
            </div>
            <div className="flex float-right flex-col justify-right">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedMain}) } />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.rangedOffHand}) } />
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
            <EquipmentItemHover item={currentItem} />
        </div>
    );
};

export default Equipment;