import { Language } from "../models"

type Props = {
    isFavouriteOnlyActive: boolean
    onFavouriteCheckboxClick: () => void
    setLanguageFilters: (language?: Language) => void
    languageFilters: Language | undefined
}

function Filters({
    isFavouriteOnlyActive,
    onFavouriteCheckboxClick,
    setLanguageFilters,
    languageFilters
}: Props) {
    return (
        <>
            <div>
                <label>
                    Show only Favourites
                    <input
                        type="checkbox"
                        checked={isFavouriteOnlyActive}
                        onChange={onFavouriteCheckboxClick}
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
        </>
    )
}

export default Filters