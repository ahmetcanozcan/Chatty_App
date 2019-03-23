<template>
  <div id="app" :class="{'init':!isLoading}">
    <all-users-modal v-if="showUsers" @close="showUsers=false" :users="users"></all-users-modal>

    <setting-modal
      v-if="showSettings"
      @close="showSettings = false"
      @update="updateData($event)"
      :username="clientUser.name"
      :image="clientUser.img"
    ></setting-modal>
    <div v-if="isLoading" style="display:table; width:100%; height:100%;">
      <div style="display:table-cell; text-align:center;vertical-align:middle">
        <loading-svg></loading-svg>
      </div>
    </div>

    <div v-else class="main-content" style="height:100%; width:100%;">
      <div id="chatHeader" :class="{up:headerUpOnMobil}">
        <div class="img">
          <img :src="clientUser.img" alt>
        </div>
        <div class="user-info">
          <span class="client-name">
            {{clientUser.name}}
            <img
              class="user-edit"
              @click="showSettings = true"
              style
              src="https://cdn.glitch.com/99cf20e7-1a07-4ddc-8266-63d4535d2748%2Fuser-edit-solid.svg?1551104028262"
            >
          </span>
          <br>
          <span class="other-name" v-for="name in userNames()" :key="name">{{name}},</span>
          <span @click="showUsers = true" style="cursor:pointer">See All</span>
        </div>

        <div class="online-user">
          <span class="number">{{onlineUserCount}}</span>
          <br>online
        </div>
      </div>

      <chat-log ref="log" :messages="messages" :users="users" :clientUserId="clientUser.id"/>
      <chat-input
        @focused="headerUpOnMobil=true"
        @unfocused="headerUpOnMobil=false"
        @newMessage="sendMessage($event)"
      />
    </div>
  </div>
</template>

<script>
import SettingModal from "./components/SettingModal";
import LoadingSvg from "./components/LoadingSvg";
import ChatHeader from "./components/ChatHeader";
import ChatLog from "./components/ChatLog";
import ChatInput from "./components/ChatInput";
import AllUsersModal from "./components/AllUserModal";
export default {
  name: "app",
  created() {
    socket.on("user_info", user => {
      this.clientUser = user;
    });

    socket.on("new_user", userData => {
      this.users[userData[0]] = userData[1];
    });

    socket.on("online_count", count => {
      this.onlineUserCount = count;
    });

    socket.on("user_update", user => {
      Object.assign(this.users[user.id], user.data);
      this.$refs.log.$forceUpdate();
    });

    socket.on("all_users", users => {
      this.users = users;
    });

    socket.on("all_messages", messages => {
      this.messages = messages;
      this.isLoading = false;
      setTimeout(() => {
        var container = this.$el.querySelector("#chatLog");
        container.scrollTop = container.scrollHeight;
      }, 10);
    });

    socket.on("new_message", message => {
      this.messages.push(message);
    });
  },
  data: () => ({
    headerUpOnMobil: false,
    showUsers: false,
    showSettings: false,
    onlineUserCount: 0,
    isLoading: false,
    clientUser: {
      id: "2fkhlaew0jsg78vwc",
      name: "annual vole",
      img: "https://randomuser.me/api/portraits/men/92.jpg"
    },
    messages: [],
    users: {}
  }),
  methods: {
    sendMessage(input) {
      socket.emit("new_message", input);
    },
    updateData(new_data) {
      Object.assign(this.clientUser, new_data);
      console.log(this.clientUser);
      socket.emit("user_update", new_data);
    },
    userNames() {
      let names = Object.values(this.users).map(user => user.name);
      return names
        .splice(0, names.length > 3 ? 3 : names.length)
        .map(name => name.split(" ")[0]);
    }
  },
  components: {
    ChatHeader,
    ChatLog,
    ChatInput,
    LoadingSvg,
    SettingModal,
    AllUsersModal
  }
};
</script>

<style>
body {
  background-color: #2e313d;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='100' y1='33' x2='100' y2='-3'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='100' y1='135' x2='100' y2='97'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='%23272a34' fill-opacity='0.6'%3E%3Crect x='100' width='100' height='100'/%3E%3Crect y='100' width='100' height='100'/%3E%3C/g%3E%3Cg fill-opacity='0.5'%3E%3Cpolygon fill='url(%23a)' points='100 30 0 0 200 0'/%3E%3Cpolygon fill='url(%23b)' points='100 100 0 130 0 100 200 100 200 130'/%3E%3C/g%3E%3C/svg%3E");
  padding: 5vh 0;
}
* {
  box-sizing: border-box;
}

#app {
  border-radius: 12px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 87vh;
  width: 960px;
  margin: 0 auto;
  color: #421c07;
  transition: 350ms;
}

#app.init {
  background-color: rgba(255, 255, 255, 0.12);
  box-shadow: 15px 15px 35px 1px black;
}
#app .main-content {
  opacity: 0;
  transition: 350ms;
}

#app.init .main-content {
  opacity: 1;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#chatHeader {
  color: #eff1c2;
  padding: 0 1rem;
  height: 12%;
  background-color: rgb(143, 66, 54);
  box-shadow: 0px 5px 35px -5px black;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  transition: 300ms;
}

#chatHeader > div.img {
  position: relative;
  padding: 5px;
  height: 100%;
  width: auto;
}
#chatHeader > div.img {
  position: relative;
  padding: 5px;
}
#chatHeader .client-name {
  font-size: 32px;
}

#chatHeader .user-info {
  margin-top: 10px;
  transform: translateX(15px);
}
#chatHeader .user-info .user-edit {
  display: inline-block;
  width: 32px;
  height: auto;
  cursor: pointer;
}

#chatHeader .user-info * {
  text-transform: capitalize;
}

#chatHeader .user-info .other-name {
  display: inline-block;
  margin-top: 4px;
  margin-right: 4px;
  opacity: 0.6;
}
#chatHeader .online-user {
  margin-left: auto;
  margin-right: 2rem;
  margin-top: 0.1rem;
  text-align: center;
  background-color: wheat;
  color: black;
  padding: 0.4rem 0.7rem;
}

#chatHeader .online-user .number {
  font-size: 39px;
}

#chatHeader > div.img img {
  width: auto;
  height: 100%;
  border-radius: 50%;
  border: 1px solid white;
}

@media screen and (max-width: 960px) {
  body {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  #chatHeader.up {
    transform: translateY(-85px);
  }
  #app {
    border-radius: 0;
    width: 100%;
    margin: 0;
    height: 100vh;
    overflow: hidden;
    font-size: 14px;
  }

  #chatHeader {
    position: absolute;
    display: grid;
    grid-template-columns: 68px auto 40px;
    height: 74px;
    overflow-y: hidden;
    z-index: 4;
  }
  #chatHeader > div.img {
    text-align: center;
  }
  #chatHeader > div.img {
    position: relative;
    padding: 5px;
  }
  #chatHeader .client-name {
    font-size: 22px;
  }

  #chatHeader .user-info {
    margin-top: 10px;
  }
  #chatHeader .user-info .other-name {
    display: inline-block;
    margin-top: 1px;
    margin-right: 1px;
    opacity: 0.6;
    font-size: 11px;
  }
  #chatHeader .online-user {
    margin-right: 0rem;
    height: 105%;
    transform: translateY(-4px);
  }

  #chatHeader .online-user .number {
    font-size: 32px;
  }

  #chatHeader > div.img img {
    border-radius: 50%;
    border: 1px solid white;
    width: 64px;
    height: 64px;
  }
}
</style>
