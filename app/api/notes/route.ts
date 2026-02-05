import { SupabaseAdmin } from "@/lib/SupabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { data, error } = await SupabaseAdmin.from("notes").select("*");

    if(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}