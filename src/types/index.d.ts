declare module "react-mobile-share" {
  declare function shareOnMobile(
    data: {
      text?: string;
      url?: string;
      title: string;
      images?: string[];
    },
    fallbackFn?: (message: string) => string
  ): void;
}
