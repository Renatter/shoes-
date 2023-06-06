<template>
  <div class="container">
    <h1 class="text-center font-bold text-[55px]">Себет</h1>
    <div v-if="basket === true" class="flex justify-between">
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
          @click="basket = false"
          type="button"
          class="w-full mt-[60px] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Төлеу
        </button>
      </div>
    </div>

    <div v-if="basket === false" class="w-[1200px]">
      <!-- Оплата -->
      <h1 class="font-bold text-[55px]">Төлем</h1>
      <div
        class="w-full h-[500px] border-[2px] border-red-950 rounded-[15px] p-[25px] bg-[#FFFAF6] flex justify-center"
      >
        <div class="flex gap-[150px] pt-[30px]">
          <div class="font-bold text-[30px]">
            <h1>Жеке деректер</h1>
            <div class="flex gap-[25px] mb-[10px]">
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Аты</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Аты"
                />
              </div>
              <div>
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Тегi</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Тегi"
                />
              </div>
            </div>
            <div>
              <label
                for="first_name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
              />
            </div>
            <div class="flex items-center mt-[10px]" @click="tabPay = 1">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-red-950 bg-red-950 border-gray-300 focus:ring-red-950 dark:focus:ring-red-950 dark:ring-offset-red-950 focus:ring-2 dark:bg-red-950 dark:border-gray-600"
              />
              <label
                for="default-radio-1"
                class="ml-2 font-medium text-red-950 dark:text-gray-300 text-[25px]"
                >Оплата онлайн</label
              >
            </div>
            <div class="flex items-center mb-4" @click="tabPay = 2">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-red-950 bg-red-950 border-gray-300 focus:ring-red-950 dark:focus:ring-red-950 dark:ring-offset-red-950 focus:ring-2 dark:bg-red-950 dark:border-gray-600"
              />
              <label
                for="default-radio-2"
                class="ml-2 font-medium text-red-950 dark:text-gray-300 text-[25px]"
                >Қолма-қол ақшамен</label
              >
            </div>
            <button
              @click="basket = true"
              type="button"
              class="w-full text-white bg-[#583318] hover:bg-[#583318] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Артқа
            </button>
          </div>
          <div class="font-bold text-[30px]">
            <h1>Төлем деректемелері</h1>
            <div v-if="tabPay === 1">
              <div class="mb-[10px]">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Карточкадағы аты</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="w-[400px] bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Аты"
                />
              </div>
              <div class="mb-[10px]">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Карта нөмірі</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="w-[400px] bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Карта нөмірі"
                />
              </div>
              <div class="flex gap-[25px]">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Жарамды</label
                  >
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[190px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >CVV</label
                  >
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[190px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <button
                type="button"
                class="w-full text-white bg-[#583318] hover:bg-[#583318] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Төлеy
              </button>
            </div>
            <div v-if="tabPay === 2">
              <div class="mb-[10px]">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Ел</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="w-[400px] bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Ел"
                />
              </div>
              <div class="mb-[10px]">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Қала</label
                >
                <input
                  type="text"
                  id="first_name"
                  class="w-[400px] bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Қала"
                />
              </div>
              <div class="flex gap-[25px]">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Көше</label
                  >
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[110px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Көше"
                  />
                </div>
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Үй</label
                  >
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[110px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Үй"
                  />
                </div>
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Пәтер</label
                  >
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-red-950 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[110px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Пәтер"
                  />
                </div>
              </div>
              <button
                type="button"
                class="w-full mt-[25px] text-white bg-[#583318] hover:bg-[#583318] focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Төлеy
              </button>
            </div>
          </div>
        </div>
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
      basket: true,
      currentUser: null, // Текущий пользователь
      items: null, // Элементы товаров
      totalSum: 0, // Общая сумма
      tabPay: 0,
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
