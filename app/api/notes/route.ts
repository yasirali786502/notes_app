import { SupabaseAdmin } from "@/lib/SupabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { data, error } = await SupabaseAdmin.from("notes").select("*");

    if(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const { title, content } = await req.json();

    if(!title || !content) {
        return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const { data, error } = await SupabaseAdmin.from("notes").insert({ title, content }).select("*").single();
    
    if(error) { 
        return NextResponse.json({ error: error.message }, { status: 500 }); 
    }

    return NextResponse.json(data, { status: 201 });
}