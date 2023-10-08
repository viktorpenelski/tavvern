
export const ItemTypes = {
    helmet: "helmet",
    meleMain: "meleMain",
    meleOffHand: "meleOffHand",
    rangedMain: "rangedMain",
    rangedOffHand: "rangedOffHand",
    cloak: "cloak",
    armour: "armour",
    gloves: "gloves",
    boots: "boots",
    amulet: "amulet",
    ringLeft: "ringLeft",
    ringRight: "ringRight",
}

const meleeMartialWeapons = {
    oneHanded: ["flail", "morningstar", "rapier", "scimitar", "shortsword", "warpick"],
    versatile: ["battleaxe", "longsword", "trident", "warhammer"],
    twoHanded: ["glaive", "greataxe", "greatsword", "halberd", "maul", "pike"]
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
    helmet: new Set(["helmet", "medium helmet", "heavy helmet", "light helmet"]),
    meleMain: new Set([...meleeMartialWeapons.oneHanded, ...meleeMartialWeapons.versatile, ...meleeMartialWeapons.twoHanded, ...meleSimpleWeapons.oneHanded, ...meleSimpleWeapons.versatile, ...meleSimpleWeapons.twoHanded]),
    meleOffHand: new Set(["shield", ...meleeMartialWeapons.oneHanded, ...meleSimpleWeapons.oneHanded]),
    rangedMain: new Set([...rangedMartialWeapons.oneHanded, ...rangedMartialWeapons.twoHanded, ...rangedSimpleWeapons.twoHanded]),
    rangedOffHand: new Set([...rangedMartialWeapons.oneHanded, ...rangedSimpleWeapons.oneHanded]),
    cloak: new Set(["cloak"]),
    armour: new Set(["armour", "medium armour", "heavy armour", "light armour"]),
    gloves: new Set(["gloves", "medium gloves", "heavy gloves", "light gloves"]),
    boots: new Set(["boots", "medium boots", "heavy boots", "light boots"]),
    amulet: new Set(["amulet"]),
    ringLeft: new Set(["ring"]),
    ringRight: new Set(["ring"]),
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