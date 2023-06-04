<template>
  <div class="container">
    <h1 class="text-center font-bold text-[55px]">Себет</h1>
    <div class="flex justify-between">
      <div class="TABLE w-[950px]">
        <hr />
        <!-- Заголовок таблицы -->
        <div class="talbeText flex justify-between text-[40px] py-[15px]">
          <p>Товар</p>
          <div class="flex">
            <p>Өлшемі</p>
            <p class="ml-[80px]">Бағасы</p>
            <p class="pl-[90px]">Жою</p>
          </div>
        </div>
        <hr />
        <!-- Элементы таблицы -->
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

      <!-- Общая стоимость -->
      <div
        class="PRICE border-[1px] w-[250px] h-[200px] bg-[#E9D9CC] rounded-[15px] p-[15px]"
      >
        <p class="text-left text-[20px] font-bold text-[#B91C1C]">ИТОГО</p>
        <p class="text-[20px] font-bold">Бағасы ${{ totalSum }}</p>
        <button
          type="button"
          class="w-full mt-[60px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Жіберу
        </button>
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
      currentUser: null, // Текущий пользователь
      items: null, // Элементы товаров
      totalSum: 0, // Общая сумма
    };
  },
  methods: {
    // Обновление общей суммы
    updateTotalSum() {
      if (this.items) {
        this.totalSum = this.items.reduce((sum, item) => sum + item.price, 0);
      }
    },
    // Удаление элемента
    async deleteItem(item) {
      const docRef = doc(db, "cart", this.currentUser.uid);
      await updateDoc(docRef, {
        cart: arrayRemove(item),
      });
      this.updateTotalSum(); // Вызов метода после удаления элемента
    },
  },
  async created() {
    // Проверка аутентификации пользователя
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;
        const docRef = doc(db, "cart", this.currentUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            this.items = docSnap.data().cart;
            this.updateTotalSum(); // Вызов метода после получения элементов
          } else {
            console.log("No such document!");
          }
        });

        // Добавление функции отписки от снапшота в экземпляр компонента
        this.unsubscribe = unsubscribe;
      }
    });
  },
  beforeUnmount() {
    // Отписка от снапшота при удалении компонента
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
