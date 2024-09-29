import connectDB from "../../lib/db";
import { NextResponse } from "next/server";
import Entry from "../../model/timeWaste";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    await connectDB();

    try {
        const body = await req.json();

        if (!body.date || !body.network || !body.person || !body.time) {
            return NextResponse.json({ data: null, error: ["Faltan campos obligatorios"] });
        }

        const newEntry = new Entry(body);
        await newEntry.save();

        return NextResponse.json({ data: newEntry, error: [] });
    } catch (error) {
        return NextResponse.json({ data: null, error: ["Hubo un error inesperado"] });
    }
}

export const GET = async () => {
    await connectDB();

    try {
        const entries = await Entry.find({});
        console.log(entries)

        return NextResponse.json({ data: entries, error: [] });
    } catch (error) {
        return NextResponse.json({ data: null, error: ["Hubo un error inesperado"] });
    }
}