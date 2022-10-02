import { AsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../Redux/store";

export type ItemObjType = {
  readonly id: number;
  readonly name: ItemName;
  readonly itemNumber: ItemNumber;
  readonly keywords: Keyword[];
  readonly nav: Category[];
  readonly vendors: vendorNameType[];
  readonly src: Src;
  vendorsToAdd: vendorNameType[];
  vendorsAdded: vendorNameType[];
};

type singleVendorObjType = {
  id: number;
  officialName: officialVendorNameType;
  abbrName: vendorNameType;
  link: Link;
  joinChars: JoinChars;
  items: number[];
};

export type vendorsObjType = Record<vendorNameType, singleVendorObjType>;

export type categoriesObjType = Record<
  Category,
  { id: number; items: number[] }
>;

type VendorsInAddedState = Partial<Record<vendorNameType, ItemObjType[]>>;

export type addedState = VendorsInAddedState & {
  listItems: ItemObjType[];
  compact: boolean;
  showItemNumber: boolean;
  showItemBarcode: boolean;
  showItemName: boolean;
  vendorsIsLoading: boolean;
  navListIsLoading: boolean;
  errMsg: string;
  vendorsArr?: vendorNameType[];
  vendorsObj?: vendorsObjType;
  navsArr?: Category[];
  navsObj?: categoriesObjType;
};

export type itemState = Partial<Record<ItemName, ItemObjType>> & {
  itemsArr: ItemObjType[];
  isLoading: boolean;
  errMsg: string;
};
// &
// {
//   [key in ItemName]?: ItemObjType;
// };

// type ItemObjInItemState = Partial<Record<ItemName, ItemObjType>>;

export type ItemName = ItemNamesType;
export type ItemNumber = string;
export type Keyword = string;
export type Category = CategoryType;
export type Src = string;
export type Link = string;
export type JoinChars = string;

export type vendorNameType =
  | "OI"
  | "GNFR"
  | "SOC"
  | "VS"
  | "MS"
  | "COV"
  | "FORS";

export type officialVendorNameType =
  | "McKesson"
  | "OrderInsite"
  | "GNFR"
  | "Sign Order Catalog"
  | "VaxServe"
  | "MCK MedSurge"
  | "Covap"
  | "FORS";

type CategoryType =
  | "Vials"
  | "Caps"
  | "Liquid Bottles"
  | "Paper"
  | "FLAVORx"
  | "Immunization Supplies"
  | "PPE"
  | "BD Syringes"
  | "ReliOn Novolin Vials"
  | "ReliOn Novolin Flexpens"
  | "ReliOn Insulin Syringes"
  | "ReliOn Pen Needles"
  | "RX Bags"
  | "Neighborhood Technician Smocks"
  | "Supercenter Technician Smocks"
  | "Pharmacist Coats"
  | "Equipment"
  | "CardioCheck and A1C";

type ItemNamesType =
  | "10 Dram Vials"
  | "13 Dram Vials"
  | "30 Dram Vials"
  | "40 Dram Vials"
  | "60 Dram Vials"
  | "Small Caps"
  | "Large Caps"
  | "2 oz Liquid Bottles"
  | "4 oz Liquid Bottles"
  | "6 oz Liquid Bottles"
  | "8 oz Liquid Bottles"
  | "12 oz Liquid Bottles"
  | "16 oz Liquid Bottles"
  | "STR Paper"
  | "RX Drop-Off Barcodes"
  | "Staples"
  | "Labels For RX Vials (Neighborhood)"
  | "Labels For RX Vials (SuperCenter)"
  | "Adapter Caps For 1 OZ FlavoRX Bottles"
  | "Adapter Caps For 4 OZ FlavoRX Bottles"
  | "Monoject 1 ml Oral Syringes Used For FlavoRX"
  | "EasyPoint Safety Needles 25g x 5/8"
  | "EasyPoint Safety Needles 25g x 1"
  | "Nitrile Small Exam Gloves MCK brand"
  | "Nitrile Small Exam Gloves CareMates Brand 50 Count"
  | "Nitrile Small Exam Gloves CareMates Brand 100 Count"
  | "Nitrile Medium Gloves CareMates Brand 50 Count"
  | "Nitrile Medium Exam Gloves CareMates Brand 100 Count"
  | "Nitrile Large Gloves CareMates Brand 50 Count"
  | "Nitrile Large Exam Gloves CareMates Brand 100 Count"
  | "Nitrile XLarge Exam Gloves CareMates Brand 100 Count"
  | "Nebulizers"
  | "Nebulizer Tubing"
  | "Nebulizer Adult Mask"
  | "Nebulizer Pediatric Mask"
  | "DisposeRX"
  | "FlavoRX Bitterness Suppressor 4 OZ"
  | "FlavoRX Strawberry 4 OZ"
  | "FlavoRX Banana 4 OZ"
  | "FlavoRX Grape 4 OZ"
  | "FlavoRX Orange 4 OZ"
  | "FlavoRX Sweetening Enhancer 4 OZ"
  | "FlavoRX Mango 4 OZ"
  | "FlavoRX Apple 4 OZ"
  | "FlavoRX Cherry 4 OZ"
  | "FlavoRX Watermelon 4 OZ"
  | "FlavoRX Rasberry 4 OZ"
  | "FlavoRX Bubblegum 4 OZ"
  | "FlavoRX Chocolate 4 OZ"
  | "FlavoRX Lemon Oil 4 OZ"
  | "Black Stapler"
  | 'VanishPoint Syringes 3mL (25G x 1")'
  | 'VanishPoint Syringes 3mL (25G x 5/8")'
  | 'VanishPoint Syringes 3mL (25G x 1.5")'
  | 'VanishPoint Syringes 1mL (25G x 5/8")'
  | 'VanishPoint Syringes 1mL (25G x 1")'
  | "Flents Ear Loop Masks"
  | "MuellerKold Instant Cold Pack"
  | "1 ML BD Syringes 20G x 1"
  | "1 ML BD Syringes 26G x 5/8"
  | "3 ML BD Syringes 18G x 1.5"
  | "3 ML BD Syringes 20G x 1"
  | "3 ML BD Syringes 20G x 1.5"
  | "3 ML BD Syringes 21G x 1"
  | "3 ML BD Syringes 21G x 1.5"
  | "3 ML BD Syringes 22G x 3/4"
  | "3 ML BD Syringes 22G x 1"
  | "3 ML BD Syringes 22G x 1.5"
  | "3 ML BD Syringes 23G x 1"
  | "3 ML BD Syringes 23 G x 1.5"
  | "3 ML BD Syringes 25 G x 5/8"
  | "3 ML BD Syringes 25G x 1"
  | "3 ML BD Syringes 25G x 1.5"
  | "3 ML BD Syringes 26G x 5/8"
  | "5 ML BD Syringes 20G x 1"
  | "5 ML BD Syringes 20G x 1.5"
  | "5 ML BD Syringes 21G x 1"
  | "5 ML BD Syringes 21G x 1.5"
  | "5 ML BD Syringes 22G x 1"
  | "5 ML BD Syringes 22G x 1.5"
  | "10 ML BD Syringes 20G x 1"
  | "10 ML BD Syringes 20G x 1.5"
  | "10 ML BD Syringes 21G x 1"
  | "10 ML BD Syringes 21G 1.5"
  | "10 ML BD Syringes 22G x 1"
  | "MCK Alcohol Prep Pads"
  | "ReliOn Novolin N Vial"
  | "ReliOn Novolin R Vial"
  | "ReliOn Novolin 70/30 Vial"
  | "ReliOn Novolin N Flexpen"
  | "ReliOn Novolin R Flexpen"
  | "ReliOn Novolin 70/30 Flexpen"
  | 'ReliOn Insulin Syringes 31 G X 6mm(15/64") 1 mL(Green Stripes)'
  | 'ReliOn Insulin Syringes 31 G X 6mm(15/64") 1/2 mL(Blue strips)'
  | 'ReliOn Insulin Syringes 31 G X 6mm(15/64") 3/10 mL(Purple Strips)'
  | 'ReliOn Insulin Syringes 31 G X 8mm(5/16") 1 mL(Green Stripes)'
  | 'ReliOn Insulin Syringes 31 G X 8mm(5/16") 1/2 mL(Blue Stripes)'
  | 'ReliOn Insulin Syringes 31 G X 8mm(5/16") 3/10 mL(Purple Stripes)'
  | "ReliOn Pen Needles 31 G X 6 mm(Red Stripes)"
  | "ReliOn Pen Needles 31 G X 8 mm(Blue Stripes)"
  | "ReliOn Pen Needles 32 G X 4 mm(Green Stripes)"
  | "1 ML Oral Syringes"
  | "5 ML Oral Syringes"
  | "10 ML Oral Syringes"
  | "Oral Syringe Adapters"
  | "7 Day Pill Boxes"
  | "Yellow Paper"
  | "Third Party Signature Pad"
  | "RX Prescription Phone Pad"
  | "Pharmacy Storage Box For EODs"
  | "Record Storage Box"
  | "Thin Rubber Bands"
  | "Thick Rubber Bands"
  | "Labels For RX Vials"
  | "Transfer Prescription Pads"
  | "Office Permanent Black Markers"
  | "Shredder Oil"
  | "RX Thank You Cards"
  | "Teal Clinical Service Cards"
  | "Small RX Bags"
  | "Large RX Bags"
  | "Right Hand Counting Tray"
  | "Left Hand Counting Tray"
  | "HIPAA Acknowledgment Pad"
  | "EOD Labels"
  | "Counting Spatula"
  | "Anti Fatigue Mats 4 Pack 24X24"
  | "Pill Bay Shelf 7X16"
  | "Will Call Bags"
  | "Sticky Notes"
  | "Business Cards"
  | "Tempalert Sensor Replacement"
  | "Tempalert High Gain Cell Antenna"
  | "RX Will Call Label Kit 200 Pack Blue 180 to 199"
  | "RX Will Call Label Kit 200 Pack Blue 160 to 179"
  | "RX Will Call Label Kit 200 Pack Blue 140 to 159"
  | "RX Will Call Label Kit 200 Pack Blue 120 to 139"
  | "RX Will Call Label Kit 200 Pack Blue 100 to 119"
  | "RX Will Call Label Kit 200 Pack Blue 80 to 99"
  | "RX Will Call Label Kit 200 Pack Blue 60 to 79"
  | "RX Will Call Label Kit 200 Pack Blue 40 to 59"
  | "RX Will Call Label Kit 200 Pack Blue 20 to 39"
  | "RX Will Call Label Kit 200 Pack Blue 1 to 19"
  | "Location Cards"
  | "X Small Neighborhood Female Technician Coats"
  | "X Small Supercenter Female Technician Coats"
  | "Small Neighborhood Female Technician Coats"
  | "Small Supercenter Female Technician Coats"
  | "Medium Neighborhood Female Technician Coats"
  | "Medium Supercenter Female Technician Coats"
  | "Large Neighborhood Female Technician Coats"
  | "Large Supercenter Female Technician Coats"
  | "1X Large Neighborhood Female Technician Coats"
  | "1X Large Supercenter Female Technician Coats"
  | "2X Large Neighborhood Female Technician Coats"
  | "2X Large Supercenter Female Technician Coats"
  | "3X Large Neighborhood Female Technician Coats"
  | "3X Large Supercenter Female Technician Coats"
  | "4X Large Neighborhood Female Technician Coats"
  | "4X Large Supercenter Female Technician Coats"
  | "5X Large Neighborhood Female Technician Coats"
  | "5X Large Supercenter Female Technician Coats"
  | "6X Large Neighborhood Female Technician Coats"
  | "6X Large Supercenter Female Technician Coats"
  | "Small Neighborhood Male Technician Coats"
  | "Small Supercenter Male Technician Coats"
  | "Medium Neighborhood Male Technician Coats"
  | "Medium Supercenter Male Technician Coats"
  | "Large Neighborhood Male Technician Coats"
  | "Large Supercenter Male Technician Coats"
  | "1X Large Neighborhood Male Technician Coats"
  | "1X Large Supercenter Male Technician Coats"
  | "2X Large Neighborhood Male Technician Coats"
  | "2X Large Supercenter Male Technician Coats"
  | "3X Large Neighborhood Male Technician Coats"
  | "3X Large Supercenter Male Technician Coats"
  | "4X Large Neighborhood Male Technician Coats"
  | "4X Large Supercenter Male Technician Coats"
  | "5X Large Neighborhood Male Technician Coats"
  | "5X Large Supercenter Male Technician Coats"
  | "6X Large Neighborhood Male Technician Coats"
  | "6X Large Supercenter Male Technician Coats"
  | "X Small Female Pharmacist Coats"
  | "Small Female Pharmacist Coats"
  | "Medium Female Pharmacist Coats"
  | "Large Female Pharmacist Coats"
  | "1X Large Female Pharmacist Coats"
  | "2X Large Female Pharmacist Coats"
  | "3X Large Female Pharmacist Coats"
  | "4X Large Female Pharmacist Coats"
  | "5X Large Female Pharmacist Coats"
  | "6X Large Female Pharmacist Coats"
  | "Small Male Pharmacist Coats"
  | "Medium Male Pharmacist Coats"
  | "Large Male Pharmacist Coats"
  | "1X Large Male Pharmacist Coats"
  | "2X Large Male Pharmacist Coats"
  | "3X Large Male Pharmacist Coats"
  | "4X Large Male Pharmacist Coats"
  | "5X Large Male Pharmacist Coats"
  | "6X Large Male Pharmacist Coats"
  | "White Paper"
  | "Hazardous Waste Bags"
  | "Shipping Envelope Bubble for RX Delivery (4x8) 250 Pack"
  | "Shipping Envelope Bubble for RX Delivery (8.5x12) 100 Pack"
  | "Oxivir Wipes"
  | "Black Office Pens 12PK"
  | "Will Call Dividers"
  | "RX GPS Charger"
  | "Nitrile Gloves Small"
  | "Nitrile Gloves Medium"
  | "Nitrile Gloves Large"
  | "Nitrile Gloves X-Large"
  | "Holder For Bags Under The Counter 12 Inch"
  | "RX Bag Holder For Under The Counter 24 Inch"
  | "Vacuum Cleaner"
  | "Vacuum Cleaner Bags"
  | "Vacuum Cleaner Belt"
  | "Silver Stapler"
  | "Staples For Silver Stapler"
  | "Scissors"
  | "paper clips"
  | "Folders"
  | "Immunization Cart"
  | "Thermometer"
  | "Shipping Tape"
  | "Pill Bay Station"
  | "Debit Reader Charger"
  | "TC70X Battery Charger"
  | "Blue Pens"
  | "First-Aid Band Aids"
  | "Register Receipt Paper"
  | "Face Masks 500 Count"
  | "Face Masks 2000 Count"
  | 'Kelly"s 1 Gallon Hand Sanitizer'
  | "2 Gallon Refillable Hand Soap"
  | "Hand Soap Dispenser"
  | "Shredder"
  | "Form Dispensing Log"
  | "RX Mobile Medicine Storage Refrigerated System"
  | "RX Immunization Refrigerated Replenishment Kit"
  | "Alcohol Swabs"
  | "Opioid Pamphlets"
  | "Pharmacy HazWaste Sticker Compliance"
  | "Holiday Hours Flipbook – Pharmacy Only"
  | "LEP Interpreter Services Flipbook Compliance"
  | "Remote Order Review Poster Compliance"
  | "Pharmacist on Break Compliance"
  | "Health & Wellness Compliance Hotline"
  | "Pharmacist Counseling Compliance TX"
  | "Medicare Rights Compliance"
  | "Prescription to OTC Circle Flags"
  | "Notice to HMO Patients Compliance TX"
  | "Temporary Closing Poster"
  | "Pharmacy Complaint Poster Compliance TX"
  | "Drop Off/Pick Up/Consultation Wall Mount (Gray Walls)"
  | "Pharmacy Tension Barriers Black"
  | "Fresh Utility Pickup/Consultation Goosenecks"
  | "ADA Compliance Notice"
  | "Rx Name & Hour Board Replacement Letters"
  | "LEP Compliance"
  | "Pharmacy Color Change Stop Entry Signs"
  | "New Drop off/Pickup/Consult Hanging"
  | "Pill Cap Dispenser Blue"
  | "Pill Bay Spanner Blue"
  | "Rx IMZ/Flu Standee Bil"
  | "Rx IMZ/Flu Table Tent Bil"
  | "Rx IMZ/Flu Wing Panel Bil"
  | "Rx IMZ/Flu Yard Sign Bil"
  | "RX Name and Hours Board Gray"
  | "Immunizations You May Need Tearpad Eng/Bil"
  | "Wellness Screening Event"
  | "Wellness Screening Event -Spanish"
  | "Doctor on Demand Signing"
  | "Pharmacy Naloxone Sign"
  | "Looking For A New Pharmacy Handouts SC"
  | "Looking For A New Pharmacy Handouts NHM"
  | "2018 Health Service Room Wall Sign"
  | "High Hispanic Pharmacy Diabetic Brochure"
  | "High Hispanic Pharmacy Cart Topper"
  | "H&W Signature Pad"
  | "Healthcare Begins Here Backdrop Stickers"
  | "ADA Notice Compliance"
  | "Take Care of Your Heart Event Kit"
  | "Immunizations You May Need Tear Pads"
  | "Specialty Magnet"
  | "Specialty Pharmacy Brochure"
  | "Specialty Pharmacy Magnet"
  | "FY20 National DEA Drug Take Back Day"
  | "FY20 National DEA Drug Take Back Day - Inventory"
  | "Rx Opioid Prescription Pamphlet Arabic"
  | "Rx Opioid Prescription Pamphlet Burmese"
  | "Rx Opioid Prescription Pamphlet Chinese (Simplified)"
  | "Rx Opioid Prescription Pamphlet Chinese (Traditional)"
  | "Rx Opioid Prescription Pamphlet Farsi"
  | "Rx Opioid Prescription Pamphlet French"
  | "Rx Opioid Prescription Pamphlet Haitian Creole"
  | "Rx Opioid Prescription Pamphlet Korean"
  | "Rx Opioid Prescription Pamphlet Polish"
  | "Rx Opioid Prescription Pamphlet Portuguese"
  | "Rx Opioid Prescription Pamphlet Punjabi"
  | "Rx Opioid Prescription Pamphlet Russian"
  | "Rx Opioid Prescription Pamphlet Somali"
  | "Rx Opioid Prescription Pamphlet Swahili"
  | "Rx Opioid Prescription Pamphlet Vietnamese"
  | "Rx IMZ/Flu Bottomer BIL"
  | "Specialty Pharmacy Mousepad"
  | "Pet Meds Signing"
  | "Pet Meds Buckslip"
  | "Non-Healthcare Begins Here (HCBH)"
  | "WK51 Walmart Wellness Day Pre-Event Kit"
  | "Post Enrollment Campaign - BIL"
  | "Post Enrollment Campaign - ENG"
  | "Pharmacy Curbside Pickup A-Frame Sign Kit (English)"
  | "Pharmacy Curbside Pickup A-Frame Sign Kit (Spanish)"
  | "FY21 Immunization & Flu Update"
  | "Specialty Pharmacy Doctor Detail Presentation Folders"
  | "FY22 DEA Drug Take Back Event"
  | "H&W Pamphlet"
  | "FY22 Diabetes ReliOn Mod Update"
  | "FY22 Walk-in Covid Signage"
  | "Controlled Substance ID Compliance FL Eng"
  | "Adacel Vaccine (PFS)"
  | "Adacel Vaccine (Vials)"
  | "Boostrix Vaccine (PFS)"
  | "Havrix Vaccine (PFS)"
  | "Heplisav-B Vaccine (PFS)"
  | "IMOVAX Vaccine (1 Single Dose Vial)"
  | "IPOL Vaccine (1 Ten Dose Vial)"
  | "Inject-Safe Barrier Bandages"
  | "Super Sani-Cloth Wipes"
  | "eGlucose Test Strips (Yellow)"
  | "Cholesterol+Glucose Test Strips (Green)"
  | "Multi-Chemistry Control Solution"
  | "30 µL Capillary Tubes (Green)"
  | "40 µL Capillary Tubes (Black)"
  | "Tongue Depressor"
  | "Measurement Tape"
  | "MCK Prevent Lancets 21G x 1.8mm"
  | "Digital Thermometer"
  | "Digital Scale"
  | "Lipid Panel+eGlucose Test Strips (Black)"
  | "A1CNow Test Kit (4 Count)"
  | "Blood Pressure Monitor"
  | 'White Magnetic Shelf Divider 6" Deep X 2" High'
  | 'White Magnetic Shelf Divider 6" Deep X 3" High'
  | "Magnetic Shelf Dividers 7 X 2"
  | "Magnetic Shelf Dividers 7 X 3"
  | 'White Magnetic Shelf Divider 9" Deep X 2" High'
  | 'White Magnetic Shelf Divider 9" Deep X 3" High'
  | 'White Magnetic Shelf Divider 12" Deep X 2" High'
  | 'White Magnetic Shelf Divider 12" Deep X 3" High'
  | "Bostitch Stapling Plier Stapler"
  | "Bostitch Staples"
  | "Bostitch Desk Stapler"
  | "Double Fold File Folders"
  | "Extra Depth Double Fold File Folders"
  | "Super Extra Depth Double Fold File Folders"
  | "Vial Cap Opener"
  | "Heavy Duty Vial Cap Opener"
  | "ZD620 Desktop Printer"
  | "Cisco 7962 IP Phone"
  | "TC70x Handheld";

export type addItemsInterface = {
  itemObj: ItemObjType;
  vendors: vendorNameType[];
};

export type addItemsByVendorInterface = {
  itemObj: ItemObjType;
  vendorName: vendorNameType;
};

export type FetchItems = AsyncThunk<
  ItemObjType[],
  void,
  { dispatch: AppDispatch }
>;

export type FetchVendors = AsyncThunk<
  vendorsObjType,
  void,
  { dispatch: AppDispatch }
>;

export type FetchNavList = AsyncThunk<
  categoriesObjType,
  void,
  { dispatch: AppDispatch }
>;
