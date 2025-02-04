CREATE DATABASE IF NOT EXISTS school_exam_management;

USE school_exam_management;

CREATE TABLE IF NOT EXISTS classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(255), 
    stream VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin(
    name VARCHAR(255),
    phonenumber VARCHAR(12) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    class_id INT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS class_teachers (
    name VARCHAR(255),
    phonenumber VARCHAR(12) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    class_id INT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS teachers (
    name VARCHAR(255),
    phonenumber VARCHAR(12) PRIMARY KEY,
    email VARCHAR(255) UNIQUE, 
    class_id INT,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS subjects(
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(255),
    subject_code VARCHAR(255),
    subject_category ENUM('sciences', 'social', 'languages', 'technicals') NOT NULL DEFAULT 'sciences',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS teacher_subjects (
    phonenumber VARCHAR(12),
    subject_id INT,
    PRIMARY KEY (phonenumber , subject_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (phonenumber) REFERENCES teachers(phonenumber),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

CREATE TABLE IF NOT EXISTS students (
    admission_number VARCHAR(30) PRIMARY KEY,
    name VARCHAR(255),
    class_id INT, 
    stream VARCHAR(255),
    current_form VARCHAR(10), 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

CREATE TABLE IF NOT EXISTS exams(
    exam_id INT PRIMARY KEY,
    exam_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS student_exams_subjects(
    exam_id INT,
    subject_id INT,
    admission_number VARCHAR(30), -- Added admission_number
    marks DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (exam_id, subject_id, admission_number), -- Composite key
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (admission_number) REFERENCES students(admission_number)
);

CREATE TABLE IF NOT EXISTS teacher_class (
    phonenumber VARCHAR(12),
    class_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (phonenumber , class_id), 
    FOREIGN KEY (phonenumber) REFERENCES teachers(phonenumber),
    FOREIGN KEY (class_id) REFERENCES teachers(class_id)
);

CREATE TABLE IF NOT EXISTS admin_class (
    phonenumber VARCHAR(12),
    class_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (phonenumber, class_id), 
    FOREIGN KEY (phonenumber) REFERENCES admin(phonenumber),
    FOREIGN KEY (class_id) REFERENCES admin(class_id)
);

CREATE TABLE IF NOT EXISTS class_teacher_class (
    phonenumber VARCHAR(12),
    class_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (phonenumber , class_id), 
    FOREIGN KEY (phonenumber) REFERENCES class_teachers(phonenumber),
    FOREIGN KEY (class_id) REFERENCES class_teachers(class_id)
);

CREATE INDEX idx_student_exams_subjects_exam_id ON student_exams_subjects (exam_id);

CREATE INDEX idx_student_exams_subjects_subject_id ON student_exams_subjects (admission_number);

CREATE INDEX idx_student_exams_subjects_student_id ON student_exams_subjects (admission_number);

CREATE INDEX idx_student_exams_subjects_composite ON student_exams_subjects (exam_id, subject_id, admission_number);

CREATE INDEX idx_teachers_subjects_teacher_id ON teacher_subjects (phonenumber);

CREATE INDEX idx_teachers_subjects_subject_id ON teacher_subjects (subject_id);

CREATE INDEX idx_teacher_class_teacher_id ON teacher_class (phonenumber);

CREATE INDEX idx_teacher_class_class_id ON teacher_class (class_id);

CREATE INDEX idx_admin_class_admin_id ON admin_class (phonenumber);

CREATE INDEX idx_admin_class_class_id ON admin_class (class_id);

CREATE INDEX idx_class_teacher_class_teacher_id ON class_teacher_class (phonenumber);

CREATE INDEX idx_class_teacher_class_class_id ON class_teacher_class (class_id);

CREATE INDEX idx_students_class_id ON students (class_id);