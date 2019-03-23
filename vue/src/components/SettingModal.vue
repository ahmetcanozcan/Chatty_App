<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">User Settings</div>

          <div class="modal-body">
            <div class="setting-input">
              <p>Username:</p>
              <input @keypress.enter="changeData" type="text" v-model="usernameCopy">
            </div>

            <div class="setting-input">
              <p>Image Url:</p>
              <input type="text" v-model="imageCopy">
            </div>
            <div class="setting-input button-group">
              <button class="back" @click="$emit('close')">BACK</button>
              <button class="update" @click="changeData">UPDATE</button>
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
    username: {
      type: String
    },
    image: {
      type: String
    }
  },
  data() {
    return {
      imageCopy: "",
      usernameCopy: ""
    };
  },
  created() {
    this.imageCopy = this.image;
    this.usernameCopy = this.username;
  },
  methods: {
    changeData() {
      this.$emit("update", {
        name: this.usernameCopy,
        img: this.imageCopy
      });
      this.$emit("close");
    }
  }
};
</script>

<style>
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

.modal-wrapper {
  display: table-cell;

  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 480px;
  margin: 0px auto;
  padding: 20px 30px;
  background: #421c07;
  color: wheat;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  letter-spacing: 4px;
  font-size: 150%;
  font-weight: 600;
}

.setting-input {
  margin: 15px 0;
  display: grid;
  grid-template-columns: 20% 80%;
}
.setting-input p {
  line-height: 100%;
}
.setting-input input {
  padding: 5px;
  width: 100%;
  outline: none;
  border: none;
  border: 1px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  background-color: white;
  transition: 300ms;
}

.setting-input input:focus {
  border-color: rgb(15, 14, 11);
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-left: 15px;
}
.setting-input.button-group {
  position: absolute;
  width: 100%;
  bottom: -30px;
  left: 0;
  box-shadow: 0 -10px 15px -5px black;
}
.setting-input.button-group button {
  border: none;
  padding: 10px;
  color: white;
}
.setting-input.button-group button.back {
  background-color: rgb(160, 19, 0);
}
.setting-input.button-group button.back:hover {
  background-color: rgb(197, 36, 14);
}
.setting-input.button-group button.update {
  background-color: rgb(50, 99, 38);
}
.setting-input.button-group button.update:hover {
  background-color: rgb(64, 139, 46);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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

@media screen and (max-width: 960px) {
  .modal-container {
    width: 90% !important;
  }
  .setting-input {
    display: inherit;
  }
  .setting-input.button-group {
    display: grid;
  }
}
</style>
