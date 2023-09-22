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
  /** References categoryId */
  readonly id: number;
  /** References categoryItemIds */
  readonly itemIds: number[];
  readonly name: CategoryName;
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

type Vendors = {
  readonly [K in VendorName]: {
    /** References vendorId */
    readonly id: number;
    readonly officialName: VendorHelper[K];
    readonly abbrName: K;
    readonly link: string;
    readonly joinChars: string;
    /** References vendorItemIds */
    readonly itemIds: number[];
  };
};

export type Vendor = Vendors[VendorName];

// Items
export type Item = {
  /** References itemId */
  readonly id: number;
  readonly name: string;
  readonly itemNumber: string;
  readonly keywords: string[];
  /** Can be an empty array. */
  readonly categoryIds: number[] | [];
  readonly vendorIds: number[];
  readonly src: string;
};

export type Supplies = {
  readonly items: Item[];
  readonly vendors: Vendor[];
  readonly categories: Category[];
};

export type ItemNameAndKeywords = Pick<Item, "id" | "keywords" | "name">;
