import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const GET = withAuth(async function GET(_req: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
});

export const POST = withAuth(async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.name || !data.price || data.stock === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
        img: data.img,
        hoverImg: data.hoverImg,
        categories: data.categories,
        badge: data.badge,
        stock: parseInt(data.stock),
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
});

export const PATCH = withAuth(async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;
    
    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: updateData.name,
        description: updateData.description,
        price: parseFloat(updateData.price),
        originalPrice: updateData.originalPrice ? parseFloat(updateData.originalPrice) : null,
        img: updateData.img,
        hoverImg: updateData.hoverImg,
        categories: updateData.categories,
        badge: updateData.badge,
        stock: parseInt(updateData.stock),
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
});

export const DELETE = withAuth(async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
});
