const Student = require('../models/student.model');
const { readData, writeData } = require('../utils/fs');
const ApiError = require('../utils/ApiError');

let students = readData(); // in-memory load

const generateId = () => Date.now().toString();

exports.createStudent = async (data) => {
  const newStudent = new Student({
    id: generateId(),
    ...data
  });

  students.push(newStudent);
  writeData(students);

  return newStudent;
};

exports.getAllStudents = async ({ page = 1, limit = 5, search = '' }) => {
  let filtered = students;

  if (search) {
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + Number(limit));

  return {
    total: filtered.length,
    page: Number(page),
    data: paginated
  };
};

exports.getStudentById = async (id) => {
  const student = students.find(s => s.id === id);
  if (!student) throw new ApiError(404, 'Student not found');
  return student;
};

exports.updateStudent = async (id, data) => {
  const index = students.findIndex(s => s.id === id);

  if (index === -1) throw new ApiError(404, 'Student not found');

  students[index] = { ...students[index], ...data };
  writeData(students);

  return students[index];
};

exports.deleteStudent = async (id) => {
  const index = students.findIndex(s => s.id === id);

  if (index === -1) throw new ApiError(404, 'Student not found');

  const deleted = students.splice(index, 1);
  writeData(students);

  return deleted[0];
};