import { render, screen } from '@testing-library/react';
import TrendingReposView from './TrendingReposView';
import { ApiProvider } from '../../ApiContext';

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

        render(
            <ApiProvider api={{
                get: () => apiResponse
            }}>
                <TrendingReposView />
            </ApiProvider>
        );

        const listItems = await screen.findAllByRole("listitem");
        expect(listItems).toHaveLength(2)

        expect(await screen.findByText("test/Foo")).toBeVisible()
        expect(await screen.findByText("test/Bar")).toBeVisible()
    })
})
