<template>
  <div id="app">
    <a-input
      :value="value"
      @change="handleChange"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          @change="
            e => {
              changeState(e, item.id)
            }
          "
          :checked="item.done"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="deleteItem(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ total }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="btnS === 'all' ? 'primary' : 'default'"
            @click="hightLight('all')"
            >全部</a-button
          >
          <a-button
            :type="btnS === 'undone' ? 'primary' : 'default'"
            @click="hightLight('undone')"
            >未完成</a-button
          >
          <a-button
            :type="btnS === 'done' ? 'primary' : 'default'"
            @click="hightLight('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="cleanDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  computed: {
    ...mapState(['list', 'value', 'btnS']),
    ...mapGetters(['total', 'infoList'])
  },
  methods: {
    ...mapMutations([
      'changeVal',
      'addItem',
      'removeItem',
      'checkedBoxState',
      'cleanDone',
      'changeBtnStatus'
    ]),
    handleChange(e) {
      // console.log(e.target.value)
      this.changeVal(e.target.value)
    },
    addItemToList() {
      if (this.value.trim().length <= 0) {
        return this.$message.warning('输入的内容不能为空')
      }
      this.addItem()
    },
    deleteItem(id) {
      // console.log(id)
      this.removeItem(id)
    },
    changeState(e, id) {
      // console.log(e.target.checked, id)
      const params = {
        done: e.target.checked,
        id
      }
      this.checkedBoxState(params)
    },
    hightLight(s) {
      // console.log(s)
      this.changeBtnStatus(s)
    }
  },
  created() {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
