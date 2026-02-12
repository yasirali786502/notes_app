import { SupabaseAdmin } from "@/lib/SupabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }:{ params: Promise<{id: string}> } 
) {
    const { id } = await params;

    const {data, error} = await SupabaseAdmin
    .from("notes")
    .delete()
    .eq("id", id)
    .select()
    .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 200 });
    
}