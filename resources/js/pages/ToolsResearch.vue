<template>
<AppHeaderSidebarLayout :performSearch="performSearch">
    <div class="min-h-screen bg-black text-white">
      <!-- Main Content -->
      <div class="container mx-auto px-4 py-8">
        <!-- Title -->
        <h1 class="text-4xl md:text-6xl font-bold text-center mb-8">
          THINGZEYE
        </h1>
        
        <!-- Subtitle -->
        <p class="red-neon-text text-xl text-center mb-12">
          Advanced Database Tools & Research Platform
        </p>

        <!-- Search Input -->
        <div class="flex justify-center mb-6">
          <div class="relative w-full max-w-md" v-if="showSearchInput">
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search tools and papers..."
              class="w-full px-4 py-3 bg-gray-800 text-white border border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent red-neon-input"
              @keyup.enter="executeSearch"
              @blur="hideSearchInput"
            />
            <button
              @click="clearSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400"
            >
              <Icon name="x" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mb-8">
          <div class="bg-gray-900 rounded-lg p-1 flex">
            <button 
              @click="activeTab = 'tools'" 
              :class="[
                'px-6 py-2 rounded-md font-semibold transition-colors',
                activeTab === 'tools' 
                  ? 'bg-red-600 text-white red-neon-button' 
                  : 'text-gray-400 hover:text-white'
              ]"
            >
              Tools
            </button>
            <button 
              @click="activeTab = 'research'" 
              :class="[
                'px-6 py-2 rounded-md font-semibold transition-colors',
                activeTab === 'research' 
                  ? 'bg-red-600 text-white red-neon-button' 
                  : 'text-gray-400 hover:text-white'
              ]"
            >
              Research Papers
            </button>
          </div>
        </div>

        <!-- Tools Tab Content -->
        <div v-if="activeTab === 'tools'" class="space-y-8">
          <h2 class="text-2xl font-semibold red-neon-text">Database Tools</h2>
          
          <!-- Tools Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="tool in filteredTools" 
              :key="tool.id" 
              class="red-neon-card bg-gray-900 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div class="flex items-center mb-4">
                <Icon :name="tool.icon" class="w-8 h-8 text-red-400 mr-3" />
                <h3 class="text-lg font-semibold text-white">{{ tool.name }}</h3>
              </div>
              <p class="text-gray-300 text-sm mb-4">{{ tool.description }}</p>
              <div class="flex justify-between items-center">
                <span class="red-neon-tag px-3 py-1 bg-red-900 text-red-200 text-xs rounded-full">
                  {{ tool.category }}
                </span>
                <button class="red-neon-button px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Research Papers Tab Content -->
        <div v-if="activeTab === 'research'" class="space-y-8">
          <h2 class="text-2xl font-semibold red-neon-text">Research Papers</h2>
          
          <!-- Research Papers Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="paper in filteredPapers" 
              :key="paper.id" 
              class="red-neon-card bg-gray-900 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h3 class="text-lg font-semibold text-white mb-3">{{ paper.title }}</h3>
              <p class="text-gray-400 text-sm mb-4 line-clamp-3">{{ paper.abstract }}</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-300">
                  <Icon name="users" class="w-4 h-4 mr-2" />
                  {{ paper.authors }}
                </div>
                <div class="flex items-center text-sm text-gray-300">
                  <Icon name="calendar" class="w-4 h-4 mr-2" />
                  {{ paper.year }}
                </div>
                <div class="flex items-center text-sm text-gray-300">
                  <Icon name="tag" class="w-4 h-4 mr-2" />
                  {{ paper.category }}
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="red-neon-tag px-3 py-1 bg-red-900 text-red-200 text-xs rounded-full">
                  {{ paper.pages }} pages
                </span>
                <button class="red-neon-button px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                  Read Paper
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Drag and Drop Area -->
        <div class="mt-12">
          <div 
            class="drag-and-drop-area border-2 border-dashed rounded-xl p-8 text-center cursor-pointer"
            :class="{ 'drag-over': isDraggingOver }"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            @click="triggerFileInput"
          >
            <Icon name="upload-cloud" class="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 class="text-xl font-semibold mb-2">Upload Files</h3>
            <p class="text-gray-400">Drag and drop files here or click to browse</p>
            <p class="text-sm text-gray-500 mt-2">Supports PDF, DOCX, and image files</p>
          </div>
          
          <!-- Hidden file input -->
          <input 
            type="file" 
            class="hidden" 
            @change="handleFileSelect" 
            multiple 
            accept=".pdf,.docx,.jpg,.jpeg,.png,.gif"
          />
        </div>
      </div>
    </div>
  </AppHeaderSidebarLayout>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import AppHeaderSidebarLayout from '@/layouts/app/AppHeaderSidebarLayout.vue'
