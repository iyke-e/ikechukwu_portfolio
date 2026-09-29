import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const categoriesFilePath = path.join(process.cwd(), "src", "data", "categories.json");
const projectsFilePath = path.join(process.cwd(), "src", "data", "projects.json");

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

async function loadCategories(): Promise<CategoryItem[]> {
  try {
    const raw = await fs.readFile(categoriesFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Categories file not found or corrupted, returning empty:", err);
    return [];
  }
}

async function saveCategories(categories: CategoryItem[]): Promise<void> {
  await fs.writeFile(categoriesFilePath, JSON.stringify(categories, null, 2), "utf-8");
}

export async function GET() {
  try {
    const categories = await loadCategories();

    // Auto-discover any categories used in projects that might not be in categories.json yet
    try {
      const projRaw = await fs.readFile(projectsFilePath, "utf-8");
      const projects = JSON.parse(projRaw);
      const existingSlugs = new Set(categories.map((c) => c.slug.toLowerCase()));

      let updated = false;
      for (const p of projects) {
        if (p.category && !existingSlugs.has(p.category.toLowerCase())) {
          const autoSlug = p.category.toLowerCase().trim();
          const autoName = autoSlug
            .split("-")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

          categories.push({
            id: autoSlug,
            name: autoName,
            slug: autoSlug,
            description: `Projects classified under ${autoName}.`,
            icon: "folder",
          });
          existingSlugs.add(autoSlug);
          updated = true;
        }
      }

      if (updated) {
        await saveCategories(categories);
      }
    } catch {
      // Continue even if projects file check fails
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error reading categories:", error);
    return NextResponse.json({ error: "Failed to read categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const categories = await loadCategories();

    const name = (body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 });
    }

    const slug = (
      body.slug ||
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    ).toLowerCase();

    // Check if category slug already exists
    const existingIndex = categories.findIndex(
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
    );

    if (existingIndex >= 0) {
      // Update existing
      categories[existingIndex] = {
        ...categories[existingIndex],
        name,
        description: body.description || categories[existingIndex].description,
        icon: body.icon || categories[existingIndex].icon || "folder",
      };
      await saveCategories(categories);
      return NextResponse.json(
        { message: "Category updated", category: categories[existingIndex], categories },
        { status: 200 }
      );
    }

    const newCategory: CategoryItem = {
      id: slug,
      name,
      slug,
      description: body.description || `Projects categorized under ${name}.`,
      icon: body.icon || "folder",
    };

    categories.push(newCategory);
    await saveCategories(categories);

    return NextResponse.json(
      { message: "Category created successfully", category: newCategory, categories },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || searchParams.get("id");

    if (!slug) {
      return NextResponse.json({ error: "Category slug/id is required" }, { status: 400 });
    }

    const categories = await loadCategories();
    const targetSlug = slug.toLowerCase();

    // Check if any project is actively using this category
    try {
      const projRaw = await fs.readFile(projectsFilePath, "utf-8");
      const projects = JSON.parse(projRaw);
      const inUseCount = projects.filter(
        (p: { category?: string }) => p.category?.toLowerCase() === targetSlug
      ).length;

      if (inUseCount > 0) {
        return NextResponse.json(
          {
            error: `Cannot delete category "${slug}" because it is currently assigned to ${inUseCount} project(s). Reassign them first.`,
          },
          { status: 400 }
        );
      }
    } catch {
      // Continue if projects check fails
    }

    const filtered = categories.filter((c) => c.slug.toLowerCase() !== targetSlug && c.id !== targetSlug);
    await saveCategories(filtered);

    return NextResponse.json(
      { message: `Category "${slug}" removed`, categories: filtered },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
