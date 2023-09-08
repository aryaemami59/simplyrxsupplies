// Categories
type CategoryName =
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

type OldCategories = {
  readonly [K in CategoryName]: {
    readonly id: number;
    readonly itemIds: number[];
    readonly name: K;
  };
};

// Vendors
type VendorHelper = {
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

type OldVendors = {
  readonly [K in VendorName]: {
    readonly id: number;
    readonly officialName: VendorHelper[K];
    readonly abbrName: K;
    readonly link: string;
    readonly joinChars: string;
    readonly itemIds: number[];
  };
};

export type Vendor = OldVendors[VendorName];

// Items
export type Item = {
  readonly id: number;
  readonly name: string;
  readonly itemNumber: string;
  readonly keywords: string[];
  /** Can be an empty array. */
  readonly category: number[] | [];
  readonly vendors: number[];
  readonly src: string;
};
/**
 * The new Supplies type after the api transformation.
 */
export type Supplies = {
  readonly items: Item[];
  readonly vendors: Vendor[];
  readonly categories: Category[];
};

// Additional Types
// TODO: Once the api field vendors and categories change to contain ids, this type can be disposed of.
export type OldItem = Omit<Item, "vendors" | "category"> & {
  readonly vendors: VendorName[];
  readonly category: CategoryName[];
};

// TODO: Once the api field vendors and categories change to contain ids, this type can be disposed of.
export type OldSupplies = {
  readonly items: OldItem[];
  readonly vendors: OldVendors;
  readonly categories: OldCategories;
};

export type ItemNameAndKeywords = Pick<Item, "id" | "keywords" | "name">;
