<template>
  <div class="infoPane">
    <el-button
      icon="el-icon-refresh-right"
      circle
      @click="loadData"
    ></el-button>
    <b>集群信息</b>
    <el-divider></el-divider>

    <!-- <table border="1">
      <tr>
        <td>总空间</td>
        <td>{{ hdfsSummary.totalStr }}</td>
        <td>HDFS已用空间</td>
        <td>{{ hdfsSummary.dfsUsedStr }}</td>
        <td>HDFS剩余空间</td>
        <td>{{ hdfsSummary.dfsFreeStr }}</td>
      </tr>
      <tr>
        <td>非HDFS空间</td>
        <td>{{ hdfsSummary.nonDfsUsedStr }}</td>
        <td>总块数</td>
        <td>{{ hdfsSummary.totalBlocks }}</td>
        <td>总文件数</td>
        <td>{{ hdfsSummary.totalFiles }}</td>
      </tr>
      <tr>
        <td>丢失块数</td>
        <td>{{ hdfsSummary.missingBlocks }}</td>
        <td>活跃结点数</td>
        <td>{{ hdfsSummary.numLiveDataNodes }}</td>
        <td>非活跃结点数</td>
        <td>{{ hdfsSummary.numDeadDataNodes }}</td>
      </tr>
      <tr>
        <td colspan="6">
          空间使用情况
          <el-progress
            type="circle"
            :percentage="hdfsSummary.percentUsed"
          ></el-progress>
        </td>
      </tr>
    </table> -->
    <el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="总空间">
          <el-input v-model="hdfsSummary.totalStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS已用空间">
          <el-input v-model="hdfsSummary.dfsUsedStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS剩余空间">
          <el-input v-model="hdfsSummary.dfsFreeStr" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="非HDFS空间">
          <el-input v-model="hdfsSummary.nonDfsUsedStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="总块数">
          <el-input v-model="hdfsSummary.totalBlocks" readonly></el-input>
        </el-form-item>
        <el-form-item label="总文件数">
          <el-input v-model="hdfsSummary.totalFiles" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="丢失块数">
          <el-input v-model="hdfsSummary.missingBlocks" readonly></el-input>
        </el-form-item>
        <el-form-item label="活跃结点数">
          <el-input v-model="hdfsSummary.numLiveDataNodes" readonly></el-input>
        </el-form-item>
        <el-form-item label="非活跃结点数">
          <el-input v-model="hdfsSummary.numDeadDataNodes" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="空间使用情况">
        <el-progress
          type="circle"
          :percentage="hdfsSummary.percentUsed"
        ></el-progress>
      </el-form-item>
    </el-form>

    <b>活跃数据结点</b>
    <el-divider></el-divider>
    <!-- <table
      v-for="(item, i) in hdfsSummary.liveDataNodeInfos"
      :key="i"
      border="1"
    >
      <tr>
        <td>名称</td>
        <td>{{ item.nodeName }}</td>
        <td>ip地址</td>
        <td>{{ item.nodeAddr }}</td>
        <td>状态</td>
        <td>{{ item.adminState }}</td>
      </tr>
      <tr>
        <td>总空间</td>
        <td>{{ item.capacityStr }}</td>
        <td>HDFS已用空间</td>
        <td>{{ item.usedSpaceStr }}</td>
        <td>HDFS剩余空间</td>
        <td>{{ item.remainingStr }}</td>
      </tr>
      <tr>
        <td colspan="6">
          块使用情况
          <el-progress
            type="circle"
            :percentage="item.blockPoolUsedPerent"
          ></el-progress>
        </td>
      </tr>
    </table> -->
    <el-form v-for="(item, i) in hdfsSummary.liveDataNodeInfos" :key="i">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="item.nodeName" readonly></el-input>
        </el-form-item>
        <el-form-item label="ip地址">
          <el-input v-model="item.nodeAddr" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="item.adminState" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="总空间">
          <el-input v-model="item.capacityStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS已用空间">
          <el-input v-model="item.usedSpaceStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS剩余空间">
          <el-input v-model="item.remainingStr" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="块使用情况">
        <el-progress
          type="circle"
          :percentage="item.blockPoolUsedPerent"
        ></el-progress>
      </el-form-item>
    </el-form>
    <b v-if="hdfsSummary.liveDataNodeInfos.length == 0">无</b>

    <b>非活跃数据结点</b>
    <el-divider></el-divider>
    <!-- <table
      v-for="(item, i) in hdfsSummary.deadDataNodeInfos"
      :key="i"
      border="1"
    >
      <tr>
        <td>名称</td>
        <td>{{ item.nodeName }}</td>
        <td>ip地址</td>
        <td>{{ item.nodeAddr }}</td>
        <td>状态</td>
        <td>{{ item.adminState }}</td>
      </tr>
      <tr>
        <td>总空间</td>
        <td>{{ item.capacityStr }}</td>
        <td>HDFS已用空间</td>
        <td>{{ item.usedSpaceStr }}</td>
        <td>HDFS剩余空间</td>
        <td>{{ item.remainingStr }}</td>
      </tr>
      <tr>
        <td colspan="6">
          块使用情况
          <el-progress
            type="circle"
            :percentage="item.blockPoolUsedPerent"
          ></el-progress>
        </td>
      </tr>
    </table> -->
    <el-form v-for="(item, i) in hdfsSummary.deadDataNodeInfos" :key="i">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="item.nodeName" readonly></el-input>
        </el-form-item>
        <el-form-item label="ip地址">
          <el-input v-model="item.nodeAddr" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="item.adminState" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="总空间">
          <el-input v-model="item.capacityStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS已用空间">
          <el-input v-model="item.usedSpaceStr" readonly></el-input>
        </el-form-item>
        <el-form-item label="HDFS剩余空间">
          <el-input v-model="item.remainingStr" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form-item label="块使用情况">
        <el-progress
          type="circle"
          :percentage="item.blockPoolUsedPerent"
        ></el-progress>
      </el-form-item>
    </el-form>
    <b v-if="hdfsSummary.deadDataNodeInfos.length == 0">无</b>
  </div>
</template>

<script>
export default {
  name: "Computer",
  data() {
    return {
      hdfsSummary: {},
      HOST: "http://localhost:10001/",
    };
  },
  created() {
    let _this = this;
    _this.$http.get(_this.HOST + "hdfs/get").then((res) => {
      if (res.body.code == 0) {
        _this.hdfsSummary = res.body.data;
      } else {
        _this.$message({
          showClose: true,
          message: res.body.msg,
          type: "error",
        });
      }
    });
  },
  methods: {
    loadData() {
      let _this = this;
      _this.$http.get(_this.HOST + "hdfs/get").then((res) => {
        if (res.body.code == 0) {
          _this.$message({
            showClose: true,
            message: res.body.msg,
            type: "success",
          });
          _this.hdfsSummary = res.body.data;
        } else {
          _this.$message({
            showClose: true,
            message: res.body.msg,
            type: "error",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.infoPane {
  display: flex;
  flex-flow: column nowrap;
}
</style>