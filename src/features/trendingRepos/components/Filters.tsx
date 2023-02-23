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
        <fieldset>
            <div className="field-row">
                    <input
                        type="checkbox"
                        id="foo"
                        checked={isFavouriteOnlyActive}
                        onChange={onFavouriteCheckboxClick}
                    />
                    <label htmlFor="foo">
                        Show only Favourites
                    </label>
            </div>
            <div className="field-row">
                <label>Languages:
                    <select
                        defaultValue="all"
                        value={languageFilters}
                        onChange={e => setLanguageFilters(e.target.value as Language)}
                    >
                        <option value="javascript">Javascript</option>
                        <option value="python">Python</option>
                        <option value="golang">Go Lang</option>
                        <option value="all">Show All</option>
                    </select>
                </label>
            </div>
        </fieldset>
    )
}

export default Filters