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
  | "Vials"

export type Category = {
  /**
   * References {@linkcode Category.id | categoryId}
   */
  readonly id: number
  /**
   * References {@linkcode Category.itemIds | categoryItemIds}
   */
  readonly itemIds: number[]
  readonly name: CategoryName
}

// Vendors
type VendorHelper = {
  readonly MCK: "McKesson"
  readonly OI: "OrderInsite"
  readonly GNFR: "GNFR"
  readonly SOC: "Sign Order Catalog"
  readonly VS: "VaxServe"
  readonly MS: "MCK MedSurge"
  readonly COV: "Covap"
  readonly FORS: "FORS"
}

export type AbbrVendorNames = keyof VendorHelper

export type OfficialVendorName = VendorHelper[AbbrVendorNames]

export type Vendor<VendorAbbrName extends AbbrVendorNames = AbbrVendorNames> = {
  /**
   * References {@linkcode Vendor.id | vendorId}.
   */
  readonly id: number
  readonly officialName: VendorHelper[VendorAbbrName]
  readonly abbrName: VendorAbbrName
  readonly link: string
  readonly joinChars: string
  /**
   * References {@linkcode Vendor.itemIds | vendorItemIds}.
   */
  readonly itemIds: number[]
}

export type Vendors = {
  readonly [AbbrVendorName in AbbrVendorNames]: Vendor<AbbrVendorName>
  // {
  //   /**
  //    * References {@linkcode ItemIdAndVendorId.vendorId | vendorId}.
  //    */
  //   readonly id: number
  //   readonly officialName: VendorHelper[AbbrVendorName]
  //   readonly abbrName: AbbrVendorName
  //   readonly link: string
  //   readonly joinChars: string
  //   /**
  //    * References {@linkcode Cart.itemIds | vendorItemIds}.
  //    */
  //   readonly itemIds: number[]
  // }
}

// export type Vendor = Vendors[VendorName]

// Items
export type Item = {
  /**
   * References {@linkcode Item.id | itemId}
   */
  readonly id: number
  readonly name: string
  readonly itemNumber: string
  readonly keywords: string[]
  /**
   * Can be an empty array.
   */
  readonly categoryIds: number[] | []
  readonly vendorIds: number[]
  readonly src: string
}

export type Supplies = {
  readonly items: Item[]
  readonly vendors: Vendor[]
  readonly categories: Category[]
}

export type ItemNameAndKeywords = Pick<Item, "id" | "keywords" | "name">
