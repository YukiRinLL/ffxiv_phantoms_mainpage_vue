<template>
  <div class="user-management">
    <h2>User Management</h2>

    <!-- Get User by ID Form -->
    <div class="get-user-by-id">
      <h3>Get User by ID</h3>
      <form @submit.prevent="getUserById">
        <div class="form-group">
          <label for="userId">User ID:</label>
          <input type="text" id="userId" v-model="userId" required>
        </div>
        <button type="submit">Get User</button>
      </form>
    </div>

    <!-- Get All Users -->
    <div v-if="users.length > 0">
      <h3>All Users</h3>
      <table class="users-table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- User Details Modal -->
    <div v-if="user" class="modal">
      <div class="modal-content">
        <span class="close" @click="user = null">&times;</span>
        <h3>User Details</h3>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      userId: '',
      user: null,
      users: []
    };
  },
  methods: {
    async getUserById() {
      try {
        const response = await axios.post('/api/users', { id: this.userId });
        this.user = response.data;
      } catch (error) {
        this.user = null;
        console.error(error);
      }
    },
    async getAllUsers() {
      try {
        const response = await axios.get('/api/users/all');
        this.users = response.data;
      } catch (error) {
        this.users = [];
        console.error(error);
      }
    }
  },
  mounted() {
    this.getAllUsers();
  }
};
</script>

<style scoped>
.user-management {
  max-width: 800px;
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

.get-user-by-id {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #6e8efb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #5a76d4;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.users-table th,
.users-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.users-table th {
  background-color: #f2f2f2;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>