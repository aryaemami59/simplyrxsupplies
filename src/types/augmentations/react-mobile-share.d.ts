declare module "react-mobile-share" {
  function shareOnMobile(
    data: {
      text?: string
      url?: string
      title: string
      images?: string[]
    },
    fallbackFunction?: (message: string) => string,
  ): void
}
