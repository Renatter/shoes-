<template>
  <div>
    <div class="container">
      <h1 class="text-[50px] font-bold">Акция</h1>
      <ShoseCard :shoes="newsProduct" :catalog="catalog" />
    </div>
  </div>
</template>

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
      newsProduct: [],
      catalog: "discount",
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, "discount"));
    this.newsProduct = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
};
</script>

<style lang="scss" scoped></style>
