export type Repository = {
    id: number
    full_name: string
    language: string
    stargazers_count: number
    html_url: string
    description: string
}

export type RepositoriesResponse = {
    items: Repository[]
}

export type Language = "javascript" | "python" | "golang"