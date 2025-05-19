import type { RenderOptions, queries } from "@testing-library/react"
import { screen } from "@testing-library/react"
import type { AsyncRenderFn } from "@testing-library/react-render-stream"
import {
  createRenderStream,
  disableActEnvironment,
} from "@testing-library/react-render-stream"
import { userEvent } from "@testing-library/user-event"
import type { FC, ReactElement } from "react"
import { Provider } from "react-redux"
import App from "../../App.js"
import { endpoints } from "../../redux/apiSlice.js"
import type { AppStore, RootState } from "../../redux/store.js"
import { setupStore } from "../../redux/store.js"
import type { Supplies } from "../../types/api.js"
import type {
  PartialObjectProperties,
  PropsWithRequiredChildren,
  UnknownObject,
  WritableDeep,
} from "../../types/tsHelpers.js"
import { capitalize } from "../../utils/capitalize.js"

disableActEnvironment()

const { render } = createRenderStream()

export const setupWithNoUI = async (
  options: SetupWithNoUIOptions = {},
): Promise<SetupWithNoUIResults> => {
  const { fetch = true } = options

  const store = setupStore()

  if (fetch) {
    await store.dispatch(endpoints.getMain.initiate())
  }

  const initialState = store.getState()

  return { store, initialState }
}

export type ByRole = {
  [K in keyof typeof queries]: K extends `${infer S extends string}ByRole`
    ? `${S}ByRole`
    : never
}[keyof typeof queries]

export type PickByRole = Pick<typeof queries, ByRole>

export type CustomQueries<T extends Parameters<typeof screen.getAllByRole>[0]> =
  {
    [K in ByRole as InsertRole<K, T>]: () => ReturnType<PickByRole[K]>
  }

export type InsertRole<
  K extends ByRole,
  T extends Parameters<typeof screen.getAllByRole>[0],
> = K extends `${infer U extends string}ByRole`
  ? `${U}` extends `${infer S extends string}All`
    ? `${S}All${Capitalize<T>}sByRole`
    : `${U}${Capitalize<T>}ByRole`
  : `${T}ByRole`

export const queryByRoleFactory = <
  T extends HTMLElement,
  P extends Parameters<typeof screen.getAllByRole<T>>[0] = Parameters<
    typeof screen.getAllByRole<T>
  >[0],
>(
  role: P,
  options: Parameters<typeof screen.getAllByRole<T>>[1],
): CustomQueries<P> => {
  const args = [role, options] as const
  const capitalizedRole = capitalize(role)
  const customQueries: CustomQueries<P> = {
    [`get${capitalizedRole}ByRole` as const]: () =>
      screen.getByRole<T>(...args),
    [`getAll${capitalizedRole}sByRole` as const]: () =>
      screen.getAllByRole<T>(...args),
    [`query${capitalizedRole}ByRole` as const]: () =>
      screen.queryByRole<T>(...args),
    [`queryAll${capitalizedRole}sByRole` as const]: () =>
      screen.queryAllByRole<T>(...args),
    [`find${capitalizedRole}ByRole` as const]: async () =>
      screen.findByRole<T>(...args),
    [`findAll${capitalizedRole}sByRole` as const]: async () =>
      screen.findAllByRole<T>(...args),
  } as CustomQueries<P>
  return customQueries
}

export type UserEvent = ReturnType<typeof userEvent.setup>

export type UserEventOptions = NonNullable<
  Parameters<typeof userEvent.setup>[0]
>

/**
 * This type extends the default options for render from `RTL`, as well as
 * allows the user to specify other things such as `initialState`, `store`.
 */
export type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>
  store?: AppStore
  fetch?: boolean
} & Omit<RenderOptions, "queries">

/**
 * A wrapper for {@linkcode render}
 * @param [ui] - Component to render.
 * @param [extendedRenderOptions] - Options object.
 * @param [userEventOptions] - Options object for user event.
 * @returns An object with the store and all of `RTL`'s query functions
 */
export const renderWithProviders = async (
  ui: ReactElement = <App />,
  extendedRenderOptions: ExtendedRenderOptions = {},
  userEventOptions?: UserEventOptions,
): Promise<ExtendedRenderResult> => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    fetch = true,
    ...renderOptions
  } = extendedRenderOptions
  if (fetch) {
    await store.dispatch(endpoints.getMain.initiate())
  }

  const user = userEvent.setup(userEventOptions)

  const Wrapper: FC<PropsWithRequiredChildren> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  )

  const renderResult = await render(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  })

  // Return an object with the store and all of `RTL`'s query functions
  return {
    store,
    user,
    ...renderResult,
  } satisfies ExtendedRenderResult
}

export type ExtendedRenderResult = Awaited<ReturnType<AsyncRenderFn>> & {
  store: AppStore
  user: UserEvent
}

export type NewSuppliesSample = PartialObjectProperties<Supplies>

