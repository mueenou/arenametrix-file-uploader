<template>
  <div>
    <nav class="h-24 flex flex-row justify-around shadow-lg mb-10">
      <div class="w-36 grid place-content-center">
        <img
          src="https://arenametrix.com/hubfs/Arenametrix_theme_aug2023/Logo-Arenametrix-%C3%A9criture-verte.png"
          alt="logo-image"
          class="h-16"
        />
      </div>
      <ul class="flex flex-row gap-x-10 items-center font-bold">
        <li>
          <nuxt-link to="#">Nos solutions</nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">Nos connexions</nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">Clients</nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">à propos</nuxt-link>
        </li>
      </ul>
      <div class="flex flex-row gap-x-10 items-center">
        <button class="bg-blue-500 h-10 px-6 rounded text-white">
          Prendre rendez-vous
        </button>
        <button
          class="border border-blue-200 h-10 px-6 rounded hover:bg-blue-500 hover:text-white duration-500"
        >
          Se connecter
        </button>
      </div>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
