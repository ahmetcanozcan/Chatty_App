<template>
  <div id="chatLog">
    <chat-message-tile
      v-for="(message,index) in messages"
      :key="index"
      :authorImg="users[message.author_id].img"
      :authorName="users[message.author_id].name"
      :message="message.content"
      :time="message.time"
      :isRight="message.author_id == clientUserId"
    />
  </div>
</template>
<script>
import ChatMessageTile from "./ChatMessageTile";
export default {
  props: {
    users: {
      default: {}
    },
    clientUserId: {
      required: true
    },
    messages: {
      Type: Array,
      default: []
    }
  },
  updated() {
    var container = this.$el;
    container.scrollTop = container.scrollHeight;
  },
  components: {
    ChatMessageTile
  }
};
</script>
<style>
#chatLog {
  padding: 2rem;
  overflow-y: scroll;
  height: 80%;
}
#chatLog::-webkit-scrollbar {
  width: 7px;
}

/* Track */
#chatLog::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.192);
}

/* Handle */
#chatLog::-webkit-scrollbar-thumb {
  background: rgb(134, 143, 6);
  border-radius: 5px;
}

/* Handle on hover */
#chatLog::-webkit-scrollbar-thumb:hover {
  background: rgb(127, 134, 27);
}

@media screen and (max-width: 960px) {
  #chatLog {
    position:relative;
    overflow-y: scroll;
    height:100%;
    padding: 75px .4rem;
    padding-bottom:120px;
    z-index:0;
    
  }
  #chatLog div.img,
  #chatLog div.img * {
    z-index:0;
  }
  
  
  
}
</style>