export const newSuppliesSample = {
  items: [
    {
      id: 0,
      name: "10 Dram Vials",
      itemNumber: "09670503346",
      keywords: [
        "amber",
        "ten",
        "09670503346",
        "mck",
        "mckesson",
        "orderinsite",
        "oi",
      ],
      categoryIds: [0],
      vendorIds: [0, 1],
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAABwCAYAAADfR9ioAAAAAXNSR0IArs4c6QAABnVJREFUeF7tnb8vfE0UxkdJiUShEY1So0NNTUGCWkEkEko/QikhEQo1CoU/QI1WoqNRSHS0lN6cu3v2Pffs3Nn7fdnNu9/9bMPunZ05c+aZ5zznzO7dru/v7+/AAw9UPdAFIMCC9QCAAA85DwAIAAEgwECxB2AI0AFDgAEYAgyU9AAho6SjOqUZgOiUlS45z9KA6OrqyrqUwqb8rwVOfV2vyV/bVp/b9rY4avtSm/W1VD+xfr0NsTF9n74f+7yordppfWH9YP0U80uRH71PfRG5yC/W577v2BxS2AAQVQDHQAogEtCBISrO8Yzod61nDxiCkJELrQACQAAIS5OIyoo3VHDCEDAEgIAhKqm4fcAQVZokZBAyahujqLDiC1kUpuIFPgpTkaJQqlLoq5qximlRdTLl7KJ+KUxRmKoVn2IagMKUAQiVSiqVOb4AEAACQJgTXnUGZxlVT8AQMAQMAUMUpxkwBAwBQ8AQMESqMEYdgjpE7eSSLMORBRoCDYGGQEOgIdAQJe8gQ8ggZBAyCBmEDEIGISP31UQAASAAhK03lb0LHaISUYmoRFQiKtEQaAg0BBqi8r0Ie2DF/SGqGglRWbnnA4AAEDBERDJySyFuKZTPJgkZhAyLCBgChoAhxANkGfGaEwwBQ8AQMESiIo2oRFQiKtEQhRSBhkBDoCHQEGiIurv3k3aSdmYe4OcRitkh8w9ZBlkGWQZZBlkG96ks9xPvhAzSTtJO0k7STtJO8xnSVJ5ByCBkEDIIGYQMQgYhI/9js6SdpJ05VgAQAAJAVH+W22smsozIb5Vz2slpJ6ed6YPOin847eS0k9NOTjs57STLIMsgyyDL+PcrekU/HstH6PgIXe6GIAACQAAIJ6IpTFGYyn3bHUAACACBqKyc9sY0EwwBQ8AQMAQMkTGhrUgW/c9H6H7hI3QlDspo8hd4oPRp518wV6ZQwgMAooSTOqkJgOik1S4xVwBRwkmd1ARAdNJql5grgCjhpE5q0jRAfH19hfX19XB2dpb5c3l5ORwdHYXu7u7seaPrugj39/dhYmIiezo6Ohqurq7CyMhI2N/fD9vb23VrZcdpNMbl5WVYXFzM9bG3txe2trZqr9lxpqamgrynr68vu/78/Bzm5ubC4+NjnX3ywsfHR1hYWAg3Nze1/u7u7sL4+Hid3dpWLtgxtKG1w/vyNwHbNEDIBOQhztWFGRwcjD6Xdra9dYIAIuagmBN8Hykb1PEvLy85ANh+Zdzb29sakKW/t7e3HLBT7b2NMhfpo2jBBSy9vb3h5OSkBjoFioDIAvU3QWD7agogZOesra2F4+PjbDfLQ5yxsrKS7XB5+Ov+PfJ8d3c355yUE2LvT9kgdsnCFAFCF0IWQXe0MsLp6Wl0l6cWXBnF26Svy1xXV1ez+VpApGxsBiiaAgi/syx1yy7o7++vW2y/AH/qCL97G9kgi5waI7a4StsXFxdZKPCPGMs1YhD1zeTkZBgbG8v5Ra8tLS1FAdhWgNCdp7vq4OAgXF9fB5n49PR05lCZqDpW47nGWHHuwMBAeHh4qOkQH9/VIbHdbBc7ZoOM6zWE1QgCiPPz8yw8fH5+1uyVeWkoVOZTjROL7VZneA2i79dxXl9fc4CQeQlrzM/Ph52dnZpWKdIhvwGQpjGEOG54eDhzqji+p6cnE5mKdi/IDg8PM/GlFC2AEACpiNRFtyBSB3g2sPogZUNsh6tmeXp6ymyfnZ0Nm5ubOTErfcYYwoZFDZV2DB9yPJB9mNTrQ0NDNd3SaIyfgqJpgBD1bnd0bBd7Z9n4KoDwjo8tfFG/uvv/qw3v7+9ZdhPLWoTlYoCw9B+7LvO1YcWHrBgghCFEXyjAyozxE1A0BRAxUdlIJPrFjsX3oteUhTQdLBJwjWywu090jiyqFZVK4XaBrPPLxHwF+szMTC4t94soQN7Y2MixqrQpM8b/DhBqtBgmMVgeEi407fQGy0KLxtDwEFvQGBOkdsuf2hBL72TxbNpbJu2MgVPn24juY4D1G6VRJvMTMMh7m8IQFslamEoVfIoKLbYoJX16MSXOSi2AL0ylbIj1rxSvBTBvpxel/rq3PyYqfdiMpdqp4thPAeDf3zRA/Lah9NcaDwCI1vi5bUYBEG2zVK0xFEC0xs9tMwqAaJulao2hAKI1fm6bUQBE2yxVawwFEK3xc9uMAiDaZqlaYyiAaI2f22aUfwCNCoyRpZSQEgAAAABJRU5ErkJggg==",
    },
  ],
  vendors: [
    {
      id: 0,
      officialName: "McKesson",
      abbrName: "MCK",
      link: "https://connect.mckesson.com/portal/site/smo/menuitem.87a0666be7398a3ece3ee6105740d0a0/?query=",
      joinChars: " OR ",
      itemIds: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
        56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
        74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 329,
      ],
    },
  ],
  categories: [
    {
      id: 0,
      itemIds: [0, 1, 2, 3, 4],
      name: "Vials",
    },
  ],
} satisfies NewSuppliesSample

export const unFreeze = <T extends UnknownObject>(object: T): WritableDeep<T> =>
  JSON.parse(JSON.stringify(object)) as WritableDeep<T>

export type SetupWithNoUIOptions = {
  /**
   * @default true
   */
  fetch?: boolean
}

export type SetupWithNoUIResults = {
  store: AppStore
  initialState: RootState
}
