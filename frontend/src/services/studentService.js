/**
 * studentService.js
 * 
 * This service handles all API communication with the backend.
 * Now updated to use REAL fetch calls to the Node.js server.
 */

// Accessing environment variables in Vite:
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to handle fetch responses and common errors
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    // Attempt to parse error message from backend
    let errorMessage = `HTTP Error: ${response.status}`;
    try {
      const data = await response.json();
      errorMessage = data.message || errorMessage;
    } catch (e) {
      // Not JSON, stick with status message
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

export const studentService = {
  // GET all students
  getAllStudents: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      return await handleResponse(response);
    } catch (error) {
      console.error("fetch students failed:", error);
      throw error;
    }
  },

  // ADD a new student
  addStudent: async (studentData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("create student failed:", error);
      throw error;
    }
  },

  // UPDATE an existing student
  updateStudent: async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("update student failed:", error);
      throw error;
    }
  },

  // DELETE a student
  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error("delete student failed:", error);
      throw error;
    }
  },

  // GET student by ID
  getStudentById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error("get student failed:", error);
      throw error;
    }
  },
};
