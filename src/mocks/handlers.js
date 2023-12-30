import { rest } from 'msw'
import { updateBookmarked } from '../redux/navbar'

export const handlers = [
    rest.get('/api/bookmarks/data', (req, res, ctx) => {
        return res(ctx.json())
    }),
    rest.post(`/api/bookmarks/update/${updateBookmarked.id}`, (req, res, ctx) => {
        return res()
    }),
]