import Icon from '@/components/Icon.vue'
import axios from 'axios'
import '../../css/drag-drop-styles.css'

const activeTab = ref('tools')
const isSidebarOpen = ref(true)
const isDraggingOver = ref(false)
const searchQuery = ref('')
const showSearchInput = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)

// Handle drag over event
const handleDragOver = () => {
  isDraggingOver.value = true;
}

// Handle drag leave event
const handleDragLeave = () => {
  isDraggingOver.value = false;
}

// Handle drop event
const handleDrop = async (event: DragEvent) => {
  isDraggingOver.value = false;
  const files = event.dataTransfer?.files;
  
  if (!files || files.length === 0) return;

  // Add success animation
  const dropArea = event.currentTarget as HTMLElement;
  dropArea.classList.add('drop-success');

  try {
    await uploadFiles(files);
  } catch (error) {
    console.error('Upload failed:', error);
    alert('File upload failed. Please try again.');
  }

  // Remove success animation after it completes
  setTimeout(() => {
    dropArea.classList.remove('drop-success');
  }, 1000);
}

// Handle file selection from the button
const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  
  if (!files || files.length === 0) return;

  // Add success animation to the drop area
  const dropArea = document.querySelector('.drag-and-drop-area') as HTMLElement;
  if (dropArea) {
    dropArea.classList.add('drop-success');
  }

  try {
    await uploadFiles(files);
  } catch (error) {
    console.error('Upload failed:', error);
    alert('File upload failed. Please try again.');
  }

  // Remove success animation after it completes
  setTimeout(() => {
    if (dropArea) {
      dropArea.classList.remove('drop-success');
    }
  }, 1000);

  // Clear the input for future selections
  input.value = '';
}

// Upload files to backend
const uploadFiles = async (files: FileList) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i]);
  }

  const response = await axios.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted + '%');
        // Optionally, update a progress bar here
      }
    },
  });

  if (response.data.success) {
    alert('Files uploaded successfully!');
    // Optionally, refresh file list or UI here
  } else {
    throw new Error('Upload failed');
  }
}

// Tools data with more entries for better sorting demonstration
const tools = ref([
  {
    id: 1,
    name: 'Database Analyzer',
    description: 'Advanced SQL query analyzer with performance insights and optimization recommendations',
    category: 'Database',
    icon: 'database'
  },
  {
    id: 2,
    name: 'Schema Designer',
    description: 'Visual database schema design and modeling tool with ER diagram support',
    category: 'Design',
    icon: 'layout'
  },
  {
    id: 3,
    name: 'Migration Manager',
    description: 'Database migration and version control system with rollback capabilities',
    category: 'DevOps',
    icon: 'git-branch'
  },
  {
    id: 4,
    name: 'Query Builder',
    description: 'Visual SQL query builder with drag-and-drop interface',
    category: 'Development',
    icon: 'code'
  },
  {
    id: 5,
    name: 'Performance Monitor',
    description: 'Real-time database performance monitoring and alerting system',
    category: 'Monitoring',
    icon: 'activity'
  },
  {
    id: 6,
    name: 'Data Validator',
    description: 'Automated data validation and quality assurance tools',
    category: 'Quality',
    icon: 'check-circle'
  },
  {
    id: 7,
    name: 'Backup Manager',
    description: 'Automated backup and disaster recovery management system',
    category: 'Backup',
    icon: 'archive'
  },
  {
    id: 8,
    name: 'Security Scanner',
    description: 'Database security vulnerability scanner and compliance checker',
    category: 'Security',
    icon: 'shield'
  }
])

