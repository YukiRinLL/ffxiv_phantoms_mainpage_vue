<template>
  <div class="send-email">
    <h2>Send Test Email</h2>
    <form @submit.prevent="sendEmail">
      <div class="form-group">
        <label for="email">Recipient Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit">Send Email</button>
    </form>
    <div v-if="message" class="message">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendEmail',
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await this.$axios.get('/api/email/send-test-email', {
          params: { to: this.email }
        });
        this.message = response.data;
      } catch (error) {
        this.message = 'Failed to send email. Please check the email address and try again.';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.send-email {
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"] {
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

.message {
  margin-top: 20px;
  padding: 10px;
  background: #e6f7ff;
  border: 1px solid #a7d9f5;
  border-radius: 4px;
  text-align: center;
}
</style>