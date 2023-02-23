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
            <h4>
                <a href={repository.html_url}>
                    {repository.full_name}
                </a>
            </h4>
            <details open>
                <summary>
                    Description
                </summary>
                <p>
                    {repository.description}
                </p>
            </details>
                <p>
                    lang: {repository.language},
                    stars: {repository.stargazers_count}
                </p>
                <fieldset>
                    <input
                        type="checkbox"
                        onChange={handleFavouriteClick}
                        id={`favourite-${repository.id}`}
                        checked={isFavourite}
                    />
                    <label htmlFor={`favourite-${repository.id}`}>
                        Favourite
                    </label>
                </fieldset>
        </li>
    )
}

export default RepositoryItem