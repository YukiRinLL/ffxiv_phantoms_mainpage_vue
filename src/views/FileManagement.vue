<template>
  <div class="file-management">
    <h1>File Management</h1>
    <div class="file-list">
      <div v-for="item in files" :key="item.name" class="file-item">
        <div class="file-info">
          <i :class="item.type === 'folder' ? 'folder-icon' : 'file-icon'"></i>
          <span>{{ item.originalName }}</span>
        </div>
        <div class="file-actions">
          <button @click="deleteItem(item)">Delete</button>
          <button v-if="item.type === 'file'" @click="downloadFile(item.name)">Download</button>
        </div>
      </div>
    </div>
    <div class="file-actions">
      <button @click="uploadFiles">Upload Files</button>
      <!-- <button @click="createFolder">Create Folder</button> -->
       <!--TODO 文件夹新建功能还没有完成，文件夹和文件在列表中无法区分，搁置-->
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
            originalName: this.decodeFileName(file.name)
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
      // 替换特殊字符为下划线
      const cleanedFileName = fileName
        .replace(/[^\w\s.-]/g, '_') // 替换特殊字符为下划线
        .replace(/\s+/g, '_') // 替换空格为下划线
        .substring(0, 255); // 控制文件名长度不超过 255 个字符

      // 获取文件扩展名
      const extension = fileName.split('.').pop() || 'txt';

      // 对文件名（不包括扩展名）进行 Base64 编码
      const base64FileName = btoa(unescape(encodeURIComponent(fileName)));

      // 最终文件名格式：cleanedFileName__BASE64__base64FileName.extension
      const finalFileName = `${cleanedFileName}__BASE64__${base64FileName}.${extension}`;

      return finalFileName;
    },
    decodeFileName(encodedName) {
      if (!encodedName || typeof encodedName !== 'string') {
        console.error('Invalid encoded name:', encodedName);
        return ''; // 返回空字符串或其他默认值
      }
      const parts = encodedName.split('__BASE64__');
      if (parts.length !== 2) {
        console.error('Invalid encoded name format:', encodedName);
        return encodedName; // 如果格式不正确，直接返回原始值
      }
      const base64Part = parts[1].split('.')[0]; // 获取 Base64 编码部分

      // 解码 Base64 部分
      const decodedBase64 = atob(base64Part);

      // 将解码后的字符串转换回原始字符串
      const originalName = decodeURIComponent(escape(decodedBase64));

      return originalName;
    },
    async createFolder() {
      const folderName = prompt('Enter folder name:');
      if (folderName) {
        const processedFolderName = this.processFileName(folderName);
        const { error } = await supabase.storage.from('files').upload(`${this.currentPath}${processedFolderName}/`, new Blob());
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