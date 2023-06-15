declare module "react-mobile-share" {
  declare function shareOnMobile(
    data: {
      text?: string;
      url?: string;
      title: string;
      images?: string[];
    },
    fallbackFunction?: (message: string) => string
  ): void;
}
