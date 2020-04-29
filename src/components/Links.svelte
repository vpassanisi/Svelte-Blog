<script>
  import { push } from "svelte-spa-router";
</script>

<style>
  .link:hover {
    border-width: 2px;
    border-radius: 0.25rem;
    border-color: rgb(87, 87, 87);
  }
</style>

<div class="pt-24">
  <div
    class="w-full max-w-screen-sm mx-auto overflow-hidden link transition-all
    duration-200 ease-in-out">
    <div
      on:click={() => push('/posts/parallel-compression')}
      class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/z__6D7KbX-k/1600x900"
        alt=":(" />
      <div
        class="absolute bottom-0 bg-black-alpha-70 text-white w-full p-4
        font-hairline text-4xl">
        Parallel Compression
      </div>
    </div>
  </div>

  <hr class="w-90p mx-auto my-8 border-gray-400" />

  <div
    class="w-full max-w-screen-sm mx-auto link transition-all duration-200
    ease-in-out">
    <div on:click={() => push('/posts/rms')} class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/9bLhuTk4TJs/1600x900"
        alt=":(" />
      <div
        class="absolute bottom-0 bg-black-alpha-70 text-white w-full p-4
        font-hairline text-4xl">
        Metering and RMS
      </div>
    </div>
  </div>

  <hr class="w-90p mx-auto my-8 border-gray-400" />

  <div
    class="w-full max-w-screen-sm mx-auto link transition-all duration-200
    ease-in-out">
    <div on:click={() => push('/posts/synth')} class="relative cursor-pointer">
      <img
        class="rounded"
        src="https://source.unsplash.com/5AlEtKAqTls/1600x900"
        alt=":(" />
      <div
        class="absolute bottom-0 bg-black-alpha-70 text-white w-full p-4
        font-hairline text-4xl">
        Synths
      </div>
    </div>
  </div>
</div>
