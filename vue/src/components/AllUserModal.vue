<template>
  <transition name="modal">
    <div id="users_modal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div @click="$emit('close')" class="close-icon">X</div>
          <div class="modal-header">Signed Users</div>

          <div class="modal-body">
            <div class="user-tile" v-for="(user,index) in userArray" :key="index">
              <div class="image">
                <img style="width:64px; height:64px;" :src="user.img" alt srcset>
              </div>
              <div class="name">{{user.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    users: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    userArray() {
      return Object.values(this.users);
    }
  },
  methods: {}
};
</script>

<style>
#users_modal * {
  margin: 0;
  padding: 0;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.71);
  display: table;
  transition: opacity 0.7s ease;
}

#users_modal .modal-wrapper {
  display: table-cell;
  padding: 0;
  vertical-align: middle;
}

#users_modal .modal-container {
  position: relative;
  width: 350px;

  margin: 0px auto;

  background: #421c07;
  color: wheat;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

#users_modal .modal-header {
  letter-spacing: 4px;
  font-size: 150%;

  background: linear-gradient(rgb(104, 34, 104), #421c07);
  font-weight: 600;
  text-align: center;
  padding: 33px 0;
}

#users_modal .modal-container .close-icon:hover {
  background-color: rgb(110, 7, 7);
}

#users_modal .modal-container .close-icon {
  position: absolute;
  right: -20px;
  font-size: 28px;
  top: -20px;
  cursor: pointer;
  border-radius: 50%;
  border-bottom-left-radius: 0px;
  background-color: rgb(104, 34, 104);
  box-shadow: 1px 10px 20px -1px black;
  padding: 5px 12px;
}
#users_modal .modal-body {
  overflow-y: scroll;
  max-height: 60vh;
}

#users_modal .modal-default-button {
  float: right;
}

#users_modal .user-tile {
  padding: 25px 5px;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 100px auto;
  transition: 300ms;
  grid-gap: 20px;
}

#users_modal .user-tile:hover {
  box-shadow: 1px 20px 75px 0px black;
}
#users_modal .user-tile .name {
  font-size: 22px;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* width */
#users_modal .modal-body::-webkit-scrollbar {
  width: 8px;
}

/* Track */
#users_modal .modal-body::-webkit-scrollbar-track {
  background: #750707;
}

/* Handle */
#users_modal .modal-body::-webkit-scrollbar-thumb {
  background: rgb(104, 34, 104);
}

/* Handle on hover */
#users_modal .modal-body::-webkit-scrollbar-thumb:hover {
  background: rgb(104, 34, 104);
}

@media screen and (max-width: 960px) {
  #users_modal .modal-container {
    width: 87% !important;
  }
  .setting-input {
    display: inherit;
  }
  .setting-input.button-group {
    display: grid;
  }
}
</style>
