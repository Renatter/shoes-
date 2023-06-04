<template>
  <div class="bg">
    <div class="container">
      <img src="../assets/logo1.png" alt="" />
      <ul>
        <router-link to="/"> <li>Басты бет</li></router-link>
        <router-link to="/Catalog">
          <li class="m1 pl-[25px]">Каталог</li>
        </router-link>
        <router-link to="/NewProduct">
          <li class="m1 pl-[25px]">Жаңа тауарлар</li>
        </router-link>
        <router-link to="/Discount">
          <li class="m1 pl-[25px]">Акция</li></router-link
        >
      </ul>
      <div v-if="isAuthenticated === false">
        <router-link to="/Login">
          <button
            type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Кіру
          </button>
        </router-link>
        <router-link to="/Reg">
          <button
            type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Тіркеу
          </button>
        </router-link>
      </div>
      <ul v-else class="items-center">
        <router-link to="/Like">
          <li class="relative">
            <span
              class="itemCount absolute left-[35px] bottom-[14px] text-red-500"
              >{{ itemsLike }}</span
            >
            <img class="logoImg" src="../assets/favLogo.png" alt="" />
          </li>
        </router-link>

        <router-link to="/Basket">
          <li class="relative">
            <span
              class="itemCount absolute right-0 bottom-[14px] text-red-500"
              >{{ itemsLength }}</span
            >
            <img class="logoImg" src="../assets/Basket.png" alt="" />
          </li>
        </router-link>
        <button
          @click="logout"
          type="button"
          class="ml-[25px] py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Шығу
        </button>
      </ul>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
export default {
  data() {
    return {
      isAuthenticated: false,
      itemsLength: null,
      itemsLike: null,
    };
  },
  methods: {
    logout() {
      auth.signOut();
      this.$router.push("/");
      this.isAuthenticated = false;
    },
  },
  created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.isAuthenticated = true;
        const docRef = doc(db, "users", user.uid);
        this.$router.push("/");

        const likeRef = doc(db, "like", user.uid);
        onSnapshot(likeRef, (docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            this.itemsLike = docSnap.data().like.length;
            console.log(this.itemsLike);
          } else {
            console.log("No such document!");
          }
        });

        const cartRef = doc(db, "cart", user.uid);
        onSnapshot(cartRef, (docSnap) => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            this.itemsLength = docSnap.data().cart.length;
            console.log(this.itemsLength);
          } else {
            console.log("No such document!");
          }
        });
      }
    });
  },
};
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
