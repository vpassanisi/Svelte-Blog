<script>
  import { media } from "../stores/watchMedia";
  import { darkMode } from "../stores/darkMode.js";
  import { push } from "svelte-spa-router";

  import Sidebar from "./Sidebar.svelte";

  let show = false;
  let scroll;

  window.onscroll = () => {
    scroll = document.documentElement.scrollTop;
  };

  const sidebarToggle = () => {
    show = !show;
  };
</script>

<style>
  .will-change-height {
    will-change: height;
  }
</style>

<div
  class={`flex justify-center items-center w-screen max-w-full border-b border-gray-600 bg-white
  dark:bg-gray-900 ${scroll > 0 ? 'h-12' : 'h-24'} fixed transition-height duration-500 ease-in-out will-change-height`}>
  <div class="flex items-center justify-between h-full max-w-screen-lg w-90p">
    <button
      class="block h-full px-4 dark:text-white text-2xl font-hairline
      focus:outline-none"
      on:click={() => push('/')}>
      Third Sound
    </button>
    <div class="h-full">
      {#if $media.lg}
        <div class="flex items-center justify-center h-full">
          <button
            class={`h-full px-4 dark:text-white ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}
            transition-colors duration-300 ease-in-out focus:outline-none`}
            on:click={() => push('/')}>
            Home
          </button>
          <button
            class={`h-full px-4 dark:text-white ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}
            transition-colors duration-300 ease-in-out focus:outline-none`}
            on:click={() => push('/posts')}>
            Posts
          </button>
          {#if $darkMode}
            <button
              class={`h-full px-4 dark:text-white focus:outline-none transition-colors duration-300 ease-in-out ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              on:click={() => darkMode.turnOff()}>
              <i
                class="material-icons dark:text-white flex items-center
                justify-center">
                brightness_7
              </i>
            </button>
          {:else}
            <button
              class={`h-full px-4 dark:text-white focus:outline-none transition-colors duration-300 ease-in-out ${$darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
              on:click={() => darkMode.turnOn()}>
              <i
                class="material-icons dark:text-white flex items-center
                justify-center">
                brightness_4
              </i>
            </button>
          {/if}
        </div>
      {:else}
        <button
          class="h-full w-full focus:outline-none"
          on:click={() => sidebarToggle()}>
          <i
            class="material-icons dark:text-white flex items-center
            justify-center">
            menu
          </i>
        </button>
      {/if}
    </div>
  </div>
</div>
<div class="h-12" />

<Sidebar {show} {sidebarToggle} />
