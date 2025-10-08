import type { Simplify } from "./tsHelpers.js"

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
  /**
   * References {@linkcode Category.name | categoryName}
   * Can be any of {@linkcode CategoryName}.
   */
  readonly name: CategoryName
}

// Vendors
type OfficialVendorNameLookup = {
  readonly MCK: "McKesson"
  readonly OI: "OrderInsite"
  readonly GNFR: "GNFR"
  readonly SOC: "Sign Order Catalog"
  readonly VS: "VaxServe"
  readonly MS: "MCK MedSurge"
  readonly COV: "Covap"
  readonly FORS: "FORS"
}

export type AbbrVendorNames = Simplify<keyof OfficialVendorNameLookup>

export type OfficialVendorName = OfficialVendorNameLookup[AbbrVendorNames]

export type Vendor = Simplify<
  {
    [AbbrVendorName in AbbrVendorNames]: {
      /**
       * Can be any of {@linkcode AbbrVendorNames}.
       */
      readonly abbrName: AbbrVendorName
      /**
       * Can be any of {@linkcode OfficialVendorName}.
       */
      readonly officialName: OfficialVendorNameLookup[AbbrVendorName]
    }
  }[AbbrVendorNames] & {
    /**
     * References {@linkcode Vendor.id | vendorId}.
     */
    readonly id: number
    readonly joinChars: string
    readonly link: string
    /**
     * References {@linkcode Vendor.itemIds | vendorItemIds}.
     */
    readonly itemIds: number[]
  }
>

export type Vendors = {
  readonly [AbbrVendorName in AbbrVendorNames]: Extract<
    Vendor,
    { abbrName: AbbrVendorName }
  >
}

// Items
export type Item = {
  /**
   * References {@linkcode Item.id | itemId}
   */
  readonly id: number
  readonly itemNumber: string
  readonly keywords: string[]
  readonly name: string
  /**
   * Can be an empty array.
   */
  readonly categoryIds: number[] | []
  readonly vendorIds: number[]
  readonly src: string
}

export type Supplies = {
  readonly categories: Category[]
  readonly items: Item[]
  readonly vendors: Vendor[]
}

export type ItemNameAndKeywords = Pick<Item, "id" | "keywords" | "name">
