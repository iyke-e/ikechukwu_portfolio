import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const configFilePath = path.join(process.cwd(), "src", "data", "admin-config.json");
const envLocalPath = path.join(process.cwd(), ".env.local");

interface AdminConfig {
  password?: string;
  securityQuestion?: string;
  securityAnswer?: string;
  updatedAt?: string;
}

async function getAdminSecurityConfig(): Promise<{
  password: string;
  question: string;
  answer: string;
}> {
  let fileConfig: AdminConfig = {};

  try {
    const raw = await fs.readFile(configFilePath, "utf-8");
    fileConfig = JSON.parse(raw);
  } catch {
    fileConfig = {};
  }

  // Priority: 1. Runtime config file, 2. Process environment variables, 3. Default fallback
  const password =
    fileConfig.password || process.env.ADMIN_PASSWORD || "iyke2026";
  const question =
    fileConfig.securityQuestion ||
    process.env.ADMIN_SECURITY_QUESTION ||
    "What is your secret studio recovery phrase or favorite engineering language?";
  const answer =
    fileConfig.securityAnswer || process.env.ADMIN_SECURITY_ANSWER || "typescript";

  return { password, question, answer };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || "login";
    const { password, question, answer } = await getAdminSecurityConfig();

    // ACTION 1: Login Verification
    if (action === "login") {
      const inputPasscode = (body.password || "").trim();

      if (!inputPasscode) {
        return NextResponse.json(
          { success: false, error: "Admin password cannot be blank." },
          { status: 400 }
        );
      }

      // Check if password matches
      if (inputPasscode === password) {
        return NextResponse.json(
          { success: true, message: "Authentication successful." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: "Incorrect admin password. Please try again or use the recovery option below.",
        },
        { status: 401 }
      );
    }

    // ACTION 2: Get Security Question (Without revealing answer)
    if (action === "get-question") {
      return NextResponse.json(
        {
          success: true,
          question,
        },
        { status: 200 }
      );
    }

    // ACTION 3: Verify Security Question & Reset Password
    if (action === "reset-password") {
      const inputAnswer = (body.answer || "").trim().toLowerCase();
      const newPassword = (body.newPassword || "").trim();

      if (!inputAnswer) {
        return NextResponse.json(
          { success: false, error: "Please enter your answer to the security question." },
          { status: 400 }
        );
      }

      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json(
          {
            success: false,
            error: "New password must be at least 4 characters in length.",
          },
          { status: 400 }
        );
      }

      // Compare normalized answer (also allow standard developer answers if default)
      const expectedAnswer = answer.trim().toLowerCase();
      const isMatch =
        inputAnswer === expectedAnswer ||
        (expectedAnswer === "typescript" &&
          (inputAnswer === "ts" || inputAnswer === "react native" || inputAnswer === "iyke"));

      if (!isMatch) {
        return NextResponse.json(
          {
            success: false,
            error: "Incorrect security answer. Please check your answer and try again.",
          },
          { status: 401 }
        );
      }

      // Answer matches: Save new password to admin-config.json
      const updatedConfig: AdminConfig = {
        password: newPassword,
        securityQuestion: question,
        securityAnswer: answer,
        updatedAt: new Date().toISOString(),
      };

      await fs.writeFile(
        configFilePath,
        JSON.stringify(updatedConfig, null, 2),
        "utf-8"
      );

      // Also update .env.local if present
      try {
        const envContent = await fs.readFile(envLocalPath, "utf-8");
        const updatedEnv = envContent.replace(
          /^ADMIN_PASSWORD=.*/m,
          `ADMIN_PASSWORD=${newPassword}`
        );
        await fs.writeFile(envLocalPath, updatedEnv, "utf-8");
      } catch {
        // Continue even if .env.local rewrite fails
      }

      return NextResponse.json(
        {
          success: true,
          message: "Admin password successfully updated! You can now log in.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Invalid authentication action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin auth API error:", error);
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}
