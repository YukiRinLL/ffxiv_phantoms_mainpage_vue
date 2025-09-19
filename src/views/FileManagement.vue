<template>
  <div class="file-management container">
    <h1>File Management</h1>
    <div class="unsupported-message" v-if="isUnsupported">
      <p><strong style="color: red;">此Supabase-S3桶存储已经不再维护，可能导致部分服务不可用</strong></p>
      <p>请使用Alist服务器：<a href="https://alist-phantom.zeabur.app/" target="_blank" style="color: blue; text-decoration: underline;">alist-phantom.zeabur.app</a></p>
    </div>
    <div class="file-list">
      <div v-for="item in files" :key="item.name" class="list-item">
        <div class="list-item-info" @click="openItem(item)">
          <i :class="item.type === 'folder' ? 'folder-icon' : 'file-icon'"></i>
          <span>{{ item.originalName }}</span>
        </div>
        <div class="list-item-details" v-if="item.type === 'file'">
          <span>Size: {{ item.size }} bytes</span>
          <span>Modified: {{ item.modified }}</span>
          <span>Type: {{ item.type }}</span>
        </div>
        <div class="list-item-actions">
          <!-- 删除按钮仅在文件类型时显示 -->
          <button v-if="item.type === 'file'" @click="deleteItem(item)">Delete</button>
          <button v-if="item.type === 'file'" @click="downloadFile(item.name, item.originalName)">Download</button>
        </div>
      </div>
    </div>
    <div class="file-actions">
      <button @click="goBack">Go Back</button>
      <button @click="uploadFiles">Upload Files</button>
      <button @click="createFolder">Create Folder</button>
      <button @click="deleteSelected">Delete Selected</button>
    </div>
    <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileChange" />
    <!-- 遮罩层 -->
    <div v-if="isLoading" class="overlay">
      <div class="overlay-content">
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

// 配置 AWS SDK
AWS.config.update({
  accessKeyId: 'eedaeea4b18bfdb011a22c010f126236',
  secretAccessKey: 'adb02ad5df1f3df81b9ff69141bf91cc0fd91392da0496ad87f29ee3438dc5f1', //S3 Secret Access Key
  region: 'ap-southeast-1',
});

const s3 = new AWS.S3({
  endpoint: 'https://dshmbsawwrbuycnivcjs.storage.supabase.co/storage/v1/s3',
  s3ForcePathStyle: true,
});

