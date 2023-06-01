<template>
  <div class="container">
    <h1 class="text-center font-bold text-[55px]">Таңдаулылар</h1>
    <div class="flex justify-between">
      <div class="TABLE w-[950px]">
        <hr />
        <div class="talbeText flex justify-between text-[40px] py-[15px]">
          <p>Товар</p>
          <div class="flex">
            <p>Өлшемі</p>
            <p class="ml-[80px]">Бағасы</p>
            <p class="pl-[90px]">Жою</p>
          </div>
        </div>
        <hr />
        <div
          v-for="item in items"
          :key="item.name"
          class="flex justify-between items-center pb-[15px]"
        >
          <div class="flex items-center">
            <img :src="item.image" :alt="item.name" class="w-[100px]" />
            <div>
              <p><span class="font-bold">Бренд</span> {{ item.brand }}</p>
              <p><span class="font-bold">Аты</span> {{ item.name }}</p>
              <p>
                <span class="font-bold">Категория</span> {{ item.category }}
              </p>
            </div>
          </div>
          <div class="flex text-[30px]">
            <p class="mr-[150px]">{{ item.size }}</p>
            <p class="mr-[140px]">$ {{ item.price }}</p>
            <button
              @click="deleteItem(item)"
              type="button"
              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Жою
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase/firebase";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";

export default {
  data() {
    return {
      currentUser: null,
      items: null,
      totalSum: 0,
    };
  },
  methods: {
    updateTotalSum() {
      if (this.items) {
        this.totalSum = this.items.reduce((sum, item) => sum + item.price, 0);
      }
    },
    async deleteItem(item) {
      const docRef = doc(db, "like", this.currentUser.uid);
      await updateDoc(docRef, {
        like: arrayRemove(item),
      });
      this.updateTotalSum(); // Call the method after deleting the item
    },
  },
  async created() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        const docRef = doc(db, "like", this.currentUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            this.items = docSnap.data().like;
            this.updateTotalSum(); // Call the method after fetching the items
          } else {
            console.log("No such document!");
          }
        });

        // Add unsubscribe function to component instance
        this.unsubscribe = unsubscribe;
      }
    });
  },
  beforeUnmount() {
    // Unsubscribe from the snapshot listener when the component is unmounted
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
};
</script>

<style lang="scss" scoped>
hr {
  border-top: 2px solid #583318; /* Цвет линии */
}
</style>
