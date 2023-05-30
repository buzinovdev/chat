<script setup>
import CardList from "@/components/Dialogs/CardList.vue";
</script>

<template>
  <div class="dialog">
    <div class="input-group rounded mb-3">
      <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
             aria-describedby="search-addon"/>
      <span class="input-group-text border-0" id="search-addon">
            <i class="bi bi-search"></i>
          </span>
    </div>
    <CardList/>
  </div>
</template>

<style scoped>
.dialog {
  width: 320px;
  min-height: 100%;
}
</style>
