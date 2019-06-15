<template>
  <div :class="classaz">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'md'
      }
    },
    computed: {
      classaz() {
        const prefixCls = 'btn'
        return [
            `${prefixCls}`,
            {
                [`${prefixCls}-${this.type}`]: this.type,
                [`${prefixCls}-${this.size}`]: this.size
            }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn {
  height: 30px;
  display: flex;
  line-height: 30px;
  float: left;
  cursor: pointer;
}

.btn-sm {
  height: 26px;
  line-height: 26px;
}

.btn-primary{
  background: #51B2CC;
  &:hover{
     background: #3B8497
  }
}
.btn-default{
  background: #465464;
  &:hover{
    background: #314052;
   
  }
}
.btn-label{
  background: #EFEFEF;
  &:hover{
    background: #EFEFEF;
   
  }
}

</style>