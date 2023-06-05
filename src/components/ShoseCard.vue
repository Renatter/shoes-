<template>
  <!-- Выводит список обуви -->
  <div class="flex gap-[15px] flex-wrap">
    <div class="h-full w-[286px] border-[1px] p-[25px]" v-for="item in shoes">
      <img :src="item.image" class="w-[160px]" alt="" />
      <div class="pt-[2px]">
        <p class="font-bold text-[20px]">{{ item.brand }}</p>
        <p class="text-[20px]">{{ item.name }}</p>
        <div class="flex justify-between pt-[10px]">
          <p class="font-bold text-[20px] text-[#9F8D81]">$ {{ item.price }}</p>
          <!-- Ссылка для перехода на страницу с подробной информацией о товаре -->
          <router-link
            :to="{ path: '/ShoseCardInfo/' + item.name + '/' + catalog }"
          >
            <a class="font-bold hover:border-b-[2px] border-[#583318]" href=""
              >Толығырақ</a
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["shoes", "catalog"], // Принимает данные обуви и каталога в виде props

  // Остальная логика компонента может находиться здесь
};
</script>
