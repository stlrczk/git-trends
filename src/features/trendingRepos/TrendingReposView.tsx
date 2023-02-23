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
    const [favouriteReposIds, setFavouriteReposIds] = useState(
        window.localStorage.getItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY)?.split(",") || []
    )
    const addRepo = (id: string) => {
        if (favouriteReposIds.includes(id)) {
            return
        }
        const newState = [...favouriteReposIds, id]
        setFavouriteReposIds(newState)
        window.localStorage.setItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY, newState.join(","))
    }

    const removeRepo = (id: string) => {
        if (!favouriteReposIds.includes(id)) {
            return
        }
        const newState = favouriteReposIds.filter(repoId => repoId !== id)
        setFavouriteReposIds(newState)
        window.localStorage.setItem(FAVOURITE_REPOS_LOCAL_STORAGE_KEY, newState.join(","))
    }
    const toggleRepo = (id: string) => {
        console.log({ id })
        if (favouriteReposIds.includes(id)) {
            removeRepo(id)
        } else {
            addRepo(id)
        }
    }

    return {
        favouriteReposIds,
        addRepo,
        removeRepo,
        toggleRepo
    }
}


function TrendingReposView() {
    const { items } = useTrendingRepos()
    const { favouriteReposIds, toggleRepo } = useFavouriteRepos()
    const [isFavouritesOnly, setFavouritesOnly] = useState(false)

    return (
        <>
            <h1>Trending Repos View</h1>
            <label>
                Show only Favourites
                <input
                    type="checkbox"
                    checked={isFavouritesOnly}
                    onChange={() => setFavouritesOnly(prev => !prev)}
                />
            </label>
            <ol>
                {items
                    .filter(repository => isFavouritesOnly ? favouriteReposIds.includes(`${repository.id}`) : true)
                    .map(repository => (
                        <li key={repository.id}>
                            {repository.full_name}
                            <input
                                type="checkbox"
                                onChange={() => toggleRepo(`${repository.id}`)}
                                checked={favouriteReposIds.includes(`${repository.id}`)}
                                />
                        </li>
                    ))
                }
            </ol>
        </>
    )
}

export default TrendingReposView
