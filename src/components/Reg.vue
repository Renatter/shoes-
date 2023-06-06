<template>
  <div class="h-screen flex items-center justify-center">
    <div class="">
      <p class="text-xl font-bold mb-2">Электрондық пошта</p>
      <input
        v-model="email"
        type="text"
        class="border border-gray-300 rounded px-4 py-2 mb-2 w-[400px]"
      />
      <p class="text-xl font-bold mb-2">Құпия сөз</p>
      <input
        v-model="pass"
        type="text"
        class="border border-gray-300 rounded px-4 py-2 mb-2 w-[400px]"
      />
      <p class="text-xl font-bold mb-2">Аты</p>
      <input
        v-model="firstName"
        type="text"
        class="border border-gray-300 rounded px-4 py-2 mb-2 w-[400px]"
      />
      <p class="text-xl font-bold mb-2">Тегi</p>
      <input
        v-model="lastName"
        type="text"
        class="border border-gray-300 rounded px-4 py-2 mb-2 w-[400px]"
      />
      <div>
        <button
          @click="register"
          class="bg-[#CCC2A5] hover:bg-[#CCC2A5] w-full text-white font-bold py-2 px-4 rounded"
        >
          Тіркеу
        </button>
      </div>
    </div>
  </div>
</template>

// Ваш скрипт
<script>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
export default {
  data() {
    return {
      email: "",
      pass: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.pass);
        await signInWithEmailAndPassword(auth, this.email, this.pass);
        this.currentUser = auth.currentUser;

        await setDoc(doc(db, "userProfile", this.currentUser.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
        });
      } catch (error) {
        console.log("Ошибка при регистрации пользователя:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
