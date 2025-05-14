<template>
  <div class="file-management">
    <h1>File Management</h1>
    <div class="file-list">
      <div v-for="item in files" :key="item.name" class="file-item">
        <div class="file-info">
          <i :class="item.type === 'folder' ? 'folder-icon' : 'file-icon'"></i>
          <span>{{ item.name }}</span>
        </div>
        <div class="file-actions">
          <button @click="deleteItem(item)">Delete</button>
          <button v-if="item.type === 'file'" @click="downloadFile(item.name)">Download</button>
        </div>
      </div>
    </div>
    <div class="file-actions">
      <button @click="uploadFiles">Upload Files</button>
      <button @click="createFolder">Create Folder</button>
      <button @click="deleteSelected">Delete Selected</button>
    </div>
    <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileChange" />
  </div>
</template>

<script>
import { supabase } from '@/lib/supabaseClient';

export default {
  data() {
    return {
      files: [],
      selectedFiles: [],
      currentPath: ''
    };
  },
  async created() {
    await this.listFiles();
  },
  methods: {
    async listFiles() {
      const { data, error } = await supabase.storage.from('files').list(this.currentPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });
      if (error) {
        console.error('Error fetching files:', error);
      } else {
        this.files = data || [];
      }
    },
    async uploadFiles() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = event.target.files;
      for (const file of files) {
        const cleanedFileName = this.cleanFileName(file.name);
        const { error } = await supabase.storage.from('files').upload(`${this.currentPath}${cleanedFileName}`, file);
        if (error) {
          console.error('Error uploading file:', error);
        }
      }
      await this.listFiles();
    },
    cleanFileName(fileName) {
      // Replace illegal characters with underscores
      return fileName
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/^[. ]+|[ .]+$/g, '_');
    },
    async createFolder() {
      const folderName = prompt('Enter folder name:');
      if (folderName) {
        const cleanedFolderName = this.cleanFileName(folderName);
        const { error } = await supabase.storage.from('files').upload(`${this.currentPath}${cleanedFolderName}/`, new Blob());
        if (error) {
          console.error('Error creating folder:', error);
        } else {
          await this.listFiles();
        }
      }
    },
    async deleteItem(item) {
      const { error } = await supabase.storage.from('files').remove([`${this.currentPath}${item.name}`]);
      if (error) {
        console.error('Error deleting item:', error);
      } else {
        await this.listFiles();
      }
    },
    async downloadFile(fileName) {
      const { data, error } = await supabase.storage.from('files').download(`${this.currentPath}${fileName}`);
      if (error) {
        console.error('Error downloading file:', error);
      } else {
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    async deleteSelected() {
      const selectedPaths = this.selectedFiles.map(file => `${this.currentPath}${file.name}`);
      const { error } = await supabase.storage.from('files').remove(selectedPaths);
      if (error) {
        console.error('Error deleting selected files:', error);
      } else {
        await this.listFiles();
      }
    }
  }
};
</script>

<style scoped>
.file-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.file-list {
  list-style: none;
  padding: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.file-info {
  display: flex;
  align-items: center;
}

.file-icon {
  margin-right: 10px;
}

.file-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>