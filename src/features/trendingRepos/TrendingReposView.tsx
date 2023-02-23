import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useState } from "react"
import { useApi } from "../../ApiContext"
import { Language, RepositoriesResponse } from "./models"

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
    const [isFavouritesOnly, setFavouritesOnly] = useState(false)
    const { favouriteReposIds, toggleRepo } = useFavouriteRepos()
    const [languageFilters, setLanguageFilters] = useState<Language | undefined>(undefined)
    const { items, isLoading } = useTrendingRepos(languageFilters)


    return (
        <>
            <h1>Trending Repos View</h1>
            <div>
                <label>
                    Show only Favourites
                    <input
                        type="checkbox"
                        checked={isFavouritesOnly}
                        onChange={() => setFavouritesOnly(prev => !prev)}
                    />
                </label>
            </div>
            <div>
                <select
                    defaultValue="all"
                    value={languageFilters}
                    onChange={e => setLanguageFilters(e.target.value as Language)}
                >
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                    <option value="golang">Go Lang</option>
                    <option value={undefined}>Show All</option>
                </select>
            </div>
            { isLoading ? "Loading..." : (
                <ol>
                    {items
                        .filter(repository => isFavouritesOnly ? favouriteReposIds.includes(`${repository.id}`) : true)
                        .map(repository => (
                            <li key={repository.id}>
                                <h3>
                                    <a href={repository.html_url}>
                                        {repository.full_name}
                                    </a>
                                    {" "}
                                    {repository.stargazers_count} stars
                                </h3>
                                <p>
                                    {repository.description}
                                </p>
                                <p>
                                    (lang: {repository.language})
                                </p>
                                <label>
                                    Favourite
                                    <input
                                        type="checkbox"
                                        onChange={() => toggleRepo(`${repository.id}`)}
                                        checked={favouriteReposIds.includes(`${repository.id}`)}
                                    />
                                </label>
                            </li>
                        ))
                    }
                </ol>
            )}
        </>
    )
}

export default TrendingReposView
