export type Repository = {
    id: number
    full_name: string
}

export type RepositoriesResponse = {
    items: Repository[]
}