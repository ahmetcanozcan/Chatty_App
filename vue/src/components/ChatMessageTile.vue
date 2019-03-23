<template>
  <div class="message-tile" :class="isRight ? 'right' : 'left'">
    <div :class="isRight ? 'right' : 'left'">
      <div class="grid">
        <div class="img" v-if="!isRight">
          <img :src="authorImg" style="width:100%; height:auto" alt srcset>
        </div>
        <div>
          <div v-if="!isRight" class="author">{{authorName}}</div>
          <div class="message">{{message}}</div>
          <div class="time">{{time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    authorName: {
      Type: String,
      required: true
    },
    authorImg: {
      Type: String,
      required: true
    },
    message: {
      Type: String,
      required: true
    },
    time: {
      Type: String,
      required: true
    },
    isRight: {
      Type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.message-tile {
  width: 100%;
  margin: 0.4rem 0;
}
.message-tile.left .grid {
  display: grid;
  grid-template-columns: 68px auto;
}
.message-tile .img {
  transform: scale(1.2) translateY(7px);
  padding-right: 15px;
}
.message-tile img {
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.message-tile > div {
  width: 40%;
  display: inline-block;
  text-align: left;
  padding: 5px 15px;
  box-shadow: 5px 8px 25px -5px black;
}

.message-tile.left {
  text-align: left;
}
.message-tile.right {
  text-align: right;
}

.message-tile .author {
  font-weight: 800;
  color: #b7c11e;
  text-shadow: 1px 1px black;
  text-transform: capitalize;
  margin-bottom: 8px;
}
.message-tile .time {
  opacity: 0.4;
  text-align: right;
}

.message-tile.right > div {
  background-color: rgb(253, 168, 112);

  border-bottom-left-radius: 15px;
  border-top-right-radius: 15px;
}
.message-tile.left > div {
  background-color: #eff1c2;
  border-top-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.message-tile.right:after {
  content: "";
  display: block;
  clear: both;
}
@media screen and (max-width: 960px) {
  .message-tile .img {
    margin-bottom: 15px;
  }
  .message-tile > div {
    width: 90%;
    margin: 5px 0px;
  }
}
</style>