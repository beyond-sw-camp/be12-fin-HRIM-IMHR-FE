<template>
  <div class="grafana-panel-container">
    <h2 class="text-xl font-bold mb-4">연도별 ESG 교육 수 및 참여율</h2>
    <iframe
      :src="grafanaUrl"
      width="1000"
      height="600"
      frameborder="0"
      class="rounded-md shadow-lg"
    ></iframe>
  </div>
</template>

<script setup>
const grafanaUrl = "http://100.100.100.100:3000/d-solo/98db76e4-bfe7-40f0-a497-f44dda35face/cf7e629?orgId=1&from=1672531200000&to=1746057600000&timezone=browser&panelId=1&__feature.dashboardSceneSolo";
</script>
