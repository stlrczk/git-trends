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
    const { items, isLoading, isFetching } = useTrendingRepos(languageFilters)


    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Trending Repos View</div>
                <div className="title-bar-controls">
                    <button onClick={() => window.location.href = "https://github.com"} aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body">
                <Filters
                    isFavouriteOnlyActive={isFavouritesOnly}
                    onFavouriteCheckboxClick={() => setFavouritesOnly(prev => !prev)}
                    setLanguageFilters={setLanguageFilters}
                    languageFilters={languageFilters}
                />
                { isLoading ? "Loading..." : (
                    <ol className="tree-view">
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
            </div>

            <div className="status-bar">
                <p className="status-bar-field">Status: {isFetching ? "fetching..." : "up do date"}</p>
            </div>
        </div>
    )
}

export default TrendingReposView
