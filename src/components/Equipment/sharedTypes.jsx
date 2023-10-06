
export const ItemTypes = {
    head: "head",
    meleMain: "meleMain",
    meleOffHand: "meleOffHand",
    rangedMain: "rangedMain",
    rangedOffHand: "rangedOffHand",
}


export class EquipedItem {
    constructor(options) {
        this.img = options.img;
        this.name = options.name;
        this.wikiUrl = options.wikiUrl;
        this.type = options.type;
        this.rearity = options.rearity;
        this.properties = options.properties;
        this.description = options.description || "";
        this.flavorText = options.flavorText || "";
        this.locationAct = options.locationAct || "";
        this.location = options.location || "";
        this.locationCoordinates = options.locationCoordinates || "";
    }
}

export class EquipmentSlotConfig {
    constructor(options) {
        this.type = options.type;
    }
}