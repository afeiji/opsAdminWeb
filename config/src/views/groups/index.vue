<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <!--@keyup.enter.native表示回车也调用handleSearch方法-->
        <el-input v-model="params.name" placeholder="搜索用户组" @keyup.enter.native="handleSearch">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"/>
        </el-input>
      </el-col>
      <el-col :span="12" align="right" style="padding-right:20px;">
        <el-button type="primary" @click="handleAddGroup">增加用户组</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="groupsList"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="200"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        fixed="right"
        label="成员管理">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleGroupMember(scope.row)">成员列表 <el-badge :value="scope.row.members" class="item"/></el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="权限管理">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleGroupPermission(scope.row)">修改权限</el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleModify(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="padding-top:20px;">
      <span class="demonstration" />
      <el-pagination
        :total="total"
        layout="prev, pager, next"
        background
        @current-change="handleChange" />
    </el-row>
    <!--v-model传过去，还要传回来，:gname只需要传过去，子组件有一个gname参数接收值-->
    <ModifyGroup v-model="modifyGroupVisible" :gname="groupName" :gid="groupId" @fetch="handleFetch"/>
    <GroupMember v-model="groupMemberVisible" :gname="groupName" :gid="groupId" @fetch="handleFetch"/>
    <GroupPermission v-model="groupPermissionVisible" :gname="groupName" :gid="groupId"/>
  </div>

</template>
<script>
import { getGroupList } from '@/api/group'
import ModifyGroup from './component/groupForm'
import GroupMember from './component/groupMembers'
import GroupPermission from './component/groupPermission'
export default {
  name: 'GroupList',
  components: {
    ModifyGroup,
    GroupMember,
    GroupPermission
  },
  data() {
    return {
      groupsList: [],
      modifyGroupVisible: false,
      groupMemberVisible: false,
      groupPermissionVisible: false,
      groupId: 0,
      groupName: '',
      total: 0,
      params: {
        page: 1,
        name: ''
      }
    }
  },
  created() {
    this.fetchGroupList()
  },
  methods: {
    fetchGroupList() {
      getGroupList(this.params).then(res => {
        this.groupsList = res.results
        this.total = res.count
      })
    },
    handleModify(obj) {
      this.modifyGroupVisible = true
      this.groupId = obj.id
      this.groupName = obj.name
    },
    handleFetch() {
      this.fetchGroupList()
    },
    handleAddGroup() {
      this.groupId = 0
      this.groupName = ''
      this.modifyGroupVisible = true
    },
    handleChange(val) {
      this.params.page = val
      this.fetchGroupList()
    },
    handleSearch() {
      this.params.page = 1
      this.fetchGroupList()
    },
    handleGroupMember(obj) {
      this.groupMemberVisible = true
      this.groupId = obj.id
      this.groupName = obj.name
    },
    handleGroupPermission(obj) {
      this.groupPermissionVisible = true
      this.groupId = obj.id
      this.groupName = obj.name
    }
  }
}
</script>
