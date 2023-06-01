<template>
  <div>
    <div class="container">
      <div v-if="carts">
        <div class="blokc flex items-center">
          <img class="w-[600px]" :src="carts.image" alt="" />
          <div class="text ml-[30px] text-[25px] w-[400px]">
            <p>{{ carts.brand }}</p>
            <p>{{ carts.name }}</p>
            <p>${{ carts.price }}</p>
            <p>Өлшемі</p>

            <button
              v-for="size in carts.size"
              :key="size"
              class="size-button border-[1px] ml-[15px] p-[10px] w-[50px] text-[20px]"
              @click="sizeIt(size)"
              :class="{ selected: selectedSize === size }"
            >
              {{ size }}
            </button>

            <button
              type="button"
              @click="addToCart"
              class="mt-[30px] text-[20px] text-white bg-[#CCC2A5] hover:bg-[#CCC2A5]focus:ring-4 focus:ring-blue-300 font-medium w-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Себетке қосу
            </button>
            <button
              type="button"
              @click="addToLike"
              class="mt-[30px] text-[20px] text-white bg-[#CCC2A5] hover:bg-[#CCC2A5]focus:ring-4 focus:ring-blue-300 font-medium w-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Таңдаулыларға қосу
            </button>
            <p>Ақпарат</p>
            <p class="text-[20px] text-[#9D9D9D]">{{ carts.info }}</p>
            <p>Жеткізу</p>
            <p class="text-[20px] text-[#9D9D9D]">{{ carts.delivery }}</p>
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
    sizeIt(item) {
      this.sizeShose = item;
      this.selectedSize = item;
    },

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

      // Check if the new item already exists in the cart
      const itemExists = (this.cart || []).some(
        (item) => item.name === newItem.name
      );

      if (itemExists) {
        alert("Уже есть этот товар в корзине");
        return;
      }

      // Add the new item to the existing cart array
      const updatedCart = [...(this.cart || []), newItem];

      // Update the user's cart with the updated cart array
      await setDoc(docRef, { cart: updatedCart }, { merge: true });

      console.log("Item added to cart:", newItem);
    },
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

      // Check if the new item already exists in the like list
      const itemExists = (this.like || []).some(
        (item) => item.name === newItem.name
      );

      if (itemExists) {
        alert("Уже есть этот товар в списке таңдаулылар");
        return;
      }

      // Add the new item to the existing like array
      const updatedLike = [...(this.like || []), newItem];

      // Update the user's like list with the updated like array
      await setDoc(docRef, { like: updatedLike }, { merge: true });

      console.log("Item added to like list:", newItem);
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

      // doc.data() is never undefined for query doc snapshots
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
          console.log("No such document!");
        }
        const likeDocRef = doc(db, "like", user.uid);
        const likeDoc = await getDoc(likeDocRef);
        if (likeDoc.exists()) {
          this.like = likeDoc.data().like;
        } else {
          console.log("No such document!");
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
