"use client";
import type { Teacher } from "@/lib/types";

interface Props {
  teacher: Teacher;
  onEdit: () => void;
  onDelete: () => void;
}

export default function TeacherCard({ teacher, onEdit, onDelete }: Props) {
  return (
    <div className="card animate-fade-in-up">
      <div className="teacher-card-header">
        <img
          src={teacher.avatar || "/placeholder.svg?height=80&width=80"}
          alt={teacher.name}
          className="teacher-avatar"
        />
        <div className="teacher-info">
          <h3>{teacher.name}</h3>
          <div className="teacher-email">
            <span style={{ fontSize: "16px" }}>📧</span>
            <span>{teacher.email}</span>
          </div>
        </div>
      </div>

      <div className="subjects-section">
        <div className="subjects-label">
          <span style={{ fontSize: "16px" }}>📚</span>
          <span>Subjects</span>
        </div>
        <div className="subjects-list">
          {teacher.subjects.map((subject) => (
            <span key={subject} className="subject-tag">
              {subject}
            </span>
          ))}
        </div>
      </div>

      <div className="card-actions">
        <button onClick={onEdit} className="btn-edit">
          <span style={{ fontSize: "16px" }}>✏️</span>
          <span>Edit</span>
        </button>
        <button onClick={onDelete} className="btn-delete">
          <span style={{ fontSize: "16px" }}>🗑️</span>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