// Research papers data with more entries
const papers = ref([
  {
    id: 1,
    title: 'Advanced Database Optimization Techniques',
    authors: 'Dr. Sarah Johnson, Prof. Michael Chen',
    abstract: 'Comprehensive study on modern database optimization strategies including indexing, partitioning, and query optimization techniques for large-scale databases.',
    year: '2024',
    category: 'Database',
    tags: 'Optimization, Performance',
    pages: 45
  },
  {
    id: 2,
    title: 'Machine Learning in Database Management',
    authors: 'Dr. Emily Rodriguez, Dr. James Wilson',
    abstract: 'Exploring AI-driven approaches to database management including automated query optimization, predictive maintenance, and intelligent indexing strategies.',
    year: '2024',
    category: 'AI/ML',
    tags: 'AI, Machine Learning',
    pages: 38
  },
  {
    id: 3,
    title: 'Blockchain Integration in Modern Databases',
    authors: 'Prof. David Kim, Dr. Lisa Anderson',
    abstract: 'Analysis of blockchain technology integration with traditional database systems for enhanced security and data integrity.',
    year: '2023',
    category: 'Blockchain',
    tags: 'Security, Distributed Systems',
    pages: 52
  },
  {
    id: 4,
    title: 'Cloud-Native Database Architectures',
    authors: 'Dr. Robert Taylor, Prof. Maria Garcia',
    abstract: 'Comprehensive guide to designing and implementing cloud-native database systems with focus on scalability and reliability.',
    year: '2024',
    category: 'Cloud Computing',
    tags: 'Cloud, Scalability',
    pages: 67
  },
  {
    id: 5,
    title: 'Real-time Data Processing Systems',
    authors: 'Dr. Amanda White, Prof. Kevin Lee',
    abstract: 'Study of real-time data processing architectures and their applications in modern big data environments.',
    year: '2023',
    category: 'Big Data',
    tags: 'Real-time, Streaming',
    pages: 41
  }
])

