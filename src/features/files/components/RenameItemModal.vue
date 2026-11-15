<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: null
  },
  error: {
    type: String,
    default: ''
  },
  isSaving: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'submit']);

const newName = ref('');

watch(() => props.item, (item) => {
  newName.value = item?.name || '';
}, { immediate: true });

const handleSubmit = () => {
  const trimmedName = newName.value.trim();
  if (!trimmedName) return;

  emit('submit', {
    id: props.item?.id,
    newName: trimmedName,
    isFolder: props.item?.type === 'folder'
  });
};
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-[120] flex items-center justify-center bg-black/30 p-4" @click.self="emit('close')">
    <form @submit.prevent="handleSubmit" class="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-bold text-[#21201a]">Renombrar {{ item?.type === 'folder' ? 'carpeta' : 'archivo' }}</h2>
      <p class="mt-1 text-sm text-[#49473f]">Ingresa el nuevo nombre para {{ item?.name || 'este elemento' }}.</p>

      <input
        v-model="newName"
        autofocus
        required
        maxlength="255"
        placeholder="Nuevo nombre"
        class="mt-5 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-1 focus:ring-[#0059ba]"
      />

      <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>

      <div class="mt-6 flex justify-end gap-3">
        <button type="button" @click="emit('close')" class="rounded-lg px-4 py-2 text-sm hover:bg-gray-100">Cancelar</button>
        <button type="submit" :disabled="isSaving" class="rounded-lg bg-[#0059ba] px-4 py-2 text-sm font-medium text-white disabled:opacity-60">
          {{ isSaving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </form>
  </div>
</template>
