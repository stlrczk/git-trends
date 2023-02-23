import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useState } from "react"
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

const FAVOURITE_REPOS_LOCAL_STORAGE_KEY = "favRepos"

function useFavouriteRepos() {
    const [favouriteRepos, setFavouriteRepos] = useState(
        window.localStorage.getItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY)?.split(",") || []
    )
    const addRepo = (id: string) => {
        if (favouriteRepos.includes(id)) {
            return
        }
        const newState = [...favouriteRepos, id]
        setFavouriteRepos(newState)
        window.localStorage.setItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY, newState.join(","))
    }

    const removeRepo = (id: string) => {
        if (!favouriteRepos.includes(id)) {
            return
        }
        const newState = favouriteRepos.filter(repoId => repoId !== id)
        setFavouriteRepos(newState)
        window.localStorage.setItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY, newState.join(","))
    }
    const toggleRepo = (id: string) => {
        console.log({ id })
        if (favouriteRepos.includes(id)) {
            removeRepo(id)
        } else {
            addRepo(id)
        }
    }

    return {
        favouriteRepos,
        addRepo,
        removeRepo,
        toggleRepo
    }
}


function TrendingReposView() {
    const { items } = useTrendingRepos()
    const { favouriteRepos, toggleRepo } = useFavouriteRepos()

    return (
        <>
            <h1>Trending Repos View</h1>
            <ol>
                {items.map(repository => (
                    <li key={repository.id}>
                        {repository.full_name}
                        <input
                            type="checkbox"
                            onChange={() => toggleRepo(`${repository.id}`)}
                            checked={favouriteRepos.includes(`${repository.id}`)}
                            />
                    </li>
                ))}
            </ol>
        </>
    )
}

export default TrendingReposView
