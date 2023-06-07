<template>
  <div>
    <div class="container">
      <div class="flex pt-[200px]">
        <div class="home_info">
          <h1>
            Бірегей дизайны бар <br />
            әйелдер аяқ киімі
          </h1>
          <p class="text-[20px] text-[#A88C76]">
            Ерлі-зайыптыларыңызды шынайы стильде сәйкестендіріңіз және "Dana"
            түпнұсқалық дизайнымен керемет сападан ләззат алыңыз, өз кезегінде
            біз сізге сәйкес келетін ең жақсысын таңдауға көмектесуге
            қуаныштымыз
          </p>
          <router-link to="/Catalog">
            <button
              type="button"
              class="mt-[25px] text-white bg-[#573217] hover:bg-[#573217] focus:ring-4 focus:ring-blue-300 font-medium rounded-[25px] text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[100px]"
            >
              Каталог
            </button></router-link
          >
        </div>
        <img
          class="w-[500px]"
          src="../assets/photo_2023-06-05_17-27-01.jpg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 55px;
  font-size: 55px;
  font-family: "Cormorant Unicase", serif;
}
.home_info {
  width: 700px;
}
</style>
