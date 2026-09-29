import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "projects.json");

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const projects = JSON.parse(fileContent);

    const projectIndex = projects.findIndex((p: { id: string }) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Merge updates
    projects[projectIndex] = {
      ...projects[projectIndex],
      ...body,
      id, // Preserve ID
    };

    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Project updated successfully", project: projects[projectIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const fileContent = await fs.readFile(dataFilePath, "utf-8");
    const projects = JSON.parse(fileContent);

    const filtered = projects.filter((p: { id: string }) => p.id !== id);

    if (filtered.length === projects.length) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2), "utf-8");

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
