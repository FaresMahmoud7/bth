import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ClientPartner from "@/models/ClientPartner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { nameAr, nameEn, row } = await req.json();
    await connectToDatabase();
    const partner = await ClientPartner.findByIdAndUpdate(id, { nameAr, nameEn, row }, { new: true });
    return NextResponse.json(partner);
  } catch {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    await ClientPartner.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
}

