// Categories
export type CategoryName =
  | "BD Syringes"
  | "Caps"
  | "CardioCheck and A1C"
  | "Equipment"
  | "FLAVORx"
  | "Immunization Supplies"
  | "Liquid Bottles"
  | "Neighborhood Technician Smocks"
  | "Paper"
  | "Pharmacist Coats"
  | "PPE"
  | "ReliOn Insulin Syringes"
  | "ReliOn Novolin Flexpens"
  | "ReliOn Novolin Vials"
  | "ReliOn Pen Needles"
  | "RX Bags"
  | "Supercenter Technician Smocks"
  | "Vials";

export type Category = {
  readonly id: number;
  readonly itemIds: number[];
  readonly name: CategoryName;
};

export type Categories = {
  readonly [K in CategoryName]: {
    readonly id: number;
    readonly itemIds: number[];
    readonly name: K;
  };
};

// Vendors
export type VendorHelper = {
  readonly MCK: "McKesson";
  readonly OI: "OrderInsite";
  readonly GNFR: "GNFR";
  readonly SOC: "Sign Order Catalog";
  readonly VS: "VaxServe";
  readonly MS: "MCK MedSurge";
  readonly COV: "Covap";
  readonly FORS: "FORS";
};

export type VendorName = keyof VendorHelper;

export type OfficialVendorName = VendorHelper[VendorName];

export type Vendors = {
  readonly [K in VendorName]: {
    readonly id: number;
    readonly officialName: VendorHelper[K];
    readonly abbrName: K;
    readonly link: string;
    readonly joinChars: string;
    readonly itemIds: number[];
  };
};

export type Vendor = Vendors[VendorName];

// Items
export type Item = {
  readonly id: number;
  readonly name: string;
  readonly itemNumber: string;
  readonly keywords: string[];
  readonly category: CategoryName[];
  vendors: number[];
  // readonly vendors: VendorName[];
  readonly src: string;
};

export type Items = Item[];

export type Supplies = {
  readonly items: Items;
  readonly vendors: Vendors;
  readonly categories: Categories;
};

// Additional Types
export type VendorAndItemName = {
  itemName: string;
  vendorName: VendorName;
};

export type VendorObject = Record<
  VendorName,
  Vendors[VendorName] & {
    readonly itemIds: number[];
    itemsAdded: string[];
    minimizedItemIds: number[];
    qrContent: string;
    qrText: string;
  }
>;

export type SingleItemObject = Item & {
  // vendorsToAdd: VendorName[];
  // vendorsAdded: VendorName[];
  // keywords: string[];
};

export type ItemNamesAndKeywords = Omit<Item, "src">;

// const element: VendorObject = {}
