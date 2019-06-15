<template>
  <div class="app-wrapper" >
    <nav-bar></nav-bar>
    <div class="main-container">
      <div class="sidebar-holder">
        <side-bar class="sidebar-container"></side-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from './components';

export default {
  name: 'layout',
  components: {
    NavBar,
    SideBar,
    AppMain,
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  min-height: 100vh;
  max-width: 1200px;
  display: flex;
  margin: auto;
  // transition: margin-left 0.28s;
  // margin-left: 256px;
  background-color: #f0f2f5;
}

.sidebar-holder {
  top: 0px;
}
</style>
