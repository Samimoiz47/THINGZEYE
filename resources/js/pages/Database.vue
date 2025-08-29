<template>
  <AppLayout>
    <div class="min-h-screen bg-black text-white">
      <!-- Loading Animation -->
      <div v-if="loading" class="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div class="loading-animation">
          <div class="eye-loader"></div>
        </div>
      </div>

      <!-- Header with Title -->
      <header class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div class="relative container mx-auto px-6 py-12">
          <h1 class="thingzeye-title text-8xl font-bold text-center mb-8">
            THINGZEYE
          </h1>
          <p class="text-center text-xl text-gray-300 mb-8">
            Professional Database Management System
          </p>
        </div>
      </header>

      <!-- Navigation Buttons -->
      <nav class="sticky top-0 z-40 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-center space-x-4">
            <button 
              @click="showTools" 
              class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300 font-semibold"
            >
              Tools
            </button>
            <button 
              @click="showResearchPapers" 
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 font-semibold"
            >
              Research Papers
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="container mx-auto px-6 py-8">
        <!-- Database Overview -->
        <section v-if="!showingTools && !showingResearch" class="mb-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Database Stats -->
            <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 class="text-2xl font-bold mb-4 text-purple-400">Database Overview</h2>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Total Records</span>
                  <span class="text-2xl font-bold text-white">{{ databaseStats.totalRecords }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Active Tables</span>
                  <span class="text-2xl font-bold text-white">{{ databaseStats.activeTables }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-400">Last Updated</span>
                  <span class="text-white">{{ databaseStats.lastUpdated }}</span>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h2 class="text-2xl font-bold mb-4 text-blue-400">Recent Activity</h2>
              <div class="space-y-3">
                <div v-for="activity in recentActivity" :key="activity.id" 
                     class="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-sm text-gray-300">{{ activity.description }}</span>
                  <span class="text-xs text-gray-500 ml-auto">{{ activity.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tools Section -->
        <section v-if="showingTools" class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-purple-400">Development Tools</h2>
            <button 
              @click="sortToolsAlphabetically" 
              class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300"
            >
              Sort A-Z
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="tool in sortedTools" :key="tool.id" 
                 class="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-600 transition-all duration-300">
              <div class="mb-4">
                <img :src="tool.image" :alt="tool.name" class="w-full h-32 object-cover rounded-lg">
              </div>
              <h3 class="text-xl font-bold mb-2 text-white">{{ tool.name }}</h3>
              <p class="text-gray-400 text-sm mb-4">{{ tool.description }}</p>
              <button class="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <!-- Research Papers Section -->
        <section v-if="showingResearch" class="mb-12">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-bold text-blue-400">Research Papers</h2>
            <button 
              @click="sortPapersAlphabetically" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300"
            >
              Sort A-Z
            </button>
          </div>
          
          <div class="space-y-6">
            <div v-for="paper in sortedPapers" :key="paper.id" 
                 class="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-blue-600 transition-all duration-300">
              <div class="flex items-start space-x-4">
                <img :src="paper.thumbnail" :alt="paper.title" class="w-24 h-32 object-cover rounded-lg">
                <div class="flex-1">
                  <h3 class="text-xl font-bold mb-2 text-white">{{ paper.title }}</h3>
                  <p class="text-gray-400 text-sm mb-2">{{ paper.authors }}</p>
                  <p class="text-gray-500 text-xs mb-4">{{ paper.abstract }}</p>
                  <div class="flex space-x-2">
                    <span class="px-3 py-1 bg-blue-600 rounded-full text-xs">{{ paper.year }}</span>
                    <span class="px-3 py-1 bg-gray-700 rounded-full text-xs">{{ paper.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-gray-900 border-t border-gray-800">
        <div class="container mx-auto px-6 py-8">
          <div class="text-center">
            <p class="text-gray-400">&copy; 2024 THINGZEYE. Professional Database Management System.</p>
          </div>
        </div>
      </footer>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'

const loading = ref(false)
const showingTools = ref(false)
const showingResearch = ref(false)

// Database statistics
const databaseStats = ref({
  totalRecords: 15420,
  activeTables: 8,
  lastUpdated: '2 hours ago'
})

// Recent activity
const recentActivity = ref([
  { id: 1, description: 'New user record added', time: '5 min ago' },
  { id: 2, description: 'Database backup completed', time: '1 hour ago' },
  { id: 3, description: 'Index optimization performed', time: '2 hours ago' }
])

// Tools data
const tools = ref([
  {
    id: 1,
    name: 'Database Analyzer',
    description: 'Advanced SQL query analyzer with performance insights',
    image: '/images/tools/analyzer.jpg'
  },
  {
    id: 2,
    name: 'Schema Designer',
    description: 'Visual database schema design and modeling tool',
    image: '/images/tools/designer.jpg'
  },
  {
    id: 3,
    name: 'Migration Manager',
    description: 'Database migration and version control system',
    image: '/images/tools/migration.jpg'
  }
])

// Research papers data
const papers = ref([
  {
    id: 1,
    title: 'Advanced Database Optimization Techniques',
    authors: 'Dr. Sarah Johnson, Prof. Michael Chen',
    abstract: 'Comprehensive study on modern database optimization strategies...',
    thumbnail: '/images/papers/optimization.jpg',
    year: '2024',
    category: 'Database'
  },
  {
    id: 2,
    title: 'Machine Learning in Database Management',
    authors: 'Dr. Emily Rodriguez, Dr. James Wilson',
    abstract: 'Exploring AI-driven approaches to database management...',
    thumbnail: '/images/papers/ml-database.jpg',
    year: '2024',
    category: 'AI/ML'
  }
])

// Computed properties for sorting
const sortedTools = computed(() => {
  return [...tools.value].sort((a, b) => a.name.localeCompare(b.name))
})

const sortedPapers = computed(() => {
  return [...papers.value].sort((a, b) => a.title.localeCompare(b.title))
})

// Methods
const showTools = () => {
  showingTools.value = true
  showingResearch.value = false
}

const showResearchPapers = () => {
  showingResearch.value = true
  showingTools.value = false
}

const sortToolsAlphabetically = () => {
  tools.value = sortedTools.value
}

const sortPapersAlphabetically = () => {
  papers.value = sortedPapers.value
}
</script>

<style scoped>
.thingzeye-title {
  background: linear-gradient(45deg, #8B5CF6, #3B82F6, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  }
  to {
    text-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6);
  }
}

.eye-loader {
  width: 60px;
  height: 60px;
  border: 3px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  border-top-color: #8B5CF6;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-animation {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
