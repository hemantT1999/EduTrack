"use client";
import { useState, useEffect } from "react";
import type React from "react";
import type { Teacher } from "@/lib/types";

interface Props {
  onSubmit: (data: Omit<Teacher, "id">) => void;
  initial?: Omit<Teacher, "id"> | null;
  loading?: boolean;
  error?: string | null;
  success?: boolean;
  onCancel?: () => void;
}

export default function TeacherForm({
  onSubmit,
  initial,
  loading,
  error,
  success,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Omit<Teacher, "id">>(
    initial || { name: "", email: "", subjects: [], avatar: "" }
  );

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubjects(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      subjects: e.target.value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    onSubmit(form);
  }

  const isValid = form.name.trim() && form.email.trim();

  return (
    <div className="form-container animate-fade-in-up">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">
            {initial ? "Edit Teacher" : "Add New Teacher"}
          </h2>
          <p style={{ color: "#4a5568" }}>
            Fill in the details below to {initial ? "update" : "create"} a
            teacher profile
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <span style={{ fontSize: "16px" }}>👤</span>
                <span>
                  Full Name<span style={{ color: "#e53e3e" }}>*</span>
                </span>
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter teacher's full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span style={{ fontSize: "16px" }}>📧</span>
                <span>
                  Email Address<span style={{ color: "#e53e3e" }}>*</span>
                </span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
                placeholder="teacher@school.edu"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span style={{ fontSize: "16px" }}>📚</span>
              <span>Subjects (comma separated)</span>
            </label>
            <input
              name="subjects"
              type="text"
              value={form.subjects.join(", ")}
              onChange={handleSubjects}
              className="form-input"
              placeholder="Math, Physics, Chemistry"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <span style={{ fontSize: "16px" }}>🖼️</span>
              <span>Avatar URL</span>
            </label>
            <input
              name="avatar"
              type="url"
              value={form.avatar}
              onChange={handleChange}
              className="form-input"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {error && (
            <div className="message error">
              <span style={{ fontSize: "18px" }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="message success">
              <span style={{ fontSize: "18px" }}>✅</span>
              <span>Teacher saved successfully! ✨</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={!isValid || loading}
              className="btn-submit"
            >
              {loading ? "Saving..." : "Save Teacher"}
            </button>

            {onCancel && (
              <button type="button" onClick={onCancel} className="btn-cancel">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
