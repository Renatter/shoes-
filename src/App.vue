<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
.container {
  max-width: 1240px;
  margin: 0 auto;
}
* {
  padding: 0;
  color: #583318;
  margin: 0;
  box-sizing: border-box;
  font-family: "Ysabeau", sans-serif;
}
</style>
