<template>
  <div class="sub-header">
    <b-container class>
      <b-row>
        <b-col lg="3" v-if="$store.main.state.subHeader.image">
          <img :src="$store.main.state.subHeader.image" />
        </b-col>
        <b-col lg="9" class="d-flex flex-columnjustify-content-between">
          <div class="align-self-center">
            <h1 v-if="$store.main.state.subHeader.title">{{$store.main.state.subHeader.title}}</h1>
            <hr v-if="$store.main.state.subHeader.title" />
            <h5 v-if="$store.main.state.subHeader.desc">{{$store.main.state.subHeader.desc}}</h5>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
