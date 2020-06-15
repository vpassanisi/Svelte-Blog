<script>
  import { media } from "../stores/watchMedia.js";
</script>

<style>
  .bg-img {
    background-image: url("../images/landing.jpg");
  }
</style>

<div
  class={`bg-img ${$media.lg ? 'bg-fixed bg-contain' : 'bg-cover'} bg-no-repeat bg-center w-90p h-70vh rounded-b mx-auto`} />
