<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import AppHeaderStatic from '@/components/AppHeaderStatic.vue';
import AppShell from '@/components/AppShell.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppSidebarHeader from '@/components/AppSidebarHeader.vue';
import type { BreadcrumbItemType } from '@/types';

interface Props {
    breadcrumbs?: BreadcrumbItemType[];
    performSearch?: () => void;
}

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
    performSearch: () => {},
});
</script>

<template>
    <AppShell variant="sidebar" class="flex-col">
<AppHeaderStatic :breadcrumbs="breadcrumbs" :performSearch="performSearch" />
        <div class="flex flex-1">
            <AppSidebar />
            <AppContent variant="sidebar" class="overflow-x-hidden">
                <AppSidebarHeader :breadcrumbs="breadcrumbs" />
                <slot />
            </AppContent>
        </div>
    </AppShell>
</template>