export default {
  data() {
    return {
      files: [],
      selectedFiles: [],
      currentPath: '',
      isLoading: false, // 控制遮罩层的显示
      timeoutId: null, // 用于存储超时的定时器ID
      isUnsupported: true, // 控制提示框的显示
    };
  },
  async created() {
    await this.listFiles();
  },
  mounted() {
    // window.open('https://alist-phantom.zeabur.app/', '_blank');
  },
  methods: {
    async listFiles() {
      this.isLoading = true; // 显示遮罩层
      this.timeoutId = setTimeout(() => {
        this.isLoading = false; // 如果超时，隐藏遮罩层
        alert('Request timed out. Please try again later.');
      }, 5000); // 设置超时时间为5秒

      try {
        const params = {
          Bucket: 'files', // 替换为你的 S3 Bucket 名称
          Prefix: this.currentPath,
        };

        const data = await s3.listObjectsV2(params).promise();
        clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
        this.isLoading = false; // 隐藏遮罩层

        this.files = data.Contents.map(file => ({
          name: file.Key,
          originalName: this.decodeFileName(file.Key),
          size: file.Size,
          modified: file.LastModified,
          type: file.Key.endsWith('/') ? 'folder' : 'file',
        }));
      } catch (error) {
        this.isLoading = false; // 如果请求失败，隐藏遮罩层
        console.error('Error fetching files:', error);
      }
    },
    async uploadFiles() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = event.target.files;
      this.isLoading = true; // 显示遮罩层
      this.timeoutId = setTimeout(() => {
        this.isLoading = false; // 如果超时，隐藏遮罩层
        // alert('Request timed out. Please try again later.');
      }, 5000); // 设置超时时间为5秒

      try {
        for (const file of files) {
          const processedFileName = this.processFileName(file.name);
          const params = {
            Bucket: 'files', // 替换为你的 S3 Bucket 名称
            Key: `${this.currentPath}${processedFileName}`,
            Body: file,
          };

          await s3.upload(params).promise();
        }
        clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
        this.isLoading = false; // 隐藏遮罩层
        await this.listFiles();
      } catch (error) {
        this.isLoading = false; // 如果请求失败，隐藏遮罩层
        console.error('Error uploading files:', error);
      }
    },
    processFileName(fileName) {
      const cleanedFileName = fileName
          .replace(/[^\w\s.-]/g, '_') // 替换特殊字符为下划线
          .replace(/\s+/g, '_') // 替换空格为下划线
          .substring(0, 255); // 控制文件名长度不超过 255 个字符

      const extension = fileName.split('.').pop() || '';
      const base64FileName = btoa(unescape(encodeURIComponent(fileName)));

      return `${cleanedFileName}__BASE64__${base64FileName}.${extension}`;
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
        this.isLoading = true; // 显示遮罩层
        this.timeoutId = setTimeout(() => {
          this.isLoading = false; // 如果超时，隐藏遮罩层
          alert('Request timed out. Please try again later.');
        }, 5000); // 设置超时时间为5秒

        try {
          const params = {
            Bucket: 'files', // 替换为你的 S3 Bucket 名称
            Key: `${this.currentPath}${processedFolderName}/`,
            Body: new Buffer(''),
          };

          await s3.putObject(params).promise();
          clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
          this.isLoading = false; // 隐藏遮罩层
          await this.listFiles();
        } catch (error) {
          this.isLoading = false; // 如果请求失败，隐藏遮罩层
          console.error('Error creating folder:', error);
        }
      }
    },
    async deleteItem(item) {
      this.isLoading = true; // 显示遮罩层
      this.timeoutId = setTimeout(() => {
        this.isLoading = false; // 如果超时，隐藏遮罩层
        alert('Request timed out. Please try again later.');
      }, 5000); // 设置超时时间为5秒

      try {
        const params = {
          Bucket: 'files', // 替换为你的 S3 Bucket 名称
          Key: `${this.currentPath}${item.name}`,
        };

        await s3.deleteObject(params).promise();
        clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
        this.isLoading = false; // 隐藏遮罩层
        await this.listFiles();
      } catch (error) {
        this.isLoading = false; // 如果请求失败，隐藏遮罩层
        console.error('Error deleting item:', error);
      }
    },
    async downloadFile(encodedName, originalName) {
      this.isLoading = true; // 显示遮罩层
      this.timeoutId = setTimeout(() => {
        this.isLoading = false; // 如果超时，隐藏遮罩层
        alert('Request timed out. Please try again later.');
      }, 5000); // 设置超时时间为5秒

      try {
        const params = {
          Bucket: 'files', // 替换为你的 S3 Bucket 名称
          Key: `${this.currentPath}${encodedName}`,    };

        const data = await s3.getObject(params).promise();
        clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
        this.isLoading = false; // 隐藏遮罩层

        const url = URL.createObjectURL(new Blob([data.Body]));
        const a = document.createElement('a');
        a.href = url;
        a.download = originalName;
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        this.isLoading = false; // 如果请求失败，隐藏遮罩层
        console.error('Error downloading file:', error);
      }
    },
    async deleteSelected() {
      const selectedPaths = this.selectedFiles.map(file => `${this.currentPath}${file.name}`);
      this.isLoading = true; // 显示遮罩层
      this.timeoutId = setTimeout(() => {
        this.isLoading = false; // 如果超时，隐藏遮罩层
        alert('Request timed out. Please try again later.');
      }, 5000); // 设置超时时间为5秒

      try {
        const deleteParams = {
          Bucket: 'files', // 替换为你的 S3 Bucket 名称
          Delete: {
            Objects: selectedPaths.map(path => ({ Key: path })),
          },
        };

        await s3.deleteObjects(deleteParams).promise();
        clearTimeout(this.timeoutId); // 如果请求成功，清除超时定时器
        this.isLoading = false; // 隐藏遮罩层
        await this.listFiles();
      } catch (error) {
        this.isLoading = false; // 如果请求失败，隐藏遮罩层
        console.error('Error deleting selected files:', error);
      }
    },
    openItem(item) {
      if (item.type === 'folder') {
        this.currentPath = `${this.currentPath}${item.name}/`;
        this.listFiles();
      }
    },
    goBack() {
      if (this.currentPath !== '') {
        this.currentPath = this.currentPath.substring(0, this.currentPath.substring(0, this.currentPath.length - 1).lastIndexOf('/'));
        if (this.currentPath === '') {
          this.currentPath = '';
        } else {
          this.currentPath += '/';
        }
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
  position: relative; /* 使遮罩层能够正确定位 */
}

.file-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.list-item:hover {
  background-color: #f0f0f0;
}

.list-item-info {
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
}

.list-item-info span {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
}

.list-item-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  flex: 1;
  overflow: hidden;
}

.list-item-details span {
  font-size: 0.9em;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-item-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  background-color: #bababa;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #999999;
}

button:active {
  background-color: #797979;
}

/* 遮罩层样式 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.overlay-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>