"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiExternalLink,
  FiCheck,
  FiLock,
  FiUnlock,
  FiRefreshCw,
  FiArrowUpRight,
  FiArrowLeft,
  FiLayers,
  FiSmartphone,
  FiGlobe,
  FiGithub,
  FiServer,
  FiCpu,
  FiTrendingUp,
  FiCloud,
  FiMove,
  FiColumns,
  FiMinus,
  FiFolder,
  FiFolderPlus,
  FiX,
  FiMaximize2,
  FiAlignLeft,
} from "react-icons/fi";
import MediaUploader from "@/components/admin/MediaUploader";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  featured: boolean;
  published: boolean;
  liveUrl: string;
  sourceUrl: string;
  isPrivateRepo?: boolean;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  projectType: string[];
  accentColor?: string;
  role?: string;
  duration?: string;
  status?: string;
  teamSize?: string;
  metrics?: string[];
  highlights?: string[];
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [isVerifyingAuth, setIsVerifyingAuth] = useState(false);

  // Security Question Recovery Flow
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryQuestion, setRecoveryQuestion] = useState("");
  const [recoveryAnswer, setRecoveryAnswer] = useState("");
  const [newRecoveryPassword, setNewRecoveryPassword] = useState("");
  const [confirmRecoveryPassword, setConfirmRecoveryPassword] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoverySuccess, setRecoverySuccess] = useState("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isSubmittingRecovery, setIsSubmittingRecovery] = useState(false);

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "published" | "drafts">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState("");

  // Screen View: "dashboard" (list of projects) or "editor" (full-screen editor page)
  const [currentView, setCurrentView] = useState<"dashboard" | "editor">("dashboard");
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Form Fields for Editor
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("mobile");
  const [formTagline, setFormTagline] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formTags, setFormTags] = useState("");
  const [formLiveUrl, setFormLiveUrl] = useState("");
  const [formSourceUrl, setFormSourceUrl] = useState("");
  const [formIsPrivateRepo, setFormIsPrivateRepo] = useState(true);
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formVideoUrl, setFormVideoUrl] = useState("");
  const [formRole, setFormRole] = useState("Lead Mobile Developer");
  const [formDuration, setFormDuration] = useState("6 Weeks");
  const [formStatus, setFormStatus] = useState("Active (Google Play)");
  const [formTeamSize, setFormTeamSize] = useState("1 (Solo)");
  const [formMetrics, setFormMetrics] = useState("");
  const [formHighlights, setFormHighlights] = useState("");
  const [formAccentColor, setFormAccentColor] = useState("#10b981");
  const [formPublished, setFormPublished] = useState(true);
  const [formFeatured, setFormFeatured] = useState(true);

  // Dynamic category creation state in editor
  const [isAddingCustomCategory, setIsAddingCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [customCategoryDesc, setCustomCategoryDesc] = useState("");

  // Category creation state in dashboard
  const [isAddingDashboardCategory, setIsAddingDashboardCategory] = useState(false);
  const [dashboardCategoryName, setDashboardCategoryName] = useState("");
  const [dashboardCategoryDesc, setDashboardCategoryDesc] = useState("");

  // Ergonomic adjustable heights & reading modes for Case Study Metrics & Benchmarks
  const [metricsHeight, setMetricsHeight] = useState(280);
  const [highlightsHeight, setHighlightsHeight] = useState(280);
  const [isDraggingHeight, setIsDraggingHeight] = useState<"metrics" | "highlights" | "all" | null>(null);
  const [sectionLayout, setSectionLayout] = useState<"split" | "stacked">("split");
  const [metricsFontSize, setMetricsFontSize] = useState<"sm" | "base" | "lg">("base");
  const [metricsViewTab, setMetricsViewTab] = useState<"edit" | "preview">("edit");

  // Helper for category icons
  const getCategoryIcon = (slugOrIcon: string, className = "w-3.5 h-3.5") => {
    const key = (slugOrIcon || "").toLowerCase();
    if (key.includes("mobile") || key.includes("phone")) return <FiSmartphone className={className} />;
    if (key.includes("web") || key.includes("globe")) return <FiGlobe className={className} />;
    if (key.includes("backend") || key.includes("server")) return <FiServer className={className} />;
    if (key.includes("ai") || key.includes("cpu")) return <FiCpu className={className} />;
    if (key.includes("fintech") || key.includes("trending") || key.includes("bank")) return <FiTrendingUp className={className} />;
    if (key.includes("cloud") || key.includes("devops")) return <FiCloud className={className} />;
    return <FiLayers className={className} />;
  };

  // Drag handlers for vertical upward/downward textarea resizing
  const startDrag = (target: "metrics" | "highlights" | "all", e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingHeight(target);
    const startY = e.clientY;
    const initialMetrics = metricsHeight;
    const initialHighlights = highlightsHeight;

    const onMouseMove = (moveEvt: MouseEvent) => {
      const deltaY = moveEvt.clientY - startY;
      if (target === "metrics") {
        setMetricsHeight(Math.max(140, Math.min(1200, initialMetrics + deltaY)));
      } else if (target === "highlights") {
        setHighlightsHeight(Math.max(140, Math.min(1200, initialHighlights + deltaY)));
      } else if (target === "all") {
        setMetricsHeight(Math.max(140, Math.min(1200, initialMetrics + deltaY)));
        setHighlightsHeight(Math.max(140, Math.min(1200, initialHighlights + deltaY)));
      }
    };

    const onMouseUp = () => {
      setIsDraggingHeight(null);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const startTouchDrag = (target: "metrics" | "highlights" | "all", e: React.TouchEvent) => {
    setIsDraggingHeight(target);
    const startY = e.touches[0].clientY;
    const initialMetrics = metricsHeight;
    const initialHighlights = highlightsHeight;

    const onTouchMove = (moveEvt: TouchEvent) => {
      const deltaY = moveEvt.touches[0].clientY - startY;
      if (target === "metrics") {
        setMetricsHeight(Math.max(140, Math.min(1200, initialMetrics + deltaY)));
      } else if (target === "highlights") {
        setHighlightsHeight(Math.max(140, Math.min(1200, initialHighlights + deltaY)));
      } else if (target === "all") {
        setMetricsHeight(Math.max(140, Math.min(1200, initialMetrics + deltaY)));
        setHighlightsHeight(Math.max(140, Math.min(1200, initialHighlights + deltaY)));
      }
    };

    const onTouchEnd = () => {
      setIsDraggingHeight(null);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  const adjustHeight = (target: "metrics" | "highlights" | "both", delta: number) => {
    if (target === "metrics" || target === "both") {
      setMetricsHeight((prev) => Math.max(140, Math.min(1200, prev + delta)));
    }
    if (target === "highlights" || target === "both") {
      setHighlightsHeight((prev) => Math.max(140, Math.min(1200, prev + delta)));
    }
  };

  const setHeightPreset = (target: "metrics" | "highlights" | "both", height: number) => {
    if (target === "metrics" || target === "both") setMetricsHeight(height);
    if (target === "highlights" || target === "both") setHighlightsHeight(height);
  };

  const autoFitHeight = (target: "metrics" | "highlights") => {
    const text = target === "metrics" ? formMetrics : formHighlights;
    const lineCount = Math.max(3, text.split("\n").filter(Boolean).length);
    const calculatedHeight = Math.max(160, Math.min(950, lineCount * 36 + 90));
    if (target === "metrics") setMetricsHeight(calculatedHeight);
    else setHighlightsHeight(calculatedHeight);
  };

  const getFontSizeClass = () => {
    if (metricsFontSize === "sm") return "text-xs font-mono";
    if (metricsFontSize === "lg") return "text-base font-mono";
    return "text-sm font-mono";
  };

  // Note: Session is intentionally never saved across page reloads/navigates per security policy.
  // Re-authentication is always required on refresh or re-entry.

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  // Add new category handler
  const handleCreateCategory = async (name: string, description?: string) => {
    if (!name.trim()) return null;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description?.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
        showToast(`Category "${name}" created & saved!`);
        return data.category as CategoryItem;
      }
    } catch (err) {
      console.error("Error creating category:", err);
      showToast("Error creating category");
    }
    return null;
  };

  // Fetch all projects (including drafts)
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects?all=true");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
      showToast("Error loading projects database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchCategories();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setPasscodeError("Please enter your admin password.");
      return;
    }

    setIsVerifyingAuth(true);
    setPasscodeError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password: passcode }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPasscodeError("");
      } else {
        setPasscodeError(data.error || "Incorrect admin password. Please try again.");
      }
    } catch {
      setPasscodeError("Error connecting to server. Please try again.");
    } finally {
      setIsVerifyingAuth(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    setCurrentView("dashboard");
    showToast("Admin session locked.");
  };

  const handleToggleRecovery = async () => {
    const nextMode = !isRecoveryMode;
    setIsRecoveryMode(nextMode);
    setPasscodeError("");
    setRecoveryError("");
    setRecoverySuccess("");

    if (nextMode && !recoveryQuestion) {
      setIsLoadingQuestion(true);
      try {
        const res = await fetch("/api/admin/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get-question" }),
        });
        if (res.ok) {
          const data = await res.json();
          setRecoveryQuestion(data.question);
        }
      } catch (err) {
        console.error(err);
        setRecoveryError("Failed to retrieve security question.");
      } finally {
        setIsLoadingQuestion(false);
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError("");
    setRecoverySuccess("");

    if (newRecoveryPassword !== confirmRecoveryPassword) {
      setRecoveryError("Passwords do not match. Please re-enter.");
      return;
    }

    if (newRecoveryPassword.length < 4) {
      setRecoveryError("New password must be at least 4 characters long.");
      return;
    }

    setIsSubmittingRecovery(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset-password",
          answer: recoveryAnswer,
          newPassword: newRecoveryPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRecoverySuccess("Password successfully updated! Switch to login to sign in.");
        showToast("Password updated successfully!");
        setPasscode(newRecoveryPassword);
        setTimeout(() => {
          setIsRecoveryMode(false);
          setRecoveryAnswer("");
          setNewRecoveryPassword("");
          setConfirmRecoveryPassword("");
          setRecoverySuccess("");
        }, 1400);
      } else {
        setRecoveryError(data.error || "Incorrect answer to security question.");
      }
    } catch {
      setRecoveryError("Server error verifying security recovery.");
    } finally {
      setIsSubmittingRecovery(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleTogglePublish = async (proj: ProjectItem) => {
    const updatedStatus = !proj.published;
    try {
      const res = await fetch(`/api/projects/${proj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: updatedStatus }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === proj.id ? { ...p, published: updatedStatus } : p))
        );
        showToast(
          updatedStatus
            ? `"${proj.name}" is now LIVE on your portfolio!`
            : `"${proj.name}" moved to drafts/archive.`
        );
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to update status");
    }
  };

  const handleDeleteProject = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showToast(`"${name}" was deleted successfully.`);
      }
    } catch (err) {
      console.error(err);
      showToast("Error deleting project");
    }
  };

  // Open Full-Screen Editor for Creating New Project
  const openAddScreen = () => {
    setEditingProject(null);
    setFormName("");
    setFormCategory("mobile");
    setFormTagline("");
    setFormDescription("");
    setFormTags("React Native, Expo, TypeScript");
    setFormLiveUrl("");
    setFormSourceUrl("");
    setFormIsPrivateRepo(true);
    setFormImageUrl("/projectsimg/voice_of_the_east.png");
    setFormVideoUrl("");
    setFormRole("Lead Developer");
    setFormDuration("4 Weeks");
    setFormStatus("In Development");
    setFormTeamSize("1 (Solo)");
    setFormMetrics("");
    setFormHighlights("");
    setFormAccentColor("#10b981");
    setFormPublished(false);
    setFormFeatured(false);
    setIsAddingCustomCategory(false);
    setCustomCategoryName("");
    setCustomCategoryDesc("");
    setCurrentView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Full-Screen Editor for Editing Existing Project
  const openEditScreen = (proj: ProjectItem) => {
    setEditingProject(proj);
    setFormName(proj.name);
    setFormCategory(proj.category);
    setFormTagline(proj.tagline || "");
    setFormDescription(proj.description);
    setFormTags(proj.tags ? proj.tags.join(", ") : "");
    setFormLiveUrl(proj.liveUrl || "");
    setFormSourceUrl(proj.sourceUrl || "");
    setFormIsPrivateRepo(proj.isPrivateRepo ?? (!proj.sourceUrl));
    setFormImageUrl(proj.imageUrl || "");
    setFormVideoUrl(proj.videoUrl || "");
    setFormRole(proj.role || "Lead Developer");
    setFormDuration(proj.duration || "4 Weeks");
    setFormStatus(proj.status || "Active");
    setFormTeamSize(proj.teamSize || "1 (Solo)");
    setFormMetrics(proj.metrics ? proj.metrics.join("\n") : "");
    setFormHighlights(proj.highlights ? proj.highlights.join("\n") : "");
    setFormAccentColor(proj.accentColor || "#10b981");
    setFormPublished(proj.published ?? true);
    setFormFeatured(proj.featured ?? true);
    setIsAddingCustomCategory(false);
    setCustomCategoryName("");
    setCustomCategoryDesc("");
    setCurrentView("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const tagArray = formTags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const metricsArray = formMetrics
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const highlightsArray = formHighlights
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const projectPayload = {
      name: formName,
      category: formCategory,
      tagline: formTagline,
      description: formDescription,
      tags: tagArray,
      liveUrl: formLiveUrl,
      sourceUrl: formIsPrivateRepo ? "" : formSourceUrl,
      isPrivateRepo: formIsPrivateRepo,
      imageUrl: formImageUrl || "/projectsimg/voice_of_the_east.png",
      videoUrl: formVideoUrl,
      role: formRole,
      duration: formDuration,
      status: formStatus,
      teamSize: formTeamSize,
      metrics: metricsArray,
      highlights: highlightsArray,
      accentColor: formAccentColor,
      published: formPublished,
      featured: formFeatured,
      projectType: [
        formCategory === "mobile"
          ? "Mobile Apps"
          : formCategory === "backend"
          ? "Backend & Distributed Systems"
          : formCategory === "ai"
          ? "AI / Systems"
          : "Web Apps",
      ],
    };

    try {
      if (editingProject) {
        // Update existing
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectPayload),
        });

        if (res.ok) {
          const updatedData = await res.json();
          setProjects((prev) =>
            prev.map((p) => (p.id === editingProject.id ? updatedData.project : p))
          );
          showToast(`"${formName}" updated successfully!`);
          setCurrentView("dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // Create new
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectPayload),
        });

        if (res.ok) {
          const createdData = await res.json();
          setProjects((prev) => [createdData.project, ...prev]);
          showToast(`New project "${formName}" created!`);
          setCurrentView("dashboard");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving project details");
    } finally {
      setIsSaving(false);
    }
  };

  // Filtered views with category support
  const publishedCount = projects.filter((p) => p.published).length;
  const draftCount = projects.filter((p) => !p.published).length;

  const displayProjects = projects.filter((p) => {
    const matchesStatus =
      filter === "published" ? p.published : filter === "drafts" ? !p.published : true;
    const matchesCategory =
      categoryFilter === "all" ? true : p.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesStatus && matchesCategory;
  });

  // Login Barrier View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl hairline-all bg-[var(--surface)]/50 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-4">
            <FiLock className="w-3.5 h-3.5 text-[var(--red)]" />
            <span>Studio Security Barrier</span>
          </div>

          <h1 className="text-3xl font-heading font-medium tracking-tight text-[var(--fg)] mb-2">
            {isRecoveryMode ? "Reset Studio Password" : "Admin Repertoire Access"}
          </h1>
          <p className="text-xs text-[var(--fg-2)] font-mono mb-8 leading-relaxed">
            {isRecoveryMode
              ? "Answer your configured security challenge question to establish a new admin password."
              : "Enter authorized admin password to manage projects, update live releases, and manage CDN media."}
          </p>

          {!isRecoveryMode ? (
            /* Standard Secure Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="passcode"
                  className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5"
                >
                  Admin Password
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter authorized password"
                  className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] text-sm text-[var(--fg)] outline-none focus:border-[var(--red)] transition-colors placeholder:text-[var(--fg-3)]/40 font-mono"
                  autoFocus
                />
                {passcodeError && (
                  <p className="text-xs text-[var(--red)] font-mono mt-2 flex items-center gap-1.5">
                    <span>⚠</span>
                    <span>{passcodeError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isVerifyingAuth}
                className="w-full py-3.5 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isVerifyingAuth ? (
                  <>
                    <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock Studio Dashboard</span>
                    <FiUnlock className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Security Question Password Reset Form */
            <form onSubmit={handleResetPassword} className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-2xl hairline-all bg-[var(--bg)] space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-[var(--red)] tracking-wider font-semibold block">
                  Security Recovery Question
                </span>
                <p className="font-mono text-xs text-[var(--fg)] leading-relaxed">
                  {isLoadingQuestion ? "Retrieving security challenge..." : recoveryQuestion}
                </p>
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                  Your Secret Answer *
                </label>
                <input
                  type="text"
                  required
                  value={recoveryAnswer}
                  onChange={(e) => setRecoveryAnswer(e.target.value)}
                  placeholder="Enter answer to security question"
                  className="w-full px-4 py-2.5 rounded-xl hairline-all bg-[var(--bg)] text-xs text-[var(--fg)] outline-none focus:border-[var(--red)] font-mono"
                  autoFocus
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                  New Admin Password *
                </label>
                <input
                  type="password"
                  required
                  value={newRecoveryPassword}
                  onChange={(e) => setNewRecoveryPassword(e.target.value)}
                  placeholder="Enter new password (min 4 chars)"
                  className="w-full px-4 py-2.5 rounded-xl hairline-all bg-[var(--bg)] text-xs text-[var(--fg)] outline-none focus:border-[var(--red)] font-mono"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmRecoveryPassword}
                  onChange={(e) => setConfirmRecoveryPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 rounded-xl hairline-all bg-[var(--bg)] text-xs text-[var(--fg)] outline-none focus:border-[var(--red)] font-mono"
                />
              </div>

              {recoveryError && (
                <p className="text-xs text-[var(--red)] font-mono flex items-center gap-1.5">
                  <span>⚠</span>
                  <span>{recoveryError}</span>
                </p>
              )}

              {recoverySuccess && (
                <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <span>✓</span>
                  <span>{recoverySuccess}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmittingRecovery}
                className="w-full py-3.5 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmittingRecovery ? (
                  <>
                    <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying &amp; Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password &amp; Update</span>
                    <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 hairline-t flex items-center justify-between text-[11px] font-mono text-[var(--fg-3)]">
            <Link href="/" className="hover:text-[var(--fg)] transition-colors flex items-center gap-1">
              <span>&larr; Return to Portfolio</span>
            </Link>

            <button
              type="button"
              onClick={handleToggleRecovery}
              className="text-[var(--red)] hover:underline cursor-pointer transition-colors"
            >
              {isRecoveryMode ? "Back to Login" : "Forgot Password?"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // SCREEN 2: DEDICATED FULL-SCREEN SPECIFICATION EDITOR (NATURAL SCROLLING)
  // ===========================================================================
  if (currentView === "editor") {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-8 pb-32">
        {/* Floating Feedback Toast */}
        {toastMessage && (
          <div className="fixed top-8 right-6 z-[99999] px-4 py-2.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs shadow-2xl flex items-center gap-2 animate-fadeIn">
            <FiCheck className="w-4 h-4 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Main Full-Screen Form Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Top Navigation & Action Row (Clean, no long border-b underline) */}
          <div className="flex items-center justify-between gap-4 mb-8">
            <button
              type="button"
              onClick={() => setCurrentView("dashboard")}
              className="inline-flex items-center gap-2 font-mono text-xs text-[var(--fg-3)] hover:text-[var(--fg)] transition-colors cursor-pointer group"
            >
              <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects Dashboard</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView("dashboard")}
                className="px-4 py-2 rounded-full hairline-all font-mono text-xs uppercase tracking-wider text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveProject}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isSaving ? (
                  <>
                    <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Save &amp; Sync to Portfolio</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="mb-10">
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--red)] uppercase tracking-widest mb-1.5">
              <span>// Studio Repertoire Editor</span>
              <span>•</span>
              <span>Full Screen Workflow</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-[var(--fg)]">
              {editingProject ? `Edit: ${editingProject.name}` : "Create New Engineering Project"}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--fg-2)] font-mono mt-2 leading-relaxed">
              Configure engineering taxonomy, high-performance metrics, Cloudinary video loop recordings, and repository security flags.
            </p>
          </div>

          <form onSubmit={handleSaveProject} className="space-y-8">
            
            {/* =============================================================== */}
            {/* SECTION 1: ARCHITECTURE & IDENTITY                              */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-6">
              <div className="pb-3 hairline-b flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                  <span>01. Core Architecture &amp; Identity</span>
                </h2>
                <span className="font-mono text-[10px] text-[var(--fg-3)]">Basic Project Metadata</span>
              </div>

              {/* Project Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Voice of the East"
                    className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] text-sm text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)]">
                      Engineering Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingCustomCategory(!isAddingCustomCategory);
                        setCustomCategoryName("");
                        setCustomCategoryDesc("");
                      }}
                      className="text-[10px] font-mono text-[var(--red)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FiPlus className="w-3 h-3" />
                      <span>{isAddingCustomCategory ? "Close Category Form" : "+ Add New Category"}</span>
                    </button>
                  </div>

                  {isAddingCustomCategory ? (
                    <div className="p-4 rounded-2xl hairline-all bg-[var(--surface)]/50 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg)] font-semibold flex items-center gap-1.5">
                          <FiFolderPlus className="w-3.5 h-3.5 text-[var(--red)]" />
                          <span>Register New Category Domain</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsAddingCustomCategory(false)}
                          className="text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <label className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
                          Category Name *
                        </label>
                        <input
                          type="text"
                          value={customCategoryName}
                          onChange={(e) => setCustomCategoryName(e.target.value)}
                          placeholder="e.g. Distributed Systems, Blockchain / Web3, Cloud & DevOps"
                          className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] text-xs text-[var(--fg)] outline-none focus:border-[var(--red)] font-medium"
                          autoFocus
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
                          Brief Description (Optional)
                        </label>
                        <input
                          type="text"
                          value={customCategoryDesc}
                          onChange={(e) => setCustomCategoryDesc(e.target.value)}
                          placeholder="e.g. Microservices, event queues, and real-time backend pipelines"
                          className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={async () => {
                            if (customCategoryName.trim()) {
                              const created = await handleCreateCategory(
                                customCategoryName.trim(),
                                customCategoryDesc.trim()
                              );
                              if (created) {
                                setFormCategory(created.slug);
                                setIsAddingCustomCategory(false);
                                setCustomCategoryName("");
                                setCustomCategoryDesc("");
                              }
                            }
                          }}
                          className="px-4 py-2 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase hover:opacity-90 transition-all cursor-pointer"
                        >
                          Save &amp; Apply Category
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsAddingCustomCategory(false)}
                          className="px-3 py-2 rounded-xl hairline-all font-mono text-xs text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {/* Interactive Category Selector Dropdown */}
                      <select
                        value={formCategory}
                        onChange={(e) => {
                          if (e.target.value === "__add_new__") {
                            setIsAddingCustomCategory(true);
                          } else {
                            setFormCategory(e.target.value);
                          }
                        }}
                        className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] text-sm text-[var(--fg)] outline-none focus:border-[var(--red)] font-mono cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat.slug} value={cat.slug}>
                            {cat.name} ({cat.slug})
                          </option>
                        ))}
                        {/* Fallback to default options if categories not yet loaded */}
                        {categories.length === 0 && (
                          <>
                            <option value="mobile">Mobile Native Apps (mobile)</option>
                            <option value="web">Web Systems &amp; SaaS (web)</option>
                            <option value="backend">Backend &amp; Distributed Systems (backend)</option>
                            <option value="ai">AI &amp; Intelligent Systems (ai)</option>
                            <option value="fintech">Fintech &amp; Banking (fintech)</option>
                            <option value="cloud">Cloud Infrastructure &amp; DevOps (cloud)</option>
                          </>
                        )}
                        <option value="__add_new__">+ Add New Category...</option>
                      </select>

                      {/* Visual Clickable Category Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => {
                          const isSelected = formCategory === cat.slug;
                          return (
                            <button
                              key={cat.slug}
                              type="button"
                              onClick={() => setFormCategory(cat.slug)}
                              className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                isSelected
                                  ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-sm scale-102"
                                  : "hairline-all bg-[var(--surface)] text-[var(--fg-3)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)]"
                              }`}
                            >
                              {getCategoryIcon(cat.slug, "w-3 h-3")}
                              <span>{cat.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Role, Duration, Status, Team */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                    Engineering Role
                  </label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    placeholder="Lead Mobile Developer"
                    className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                    Timeline / Cycle
                  </label>
                  <input
                    type="text"
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="6 Weeks"
                    className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                    Production Status
                  </label>
                  <input
                    type="text"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    placeholder="Active (Google Play)"
                    className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                    Team Composition
                  </label>
                  <input
                    type="text"
                    value={formTeamSize}
                    onChange={(e) => setFormTeamSize(e.target.value)}
                    placeholder="1 (Solo Developer)"
                    className="w-full px-3.5 py-2.5 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* SECTION 2: NARRATIVE & TECH STACK                               */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-6">
              <div className="pb-3 hairline-b flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                  <span>02. Architectural Narrative &amp; Stack</span>
                </h2>
                <span className="font-mono text-[10px] text-[var(--fg-3)]">Editorial Dossier Story</span>
              </div>

              {/* Tagline */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5">
                  High-Concept Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. Cultural Media Hub & Audio Streaming Native Ecosystem"
                  className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] text-sm text-[var(--fg)] outline-none focus:border-[var(--red)] font-heading"
                />
              </div>

              {/* Detailed Narrative */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5">
                  Detailed Engineering Narrative &amp; Problem Statement *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe the architectural challenge, systems design, performance bottlenecks resolved, and engineering impact..."
                  className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] text-sm text-[var(--fg)] outline-none focus:border-[var(--red)] leading-relaxed resize-y font-normal"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5">
                  Tech Stack (Comma-Separated)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="React Native, Expo, TypeScript, Node.js, Redis, PostgreSQL, TanStack Query"
                  className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                />
                
                {/* Live Tag Pills Preview */}
                {formTags && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                    {formTags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full hairline-all bg-[var(--bg)] text-[10px] font-mono text-[var(--fg-2)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* =============================================================== */}
            {/* SECTION 3: REPOSITORY SECURITY & DEPLOYMENT                     */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-6">
              <div className="pb-3 hairline-b flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                  <span>03. Codebase Security &amp; Deployment</span>
                </h2>
                <span className="font-mono text-[10px] text-[var(--fg-3)]">IP Protection &amp; Links</span>
              </div>

              {/* Repository Privacy Selector */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-2 font-semibold">
                  Source Code Privacy Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormIsPrivateRepo(true)}
                    className={`p-4 rounded-2xl hairline-all text-left flex items-start gap-3 transition-all cursor-pointer ${
                      formIsPrivateRepo
                        ? "bg-amber-500/15 border-amber-500/50 text-[var(--fg)] shadow-sm"
                        : "bg-[var(--bg)] text-[var(--fg-3)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <FiLock className="w-5 h-5 mt-0.5 text-amber-500 flex-shrink-0" />
                    <div>
                      <span className="font-mono text-xs font-semibold block">Private Repository (Commercial IP)</span>
                      <span className="text-[11px] text-[var(--fg-3)] block leading-relaxed mt-1">
                        Client IP or proprietary commercial codebase under NDA. Public GitHub link is hidden and labeled as Protected IP in dossier.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormIsPrivateRepo(false)}
                    className={`p-4 rounded-2xl hairline-all text-left flex items-start gap-3 transition-all cursor-pointer ${
                      !formIsPrivateRepo
                        ? "bg-emerald-500/15 border-emerald-500/50 text-[var(--fg)] shadow-sm"
                        : "bg-[var(--bg)] text-[var(--fg-3)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <FiGithub className="w-5 h-5 mt-0.5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <span className="font-mono text-xs font-semibold block">Public Open Source</span>
                      <span className="text-[11px] text-[var(--fg-3)] block leading-relaxed mt-1">
                        Publicly hosted repository on GitHub. Visitors can click to inspect the repository commits and architecture.
                      </span>
                    </div>
                  </button>
                </div>

                {!formIsPrivateRepo && (
                  <div className="mt-4 pt-2 animate-fadeIn">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={formSourceUrl}
                      onChange={(e) => setFormSourceUrl(e.target.value)}
                      placeholder="https://github.com/iyke-e/..."
                      className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                    />
                  </div>
                )}
              </div>

              {/* Live App / Store URL */}
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] block mb-1.5">
                  Live Deployment / Google Play Store URL
                </label>
                <input
                  type="url"
                  value={formLiveUrl}
                  onChange={(e) => setFormLiveUrl(e.target.value)}
                  placeholder="https://play.google.com/store/apps/details?id=..."
                  className="w-full px-4 py-3 rounded-xl hairline-all bg-[var(--bg)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                />
              </div>
            </div>

            {/* =============================================================== */}
            {/* SECTION 4: MEDIA ASSETS & SCREEN RECORDINGS                     */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-6">
              <div className="pb-3 hairline-b flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                  <span>04. Media Assets &amp; Screen Loop</span>
                </h2>
                <span className="font-mono text-[10px] text-[var(--fg-3)]">Cloudinary CDN &amp; 3D Stage</span>
              </div>

              {/* Media Uploader 1: Video Loop */}
              <MediaUploader
                label="3D Screen Loop Video (MP4 / WebM)"
                type="video"
                value={formVideoUrl}
                onChange={setFormVideoUrl}
                folder="screen_loops"
                presetButtons={[
                  { label: "Voice of East Video", url: "/videos/voice_of_the_east.mp4" },
                  { label: "Crestmonie Video", url: "/videos/condor_crest.mp4" },
                ]}
                helperText="Upload screen recording loop. Streams via Cloudinary CDN or local storage with automatic cleanup of replaced files."
              />

              {/* Media Uploader 2: Project Image */}
              <MediaUploader
                label="Project Showcase Cover Image"
                type="image"
                value={formImageUrl}
                onChange={setFormImageUrl}
                folder="project_covers"
                presetButtons={[
                  { label: "Voice of the East", url: "/projectsimg/voice_of_the_east.png" },
                  { label: "Crestmonie", url: "/projectsimg/condor_crest.png" },
                ]}
                helperText="High-res interface mockup or preview image."
              />
            </div>

            {/* =============================================================== */}
            {/* SECTION 5: METRICS & ARCHITECTURE HIGHLIGHTS (UPWARD/DOWNWARD)   */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-6">
              
              {/* Master Control Header */}
              <div className="pb-4 hairline-b flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-pulse" />
                    <span>05. Case Study Metrics &amp; Benchmarks</span>
                  </h2>
                  <p className="font-mono text-[11px] text-[var(--fg-3)] mt-1">
                    Adjust textareas downward or upward smoothly to comfortably read and format benchmarks.
                  </p>
                </div>

                {/* Section Ergonomics Toolbar */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Height Steppers */}
                  <div className="flex items-center gap-1 p-1 rounded-xl hairline-all bg-[var(--bg)]">
                    <span className="text-[10px] font-mono text-[var(--fg-3)] px-1.5">Section:</span>
                    <button
                      type="button"
                      onClick={() => adjustHeight("both", -60)}
                      className="px-2 py-1 rounded-lg text-[10px] font-mono hairline-all hover:bg-[var(--surface)] cursor-pointer flex items-center gap-0.5"
                      title="Shrink upward (-60px)"
                    >
                      <FiMinus className="w-3 h-3" />
                      <span>Shrink</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustHeight("both", 60)}
                      className="px-2 py-1 rounded-lg text-[10px] font-mono hairline-all hover:bg-[var(--surface)] cursor-pointer flex items-center gap-0.5"
                      title="Expand downward (+60px)"
                    >
                      <FiPlus className="w-3 h-3" />
                      <span>Expand</span>
                    </button>
                  </div>

                  {/* Height Presets */}
                  <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl hairline-all bg-[var(--bg)]">
                    <button
                      type="button"
                      onClick={() => setHeightPreset("both", 160)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                        metricsHeight === 160 ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      Compact (160)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightPreset("both", 280)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                        metricsHeight === 280 ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      Standard (280)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeightPreset("both", 460)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                        metricsHeight === 460 ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      Deep (460)
                    </button>
                  </div>

                  {/* Layout Mode Switcher (Split vs Full-Width Stacked) */}
                  <div className="flex items-center gap-1 p-1 rounded-xl hairline-all bg-[var(--bg)]">
                    <button
                      type="button"
                      onClick={() => setSectionLayout("split")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                        sectionLayout === "split" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                      title="Side-by-Side (2 Columns)"
                    >
                      <FiColumns className="w-3 h-3" />
                      <span>2-Col</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSectionLayout("stacked")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                        sectionLayout === "stacked" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                      title="Full-Width Stacked (Ideal for reading long benchmark sentences)"
                    >
                      <FiAlignLeft className="w-3 h-3" />
                      <span>Full Width</span>
                    </button>
                  </div>

                  {/* Font Size Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl hairline-all bg-[var(--bg)]">
                    <button
                      type="button"
                      onClick={() => setMetricsFontSize("sm")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer ${
                        metricsFontSize === "sm" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
                      }`}
                      title="Font: 12px"
                    >
                      A-
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetricsFontSize("base")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer ${
                        metricsFontSize === "base" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
                      }`}
                      title="Font: 14px"
                    >
                      A
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetricsFontSize("lg")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-mono cursor-pointer ${
                        metricsFontSize === "lg" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
                      }`}
                      title="Font: 16px (Maximum legibility)"
                    >
                      A+
                    </button>
                  </div>

                  {/* Editor vs Live Preview Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl hairline-all bg-[var(--bg)]">
                    <button
                      type="button"
                      onClick={() => setMetricsViewTab("edit")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                        metricsViewTab === "edit" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      ✎ Edit Lines
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetricsViewTab("preview")}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
                        metricsViewTab === "preview" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)] hover:text-[var(--fg)]"
                      }`}
                    >
                      👁 Live Preview
                    </button>
                  </div>
                </div>
              </div>

              {/* View 1: Multi-Line Editor Mode */}
              {metricsViewTab === "edit" ? (
                <div className={sectionLayout === "split" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-6"}>
                  
                  {/* Field 1: Key Performance Metrics */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg)] font-semibold">
                          Key Performance Metrics (1 per line)
                        </label>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono hairline-all bg-[var(--bg)] text-emerald-400">
                          {formMetrics.split("\n").filter(Boolean).length} recorded
                        </span>
                      </div>

                      {/* Individual Controls */}
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--fg-3)]">
                        <button
                          type="button"
                          onClick={() => adjustHeight("metrics", -40)}
                          className="px-1.5 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer"
                          title="Shrink upward"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustHeight("metrics", 40)}
                          className="px-1.5 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer"
                          title="Expand downward"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => autoFitHeight("metrics")}
                          className="px-2 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer text-[var(--fg)]"
                          title="Auto-fit height to text content"
                        >
                          Fit
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        value={formMetrics}
                        onChange={(e) => setFormMetrics(e.target.value)}
                        placeholder="40% faster TTS audio narration speed&#10;Sub-1.1s cold start time across simulated 3G networks&#10;Zero sync drops across 10,000 stress simulations&#10;60 FPS fluid gesture handling with zero thread jank"
                        style={{ height: `${metricsHeight}px`, minHeight: "140px", resize: "vertical" }}
                        className={`w-full p-4 rounded-2xl hairline-all bg-[var(--bg)] text-[var(--fg)] outline-none focus:border-[var(--red)] leading-relaxed transition-all cursor-text ${getFontSizeClass()}`}
                      />

                      {/* Smooth Drag-to-Resize Handle Bar */}
                      <div
                        onMouseDown={(e) => startDrag("metrics", e)}
                        onTouchStart={(e) => startTouchDrag("metrics", e)}
                        className={`w-full py-2 px-3 mt-1.5 rounded-xl hairline-all bg-[var(--surface)] hover:bg-[var(--surface-hover)] cursor-ns-resize flex items-center justify-between text-[11px] font-mono select-none transition-all group ${
                          isDraggingHeight === "metrics" ? "bg-[var(--fg)] text-[var(--bg)]" : ""
                        }`}
                        title="Click and drag upward or downward to adjust reading view height"
                      >
                        <span className="flex items-center gap-1.5 text-[var(--fg-3)] group-hover:text-[var(--fg)]">
                          <FiMove className="w-3.5 h-3.5" />
                          <span>Drag up or down to adjust reading height</span>
                        </span>
                        <span className="font-semibold">{metricsHeight}px</span>
                      </div>
                    </div>
                  </div>

                  {/* Field 2: Architecture Highlights */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg)] font-semibold">
                          Architecture Highlights &amp; Milestones (1 per line)
                        </label>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono hairline-all bg-[var(--bg)] text-cyan-400">
                          {formHighlights.split("\n").filter(Boolean).length} recorded
                        </span>
                      </div>

                      {/* Individual Controls */}
                      <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--fg-3)]">
                        <button
                          type="button"
                          onClick={() => adjustHeight("highlights", -40)}
                          className="px-1.5 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer"
                          title="Shrink upward"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustHeight("highlights", 40)}
                          className="px-1.5 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer"
                          title="Expand downward"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => autoFitHeight("highlights")}
                          className="px-2 py-0.5 rounded hairline-all hover:bg-[var(--surface)] cursor-pointer text-[var(--fg)]"
                          title="Auto-fit height to text content"
                        >
                          Fit
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        value={formHighlights}
                        onChange={(e) => setFormHighlights(e.target.value)}
                        placeholder="Advanced Text-to-Speech narration engine with sentence-splitting regex&#10;Lock Screen audio player support using background audio streams&#10;Traditional Igbo Market Day Calculator dynamically computing calendar cycles&#10;TanStack Query and Zustand AsyncStorage offline-first caching system"
                        style={{ height: `${highlightsHeight}px`, minHeight: "140px", resize: "vertical" }}
                        className={`w-full p-4 rounded-2xl hairline-all bg-[var(--bg)] text-[var(--fg)] outline-none focus:border-[var(--red)] leading-relaxed transition-all cursor-text ${getFontSizeClass()}`}
                      />

                      {/* Smooth Drag-to-Resize Handle Bar */}
                      <div
                        onMouseDown={(e) => startDrag("highlights", e)}
                        onTouchStart={(e) => startTouchDrag("highlights", e)}
                        className={`w-full py-2 px-3 mt-1.5 rounded-xl hairline-all bg-[var(--surface)] hover:bg-[var(--surface-hover)] cursor-ns-resize flex items-center justify-between text-[11px] font-mono select-none transition-all group ${
                          isDraggingHeight === "highlights" ? "bg-[var(--fg)] text-[var(--bg)]" : ""
                        }`}
                        title="Click and drag upward or downward to adjust reading view height"
                      >
                        <span className="flex items-center gap-1.5 text-[var(--fg-3)] group-hover:text-[var(--fg)]">
                          <FiMove className="w-3.5 h-3.5" />
                          <span>Drag up or down to adjust reading height</span>
                        </span>
                        <span className="font-semibold">{highlightsHeight}px</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Live Case Study Preview Mode */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
                  <div className="p-6 rounded-2xl hairline-all bg-[var(--bg)] space-y-4">
                    <div className="flex items-center justify-between pb-2 hairline-b">
                      <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Quantified Telemetry Benchmarks</span>
                      </span>
                      <span className="text-[10px] font-mono text-[var(--fg-3)]">
                        {formMetrics.split("\n").filter(Boolean).length} items
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                      {formMetrics.split("\n").filter(Boolean).length > 0 ? (
                        formMetrics.split("\n").filter(Boolean).map((line, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl hairline-all bg-[var(--surface)]/40 flex items-start gap-3"
                          >
                            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-semibold flex-shrink-0 mt-0.5">
                              0{idx + 1}
                            </span>
                            <span className={`text-[var(--fg)] font-mono leading-relaxed ${getFontSizeClass()}`}>
                              {line}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs font-mono text-[var(--fg-3)] italic py-4">
                          No metrics entered yet. Switch to &quot;Edit Lines&quot; to add performance data.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl hairline-all bg-[var(--bg)] space-y-4">
                    <div className="flex items-center justify-between pb-2 hairline-b">
                      <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>Architecture Deliverables &amp; Milestones</span>
                      </span>
                      <span className="text-[10px] font-mono text-[var(--fg-3)]">
                        {formHighlights.split("\n").filter(Boolean).length} items
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                      {formHighlights.split("\n").filter(Boolean).length > 0 ? (
                        formHighlights.split("\n").filter(Boolean).map((line, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl hairline-all bg-[var(--surface)]/40 flex items-start gap-3"
                          >
                            <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 font-mono text-[10px] font-semibold flex-shrink-0 mt-0.5">
                              ★ 0{idx + 1}
                            </span>
                            <span className={`text-[var(--fg)] font-mono leading-relaxed ${getFontSizeClass()}`}>
                              {line}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs font-mono text-[var(--fg-3)] italic py-4">
                          No highlights entered yet. Switch to &quot;Edit Lines&quot; to add engineering milestones.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =============================================================== */}
            {/* SECTION 6: VISIBILITY & STAGING                                 */}
            {/* =============================================================== */}
            <div className="p-6 sm:p-8 rounded-3xl hairline-all bg-[var(--surface)]/30 space-y-4">
              <div className="pb-3 hairline-b flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--red)]" />
                  <span>06. Visibility &amp; Staging</span>
                </h2>
                <span className="font-mono text-[10px] text-[var(--fg-3)]">Live Site Publication</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--red)] cursor-pointer"
                  />
                  <div>
                    <span className="font-mono text-xs font-semibold block">Publish Live on Portfolio</span>
                    <span className="font-mono text-[10px] text-[var(--fg-3)] block">
                      Shows immediately on your homepage and /portfolio directory.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--red)] cursor-pointer"
                  />
                  <div>
                    <span className="font-mono text-xs font-semibold block">Featured Flagship Project</span>
                    <span className="font-mono text-[10px] text-[var(--fg-3)] block">
                      Highlighted in primary interactive 3D stage showcase.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-6 hairline-t flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentView("dashboard")}
                className="px-6 py-3.5 rounded-full hairline-all font-mono text-xs uppercase tracking-wider text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
              >
                &larr; Discard Changes &amp; Return
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer shadow-xl"
              >
                {isSaving ? "Saving..." : "Save & Sync to Portfolio"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // SCREEN 1: MAIN DASHBOARD VIEW (PROJECTS REPERTOIRE LIST)
  // ===========================================================================
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] pt-10 pb-20">
      
      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-[99999] px-4 py-2.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs shadow-2xl flex items-center gap-2 animate-fadeIn">
          <FiCheck className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="pad-auto">
        
        {/* Top Control Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 hairline-b">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--fg-3)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Studio Engine // Dynamic CMS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight text-[var(--fg)]">
              Project Repertoire CMS
            </h1>
            <p className="text-xs text-[var(--fg-2)] font-mono mt-1">
              Update live projects on the portfolio dynamically without touching source code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#work"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full hairline-all bg-[var(--surface)] text-[var(--fg)] font-mono text-xs uppercase tracking-wider hover:bg-[var(--surface-hover)] transition-all"
            >
              <span>View Live Portfolio</span>
              <FiArrowUpRight className="w-3.5 h-3.5 text-[var(--red)]" />
            </Link>

            <button
              onClick={openAddScreen}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>New Project</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-full hairline-all text-[var(--fg-3)] hover:text-[var(--fg)] font-mono text-xs uppercase cursor-pointer"
              title="Lock Admin Dashboard"
            >
              <FiLock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dashboard Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
          <div className="p-5 rounded-2xl hairline-all bg-[var(--surface)]/30">
            <span className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
              Live on Portfolio
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-medium text-emerald-500">
                {publishedCount}
              </span>
              <span className="text-[10px] font-mono text-[var(--fg-3)]">projects</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl hairline-all bg-[var(--surface)]/30">
            <span className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
              Drafts / Archived
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-medium text-[var(--fg-3)]">
                {draftCount}
              </span>
              <span className="text-[10px] font-mono text-[var(--fg-3)]">projects</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl hairline-all bg-[var(--surface)]/30">
            <span className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
              Total Catalog
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-heading font-medium text-[var(--fg)]">
                {projects.length}
              </span>
              <span className="text-[10px] font-mono text-[var(--fg-3)]">entries</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl hairline-all bg-[var(--surface)]/30">
            <span className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
              Persistence Engine
            </span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs text-emerald-400 font-medium">JSON File System</span>
            </div>
          </div>
        </div>

        {/* Taxonomy & Categories Registry Hub */}
        <div className="p-6 rounded-3xl hairline-all bg-[var(--surface)]/25 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 hairline-b">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-3)] block">
                Taxonomy &amp; Architecture Domains
              </span>
              <h3 className="text-lg font-heading font-medium text-[var(--fg)]">
                Project Categories Registry
              </h3>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAddingDashboardCategory(!isAddingDashboardCategory);
                setDashboardCategoryName("");
                setDashboardCategoryDesc("");
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hairline-all font-mono text-xs text-[var(--red)] hover:bg-[var(--surface)] transition-all cursor-pointer self-start sm:self-auto"
            >
              <FiFolderPlus className="w-3.5 h-3.5" />
              <span>{isAddingDashboardCategory ? "Close Form" : "+ Add New Category"}</span>
            </button>
          </div>

          {/* Inline Category Adder in Dashboard */}
          {isAddingDashboardCategory && (
            <div className="p-4 rounded-2xl hairline-all bg-[var(--bg)] space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={dashboardCategoryName}
                    onChange={(e) => setDashboardCategoryName(e.target.value)}
                    placeholder="e.g. Distributed Systems, Blockchain, Fintech"
                    className="w-full px-3 py-2 rounded-xl hairline-all bg-[var(--surface)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-[var(--fg-3)] block mb-1">
                    Short Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={dashboardCategoryDesc}
                    onChange={(e) => setDashboardCategoryDesc(e.target.value)}
                    placeholder="e.g. Real-time transaction engines and ledgers"
                    className="w-full px-3 py-2 rounded-xl hairline-all bg-[var(--surface)] font-mono text-xs text-[var(--fg)] outline-none focus:border-[var(--red)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    if (dashboardCategoryName.trim()) {
                      await handleCreateCategory(dashboardCategoryName.trim(), dashboardCategoryDesc.trim());
                      setIsAddingDashboardCategory(false);
                      setDashboardCategoryName("");
                      setDashboardCategoryDesc("");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-mono text-xs font-semibold uppercase hover:opacity-90 cursor-pointer"
                >
                  Save Category
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingDashboardCategory(false)}
                  className="px-3 py-2 rounded-xl hairline-all font-mono text-xs text-[var(--fg-3)] hover:text-[var(--fg)] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                categoryFilter === "all"
                  ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                  : "hairline-all bg-[var(--bg)] text-[var(--fg-3)] hover:text-[var(--fg)]"
              }`}
            >
              All Categories [{projects.length}]
            </button>

            {categories.map((cat) => {
              const count = projects.filter((p) => p.category?.toLowerCase() === cat.slug.toLowerCase()).length;
              const isSelected = categoryFilter.toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.slug}
                  onClick={() => setCategoryFilter(isSelected ? "all" : cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--fg)] text-[var(--bg)] font-semibold shadow-xs"
                      : "hairline-all bg-[var(--bg)] text-[var(--fg-3)] hover:text-[var(--fg)]"
                  }`}
                >
                  {getCategoryIcon(cat.slug, "w-3 h-3")}
                  <span>{cat.name} [{count}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex items-center justify-between pb-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === "all" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
              }`}
            >
              All Status [{projects.length}]
            </button>
            <button
              onClick={() => setFilter("published")}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === "published" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
              }`}
            >
              Live [{publishedCount}]
            </button>
            <button
              onClick={() => setFilter("drafts")}
              className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === "drafts" ? "bg-[var(--fg)] text-[var(--bg)] font-semibold" : "text-[var(--fg-3)]"
              }`}
            >
              Drafts / Archived [{draftCount}]
            </button>
          </div>

          <button
            onClick={() => {
              fetchProjects();
              fetchCategories();
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-[var(--fg-3)] hover:text-[var(--fg)] transition-colors cursor-pointer"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>

        {/* Projects List Table / Cards */}
        <div className="space-y-4">
          {displayProjects.map((proj, idx) => {
            const isLive = proj.published;
            return (
              <div
                key={proj.id}
                className="p-6 rounded-2xl hairline-all bg-[var(--surface)]/30 hover:bg-[var(--surface)]/50 transition-colors flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left: Thumbnail & Project Meta */}
                <div className="flex items-start sm:items-center gap-5">
                  <div className="relative w-20 h-14 sm:w-28 sm:h-20 rounded-xl overflow-hidden hairline-all bg-black/40 flex-shrink-0">
                    <Image
                      src={proj.imageUrl || "/projectsimg/voice_of_the_east.png"}
                      alt={proj.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--fg-3)] uppercase tracking-wider mb-1">
                      <span className="font-semibold text-[var(--fg)]">
                        0{idx + 1}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {proj.category === "mobile" ? <FiSmartphone className="w-3 h-3" /> : <FiGlobe className="w-3 h-3" />}
                        {proj.category}
                      </span>
                      <span>•</span>
                      <span>{proj.duration || "4 Weeks"}</span>
                      <span>•</span>
                      {proj.isPrivateRepo || !proj.sourceUrl ? (
                        <span className="inline-flex items-center gap-1 text-amber-500 font-medium">
                          <FiLock className="w-3 h-3" /> Private Repo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                          <FiGithub className="w-3 h-3" /> Public GitHub
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-heading font-medium text-[var(--fg)]">
                      {proj.name}
                    </h2>
                    <p className="text-xs text-[var(--fg-2)] font-mono line-clamp-1 max-w-xl mt-0.5">
                      {proj.tagline || proj.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.tags?.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono hairline-all bg-[var(--bg)] text-[var(--fg-3)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Status Pill & Action Buttons */}
                <div className="flex items-center gap-3 self-end lg:self-center">
                  
                  {/* Quick Toggle Live / Draft */}
                  <button
                    onClick={() => handleTogglePublish(proj)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLive
                        ? "bg-emerald-500/10 text-emerald-400 hairline-all border-emerald-500/30 hover:bg-emerald-500/20"
                        : "bg-white/5 text-[var(--fg-3)] hairline-all hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLive ? "bg-emerald-400 animate-pulse" : "bg-[var(--fg-3)]"
                      }`}
                    />
                    <span>{isLive ? "Live on Site" : "Draft / Hidden"}</span>
                  </button>

                  {/* Edit Button (Opens Full Screen Editor) */}
                  <button
                    onClick={() => openEditScreen(proj)}
                    className="p-2.5 rounded-xl hairline-all bg-[var(--surface)] text-[var(--fg-2)] hover:text-[var(--fg)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                    title="Edit project specs in full screen"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteProject(proj.id, proj.name)}
                    className="p-2.5 rounded-xl hairline-all bg-[var(--surface)] text-[var(--fg-3)] hover:text-[var(--red)] hover:border-[var(--red)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
                    title="Delete project"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
