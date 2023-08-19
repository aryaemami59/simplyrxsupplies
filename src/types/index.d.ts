declare module "react-mobile-share" {
  function shareOnMobile(
    data: {
      text?: string;
      url?: string;
      title: string;
      images?: string[];
    },
    fallbackFunction?: (message: string) => string
  ): void;
}

// export type IndexOf<T extends readonly unknown[]> = Extract<
//   keyof T,
//   `${number}`
// > extends `${infer N extends number}`
//   ? N
//   : never;
