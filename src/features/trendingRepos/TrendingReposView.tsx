import { useState } from "react"

import Filters from "./components/Filters"
import { Language } from "./models"
import RepositoryItem from "./components/RepositoryItem"
import useTrendingRepos from "./hooks/useTrendingRepos"
import useFavouriteRepos from "./hooks/useFavouritesRepos"


function TrendingReposView() {
    const [isFavouritesOnly, setFavouritesOnly] = useState(false)
    const { favouriteReposIds, toggleRepo } = useFavouriteRepos()
    const [languageFilters, setLanguageFilters] = useState<Language | undefined>(undefined)
    const { items, isLoading } = useTrendingRepos(languageFilters)


    return (
        <>
            <h1>Trending Repos View</h1>
            <Filters
                isFavouriteOnlyActive={isFavouritesOnly}
                onFavouriteCheckboxClick={() => setFavouritesOnly(prev => !prev)}
                setLanguageFilters={setLanguageFilters}
                languageFilters={languageFilters}
            />
            { isLoading ? "Loading..." : (
                <ol>
                    {items
                        .filter(repository => isFavouritesOnly ? favouriteReposIds.includes(`${repository.id}`) : true)
                        .map(repository => (
                            <RepositoryItem
                                repository={repository}
                                isFavourite={favouriteReposIds.includes(`${repository.id}`)}
                                handleFavouriteClick={() => toggleRepo(`${repository.id}`)}
                            />
                        ))
                    }
                </ol>
            )}
        </>
    )
}

export default TrendingReposView
