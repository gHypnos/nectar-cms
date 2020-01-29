<template>
  <footer class="footer mt-auto py-3" :class="{'auth':$store.Session.state.user}">
    <b-container>
      <span class="text-muted d-block">Powered by Nectar © 2020 Hypnos</span>
      <span
        class="text-muted"
      >HABBO is a registered trademark of Sulake Oy in the European Union, the USA, Japan, the People's Republic of China and various other jurisdictions. All rights reserved</span>
    </b-container>
  </footer>
</template>
