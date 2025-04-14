<template>
  <div class="email-operations">
    <h2>Email Operations</h2>
    <button @click="showSendTestEmailForm = true">Send Test Email</button>
    <button @click="showSendEmailToAllForm = true">Send Email to All Users</button>
    <button @click="showSendAuthUserInfoForm = true">Send Auth User Info</button>

    <!-- Send Test Email Form -->
    <div v-if="showSendTestEmailForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showSendTestEmailForm = false">&times;</span>
        <h3>Send Test Email</h3>
        <form @submit.prevent="sendTestEmail">
          <div class="form-group">
            <label for="email">Recipient Email:</label>
            <input type="email" id="email" v-model="testEmail" required>
          </div>
          <button type="submit">Send Email</button>
        </form>
        <div v-if="testMessage" class="message">
          {{ testMessage }}
        </div>
      </div>
    </div>

    <!-- Send Email to All Users Form -->
    <div v-if="showSendEmailToAllForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showSendEmailToAllForm = false">&times;</span>
        <h3>Send Email to All Users</h3>
        <form @submit.prevent="sendEmailToAll">
          <div class="form-group">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" v-model="subject" required>
          </div>
          <div class="form-group">
            <label for="text">Text:</label>
            <textarea id="text" v-model="text" required></textarea>
          </div>
          <button type="submit">Send Email</button>
        </form>
        <div v-if="allMessage" class="message">
          {{ allMessage }}
        </div>
      </div>
    </div>

    <!-- Send Auth User Info Form -->
    <div v-if="showSendAuthUserInfoForm" class="modal">
      <div class="modal-content">
        <span class="close" @click="showSendAuthUserInfoForm = false">&times;</span>
        <h3>Send Auth User Info</h3>
        <form @submit.prevent="sendAuthUserInfo">
          <div class="form-group">
            <label for="authEmail">Email:</label>
            <input type="email" id="authEmail" v-model="authEmail" required>
          </div>
          <button type="submit">Send Email</button>
        </form>
        <div v-if="authMessage" class="message">
          {{ authMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EmailOperations',
  data() {
    return {
      showSendTestEmailForm: false,
      showSendEmailToAllForm: false,
      showSendAuthUserInfoForm: false,
      testEmail: '',
      testMessage: '',
      subject: '',
      text: '',
      allMessage: '',
      authEmail: '',
      authMessage: ''
    };
  },
  methods: {
    async sendTestEmail() {
      try {
        const response = await axios.get('/api/email/send-test-email', {
          params: { to: this.testEmail }
        });
        this.testMessage = response.data;
      } catch (error) {
        this.testMessage = 'Failed to send email. Please check the email address and try again.';
        console.error(error);
      } finally {
        this.showSendTestEmailForm = false;
      }
    },
    async sendEmailToAll() {
      try {
        const response = await axios.post('/api/email/send-email-to-all', {
          subject: this.subject,
          text: this.text
        });
        this.allMessage = response.data;
      } catch (error) {
        this.allMessage = 'Failed to send email. Please check the input and try again.';
        console.error(error);
      } finally {
        this.showSendEmailToAllForm = false;
      }
    },
    async sendAuthUserInfo() {
      try {
        const response = await axios.post('/api/email/auth-user-info', {
          email: this.authEmail
        });
        this.authMessage = response.data;
      } catch (error) {
        this.authMessage = 'Failed to send email. Please check the email address and try again.';
        console.error(error);
      } finally {
        this.showSendAuthUserInfoForm = false;
      }
    }
  }
};
</script>

<style scoped>
.email-operations {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background: #6e8efb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #5a76d4;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"],
input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.message {
  margin-top: 20px;
  padding: 10px;
  background: #e6f7ff;
  border: 1px solid #a7d9f5;
  border-radius: 4px;
  text-align: center;
}
</style>