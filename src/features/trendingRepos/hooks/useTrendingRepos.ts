import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useApi } from "../../../ApiContext"
import { Language, RepositoriesResponse } from "../models"
import subDays from "date-fns/subDays"
import format from "date-fns/format"

function useTrendingRepos(language?: Language | "all") {
    const api = useApi()
    const trendingReposQuery = useQuery({
        queryKey: ["trendingRepos", language],
        queryFn: async () => {
            const createdAtDate = format(subDays(new Date(), 7), "yyyy-MM-dd")
            const response = await api?.get(
                `https://api.github.com/search/repositories?q=created:%3E${createdAtDate}${language && language !== "all" ? `+language:${language}` : ""}&sort=stars&order=desc`
            ) as AxiosResponse<RepositoriesResponse>
            return response?.data || null
        }
    })

    return {
        items: trendingReposQuery.data?.items || [],
        isLoading: trendingReposQuery.isLoading,
        isFetching: trendingReposQuery.isFetching,
    }
}

export default useTrendingRepos
