import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "projects.json");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const projects = JSON.parse(fileContent);

    if (showAll) {
      return NextResponse.json(projects, { status: 200 });
    }

    // Default: Return only published projects
    const publishedProjects = projects.filter((p: { published?: boolean }) => p.published !== false);
    return NextResponse.json(publishedProjects, { status: 200 });
  } catch (error) {
    console.error("Error reading projects:", error);
    return NextResponse.json({ error: "Failed to read projects data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const projects = JSON.parse(fileContent);

    // If body is an array, replace entire dataset (bulk sync / reorder)
    if (Array.isArray(body)) {
      await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), "utf-8");
      return NextResponse.json({ message: "Projects updated successfully", projects: body }, { status: 200 });
    }

    // Otherwise, create a new project entry
    const newProject = {
      id: body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: body.name || "Untitled Project",
      category: body.category || "mobile",
      tagline: body.tagline || "",
      description: body.description || "",
      featured: body.featured ?? true,
      published: body.published ?? true,
      liveUrl: body.liveUrl || "",
      sourceUrl: body.sourceUrl || "",
      imageUrl: body.imageUrl || "/projectsimg/voice_of_the_east.png",
      tags: Array.isArray(body.tags) ? body.tags : (body.tags ? body.tags.split(",").map((s: string) => s.trim()) : []),
      projectType: Array.isArray(body.projectType) ? body.projectType : ["Mobile Apps"],
      accentColor: body.accentColor || "#10b981",
      role: body.role || "Lead Developer",
      duration: body.duration || "4 Weeks",
      status: body.status || "Active",
      teamSize: body.teamSize || "1 (Solo)",
      metrics: Array.isArray(body.metrics) ? body.metrics : [],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
    };

    // Prepend or append new project
    const updated = [newProject, ...projects];
    await fs.writeFile(dataFilePath, JSON.stringify(updated, null, 2), "utf-8");

    return NextResponse.json({ message: "Project created successfully", project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to save project data" }, { status: 500 });
  }
}
