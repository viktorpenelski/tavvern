import useFetch from "../../hooks/useFetch";
import { ItemTypeMapping, EquipmentSlotConfig, ItemTypes } from "./sharedTypes";
import { EquipmentListing, EquipmentItemHover } from "./equipmentListing";
import Search from "./search";
import Modal from "./modal";
import { useEffect, useState } from "react";
import useQueryParam from "../../hooks/useQueryState";




const Equipment = () => {

    const [items, error] = useFetch(`http://localhost:3000/act1_items.json`);
    const [selectedItems, setSelectedItem] = useState(Object.keys(ItemTypes).map((key) => [key, null]));
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [modalPreFilter, setModalPreFilter] = useState(null);
    const [selectedItemsState, setSelectedItemsState] = useQueryParam("items", "");

    // TODO(vik) we should probably refactor the item encoding/decoding useEffects and just bind them here.
    useEffect(() => {
        // decode & fill the currently selected items from the query param
        // this should happen only once, when items load.
        // revisit in case we fetch items multiple times, as we would need a more rigid condition then...
        if (!items) {
            return;
        }
        const decodedItems = decodeItemNames();
        setSelectedItem(decodedItems);
    }, [items])

    useEffect(() => {
        // sync the query param to the current "selected items" state
        // we don't want ot be updating the query param when items aren ot fully loaded
        if (!items) {
            return;
        }
        setSelectedItemsState(encodeItemNames())
    }, [selectedItems])

    const targetEl = document.getElementById('defaultModal');
    const _openModal = (slotConfig) => {
        setSelectedSlot(slotConfig.type);
        targetEl.classList.remove('hidden');
        targetEl.classList.add('flex');
    };

    const decodeItemNames = () => {
        if (!selectedItemsState || selectedItemsState.length == 0) {
            return {}
        }
        const jsonString = atob(selectedItemsState);
        const parsed = JSON.parse(jsonString);
        for (const [slot, name] of Object.entries(parsed)) {
            if(slot && name) {
                parsed[slot] = items ? items.find((itm) => itm.name == name) : null;
            }
            console.log(slot, name);
            console.log(parsed[slot]);
        }
        return parsed
    }

    const encodeItemNames = () => {
        var simplifiedMap = {}
        for (var key in selectedItems) {
            if (selectedItems.hasOwnProperty(key) && selectedItems[key] !== null) {
                simplifiedMap[key] = selectedItems[key].name;
            }
        }
        return btoa(JSON.stringify(simplifiedMap));
    }

    const closeModal = (event) => {
        if (event && event.target !== event.currentTarget) {
            return
        }
        setSelectedSlot(null);
        targetEl.classList.remove('flex');
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
        setSelectedItem({ ...selectedItems, [selectedSlot]: newItem });
        setModalPreFilter(null);
        closeModal();
    };

    const clearSlot = (event, slotConfig) => {
        event.stopPropagation();
        setSelectedItem({ ...selectedItems, [slotConfig.type]: null });
    }

    return (
        <div className="flex flex-col max-w-screen-sm max-h-screen m-8 border-8 border-green-600">

            <Modal
                className="fade-up "
                id={"defaultModal"}
                closeModalFunction={closeModal}>
                <div className="flex flex-row justify-center">
                    {error && <p>Error loading equipment data.</p>}
                    {!items && <p>Loading...</p>}
                    {items && <Search items={items} preFilter={modalPreFilter} updateSelectedItem={updateSelectedItem} />}
                </div>
            </Modal>
            <div className=" flex flex-grow-[2]
                            justify-between">
                <div className="flex flex-col items-center ml-10">
                    <EquipmentSlot slotConfig={new EquipmentSlotConfig({ type: ItemTypes.helmet })}
                        currentItem={selectedItems.helmet}
                        fnSearch={searchForItem} fnClearSlot={clearSlot} />
              {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.cloak})}
                    currentItem={selectedItems.cloak}  
                    fnSearch={searchForItem} fnClearSlot={clearSlot}       
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.armour})}
                    currentItem={selectedItems.armour}  
                    fnSearch={searchForItem} fnClearSlot={clearSlot}       
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.gloves})}
                    currentItem={selectedItems.gloves}  
                    fnSearch={searchForItem} fnClearSlot={clearSlot}       
                />}
                {items && <EquipmentSlot 
                    slotConfig={new EquipmentSlotConfig({type: ItemTypes.boots})}
                    currentItem={selectedItems.boots}  
                    fnSearch={searchForItem} fnClearSlot={clearSlot}       
                />}
                </div>
                <div className="flex flex-col items-center mr-10">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.amulet}) } currentItem={selectedItems.amulet} fnSearch={searchForItem} fnClearSlot={clearSlot} />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.ringLeft}) } currentItem={selectedItems.ringLeft} fnSearch={searchForItem} fnClearSlot={clearSlot} />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: ItemTypes.ringRight}) } currentItem={selectedItems.ringRight} fnSearch={searchForItem} fnClearSlot={clearSlot} />
              
                </div>

            </div>
            <div className="flex-none justify-center">
            </div>
            <div className="flex flex-1 justify-between">
                <div className="flex items-center m-10">
                    {items && <EquipmentSlot
                        slotConfig={new EquipmentSlotConfig({ type: ItemTypes.meleMain })}
                        currentItem={selectedItems.meleMain}
                        fnSearch={searchForItem} fnClearSlot={clearSlot}
                    />}
                    {items && <EquipmentSlot
                        slotConfig={new EquipmentSlotConfig({ type: ItemTypes.meleOffHand })}
                        currentItem={selectedItems.meleOffHand}
                        fnSearch={searchForItem} fnClearSlot={clearSlot}
                    />}
                </div>
                <div className="flex items-center mr-10">
                    <EquipmentSlot slotConfig={new EquipmentSlotConfig({ type: ItemTypes.rangedMain })} currentItem={selectedItems.rangedMain} fnSearch={searchForItem} fnClearSlot={clearSlot} />
                    <EquipmentSlot slotConfig={new EquipmentSlotConfig({ type: ItemTypes.rangedOffHand })} currentItem={selectedItems.rangedOffHand} fnSearch={searchForItem} fnClearSlot={clearSlot} />
                </div>
            </div>
        </div>
    );
};

const EquipmentSlot = ({ slotConfig, currentItem, fnSearch, fnClearSlot }) => {
    if (!currentItem) {
        return (
            <div className="relative h-28 w-28 border-2 m-2 p-2 border-gray-500" onClick={() => fnSearch(slotConfig)}>
                <p className="text-gray-500">{slotConfig.type}</p>
            </div>
        );
    }
    return (
        <div
            style={{ '--image-url': `url(${currentItem.imgUrl ? currentItem.imgUrl : ""})` }}
            className=" group 
                        bg-contain bg-[image:var(--image-url)]
                        relative h-28 w-28
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
