import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import ClientPartner from "@/models/ClientPartner";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();
    const partners = await ClientPartner.find({}).sort({ createdAt: -1 });
    return NextResponse.json(partners);
  } catch {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { nameAr, nameEn, row, logoUrl, logoScale } = await req.json();
    await connectToDatabase();
    const partner = await ClientPartner.create({ nameAr, nameEn, row, logoUrl, logoScale });
    return NextResponse.json(partner);
  } catch {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
}
