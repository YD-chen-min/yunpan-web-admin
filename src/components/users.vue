<template>
  <div>
    <el-table :data="selectedData" border style="width: 100%; height: 100%">
      <el-table-column prop="user" label="账号"> </el-table-column>
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="tel" label="手机"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column label="总空间GB">
        <template slot-scope="scope">
          {{ (parseFloat(scope.row.store) / 1024 / 1024 / 1024).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="已用GB">
        <template slot-scope="scope">
          {{ (parseFloat(scope.row.busy) / 1024 / 1024 / 1024).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="空间占比">
        <template slot-scope="scope1">
          <el-progress
            :percentage="
              (
                (parseFloat(scope1.row.busy) / parseFloat(scope1.row.store)) *
                100
              ).toFixed(2)
            "
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @change="select"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      HOST: "http://localhost:10001/",
      selectedData: [],
      tableData: [],
      search: "",
    };
  },
  created() {
    let _this = this;
    _this.$http.get(_this.HOST + "user/getList").then((res) => {
      if (res.body.code == 0) {
        _this.tableData = res.body.data;
        _this.selectedData = res.body.data;
      } else {
        _this.$message({
          showClose: true,
          message: res.body.msg,
          type: "success",
        });
      }
    });
  },
  methods: {
    loadData() {
      let _this = this;
      _this.$http.get(_this.HOST + "user/getList").then((res) => {
        if (res.body.code == 0) {
          _this.tableData = res.body.data;
          _this.selectedData = res.body.data;
        } else {
          _this.$message({
            showClose: true,
            message: res.body.msg,
            type: "success",
          });
        }
      });
    },
    select() {
      let datas = [];
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].user.includes(this.select)) {
          datas.push(this.tableData[i]);
        }
      }
      this.selectedData = datas;
    },
    handleDelete(index, row) {
      this.$confirm("确认删除？")
        .then((_) => {
          let _this = this;
          _this.$http
            .post(
              _this.HOST + "user/delete",
              {
                user: row.user,
                admin: sessionStorage.getItem("user"),
              },
              { emulateJSON: true }
            )
            .then((res) => {
              if (res.body.code == 0) {
                _this.$message({
                  showClose: true,
                  message: res.body.msg,
                  type: "success",
                });
                _this.loadData();
              } else {
                _this.$message({
                  showClose: true,
                  message: res.body.msg,
                  type: "error",
                });
              }
            });
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-flow: row nowrap;

  width: 100%;
}
</style>