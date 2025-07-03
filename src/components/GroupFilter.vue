<template>
  <v-select
    :items="groups"
    label="Selecciona un grupo"
    @update:modelValue="selectGroup"
    variant="outlined"
  />
</template>

<script setup>
defineProps({
  groups: Array // <- recibe lista desde el Dashboard
})

const emit = defineEmits(['groupSelected'])

function selectGroup(group) {
  emit('groupSelected', group)
}
</script>
