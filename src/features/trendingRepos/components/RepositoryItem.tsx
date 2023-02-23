import { Repository } from "../models";

type Props = {
    repository: Repository
    isFavourite: boolean
    handleFavouriteClick: () => void
}

function RepositoryItem({
    repository,
    isFavourite,
    handleFavouriteClick
}: Props) {
    return (
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
                    onChange={handleFavouriteClick}
                    checked={isFavourite}
                />
            </label>
        </li>
    )
}

export default RepositoryItem