<template>
  <div class="media">
    <img :src="require('../../assets/osicons/'+ source.os +'.png')" class="mr-30" alt="">
    <div class="media-body">
      <div class="info">
        <span class="label-icon">
          <span class="icon icon-desktop"></span><a href="">{{source.name}}</a>
        </span>
        <badge :type="badgeType" class="ml-20 mr-30">{{source.status}}</badge>
        <span class="label-icon">
          <span class="icon icon-info"></span>
          <span>{{source.ip}}</span>
        </span>
        <span class="label-icon">
          <span class="icon icon-folder"></span>
          <span>{{source.location}}</span>
        </span>
      </div>
      <div class="control">
        <!-- popup -->
        <el-popover
          popper-class="popup"
          placement="top-start"
          width="570"
          v-model="visible">
          <span class="popupclose" @click="closePopup">X</span>
          <p>Separate multiple resource name with commas?</p>
          <el-input v-model="input" class="input" placeholder="Input value"></el-input>
          <div style="text-align: left;" class="mt-15">
              <btn type="primary" class="mr-15"  >
                <span style="padding: 0 10px; color: #fff;" @click="addSource" >Add Resources</span>
              </btn>
              <btn  type="default" class="" >
                <span style="padding: 0 30px; color: #fff;" @click="closePopup" >Cancel</span>
              </btn>
          </div>
          <btn type="primary" size="sm"  slot="reference">
            <span class="icon icon-plus fs-18" style="line-height: 26px;padding: 0 10px; color: #fff;"></span>
          </btn>
        </el-popover>
        <div class="labels-wrap">
          <btn type="label" class="source-label" size="sm" v-for="(item, index) in source.resources" :key="index">
            <span @click="delSource(item)">
              <span style="padding: 0 0 0 10px;">{{item}}</span>
              <span class="icon icon-trash fs-16" style="line-height: 26px;padding: 0 10px 0 5px; color: #314052;"></span>
            </span>
          </btn>
        </div>
        <btn type="primary" class="pull-right" v-if="source.status == 'building'" >
          <span class="icon icon-deny fs-14" style="line-height: 28px; padding: 0 5px 0 20px;color: #fff;"></span>
          <span class="fs-14" style="padding: 0 20px 0 0;color: #fff;">Deny</span>
        </btn>
      </div>
    </div>
  </div>
</template>
<script>
import Badge from '@/components/Badge';
import Btn from '@/components/Button';
import { mapMutations, mapActions, mapGetters, mapState } from "vuex";
import { arrayUniq } from '@/utils/array'
  export default {
    name: 'Agent',
    components: { Badge, Btn },
    data() {
      return {
        input: '',
        visible: false
      }
    },
    props: {
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      badgeType() {
        return this.source.status == 'idle' ? 'success' : 'warning';
      }
    },
    methods: {
      ...mapActions('agent', ['putAgent']),
      closePopup() {
        this.visible = false;
        this.input = '';
      },
      addSource() {
        if(this.input.trim() == '') {
          alert('please input value');
          return;
        }
        let data = arrayUniq(this.source.resources.concat(this.input.split(',')));
        this.putAgent({id: this.source.id, resources: data})
        .then((res)=> {
          this.closePopup();
        })
      },
      delSource(val) {
        this.$confirm('Are you sure delete this source?', 'Tips', {
          confirmButtonText: 'Confrim',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let data = arrayUniq(this.source.resources.filter(item => item != val));
          this.putAgent({id: this.source.id, resources: data})
          .then((res)=> {
            this.closePopup();
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.media {
    display: flex;
    align-items: flex-start;
    padding: 10px;
    background: #fff;
}

.media-body {
    flex: 1
}

.label-icon {
  font-size: 14px;
  line-height: 16px;
  vertical-align: middle;
  margin-right: 20px;
  .icon {
    font-size: 16px;
    color: #A6A6A6;
    margin-right: 8px;
    vertical-align: middle;
  }
}
.labels-wrap {
  width: 80%;
  margin-left: 40px;
}

.popupclose {
  position: absolute;
  right: 10px;
  top: 10px;
}
.input {
  /deep/ .el-input__inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 32px;
    line-height: 32px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    box-shadow: inset 1px 1px 1px 0px rgba(0,0,0,0.2);
    width: 100%;
    &:hover {
        border-color: #c0c4cc
    }
    &:focus {
      outline: none;
      // border-color: #1890ff;
      // box-shadow: 0 0 0 2px rgba(24,144,255,.2);
      border-right-width: 1px!important
    }
  }
}

.control {
  margin-top: 25px;
  /deep/ .source-label {
    margin-left: 20px;
    margin-bottom: 15px;
  }
}

</style>