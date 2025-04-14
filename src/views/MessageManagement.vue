<template>
  <div class="message-management">
    <h2>Message Management</h2>

    <!-- Message List -->
    <div v-if="messages.length > 0">
      <h3>All Messages</h3>
      <table class="messages-table">
        <thead>
        <tr>
          <th>Message ID</th>
          <th>User ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="message in messages" :key="message.messageId">
          <td>{{ message.messageId }}</td>
          <td>{{ message.userId }}</td>
          <td>{{ message.username }}</td>
          <td>{{ message.email }}</td>
          <td>{{ message.message }}</td>
          <td>{{ message.createdAt }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <p>No messages available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageManagement',
  data() {
    return {
      messages: []
    };
  },
  methods: {
    async getAllMessages() {
      try {
        const response = await axios.get('/api/messages');
        this.messages = response.data;
      } catch (error) {
        this.messages = [];
        console.error(error);
      }
    }
  },
  mounted() {
    this.getAllMessages();
  }
};
</script>

<style scoped>
.message-management {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  text-align: center;
  margin-bottom: 20px;
}

.messages-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.messages-table th,
.messages-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.messages-table th {
  background-color: #f2f2f2;
}

p {
  text-align: center;
  color: #666;
}
</style>