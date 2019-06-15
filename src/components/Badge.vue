<template>
  <div :class="'badge badge-' + type">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Badge',
    props: ['type']
  }
</script>

<style lang="scss" scoped>
.badge {
  font-size: 14px;
  padding: 2px 15px;
  display: inline-block;
  color: #fff;
}
.badge-warning {
  background: #F19F46;
}
.badge-success {
  background: #8CBA4F;
}

</style>