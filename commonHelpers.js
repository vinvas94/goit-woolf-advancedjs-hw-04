import{a as p,i as c,S as v}from"./assets/vendor-a57f9cde.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const w="40010712-6d7af93e262d6e116d716f3d5";p.defaults.baseURL="https://pixabay.com/api/";p.interceptors.response.use(t=>t,t=>(c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",progressBarColor:"red"}),Promise.reject(t)));async function m(t,o,n){return(await p.get(`?key=${w}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${n}`)).data}let i=1,u=null,f=40,d;const s={form:document.querySelector("#search-form"),buttonLoad:document.querySelector(".load-more"),list:document.querySelector(".gallery")};function g(t){if(!s.list)return;const o=t.map(n=>{const{id:a,webformatURL:e,largeImageURL:r,tags:l,likes:y,views:b,comments:L,downloads:$}=n;return`
      
      <div class="photo-card" id="${a}">
  <a  href="${r}"><img src="${e}" alt="${l}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${y}
    </p>
    <p class="info-item">
      <b>Views</b>: ${b}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${L}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${$}
    </p>
  </div>
</div>`}).join("");s.list.insertAdjacentHTML("beforeend",o)}s.form.addEventListener("submit",H);function H(t){if(t.preventDefault(),i=1,s.list.innerHTML="",u=t.currentTarget.searchQuery.value.trim(),u===""){c.warning({title:"Hey",message:"Please specify your search query",position:"topRight"});return}m(u,i,f).then(o=>{o.hits.length*i===o.totalHits?s.buttonLoad.classList.add("hide"):s.buttonLoad.classList.remove("hide"),o.totalHits===0?c.error({title:"Hey",message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}):(g(o.hits),h(),c.success({title:"OK",message:`Hooray! We found ${o.totalHits} images.`,position:"topRight"}))}).catch(o=>{console.log(o)}).finally(()=>s.form.reset())}function h(){d?d.refresh():d=new v(".gallery a",{captionsData:"alt",captionDelay:250,enableKeyboard:!0})}s.buttonLoad.addEventListener("click",q);function q(){i+=1,m(u,i,f).then(t=>{f*i>=t.totalHits&&(s.buttonLoad.classList.add("hide"),c.warning({title:"Hey",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),g(t.hits),h()}).catch(t=>console.log(t))}
//# sourceMappingURL=commonHelpers.js.map
