import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useApi } from "../../ApiContext"
import { RepositoriesResponse } from "./models"

function useTrendingRepos() {
    const api = useApi()
    const trendingReposQuery = useQuery({
        queryKey: ["trendingRepos"],
        queryFn: async () => {
            const response = await api?.get("https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc") as AxiosResponse<RepositoriesResponse>
            return response?.data || null
        }
    })

    return {
        items: trendingReposQuery.data?.items || []
    }
}


function TrendingReposView() {
    const { items } = useTrendingRepos()

    return (
        <>
            <h1>Trending Repos View</h1>
            <ol>
                {items.map(repository => (
                    <li key={repository.id}>{repository.full_name}</li>
                ))}
            </ol>
        </>
    )
}

export default TrendingReposView
