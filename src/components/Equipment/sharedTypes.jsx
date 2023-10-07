
export const ItemTypes = {
    head: "head",
    meleMain: "meleMain",
    meleOffHand: "meleOffHand",
    rangedMain: "rangedMain",
    rangedOffHand: "rangedOffHand",
}

const meleeMartialWeapons = {
    oneHanded: ["flail", "morningstar", "rapier", "scimitar", "shortsword", "warpick"],
    versatile: ["battleaxe", "longsword", "trident" ,"warhammer"],
    twoHanded: ["glaive", "greataxe", "greatsword", "halberd", "maul","pike"]
}

const rangedMartialWeapons = {
    oneHanded: ["hand crossbow"],
    twoHanded: ["heavy crossbow", "longbow"]
}

const meleSimpleWeapons = {
    oneHanded: ["club", "dagger", "handaxe", "javelin", "light hammer", "mace", "sickle"],
    versatile: ["spear", "quarterstaff"],
    twoHanded: ["greatclub"]
}

const rangedSimpleWeapons = {
    oneHanded: [],
    twoHanded: ["light crossbow", "shortbow"]
}

export const ItemTypeMapping = {
    head: new Set(["head"]),
    meleMain: new Set([...meleeMartialWeapons.oneHanded, ...meleeMartialWeapons.versatile, ...meleeMartialWeapons.twoHanded, ...meleSimpleWeapons.oneHanded, ...meleSimpleWeapons.versatile, ...meleSimpleWeapons.twoHanded]),
    meleOffHand: new Set([...meleeMartialWeapons.oneHanded, ...meleSimpleWeapons.oneHanded]),
    rangedMain: new Set([...rangedMartialWeapons.oneHanded, ...rangedMartialWeapons.twoHanded, ...rangedSimpleWeapons.twoHanded]),
    rangedOffHand: new Set([...rangedMartialWeapons.oneHanded, ...rangedSimpleWeapons.oneHanded]),
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