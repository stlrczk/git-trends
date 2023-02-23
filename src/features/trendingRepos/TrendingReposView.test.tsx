import { render, screen, within } from '@testing-library/react';
import TrendingReposView from './TrendingReposView';
import { ApiProvider } from '../../ApiContext';

const apiResponse = {
    data: {
        items: [{
            id: 1,
            full_name: "test/Foo"
        }, {
            id: 2,
            full_name: "test/Bar"
        }]
    }
}

const View = () => (
    <ApiProvider api={{
        get: () => apiResponse
    }}>
        <TrendingReposView />
    </ApiProvider>
)

describe("Trending Repos View", () => {
    test("renders view header", () => {
        render(
            <ApiProvider>
                <TrendingReposView />
            </ApiProvider>
            );
        const header = screen.getByRole("heading");

        expect(header).toHaveTextContent("Trending Repos View")
    })

    test('renders empty list', () => {
      render(
        <ApiProvider>
            <TrendingReposView />
        </ApiProvider>
      );
      const list = screen.getByRole("list");
      expect(list).toBeEmptyDOMElement();
    });

    test("render full names of repositories returned by api", async () => {
        render(<View />);

        const listItems = await screen.findAllByRole("listitem");
        expect(listItems).toHaveLength(2)

        expect(await screen.findByText("test/Foo")).toBeVisible()
        expect(await screen.findByText("test/Bar")).toBeVisible()
    })

    test("renders empty checkboxes for not-fav repos", async () => {
        render(<View />)

        const listItems = await screen.findAllByRole("listitem");

        listItems.forEach(item => {
            const checkbox = within(item).queryByRole("checkbox")
            expect(checkbox).not.toBeChecked()
        })
    })

    test("renders checked checkboxes for favourite repo", async () => {
        window.localStorage.setItem("favRepos", "1,2")
        render(<View />)

        const listItems = await screen.findAllByRole("listitem");

        listItems.forEach(item => {
            const checkbox = within(item).queryByRole("checkbox")
            expect(checkbox).toBeChecked()
        })
        window.localStorage.removeItem("favRepos")
    })

    test("change checkbox state to checked on fav click", async () => {
        render(<View />)

        const listItems = await screen.findAllByRole("listitem");

        listItems.forEach(item => {
            const checkbox = within(item).queryByRole("checkbox")
            expect(checkbox).not.toBeChecked()
            checkbox?.click()
            expect(checkbox).toBeChecked()
        })
    })
})
