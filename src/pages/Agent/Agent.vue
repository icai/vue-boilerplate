<template>
  <div class="container">
    <el-row :gutter="30" type="flex"  justify="center">
      <el-col :span="8"><dashpane :bgColor="'#FF9A2A'" title="Building" :val="summary.building" icon="cog" class="grid-content" ></dashpane></el-col>
      <el-col :span="8"><dashpane :bgColor="'#7FBC39'" title="Idle" :val="summary.idle" icon="coffee" class="grid-content"></dashpane></el-col>
      <el-col :span="8">
        <div class="dash-small grid-content">
          <div class="item">
            <div class="name">
              ALL
            </div>
            <div class="count">
              {{summary.all}}
            </div>
          </div>
          <div class="item">
            <div  class="name">
              PHYSICAL
            </div>
            <div class="count">
              {{summary.physical}}
            </div>
          </div>
          <div class="item">
            <div  class="name">        
              VIRTUAL
            </div>
            <div class="count">
              {{summary.virtual}}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="toolbar mt-20">
      <div class="tabs">
        <tab v-for="(item, index) in tabs"  :key="index" :class="item.active ? 'active' : ''" @click="tabClick(item, index)">{{item.name}}</tab>
      </div>
      <div class="search">
          <span class="icon icon-search"></span>
          <input type="text">
      </div>
      <div class="display menu-icons">
        <span class="menu-icon"><i class="icon-th-card icon"></i></span>
        <span class="menu-icon active"><i class="icon-th-list icon"></i></span>
      </div>
    </div>
    <div class="list-box">
      <agent v-for="(item) in agents" :key="item.id" :source="item" class="agent"></agent>
    </div>
  </div>
</template>

<script>
import Dashpane from '@/components/agent/Dashpane.vue'
import Agent from '@/components/agent/Agent.vue'
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
export default {
  components: { Dashpane, Agent },
  data() {
    return {
      tabs: [
        { name: 'All', slug: '', active: 1 },
        { name: 'Physical', slug: 'physical', active: 0},
        { name: 'Virtual', slug: 'virtual', active: 0}
      ]
    }
  },
  computed: {
    ...mapGetters('agent',['agents', 'summary'])
  },
  created() {
    this.tabClick(this.tabs[0], 0);
  },
  methods: {
    ...mapActions('agent', ['getAgent']),
    tabClick(item, index) {
      if (item.slug == '') {
        this.getAgent()
      } else {
        this.getAgent({
          type:  item.slug
        })
      }
      this.tabs = this.tabs.map((item, i)=> {
        if ( index == i ) {
          item.active = 1;
        } else {
          item.active = 0;
        }
        return item
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding-left: 30px;
  padding-top: 15px;
}
.grid-content {
  height: 140px;
}
.dash-small {
  background: #fff;
  display: flex;
  flex-direction: row;
  .item {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: center;
    .name {
      flex: 1;
      font-size: 12px;
      padding-top: 15px;
    } 
    .count {
      flex: 1;
      font-size: 20px;
      font-weight: 600;

    }
  }
}
@media screen and (max-width: 1200px) {
  .dash-small {
    flex-direction: column;
    padding: 10px;
    .item {
      flex-direction: row;
      text-align: left;
      justify-content: space-between;
      line-height: 25px;
      .name {
        padding: 0px;
      }
      .count {
        text-align: right;
        padding-right: 20px;
      }
    }
  }
}
.toolbar {
  display: flex;
  height: 50px;
  line-height: 50px;
  background: #fff;
}

// tabs
.tabs {
  flex: 0 0 auto;
  display: flex;
  tab {
    padding: 0px 35px;
    cursor: pointer;
  }
  tab + tab {
    border-left: 1px solid #F1F1F1;
  }
  .active {
    border-bottom: 3px solid #00b4cf;
  }
}

.search {
  display: flex;
  flex: 1 0 auto;
  padding: 10px;
  position: relative;
  .icon {
    position: absolute;
    top: 15px;
    left: 20px;
    font-size: 20px;
    color: #999999;
  }
  input {
    background: #F3F3F3;
    height: 30px;
    line-height: 32px;
    width: 200px;
    -webkit-appearance: none;
    border: 1px solid #dcdfe6;
    color: #606266;
    font-size: inherit;
    outline: none;
    padding: 0 5px;
  }
}

.display {
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: flex-end;
}
.menu-icons {
  .menu-icon {
    padding-right: 20px;
    display: flex;
    &.active {
      color: #51B2CC;
    }
    .icon {
      display: inline-block;
      font-size: 20px;
      text-align: center;
    }
  }
}

.list-box {
  margin-top: 20px;
  .agent + .agent {
    margin-top: 20px;
  }
}

</style>