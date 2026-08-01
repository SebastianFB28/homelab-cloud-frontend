<script setup> 
import { ref, computed, onMounted, onUnmounted } from 'vue'; 
import { useAdminStore } from '../store/adminStore.js';
import AdminUserInfoModal from './AdminUserInfoModal.vue';
import AdminChangeStatusModal from './AdminChangeStatusModal.vue';
import AdminUpdatePlanModal from './AdminUpdatePlanModal.vue';

const adminStore = useAdminStore();

// --- ESTADOS Y FILTROS ---
const searchQuery = ref(''); 
const selectedStatusFilter = ref('APPROVED'); // Por defecto filtrado en APROBADO
const showFilterMenu = ref(false);
const activeMenuUserId = ref(null);

// Mapeo de estados para UI (Etiquetas y Colores)
const statusConfig = {
  APPROVED: { label: 'Aprobado', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  PENDING: { label: 'Pendiente', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  BANNED: { label: 'Baneado', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  REJECTED: { label: 'Rechazado', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
};

// --- Cargar datos del Backend ---
const loadUsers = async (status) => {
  await adminStore.fetchUsersByStatus(status);
};

onMounted(() => {
  loadUsers(selectedStatusFilter.value);
  window.addEventListener('click', closeDropdowns);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdowns);
});

// --- COMPUTED: FILTRADO LOCAL POR BUSCADOR ---
const filteredUsers = computed(() => {
  const users = Array.isArray(adminStore.users) ? adminStore.users : [];

  return users.filter(user => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return true;

    const name = (user.nickname || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    const id = (user.id || '').toLowerCase();

    return name.includes(query) || email.includes(query) || id.includes(query);
  });
});

// --- MÉTODOS DE INTERACCIÓN ---
const setStatusFilter = async (status) => {
  selectedStatusFilter.value = status;
  showFilterMenu.value = false;
  await loadUsers(status);
};

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const toggleActionMenu = (userId) => {
  if (activeMenuUserId.value === userId) {
    activeMenuUserId.value = null;
  } else {
    activeMenuUserId.value = userId;
  }
};

// --- ACCIONES A IMPLEMENTAR LUEGO CON MODALES ---
const handlePermanentDelete = (user) => {
  if (confirm(`¿Estás seguro de eliminar permanentemente a ${user.nickname || user.email}?`)) {
    activeMenuUserId.value = null;
  }
};

const closeDropdowns = (e) => {
  if (!e.target.closest('.relative-dropdown')) {
    showFilterMenu.value = false;
    activeMenuUserId.value = null;
  }
};

const selectedUserForInfo = ref(null);
const selectedUserForStatus = ref(null);

const openInfoModal = (user) => {
  activeMenuUserId.value = null;
  selectedUserForInfo.value = user;
};

const openChangeStatusModal = (user) => {
  activeMenuUserId.value = null;
  selectedUserForStatus.value = user;
};

const handleSaveUserInfo = async ({ userId, data, onComplete }) => {
  try {
    await adminStore.updateUser(userId, data);
    selectedUserForInfo.value = null;
    await loadUsers(selectedStatusFilter.value);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    alert(error.response?.data?.message || 'Error al actualizar el usuario');
  } finally {
    onComplete?.();
  }
};

const handleSaveUserStatus = async ({ userId, newStatus, onComplete }) => {
  try {
    console.log('[AdminApprovedUsersTable] handleSaveUserStatus ->', { userId, newStatus });
    await adminStore.updateUserStatus(userId, newStatus);
    selectedUserForStatus.value = null;
    await loadUsers(selectedStatusFilter.value);
  } catch (error) {
    console.error('[AdminApprovedUsersTable] Error al cambiar el estado:', error);
    alert(error.response?.data?.message || 'Error al cambiar el estado');
  } finally {
    onComplete?.();
  }
};

// 2. CREAR LA REFERENCIA
const selectedUserForPlan = ref(null);

// 3. ACTUALIZAR LA FUNCIÓN DE ABRIR
const openPlanModal = (user) => {
  activeMenuUserId.value = null;
  selectedUserForPlan.value = user; // 💡 Reemplazamos el alert()
};

// 4. CREAR LA FUNCIÓN DE GUARDADO
const handleSaveUserPlan = async ({ userId, storagePlan, onComplete }) => {
  try {
    console.log('[AdminApprovedUsersTable] handleSaveUserPlan ->', { userId, storagePlan });
    await adminStore.updateUserStoragePlan(userId, storagePlan);
    selectedUserForPlan.value = null; // Cerramos el modal
    // Opcional: Recargar la tabla si lo consideras necesario
    // await loadUsers(selectedStatusFilter.value); 
  } catch (error) {
    console.error('[AdminApprovedUsersTable] Error al cambiar el plan:', error);
    alert(error.response?.data?.message || 'Error al cambiar el plan');
  } finally {
    onComplete?.();
  }
};

</script> 

<template> 
  <div class="font-['Inter']"> 
    <div class="mb-8"> 
      <h1 class="text-2xl font-bold text-[#1a1c1c]">Configuración de Usuarios</h1> 
      <p class="text-sm text-[#49473f] mt-1">Administra el acceso, roles y estados de los usuarios del sistema.</p> 
    </div> 

    <!-- Barra de Búsqueda y Filtro --> 
    <div class="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-[#EDEDED] shadow-sm"> 
      <div class="relative w-full max-w-md"> 
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#37352F]/40 text-[20px]">search</span> 
        <input  
          v-model="searchQuery" 
          class="w-full bg-[#F7F7F5] border border-transparent rounded-lg py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-[#0059ba]/30 focus:ring-2 focus:ring-[#0059ba]/10 transition-all placeholder:text-[#37352F]/40 outline-none"  
          placeholder="Buscar por nickname, email o ID..."  
          type="text"  
        /> 
      </div> 
       
      <!-- Desplegable de Filtro de Estado -->
      <div class="relative relative-dropdown"> 
        <button 
          @click.stop="showFilterMenu = !showFilterMenu"
          class="flex items-center gap-2 px-4 py-2 border border-[#EDEDED] rounded-lg text-sm font-medium text-[#49473f] hover:bg-[#F7F7F5] transition-colors"
        > 
          <span class="material-symbols-outlined text-[18px]">filter_list</span> 
          <span>Filtrar: <strong class="text-black">{{ statusConfig[selectedStatusFilter]?.label }}</strong></span>
          <span class="material-symbols-outlined text-[18px]">expand_more</span>
        </button> 

        <div 
          v-if="showFilterMenu" 
          class="absolute right-0 mt-2 w-48 bg-white border border-[#EDEDED] rounded-xl shadow-lg z-30 py-1 font-sans text-sm"
        >
          <div class="px-3 py-1.5 text-[11px] font-semibold text-[#737267] uppercase tracking-wider">Filtrar por Estado</div>
          <button 
            v-for="(config, key) in statusConfig" 
            :key="key"
            @click="setStatusFilter(key)"
            class="w-full text-left px-3 py-2 hover:bg-[#F7F7F5] flex items-center justify-between transition-colors"
            :class="{ 'bg-[#F7F7F5] font-semibold text-[#0059ba]': selectedStatusFilter === key }"
          >
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="config.dot"></span>
              <span>{{ config.label }}</span>
            </div>
            <span v-if="selectedStatusFilter === key" class="material-symbols-outlined text-[16px]">check</span>
          </button>
        </div>
      </div> 
    </div> 

    <!-- Tabla de Usuarios --> 
    <div class="bg-white rounded-xl border border-[#EDEDED] shadow-sm overflow-hidden min-h-[300px]"> 
      <table class="w-full text-left border-collapse"> 
        <thead> 
          <tr class="bg-[#F7F7F5] text-[#49473f] text-[13px] uppercase tracking-wider border-b border-[#EDEDED]"> 
            <th class="px-6 py-4 font-semibold">Usuario</th> 
            <th class="px-6 py-4 font-semibold">Rol</th> 
            <th class="px-6 py-4 font-semibold">Fecha Creación</th> 
            <th class="px-6 py-4 font-semibold">Estado</th> 
            <th class="px-6 py-4 font-semibold text-right">Acciones</th> 
          </tr> 
        </thead> 

        <tbody class="divide-y divide-[#EDEDED]"> 
          <!-- ESTADO CARGANDO -->
          <tr v-if="adminStore.isLoading">
            <td colspan="5" class="px-6 py-12 text-center text-[#737267]">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#0059ba] border-r-transparent mb-2"></div>
              <p class="text-sm">Cargando usuarios del servidor...</p>
            </td>
          </tr>

          <!-- ESTADO ERROR -->
          <tr v-else-if="adminStore.error">
            <td colspan="5" class="px-6 py-12 text-center text-red-600">
              <span class="material-symbols-outlined text-[36px] mb-2">error</span>
              <p class="text-sm font-medium">{{ adminStore.error }}</p>
            </td>
          </tr>

          <!-- SIN RESULTADOS -->
          <tr v-else-if="filteredUsers.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-[#737267]">
              <span class="material-symbols-outlined text-[36px] text-gray-300 mb-2">person_search</span>
              <p class="text-sm">No se encontraron usuarios para la selección actual.</p>
            </td>
          </tr>

          <!-- LISTA REAL DE USUARIOS -->
          <tr v-else v-for="user in filteredUsers" :key="user.id" class="hover:bg-[#fcfcfc] transition-colors"> 
            <td class="px-6 py-4"> 
              <div class="flex items-center gap-3"> 
                <div class="h-8 w-8 rounded-full bg-[#0059ba] text-white flex items-center justify-center font-bold text-xs"> 
                  {{ (user.nickname || user.email).charAt(0).toUpperCase() }} 
                </div> 
                <div> 
                  <p class="font-medium text-[#1a1c1c] text-sm">{{ user.nickname || 'Sin Nickname' }}</p> 
                  <p class="text-xs text-[#737267]">{{ user.email }}</p> 
                </div> 
              </div> 
            </td> 

            <td class="px-6 py-4"> 
              <span class="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-[11px] font-semibold tracking-wide"> 
                {{ user.role }} 
              </span> 
            </td> 

            <td class="px-6 py-4 text-sm text-[#49473f]">{{ formatDate(user.createdAt) }}</td> 

            <td class="px-6 py-4"> 
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" :class="[statusConfig[user.status]?.bg, statusConfig[user.status]?.text]"> 
                <span class="w-1.5 h-1.5 rounded-full" :class="statusConfig[user.status]?.dot"></span> 
                <span>{{ statusConfig[user.status]?.label || user.status }}</span> 
              </div> 
            </td> 

            <!-- Acciones -->
            <td class="px-6 py-4 text-right relative relative-dropdown"> 
              <button 
                @click.stop="toggleActionMenu(user.id)"
                class="text-[#737267] hover:text-[#0059ba] p-1.5 rounded-md hover:bg-[#F7F7F5] transition-colors"
              > 
                <span class="material-symbols-outlined text-[20px]">more_vert</span> 
              </button> 

              <div 
                v-if="activeMenuUserId === user.id" 
                class="absolute right-6 top-12 w-48 bg-white border border-[#EDEDED] rounded-xl shadow-lg z-40 py-1.5 text-left text-sm"
              >
                <!-- APROBADOS: Info, Plan, Cambiar Estado -->
                <template v-if="user.status === 'APPROVED'">
                  <button @click="openInfoModal(user)" class="w-full text-left px-4 py-2 hover:bg-[#F7F7F5] flex items-center gap-2 text-[#1a1c1c]">
                    <span class="material-symbols-outlined text-[18px] text-gray-500">info</span>
                    Info
                  </button>
                  <button @click="openPlanModal(user)" class="w-full text-left px-4 py-2 hover:bg-[#F7F7F5] flex items-center gap-2 text-[#1a1c1c]">
                    <span class="material-symbols-outlined text-[18px] text-gray-500">credit_card</span>
                    Plan
                  </button>
                  <button @click="openChangeStatusModal(user)" class="w-full text-left px-4 py-2 hover:bg-[#F7F7F5] flex items-center gap-2 text-[#1a1c1c]">
                    <span class="material-symbols-outlined text-[18px] text-gray-500">swap_horiz</span>
                    Cambiar Estado
                  </button>
                </template>

                <!-- OTROS ESTADOS: Solo Cambiar Estado -->
                <template v-else-if="user.status !== 'DELETED'">
                  <button @click="openChangeStatusModal(user)" class="w-full text-left px-4 py-2 hover:bg-[#F7F7F5] flex items-center gap-2 text-[#1a1c1c]">
                    <span class="material-symbols-outlined text-[18px] text-gray-500">swap_horiz</span>
                    Cambiar Estado
                  </button>
                </template>
              </div>
            </td> 
          </tr> 
        </tbody> 
        
      </table> 
    </div> 
    <!-- Modal de Información / Edición -->
<AdminUserInfoModal 
  v-if="selectedUserForInfo" 
  :user="selectedUserForInfo" 
  @close="selectedUserForInfo = null" 
  @save="handleSaveUserInfo" 
/>

<AdminChangeStatusModal
  v-if="selectedUserForStatus"
  :user="selectedUserForStatus"
  @close="selectedUserForStatus = null"
  @save="handleSaveUserStatus"
/>

<AdminUpdatePlanModal
      v-if="selectedUserForPlan"
      :user="selectedUserForPlan"
      @close="selectedUserForPlan = null"
      @save="handleSaveUserPlan"
    />
  </div> 
</template>