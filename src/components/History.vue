<template>
  <div class="history">
    <div class="title">
      History
    </div>
    <div class="body">
      <ul>
        <li v-for="(item, index) in list" :key="index" >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'History',
    data: ()=> {
      return {
        list: [
          'bacd01/Acceptance_test222',
          'bacd01/Acceptance_test11111',
          'bacd01/Acceptance_test123',
          'bacd01/bacd01/Acceptance_testacceptance_test bacd01/Acceptance_testacceptance_test',
          'bacd01/Acceptance_test1231',
          'bacd01/Acceptance_test123',
          'bacd01/Acceptance_test213',
          'bacd01/Acceptance_test123',
          'bacd01/Acceptance_test2131',
          'bacd01/Acceptance_test',
          'bacd01/Acceptance_test',
          'bacd01/Acceptance_test',
          'bacd01/Acceptance_test',
          'bacd01/Acceptance_test'
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
.history {
  padding: 15px 20px 15px 5px;
  position: fixed;
  bottom: 0;
  width: inherit;
  box-sizing: border-box;
}
.title {
  font-size: 24px;
  color: #ccc;
}
.body {
  font-size: 12px;
  color: #999;
  max-height: 200px;
  overflow: auto;
  ul {
    margin-left: 0px;
    padding: 0 0 0 10px;
    line-height: 1.5;
    li {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      // word break
      list-style-position: inside; 
      &:hover {
      color: #00b4cf;
      }
    }
  }
}

</style>