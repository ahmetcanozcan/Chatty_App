<template>
  <div id="chatInput">
    <input
    @focus="$emit('focused')" 
    @blur="$emit('unfocused')"
      @keypress.enter="sendMessage"
      placeholder="Dive into the chat"
      type="text"
      v-model="message"
    >
    <div class="button">
      <button @click="sendMessage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { message: "" };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
      this.$emit("newMessage", this.message);
      this.message = "";
    }
  }
};
</script>
<style>
#chatInput {
  display: flex;
  height: 10.5%;
  background-color: rgb(143, 66, 54);
  padding: 12px 12px;
  padding-right: 35px;
  box-shadow: 0px -15px 75px -25px black;
}
#chatInput input {
  width: 95%;
  padding: 5px 35px;
  font-size: 18px;
  border: none;
  border-radius: 55px;
}
#chatInput input:focus {
  outline: none;
}
#chatInput .button {
  width: 5%;
  text-align: right;
}
#chatInput .button button {
  height: 100%;
  padding: 1px 15px;
  background-color: transparent;
  border: none;
}

#chatInput .button svg {
  width: 32px;
  height: 32px;
  fill: wheat;
}
#chatInput .button:hover svg {
  width: 32px;
  height: 32px;
  fill: yellowgreen;
}
@media screen and (max-width: 960px) {
  #chatInput {
    position: fixed;
    bottom: 0;
    height: 70px;
    width: 100%;
  }
  #chatInput input {
    width: 90%;
  }
}
</style>
