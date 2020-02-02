<template>
  <footer class="footer mt-auto py-3 dark" :class="{'auth':$store.Session.state.user}">
    <b-container>
      <b-row>
        <b-col sm="10" class="justify-content-center d-flex flex-column">
          <div>
            <span
              class="text-muted"
            >HABBO is a registered trademark of Sulake Oy in the European Union, the USA, Japan, the People's Republic of China and various other jurisdictions. All rights reserved</span>
            <span
              class="text-muted d-block"
              v-if="$store.main.state.settings"
            >{{$store.main.state.settings.hotel_name}} {{$t('hotel')}} © 2020 Hypnos; NectarCMS</span>
          </div>
        </b-col>
        <b-col sm="2">
          <img src="/assets/images/nectar.gif" class="mb-1" />
          <span class="text-muted d-block">Powered by NectarCMS</span>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
