<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import Header from './pages/common/Header.vue'
import ManagerSidebar from './pages/common/Sidebar/ManagerSidebar.vue'
import MosqueSidebar from './pages/common/Sidebar/MosqueSidebar.vue'
import ExecutiveSidebar from './pages/common/Sidebar/ExecutiveSidebar.vue'


const isSidebarOpen = ref(true)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const route = useRoute()
const hideLayout = computed(() => route.meta?.hideLayout === true)

const role = ref(JSON.parse(localStorage.getItem('userInfo'))?.role || 'manager')

const sidebarComponent = computed(() => {
  switch (role.value) {
    case 'manager':
      return ManagerSidebar
    case 'executive':
      return ExecutiveSidebar
    case 'mosque':
      return MosqueSidebar
  }
})
</script>

<template>
  <div>
    <Header v-if="!hideLayout" @toggle-sidebar="toggleSidebar" />

    <div class="flex" :class="{ 'pt-16': !hideLayout }">
 
      <component
        v-if="!hideLayout"
        :is="sidebarComponent"
        :isOpen="isSidebarOpen"
      />

      <main
        class="flex-1 min-h-screen transition-all duration-300"
        :class="{
          'ml-0': !isSidebarOpen || hideLayout,
          'ml-64': isSidebarOpen && !hideLayout
        }"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>
