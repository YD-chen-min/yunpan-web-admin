<template>
  <div>
    <el-table
      :data="selectedData"
      border
      style="width: 100%"
      height="845"
      v-loadmore="loadMore"
      v-loading="loading"
    >
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
              parseFloat(
                (
                  (parseFloat(scope1.row.busy) / parseFloat(scope1.row.store)) *
                  100
                ).toFixed(2)
              )
            "
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <!-- slot-scope  一定要带上 少了就会出现控件bug -->
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @change="select"
          ></el-input>
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
      start: 0,
      full: false,
      loading: false,
    };
  },
  created() {
    let _this = this;
    _this.$http
      .get(_this.HOST + "user/getList", {
        params: {
          start: _this.start * 15,
        },
      })
      .then((res) => {
        if (res.body.code == 0) {
          _this.tableData = res.body.data;
          _this.selectedData = _this.tableData;
          _this.start = _this.start + 1;
        } else {
          _this.$message({
            showClose: true,
            message: res.body.msg,
            type: "success",
          });
        }
      });
    // console.log(_this.$refs);
    // console.log(_this.$refs.userlist);

    // let dom = _this.$refs.userlist;
    // dom.addEventListener("scroll", function () {
    //   const scrollDistance =
    //     dom.scrollHeight - dom.scrollTop - dom.clientHeight;
    //   if (scrollDistance <= 0) {
    //     //等于0证明已经到底，可以请求接口
    //     _this.$http
    //       .get(_this.HOST + "user/getList", {
    //         params: {
    //           start: _this.start * 15,
    //         },
    //       })
    //       .then((res) => {
    //         if (res.body.code == 0) {
    //           _this.tableData = res.body.data;
    //           _this.selectedData = res.body.data;
    //           _this.start = _this.start + 1;
    //         } else {
    //           _this.$message({
    //             showClose: true,
    //             message: res.body.msg,
    //             type: "success",
    //           });
    //         }
    //       });
    //   }
    // });
  },
  methods: {
    loadMore() {
      let _this = this;
      if (_this.full) {
        _this.$message({
          showClose: true,
          message: "已到底了",
          type: "success",
        });
      } else {
        _this.loading = true;
        _this.$http
          .get(_this.HOST + "user/getList", {
            params: {
              start: _this.start * 15,
            },
          })
          .then((res) => {
            _this.loading = false;
            if (res.body.code == 0) {
              if (res.body.data.length != 0) {
                _this.tableData = [..._this.tableData, ...res.body.data];
                _this.selectedData = _this.tableData;
                _this.start = _this.start + 1;
                // console.log(_this.tableData);
              } else {
                _this.full = true;
              }
            } else {
              _this.$message({
                showClose: true,
                message: res.body.msg,
                type: "success",
              });
            }
          });
      }
    },
    select() {
      // this.$forceUpdate();
      let datas = [];
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].user.includes(this.search)) {
          datas.push(this.tableData[i]);
        }
      }
      // console.log(datas);
      this.selectedData = datas;
      if (datas.length == 0) {
        let _this = this;
        _this.$http
          .get(_this.HOST + "user/getList", {
            params: {
              user: _this.search,
              start: 0,
            },
          })
          .then((res) => {
            if (res.body.data.length > 0) {
              datas = res.body.data;
              _this.selectedData = datas;
            }
          });
      }
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

                _this.selectedData.splice(index, 1);

                var i = 0;
                for (; i < _this.tableData.length; i++) {
                  if (_this.tableData[i].user == row.user) {
                    break;
                  }
                }
                _this.tableData.splice(i, 1);
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