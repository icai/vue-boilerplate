<template>
  <div class="pane" :style="styles">
    <span :class="'icon icon-' + icon">
    </span>
    <div class="title">
      {{title}}
    </div>
    <span class="val">{{val}}</span>

  </div>
</template>
<script>
  export default {
    name: 'Dashpane',
    props: {
      bgColor: {
        type: String
      },
      title: {
        type: String
      },
      icon: {
        type: String,
        default: ''
      },
      val: {
        type: [String, Number]
      }
    },
    computed: {
      styles() {
        return {
          background: this.bgColor
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.pane {
  position: relative;
}
.icon {
  font-size: 144px;
  color: #fff;
  opacity: 0.2;
  position: absolute;
  left: 50%;
  margin-left: -72px;
}
.title {
  font: 18px bold;
  color: #fff;
  position: absolute;
  top: 8px;
  left: 10px;
}

.val {
  font-size: 48px;
  color: #fff;
  position: absolute;
  right: 10px;
  bottom: 15px; 
}
.icon-cog {
  animation: rotate 2s linear infinite
}
@keyframes rotate {
    to {
        transform: rotate(1turn)
    }
}

</style>