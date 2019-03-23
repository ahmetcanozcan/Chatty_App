<template>
  <div id="chatHeader">
    <div class="img">
      <img :src="clientUser.img" style="width:auto;height:100%;" alt>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    clientUser: {
      type: Object,
      default: {
        name: "Black Angry Monkey",
        img: "https://randomuser.me/api/portraits/women/13.jpg"
      }
    },
    onlineUserCount: {
      type: Number,
      default: 1
    }
  }
};
</script>
<style>
#chatHeader > span {
  display: table-cell;
  vertical-align: middle;
}

#chatHeader span.nick-name {
  font-size: 32px;
  text-transform: capitalize;
}
#chatHeader span.user-count {
  font-size: 22px;
  margin-left: auto;
  float: right;
}
#chatHeader span.user-count span {
  display: inline-block;
  font-size: 150%;
  background-color: #eff1c2;
  margin-right: 10px;
  padding: 0 5px;
  color: black;
  transform: translateX(-15px) translateY(-15px) scale(2);
}
@media screen and (max-width: 960px) {
  #chatHeader span.nick-name {
    font-size: 22px;
  }
  #chatHeader span.user-count {
    font-size: 17px;
  }
  #chatHeader span.user-count span {
    display: inline-block;
    font-size: 150%;
    background-color: #eff1c2;
    margin-right: 10px;
    padding: 0 5px;
    color: black;
    transform: translateX(-1px);
  }
  #chatHeader span.nick-name {
    font-size: 16px;
  }
  #chatHeader > span {
    font-size: 10px;
  }
}
</style>
