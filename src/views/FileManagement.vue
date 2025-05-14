<template>
  <div class="file-management">
    <h1>File Management</h1>
    <div class="file-list">
      <div v-for="item in files" :key="item.name" class="file-item">
        <div class="file-info" @click="openItem(item)">
          <i :class="item.type === 'folder' ? 'folder-icon' : 'file-icon'"></i>
          <span>{{ item.originalName }}</span>
        </div>
        <div class="file-details" v-if="item.type === 'file'">
          <span>Size: {{ item.size }} bytes</span>
          <span>Modified: {{ item.modified }}</span>
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
        this.files = data
          .filter(file => file.name && typeof file.name === 'string') // 过滤掉无效的文件名
          .map(file => ({
            ...file,
            originalName: this.decodeFileName(file.name),
            size: file.metadata.size, // 添加文件大小
            modified: file.updated_at, // 添加文件修改日期
            type: file.name.endsWith('/') ? 'folder' : 'file' // 判断是文件夹还是文件
          }));
      }
    },
    async uploadFiles() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = event.target.files;
      for (const file of files) {
        const processedFileName = this.processFileName(file.name);
        const { error } = await supabase.storage.from('files').upload(`${this.currentPath}${processedFileName}`, file);
        if (error) {
          console.error('Error uploading file:', error);
        }
      }
      await this.listFiles();
    },
    processFileName(fileName) {
      const cleanedFileName = fileName
        .replace(/[^\w\s.-]/g, '_') // 替换特殊字符为下划线
        .replace(/\s+/g, '_') // 替换空格为下划线
        .substring(0, 255); // 控制文件名长度不超过 255 个字符

      const extension = fileName.split('.').pop() || 'txt';
      const base64FileName = btoa(unescape(encodeURIComponent(fileName)));

      const finalFileName = `${cleanedFileName}__BASE64__${base64FileName}.${extension}`;
      return finalFileName;
    },
    decodeFileName(encodedName) {
      if (!encodedName || typeof encodedName !== 'string') {
        console.error('Invalid encoded name:', encodedName);
        return '';
      }
      const parts = encodedName.split('__BASE64__');
      if (parts.length !== 2) {
        console.error('Invalid encoded name format:', encodedName);
        return encodedName;
      }
      const base64Part = parts[1].split('.')[0];
      const decodedBase64 = atob(base64Part);
      const originalName = decodeURIComponent(escape(decodedBase64));
      return originalName;
    },
    async createFolder() {
      const folderName = prompt('Enter folder name:');
      if (folderName) {
        const processedFolderName = this.processFileName(folderName);
        const folderPath = `${this.currentPath}${processedFolderName}/`;
        const { error } = await supabase.storage.from('files').upload(folderPath, new Blob(), {
          contentType: 'application/x-directory' // 确保上传的是一个目录
        });
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
    },
    openItem(item) {
      if (item.type === 'folder') {
        this.currentPath = `${this.currentPath}${item.name}`;
        this.listFiles();
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
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.file-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.file-item:hover {
  background-color: #f0f0f0;
}

.file-info {
  display: flex;
  align-items: center;
}

.file-icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.folder-icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.file-details {
  font-size: 0.9em;
  color: #666;
}

.file-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #389466;
}

button:active {
  background-color: #2c7a59;
}
</style>