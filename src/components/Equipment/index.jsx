import { type } from "@testing-library/user-event/dist/type";

const Equipment = () => {
    return (
        // center the div using tailwing in the middle of the page
        <div className="lg:col-start-2 col-span-1 border-indigo-800">
            <h1 className="text-2xl font-bold">Equipment</h1>
            <div className="flex flex-row justify-center">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: Types.head}) } />
            </div>
            <div className="flex float-left flex-col justify-center">
                    <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: Types.meleOffHand}) } />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: Types.meleOffHand}) } />
            </div>
            <div className="flex float-right flex-col justify-right">
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: Types.rangedMain}) } />
                <EquipmentSlot slotConfig={new EquipmentSlotConfig({type: Types.rangedOffHand}) } />
            </div>
        </div>
    );
};

const Types = {
    head: "head",
    meleMain: "meleMain",
    meleOffHand: "meleOffHand",
    rangedMain: "rangedMain",
    rangedOffHand: "rangedOffHand",
}

class EquipmentSlotConfig {
    constructor(options) {
        this.type = options.type;
    }
}

class EquipedItem {
    constructor(options) {
        this.img = options.img;
        this.name = options.name;
        this.rearity = options.rearity;
        this.description = options.description || "";
        this.flavorText = options.flavorText || "";
        this.location = options.location || "";
    }
}

const EquipmentSlot = ({slotConfig, currentItem}) => {
    if (!currentItem) {
        return (
            <div className="relative h-32 w-32 border-2 m-2 p-2 border-gray-500">
                <p className="text-gray-500">{slotConfig.type}</p>
            </div>
        );
    }
    return (
        <div className="flex h-32 w-32 border-2 border-gray-500">
            <p className="text-gray-500">{currentItem.name}</p>
        </div>
    );
};


export default Equipment;