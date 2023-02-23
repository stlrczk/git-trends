import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { createContext, useContext } from "react";

const ApiContext = createContext<Api | undefined>(undefined)

interface Api {
    get: (url: string, config?: AxiosRequestConfig) => unknown
}

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: process.env.NODE_ENV === 'test' ? false : 3
        }
    }
})

type Props = {
    children: React.ReactNode,
    api?: Api
}

export function ApiProvider({ children, api }: Props) {
    return (
        <ApiContext.Provider value={api}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </ApiContext.Provider>
    )
}

export function useApi() {
    return useContext(ApiContext)
}