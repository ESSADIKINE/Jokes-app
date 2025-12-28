import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch("https://v2.jokeapi.dev/info")
        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        return NextResponse.json({ error: true }, { status: 500 })
    }
}
