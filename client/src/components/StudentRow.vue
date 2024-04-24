<script setup>

import { ref } from 'vue';

const props = defineProps({
    student: Object
});

const emit = defineEmits(['arrived-or-left', 'delete-student']);

const isStudentPresent = ref( props.student.present );

const notifyArrivedOrLeft = () => {
    emit('arrived-or-left', props.student, isStudentPresent.value);
};

const confirmThenDeleteStudent = () => {
    if (confirm(`Delete ${props.student.name}?`)) {
        emit('delete-student', props.student);
    }
};

</script>


<template>
    <tr :class="{ present: student.present, absent: !student.present }">
        <td>{{ student.name }}</td>
        <td>{{ student.starID }}</td>
        <td>
            <input type="checkbox" v-model="isStudentPresent" @change="notifyArrivedOrLeft">
            <span class="mx-3" v-if="student.present">Here!</span>
            <span class="mx-3" v-else>Not present</span>
        </td>
        <td>
            <button class="btn btn-danger" @click="confirmThenDeleteStudent">
                <i class="bi bi-trash-fill"></i> Delete
            </button>
        </td>
    </tr>
</template>


<style scoped>

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}

</style>
