import type { Simplify } from "./tsHelpers.js"

// Categories

/**
 * A union of all valid category name strings used in the application.
 */
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

/**
 * Represents a product category that groups related {@linkcode Item}s.
 */
export type Category = {
  /**
   * The unique numeric identifier for this category.
   *
   * References {@linkcode Category.id | categoryId}.
   */
  readonly id: number

  /**
   * The list of {@linkcode Item.id | item IDs} that belong to this category.
   *
   * References {@linkcode Category.itemIds | categoryItemIds}.
   */
  readonly itemIds: number[]

  /**
   * The display name of the category.
   * Must be one of the {@linkcode CategoryName} union members.
   *
   * References {@linkcode Category.name | categoryName}.
   */
  readonly name: CategoryName
}

// Vendors

/**
 * A lookup map from abbreviated vendor codes to their official display names.
 */
type OfficialVendorNameLookup = {
  readonly COV: "Covap"
  readonly FORS: "FORS"
  readonly GNFR: "GNFR"
  readonly MCK: "McKesson"
  readonly MS: "MCK MedSurge"
  readonly OI: "OrderInsite"
  readonly SOC: "Sign Order Catalog"
  readonly VS: "VaxServe"
}

/**
 * The abbreviated (short-code) vendor name.
 * One of the keys of {@linkcode OfficialVendorNameLookup}.
 */
export type AbbrVendorNames = Simplify<keyof OfficialVendorNameLookup>

/**
 * The official display name of a vendor.
 * One of the values of {@linkcode OfficialVendorNameLookup}.
 */
export type OfficialVendorName = OfficialVendorNameLookup[AbbrVendorNames]

/**
 * Represents a vendor that supplies {@linkcode Item}s to the application.
 */
export type Vendor = Simplify<
  {
    /**
     * The unique numeric identifier for this vendor.
     *
     * References {@linkcode Vendor.id | vendorId}.
     */
    readonly id: number

    /**
     * The list of {@linkcode Item.id | item IDs} supplied by this vendor.
     *
     * References {@linkcode Vendor.itemIds | vendorItemIds}.
     */
    readonly itemIds: number[]

    /**
     * The string used to join parts of the vendor's item number when
     * constructing order identifiers.
     */
    readonly joinChars: string

    /**
     * The URL of the vendor's ordering portal or catalog page.
     */
    readonly link: string
  } & {
    [AbbrVendorName in AbbrVendorNames]: {
      /**
       * The abbreviated vendor code.
       * Can be any of {@linkcode AbbrVendorNames}.
       */
      readonly abbrName: AbbrVendorName

      /**
       * The official display name of the vendor.
       * Can be any of {@linkcode OfficialVendorName}.
       */
      readonly officialName: OfficialVendorNameLookup[AbbrVendorName]
    }
  }[AbbrVendorNames]
>

/**
 * A keyed map of all {@linkcode Vendor} records, indexed by their
 * {@linkcode AbbrVendorNames | abbreviated vendor name}.
 */
export type Vendors = {
  readonly [AbbrVendorName in AbbrVendorNames]: Extract<
    Vendor,
    { abbrName: AbbrVendorName }
  >
}

// Items

/**
 * Represents a purchasable supply item available from one or more vendors.
 */
export type Item = {
  /**
   * The list of {@linkcode Category.id | category IDs} this item belongs to.
   * Can be an empty array when the item is uncategorized.
   */
  readonly categoryIds: [] | number[]

  /**
   * The unique numeric identifier for this item.
   *
   * References {@linkcode Item.id | itemId}.
   */
  readonly id: number

  /**
   * The vendor-assigned item number or SKU used for ordering.
   */
  readonly itemNumber: string

  /**
   * A list of search keywords associated with the item, used to improve
   * search result relevance beyond the item name alone.
   */
  readonly keywords: string[]

  /**
   * The human-readable display name of the item.
   */
  readonly name: string

  /**
   * The URL or path to the item's image asset.
   */
  readonly src: string

  /**
   * The list of {@linkcode Vendor.id | vendor IDs} that supply this item.
   */
  readonly vendorIds: number[]
}

/**
 * The top-level shape of the API response containing all application data.
 */
export type Supplies = {
  /**
   * All product {@linkcode Category | categories} in the catalog.
   */
  readonly categories: Category[]

  /**
   * All purchasable {@linkcode Item | items} in the catalog.
   */
  readonly items: Item[]

  /**
   * All {@linkcode Vendor | vendors} that supply the items.
   */
  readonly vendors: Vendor[]
}

/**
 * A minimal projection of {@linkcode Item} containing only the fields
 * needed for search operations: {@linkcode Item.id | id},
 * {@linkcode Item.keywords | keywords}, and {@linkcode Item.name | name}.
 */
export type ItemNameAndKeywords = Simplify<
  Pick<Item, "id" | "keywords" | "name">
>
