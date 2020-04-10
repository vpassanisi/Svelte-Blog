<script>
  import { media } from "../stores/watchMedia.js";
</script>

<style>
  .bg-img {
    background-image: url("../images/landing.jpg");
  }
</style>

<div class="md:px-16">
  <div
    class={`bg-img ${$media.lg ? 'bg-fixed' : ''} bg-cover bg-no-repeat bg-center w-full h-70vh flex items-end justify-between rounded-b`}>
    <div class=" bg-black-alpha-40 w-full p-8">
      <div class="text-4xl text-white font-hairline">Audio-Blog</div>
    </div>
  </div>
</div>
