import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useApi } from "../../../ApiContext"
import { Language, RepositoriesResponse } from "../models"

function useTrendingRepos(language?: Language) {
    const api = useApi()
    const trendingReposQuery = useQuery({
        queryKey: ["trendingRepos", language],
        queryFn: async () => {
            const response = await api?.get(
                `https://api.github.com/search/repositories?q=created:%3E2017-01-10${language ? `+language:${language}` : ""}&sort=stars&order=desc`
            ) as AxiosResponse<RepositoriesResponse>
            return response?.data || null
        }
    })

    return {
        items: trendingReposQuery.data?.items || [],
        isLoading: trendingReposQuery.isLoading,
    }
}

export default useTrendingRepos
