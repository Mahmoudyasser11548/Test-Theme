// import { render } from "@testing-library/react"
import { server } from "../mocks/server"
import { rest } from "msw"
import { updateBookmarked } from "./navbar"

test("server wrong", async () => {
    server.use(
        rest.get("/api/bookmarks/data", (req, res, ctx) => {
            return res(ctx.status(500))
        }
        ),
        rest.post(`/api/bookmarks/update/${updateBookmarked.id}`, (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )
})

test("Not Found", async () => {
    server.use(
        rest.get("/api/bookmarks/data", (req, res, ctx) => {
            return res(ctx.status(404))
        }
        ),
        rest.post(`/api/bookmarks/update/${updateBookmarked.id}`, (req, res, ctx) => {
            return res(ctx.status(404))
        })
    )
})