var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(t,n,e){t.insertBefore(n,e||null)}function f(t){t.parentNode.removeChild(t)}function a(){return t=" ",document.createTextNode(t);var t}let l;function s(t){l=t}const i=[],d=[],p=[],$=[],m=Promise.resolve();let g=!1;function h(t){p.push(t)}let y=!1;const x=new Set;function _(){if(!y){y=!0;do{for(let t=0;t<i.length;t+=1){const n=i[t];s(n),b(n.$$)}for(i.length=0;d.length;)d.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];x.has(n)||(x.add(n),n())}p.length=0}while(i.length);for(;$.length;)$.pop()();g=!1,y=!1,x.clear()}}function b(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(h)}}const v=new Set;function w(t,n){t&&t.i&&(v.delete(t),t.i(n))}function E(t,e,c){const{fragment:u,on_mount:f,on_destroy:a,after_update:l}=t.$$;u&&u.m(e,c),h(()=>{const e=f.map(n).filter(r);a?a.push(...e):o(e),t.$$.on_mount=[]}),l.forEach(h)}function k(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function N(t,n){-1===t.$$.dirty[0]&&(i.push(t),g||(g=!0,m.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function j(n,r,c,u,f,a,i=[-1]){const d=l;s(n);const p=r.props||{},$=n.$$={fragment:null,ctx:null,props:a,update:t,not_equal:f,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:e(),dirty:i};let m=!1;$.ctx=c?c(n,p,(t,e,...o)=>{const r=o.length?o[0]:e;return $.ctx&&f($.ctx[t],$.ctx[t]=r)&&($.bound[t]&&$.bound[t](r),m&&N(n,t)),e}):[],$.update(),m=!0,o($.before_update),$.fragment=!!u&&u($.ctx),r.target&&(r.hydrate?$.fragment&&$.fragment.l(function(t){return Array.from(t.childNodes)}(r.target)):$.fragment&&$.fragment.c(),r.intro&&w(n.$$.fragment),E(n,r.target,r.anchor),_()),s(d)}class H{$destroy(){k(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(){}}class M extends H{constructor(t){super(),j(this,t,null,null,c,{})}}function O(n){let e,o,r;const c=new M({});return{c(){var t,n;(t=c.$$.fragment)&&t.c(),e=a(),n="main",o=document.createElement(n),o.innerHTML="<div>Hello World</div>"},m(t,n){E(c,t,n),u(t,e,n),u(t,o,n),r=!0},p:t,i(t){r||(w(c.$$.fragment,t),r=!0)},o(t){!function(t,n,e,o){if(t&&t.o){if(v.has(t))return;v.add(t),(void 0).c.push(()=>{v.delete(t),o&&(e&&t.d(1),o())}),t.o(n)}}(c.$$.fragment,t),r=!1},d(t){k(c,t),t&&f(e),t&&f(o)}}}return new class extends H{constructor(t){super(),j(this,t,null,O,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
