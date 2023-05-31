<template>
  <div class="bg">
    <div class="container">
      <ul>
        <router-link to="/"> <li>Басты бет</li></router-link>
        <router-link to="/Catalog">
          <li class="m1">Каталог</li>
        </router-link>
        <li class="m1">Жаңа тауарлар</li>
        <li class="m1">Акция</li>
      </ul>
      <img src="../assets/logo1.png" alt="" />
      <ul>
        <li><img class="logoImg" src="../assets/userLogo.png" alt="" /></li>
        <li><img class="logoImg" src="../assets/favLogo.png" alt="" /></li>
        <li><img class="logoImg" src="../assets/Basket.png" alt="" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bg {
  background-color: #fffaf6;
  height: 80px;
  border-bottom: 2px solid #583318;
}
.m1 {
  margin-left: 15px;
}
ul {
  display: flex;
}
li {
  font-size: 20px;

  text-decoration: none;
  list-style: none;
}
.logoImg {
  width: 25px;
  margin-left: 15px;
}
</style>
