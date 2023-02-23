import { useState } from "react"

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

export default useFavouriteRepos