// Computed properties for search and sorting
const filteredTools = computed(() => {
  if (!searchQuery.value) return tools.value;
  
  return tools.value.filter(tool => {
    return (
      tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});

const filteredPapers = computed(() => {
  if (!searchQuery.value) return papers.value;
  
  return papers.value.filter(paper => {
    return (
      paper.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      paper.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
});


// Trigger file input when button is clicked
const triggerFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
}

// Toggle sidebar visibility
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

// Search functionality
const performSearch = () => {
  showSearchInput.value = true;
  // Focus on the search input after it's shown
  nextTick(() => {
    if (searchInputRef.value) {
      searchInputRef.value.focus();
    }
  });
}

const executeSearch = () => {
  // Search is handled reactively through computed properties
  // Just hide the input if empty
  if (!searchQuery.value.trim()) {
    hideSearchInput();
  }
}

const hideSearchInput = () => {
  // Only hide if search query is empty
  if (!searchQuery.value.trim()) {
    showSearchInput.value = false;
  }
}

const clearSearch = () => {
  searchQuery.value = '';
  showSearchInput.value = false;
}

</script>

<style scoped>
.red-neon-title {
  background: linear-gradient(45deg, #ff0000, #ff4500, #ff8c00, #ff0000);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: redNeonGlow 2s ease-in-out infinite alternate, flicker 3s ease-in-out infinite;
  text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000, 0 0 40px #ff4500;
  position: relative;
  z-index: 1;
}

.red-neon-title::before {
  content: 'THINGZEYE';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff0000, #ff4500);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -1;
  filter: blur(15px);
  opacity: 0.7;
  animation: depthPulse 4s ease-in-out infinite;
}

@keyframes redNeonGlow {
  from {
    text-shadow: 
      0 0 5px #ff0000,
      0 0 10px #ff0000,
      0 0 15px #ff4500,
      0 0 20px #ff4500,
      0 0 35px #ff8c00,
      0 0 40px #ff8c00;
  }
  to {
    text-shadow: 
      0 0 10px #ff0000,
      0 0 20px #ff0000,
      0 0 30px #ff4500,
      0 0 40px #ff4500,
      0 0 55px #ff8c00,
      0 0 75px #ff8c00;
  }
}

@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
    text-shadow: 
      0 0 10px #ff0000,
      0 0 20px #ff0000,
      0 0 30px #ff4500,
      0 0 40px #ff4500,
      0 0 55px #ff8c00,
      0 0 75px #ff8c00;
  }
  20%, 24%, 55% {
    opacity: 0.8;
    text-shadow: 
      0 0 5px #ff0000,
      0 0 10px #ff0000,
      0 0 15px #ff4500,
      0 0 20px #ff4500,
      0 0 35px #ff8c00,
      0 0 40px #ff8c00;
  }
}

@keyframes depthPulse {
  0%, 100% {
    transform: translateZ(0) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateZ(20px) scale(1.05);
    opacity: 0.9;
  }
}

.red-neon-text {
  background: linear-gradient(45deg, #ff6b6b, #ff8c42, #ff6b6b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textPulse 3s ease-in-out infinite;
}

@keyframes textPulse {
  0%, 100% {
    text-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
  }
  50% {
    text-shadow: 0 0 15px rgba(255, 107, 107, 0.8), 0 0 25px rgba(255, 140, 66, 0.6);
  }
}

.red-neon-glow {
  position: relative;
  z-index: 1;
}

.red-neon-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: inherit;
  background: inherit;
  filter: blur(15px) brightness(1.3);
  opacity: 0.6;
  z-index: -1;
  pointer-events: none;
  animation: buttonGlow 2s ease-in-out infinite alternate;
}

@keyframes buttonGlow {
  from {
    opacity: 0.4;
    filter: blur(10px) brightness(1.2);
  }
  to {
    opacity: 0.8;
    filter: blur(20px) brightness(1.5);
  }
}

.red-neon-card {
  position: relative;
  transition: all 0.3s ease;
}

.red-neon-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff0000, #ff4500, #ff8c00, #ff0000);
  border-radius: inherit;
  z-index: -1;
  animation: borderPulse 3s ease-in-out infinite;
  mask: 
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
}

@keyframes borderPulse {
  0%, 100% {
    opacity: 0.7;
    filter: hue-rotate(0deg) blur(8px);
  }
  50% {
    opacity: 1;
    filter: hue-rotate(45deg) blur(12px);
  }
}

.red-neon-button {
  position: relative;
  overflow: hidden;
}

.red-neon-button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 2s ease-in-out infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.red-neon-tag {
  position: relative;
  animation: tagPulse 2s ease-in-out infinite;
}

@keyframes tagPulse {
  0%, 100% {
    box-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 107, 107, 0.8), 0 0 25px rgba(255, 140, 66, 0.6);
  }
}

.line-clamp-3 {
  display: -webkit-box;
  display: box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  overflow: hidden;
}

/* Scanning line effect for cards */
.red-neon-card:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 0, 0.8),
    transparent
  );
  animation: scanLine 2s ease-in-out infinite;
}

@keyframes scanLine {
  0% {
    left: -100%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

/* Drag and drop specific styles */
.drag-and-drop-area {
  border-color: var(--neon-cyan);
  transition: all 0.3s ease;
}

.drag-and-drop-area.drag-over {
  background: rgba(0, 255, 255, 0.1);
  border-color: var(--neon-magenta);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
  animation: dragPulse 2s ease-in-out infinite;
}

@keyframes dragPulse {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.3), 0 0 20px rgba(255, 0, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.5);
  }
}
</style>
