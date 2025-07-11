"use client";
import { useState } from "react";
import type { Teacher } from "@/lib/types";
import TeacherCard from "@/components/TeacherCard";
import TeacherForm from "@/components/Teacherform";
const initialTeachers: Teacher[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@school.edu",
    subjects: ["Math", "Physics"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@school.edu",
    subjects: ["English", "History"],
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya@school.edu",
    subjects: ["Chemistry", "Biology"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@school.edu",
    subjects: ["Computer Science", "Math"],
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    id: "5",
    name: "Maria Garcia",
    email: "maria@school.edu",
    subjects: ["Spanish", "Art"],
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    id: "6",
    name: "John Miller",
    email: "john@school.edu",
    subjects: ["Physical Education"],
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formState, setFormState] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({ loading: false, error: null, success: false });

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  function handleSubmit(data: Omit<Teacher, "id">) {
    setFormState({ loading: true, error: null, success: false });
    setTimeout(() => {
      if (editing) {
        setTeachers((prev) =>
          prev.map((t) => (t.id === editing.id ? { ...t, ...data } : t))
        );
      } else {
        setTeachers((prev) => [
          ...prev,
          { ...data, id: (prev.length + 1).toString() },
        ]);
      }
      setFormState({ loading: false, error: null, success: true });
      setEditing(null);
      setShowForm(false);
      setTimeout(() => setFormState((s) => ({ ...s, success: false })), 2000);
    }, 1200);
  }

  function handleEdit(teacher: Teacher) {
    setEditing(teacher);
    setShowForm(true);
    setFormState({ loading: false, error: null, success: false });
  }

  function handleDelete(teacher: Teacher) {
    if (window.confirm(`Are you sure you want to delete ${teacher.name}?`)) {
      setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
    }
  }

  function handleCancel() {
    setEditing(null);
    setShowForm(false);
    setFormState({ loading: false, error: null, success: false });
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="container">
          {/* Header */}
          <div className="page-header animate-fade-in-up">
            <h1 className="page-title">
              <span style={{ fontSize: "48px" }}>👥</span>
              <span>Teacher Management</span>
            </h1>
            <p className="page-subtitle">
              Manage your teaching staff with our intuitive and powerful
              interface
            </p>
          </div>

          {/* Controls */}
          <div className="controls animate-fade-in-up">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search teachers by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <button onClick={() => setShowForm(!showForm)} className="btn-add">
              <span style={{ fontSize: "18px" }}>➕</span>
              <span>Add Teacher</span>
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <TeacherForm
              onSubmit={handleSubmit}
              initial={
                editing
                  ? {
                      name: editing.name,
                      email: editing.email,
                      subjects: editing.subjects,
                      avatar: editing.avatar,
                    }
                  : undefined
              }
              loading={formState.loading}
              error={formState.error}
              success={formState.success}
              onCancel={handleCancel}
            />
          )}

          {/* Stats */}
          <div className="stats-grid animate-fade-in-up">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{teachers.length}</div>
              <div className="stat-label">Total Teachers</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-number">{filteredTeachers.length}</div>
              <div className="stat-label">Filtered Results</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-number">
                {
                  Array.from(new Set(teachers.flatMap((t) => t.subjects)))
                    .length
                }
              </div>
              <div className="stat-label">Unique Subjects</div>
            </div>
          </div>

          {/* Teachers Grid */}
          <div className="animate-fade-in-up">
            <h2 className="section-header">
              {searchTerm
                ? `Search Results (${filteredTeachers.length})`
                : "All Teachers"}
            </h2>

            {filteredTeachers.length === 0 ? (
              <div className="empty-state">
                <div className="empty-card">
                  <div className="empty-icon">👥</div>
                  <h3 className="empty-title">
                    {searchTerm ? "No teachers found" : "No teachers yet"}
                  </h3>
                  <p className="empty-description">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Get started by adding your first teacher"}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn-primary"
                    >
                      Add First Teacher
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="cards-grid">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard
                    key={teacher.id}
                    teacher={teacher}
                    onEdit={() => handleEdit(teacher)}
                    onDelete={() => handleDelete(teacher)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
