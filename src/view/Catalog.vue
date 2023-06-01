<template>
  <div>
    <div class="container">
      <h1 class="text-[50px] font-bold">Каталог</h1>

      <div class="flex gap-12">
        <div class="w-[270px]">
          <p class="font-bold text-[25px]">Түрі</p>
          <div class="flex items-center mb-4">
            <input
              @click="tab = 'shoes'"
              id="default-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="ml-2 text-[18px] font-medium text-gray-900 dark:text-gray-300"
              >Туфли</label
            >
          </div>
          <div class="flex items-center mb-4">
            <input
              @click="tab = 'loafers'"
              checked
              id="default-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-2"
              class="ml-2 text-[18px] font-medium text-gray-900 dark:text-gray-300"
              >Лоферы</label
            >
          </div>
          <div class="flex items-center mb-4">
            <input
              @click="tab = 'sneakers'"
              id="default-radio-3"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-3"
              class="ml-2 text-[18px] font-medium text-gray-900 dark:text-gray-300"
              >Кроссовки</label
            >
          </div>
          <div class="flex items-center">
            <input
              @click="tab = 'ballets'"
              checked
              id="default-radio-4"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-4"
              class="ml-2 text-[18px] font-medium text-gray-900 dark:text-gray-300"
              >Балетки</label
            >
          </div>
          <p class="py-[10px] font-bold text-[25px]">Бағасы</p>
          <div class="mb-2">
            <button
              @click="sortAscending"
              type="button"
              class="py-2.5 px-5 mr-2 mb-2 text-[18px] font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#583318] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Өсу бойынша
            </button>
            <button
              @click="sortDescending"
              type="button"
              class="py-2.5 px-5 mr-2 mb-2 text-[18px] font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#583318] focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Кему бойынша
            </button>
          </div>
        </div>
        <div>
          <ShoseCard :shoes="shoes" :catalog="tab" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import ShoseCard from "../components/ShoseCard.vue";

export default {
  components: {
    ShoseCard,
  },
  data() {
    return {
      tab: "shoes",
      shoes: [],
    };
  },
  watch: {
    tab: {
      immediate: true,
      handler(newTab) {
        this.fetchShoesData(newTab);
      },
    },
  },
  methods: {
    sortAscending() {
      this.shoes.sort((a, b) => a.price - b.price);
    },

    sortDescending() {
      this.shoes.sort((a, b) => b.price - a.price);
    },
    async fetchShoesData(tab) {
      const querySnapshot = await getDocs(collection(db, tab));
      this.shoes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
};
</script>

<style lang="scss" scoped></style>
