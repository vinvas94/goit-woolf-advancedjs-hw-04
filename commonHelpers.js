import{a as p,i as c,S as v}from"./assets/vendor-a57f9cde.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const $="40010712-6d7af93e262d6e116d716f3d5";p.defaults.baseURL="https://pixabay.com/api/";p.interceptors.response.use(e=>e,e=>(c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",progressBarColor:"red"}),Promise.reject(e)));async function H(e,t,i){return(await p.get(`?key=${$}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${i}`)).data}let n=1,d=null,f=40,u;const s={form:document.querySelector("#search-form"),buttonLoad:document.querySelector(".load-more"),list:document.querySelector(".gallery")};function m(e){if(!s.list)return;const t=e.map(i=>{const{id:a,webformatURL:o,largeImageURL:r,tags:l,likes:y,views:L,comments:b,downloads:w}=i;return`
      
      <div class="photo-card" id="${a}">
  <a  href="${r}"><img src="${o}" alt="${l}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${y}
    </p>
    <p class="info-item">
      <b>Views</b>: ${L}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${b}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${w}
    </p>
  </div>
</div>`}).join("");s.list.insertAdjacentHTML("beforeend",t)}s.form.addEventListener("submit",q);async function g(e,t,i){try{return await H(e,t,i)}catch(a){throw console.log(a),a}}async function q(e){if(e.preventDefault(),s.buttonLoad.classList.add("hide"),n=1,s.list.innerHTML="",d=e.currentTarget.searchQuery.value.trim(),d===""){c.warning({title:"Hey",message:"Please specify your search query",position:"topRight"});return}try{const t=await g(d,n,f);t.hits.length*n===t.totalHits?s.buttonLoad.classList.add("hide"):s.buttonLoad.classList.remove("hide"),t.totalHits===0?c.error({title:"Hey",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(m(t.hits),s.buttonLoad.classList.remove("hide"),h(),c.success({title:"OK",message:`Hooray! We found ${t.totalHits} images.`,position:"topRight"}))}catch(t){console.log(t)}finally{s.form.reset()}}function h(){u?u.refresh():u=new v(".gallery a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0})}s.buttonLoad.addEventListener("click",S);async function S(){n+=1;try{const e=await g(d,n,f);f*n>=e.totalHits&&(s.buttonLoad.classList.add("hide"),c.warning({title:"Hey",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),m(e.hits),h()}catch(e){console.log(e)}}
//# sourceMappingURL=commonHelpers.js.map
