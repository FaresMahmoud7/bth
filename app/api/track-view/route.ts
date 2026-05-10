import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import PageView from "@/models/PageView";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json().catch(() => ({}));
    const path = (body?.path as string) || "/";

    await PageView.create({ path });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PageView tracking error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
