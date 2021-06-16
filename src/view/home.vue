<template>
  <div>
    <imgHotpost :mode="mode" :options="options" @onAddHotpost="onAddHotpost"></imgHotpost>
    <button @click="onAdd">新增</button>
    &nbsp;
    <button @click="onEdit">编辑</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: "",
      options: {
        width: 750,
        height: 400,
        icon: require("../assets/timg.jpg"),
        maskList: [
          {
            width: 100,
            height: 100,
            color: "white",
            left: 0,
            top: 0,
            url: "#"
          },
          {
            width: 50,
            height: 50,
            color: "white",
            left: 200,
            top: 200,
            url: "#"
          }
        ]
      }
    };
  },
  methods: {
    onEdit() {
      this.mode = "isEdit";
    },
    onAdd() {
      this.mode = "isAdd";
    },
    onAddHotpost(value) {
      this.options.maskList.push(value);
    }
  }
};
</script>

<style>
div {
  margin-left: 100px;
}
</style>