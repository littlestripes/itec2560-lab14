import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { mande } from 'mande';

const studentAPI = mande('api/students');

export const useStudentStore = defineStore('students', () => {
    
    const sortedStudents = ref([]);
    const mostRecentStudent = ref({});
    const addNewStudentErrors = ref([]);

    function getAllStudents() { 
        studentAPI.get().then( students => {
            sortedStudents.value = students;
        });
    }

    function addNewStudent(student) {
        //sortedStudents.value.push(student);
        studentAPI.post(student).then( resp => {
            getAllStudents();
        }).catch( err => {
            addNewStudentErrors.value = err.body;
        });
    }

    function deleteStudent(studentToDelete) {
        //sortedStudents.value = sortedStudents.value.filter((student) => {
            //// check by ID this time
            //return studentToDelete.starID != student.starID;
        //});
        //mostRecentStudent.value = {};

        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`);
        deleteStudentAPI.delete().then( () => {
            getAllStudents();
        });
    }

    function arrivedOrLeft(student) {
        // form URL with object ID from db
        const editStudentAPI = mande(`/api/students/${student.id}`);
        editStudentAPI.patch(student).then( () => {
            // fetch all students after request completes
            getAllStudents();
        });
    }

    const studentCount = computed(() => {
        return sortedStudents.value.length;
    });

    return {
        sortedStudents,
        mostRecentStudent,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        studentCount,
        getAllStudents,
        addNewStudentErrors
    };

});
