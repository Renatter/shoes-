<template>
  <div>
    <div class="container">
      <h1 class="text-[50px] font-bold">Жаңа тауарлар</h1>
      <ShoseCard :shoes="newsProduct" :catalog="catalog" />
    </div>
  </div>
</template>
// Импорт компонента и Firebase модулей

<script>
import ShoseCard from "../components/ShoseCard.vue";
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
  components: {
    ShoseCard,
  },
  data() {
    return {
      newsProduct: [], // Массив для хранения новых товаров
      catalog: "newProdcut", // Имя каталога новых товаров
    };
  },
  async mounted() {
    // Получение списка документов из коллекции "newProdcut"
    const querySnapshot = await getDocs(collection(db, "newProdcut"));

    // Преобразование документов в объекты и сохранение в массив newsProduct
    this.newsProduct = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
</script>
// Стили компонента

<style lang="scss" scoped></style>
