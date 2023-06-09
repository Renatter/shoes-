<template>
  <div>
    <div class="container pb-[20px]">
      <div v-if="carts">
        <!-- Блок с информацией о товаре -->
        <div class="blokc flex items-center">
          <img class="w-[600px]" :src="carts.image" alt="" />
          <div class="text ml-[30px] text-[25px] w-[400px]">
            <p class="pt-[15px]">{{ carts.brand }}</p>
            <p class="pt-[15px]">{{ carts.name }}</p>
            <p class="pt-[5px]">В наличи {{ carts.stock }}</p>
            <p class="pt-[15px]">${{ carts.price }}</p>
            <p class="pt-[15px]">Өлшемі</p>

            <!-- Кнопки выбора размера -->
            <button
              v-for="size in carts.size"
              :key="size"
              class="size-button border-[1px] ml-[15px] p-[10px] w-[50px] text-[20px]"
              @click="sizeIt(size)"
              :class="{ selected: selectedSize === size }"
            >
              {{ size }}
            </button>

            <!-- Кнопка "Себетке қосу" (Добавить в корзину) -->
            <button
              v-if="carts.stock >= 1"
              type="button"
              @click="addToCart"
              class="mt-[30px] text-[20px] text-white bg-[#CCC2A5] hover:bg-[#CCC2A5]focus:ring-4 focus:ring-blue-300 font-medium w-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Себетке қосу
            </button>
            <p
              v-else
              class="mt-[30px] text-[20px] text-white bg-red-500 py-2.5 px-5 mb-2 font-medium w-full text-center"
            >
              Нет в наличии
            </p>

            <!-- Кнопка "Таңдаулыларға қосу" (Добавить в список таңдаулылар) -->
            <button
              type="button"
              @click="addToLike"
              class="mt-[10px] text-[20px] text-white bg-[#CCC2A5] hover:bg-[#CCC2A5]focus:ring-4 focus:ring-blue-300 font-medium w-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Таңдаулыларға қосу
            </button>

            <p class="pt-[17px]">Ақпарат</p>
            <p class="text-[20px] text-[#9D9D9D]">{{ carts.info }}</p>
            <p class="pt-[17px]">Жеткізу</p>
            <p class="text-[20px] text-[#9D9D9D]">{{ carts.delivery }}</p>
          </div>
        </div>

        <!-- Секция с комментариями -->
        <p class="text-[25px] font-bold mb-[15px]">Пікірлер орны</p>
        <div class="flex gap-[50px]">
          <div
            v-for="comment in carts.comments"
            class="border-[1px] p-[20px] border-[#583318] w-[400px] h-full"
          >
            <p><span class="font-bold">Аты: </span> {{ comment.name }}</p>
            <p>
              <span class="font-bold">Күні: </span>
              {{ formatCommentDate(comment.date) }}
            </p>
            <p><span class="font-bold">Пікір: </span> {{ comment.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export default {
  data() {
    return {
      category: this.$route.params.id2,
      carts: null,
      likes: null,
      like: [],
      cart: [],
      seachName: this.$route.params.id,
      sizeShose: 35,
      selectedSize: null,
    };
  },
  methods: {
    // Форматирование даты комментария
    formatCommentDate(date) {
      // Реализуйте логику форматирования даты комментария в соответствии с вашими требованиями
      return new Date(date.seconds * 1000).toLocaleString();
    },
    sizeIt(item) {
      this.sizeShose = item;
      this.selectedSize = item;
    },

    // Добавление товара в корзину
    async addToCart() {
      const docRef = doc(db, "cart", `${this.currentUser.uid}`);
      const newItem = {
        category: this.$route.params.id2,
        name: this.carts.name,
        image: this.carts.image,
        price: this.carts.price,
        brand: this.carts.brand,
        size: this.sizeShose,
      };

      // Проверка, существует ли новый товар уже в корзине
      const itemExists = (this.cart || []).some(
        (item) => item.name === newItem.name
      );

      if (itemExists) {
        alert("Уже есть этот товар в корзине");
        return;
      }

      // Добавление нового товара в существующий массив корзины
      const updatedCart = [...(this.cart || []), newItem];

      // Обновление корзины пользователя с обновленным массивом
      await setDoc(docRef, { cart: updatedCart }, { merge: true });

      console.log("Товар добавлен в корзину:", newItem);
    },

    // Добавление товара в список таңдаулылар (like list)
    async addToLike() {
      const docRef = doc(db, "like", `${this.currentUser.uid}`);
      const newItem = {
        category: this.$route.params.id2,
        name: this.carts.name,
        image: this.carts.image,
        price: this.carts.price,
        brand: this.carts.brand,
        size: this.sizeShose,
      };

      // Проверка, существует ли новый товар уже в списке таңдаулылар
      const itemExists = (this.like || []).some(
        (item) => item.name === newItem.name
      );

      if (itemExists) {
        alert("Уже есть этот товар в списке таңдаулылар");
        return;
      }

      // Добавление нового товара в существующий массив списка таңдаулылар
      const updatedLike = [...(this.like || []), newItem];

      // Обновление списка таңдаулылар пользователя с обновленным массивом
      await setDoc(docRef, { like: updatedLike }, { merge: true });

      console.log("Товар добавлен в список таңдаулылар:", newItem);
    },
  },
  async created() {
    const q = query(
      collection(db, this.category),
      where("name", "==", this.seachName)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.carts = doc.data();

      // doc.data() никогда не является undefined для полученных документов запроса
      console.log(doc.id, " => ", doc.data());
    });

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUser = user;

        const userDocRef = doc(db, "cart", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          this.cart = userDoc.data().cart;
        } else {
          console.log("Документ не существует!");
        }

        const likeDocRef = doc(db, "like", user.uid);
        const likeDoc = await getDoc(likeDocRef);
        if (likeDoc.exists()) {
          this.like = likeDoc.data().like;
        } else {
          console.log("Документ не существует!");
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.selected {
  background-color: #ccc2a5;
  color: white;
}
</style>
