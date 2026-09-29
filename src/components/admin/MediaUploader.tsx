"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FiUploadCloud,
  FiTrash2,
  FiVideo,
  FiImage,
  FiCheckCircle,
  FiRefreshCw,
  FiAlertCircle,
  FiExternalLink,
} from "react-icons/fi";

interface MediaUploaderProps {
  label: string;
  type: "video" | "image";
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  presetButtons?: { label: string; url: string }[];
  helperText?: string;
}

export default function MediaUploader({
  label,
  type,
  value,
  onChange,
  folder = "portfolio_media",
  presetButtons,
  helperText,
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [cloudProvider, setCloudProvider] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (type === "video" && !file.type.startsWith("video/") && !file.name.endsWith(".mp4") && !file.name.endsWith(".webm")) {
      setUploadError("Please upload a valid MP4 or WebM video file.");
      return;
    }
    if (type === "image" && !file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file (PNG, JPG, WebP).");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (value) {
        formData.append("oldUrl", value);
      }

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setCloudProvider(data.provider || "storage");
      setUploadSuccess(
        data.provider === "cloudinary"
          ? "Uploaded directly to Cloudinary CDN!"
          : "Saved to storage with auto-cleanup of previous files."
      );
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleRemove = async () => {
    if (!value) return;
    if (confirm(`Remove this ${type} file?`)) {
      try {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value, isVideo: type === "video" }),
        });
      } catch (err) {
        console.warn("Delete request error:", err);
      }
      onChange("");
      setUploadSuccess("");
      setUploadError("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-3)] flex items-center gap-1.5">
          {type === "video" ? <FiVideo className="w-3 h-3 text-cyan-400" /> : <FiImage className="w-3 h-3 text-emerald-400" />}
          <span>{label}</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-[10px] font-mono text-[var(--red)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FiTrash2 className="w-2.5 h-2.5" />
            <span>Remove</span>
          </button>
        )}
      </div>

      {/* Upload Zone / Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-2xl hairline-all p-4 transition-all cursor-pointer flex flex-col items-center justify-center text-center group ${
          isDragging
            ? "border-[var(--red)] bg-[var(--surface-hover)] scale-[0.99]"
            : "bg-[var(--surface)]/60 hover:bg-[var(--surface)] hover:border-[var(--fg-3)]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={type === "video" ? "video/mp4,video/webm" : "image/*"}
          onChange={handleFileSelect}
          className="hidden"
        />

        {isUploading ? (
          <div className="py-6 flex flex-col items-center gap-2">
            <FiRefreshCw className="w-6 h-6 animate-spin text-[var(--red)]" />
            <p className="font-mono text-xs text-[var(--fg-2)]">
              Uploading {type} to {cloudProvider === "cloudinary" ? "Cloudinary CDN" : "storage"}...
            </p>
          </div>
        ) : value ? (
          <div className="w-full flex flex-col sm:flex-row items-center gap-4 text-left">
            {/* Media Preview Box */}
            <div className="relative w-full sm:w-32 h-20 rounded-xl overflow-hidden hairline-all bg-black/60 flex-shrink-0 flex items-center justify-center">
              {type === "video" ? (
                <video
                  src={value}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1">
                <FiCheckCircle className="w-3 h-3" />
                <span>{type === "video" ? "Video Active" : "Image Active"}</span>
              </span>
              <p className="font-mono text-xs text-[var(--fg)] truncate max-w-full" title={value}>
                {value}
              </p>
              <p className="font-mono text-[10px] text-[var(--fg-3)] mt-1">
                Click or drop another file to replace (old file auto-deleted).
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full hairline-all bg-[var(--bg)] flex items-center justify-center text-[var(--fg-2)] group-hover:text-[var(--fg)] group-hover:scale-110 transition-transform">
              <FiUploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--fg)] font-medium">
                Click to upload or drag &amp; drop {type === "video" ? "MP4 video loop" : "project image"}
              </p>
              <p className="font-mono text-[10px] text-[var(--fg-3)] mt-0.5">
                {type === "video" ? "Supports MP4, WebM (Auto-compressed)" : "PNG, JPG, WebP"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Manual URL Input Fallback */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={type === "video" ? "Or paste Cloudinary / direct MP4 URL..." : "Or paste image path/URL..."}
          className="flex-1 px-3 py-1.5 rounded-xl hairline-all bg-[var(--surface)] font-mono text-[11px] text-[var(--fg)] outline-none focus:border-[var(--red)]"
        />
      </div>

      {/* Preset Quick-Buttons if provided */}
      {presetButtons && presetButtons.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] font-mono text-[var(--fg-muted)] self-center mr-1">Presets:</span>
          {presetButtons.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onChange(preset.url)}
              className="text-[10px] font-mono px-2 py-0.5 rounded hairline-all hover:bg-[var(--surface)] text-[var(--fg-3)] hover:text-[var(--fg)] transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}

      {/* Feedback Messages */}
      {uploadSuccess && (
        <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
          <FiCheckCircle className="w-3 h-3 flex-shrink-0" />
          <span>{uploadSuccess}</span>
        </p>
      )}

      {uploadError && (
        <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
          <FiAlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{uploadError}</span>
        </p>
      )}

      {helperText && (
        <p className="text-[10px] font-mono text-[var(--fg-3)]">{helperText}</p>
      )}
    </div>
  );
}
