<template>
  <v-select
    :items="groups"
    label="Selecciona un grupo"
    @update:modelValue="selectGroup"
    variant="outlined"
  />
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['groupSelected'])

const groups = ref(['Grupo A', 'Grupo B', 'Grupo C'])

function selectGroup(group) {
  emit('groupSelected', group)
}
</script>
