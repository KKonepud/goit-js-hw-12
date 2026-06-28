import{a as u,S as f,i as l}from"./assets/vendor-BGqwtSVv.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function d(s){return u.get("https://pixabay.com/api/",{params:{key:"56427454-39c521709c23a9b65e6fd603c",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data)}const i={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")},m=new f(".gallery a");function p(s){const o=s.map(r=>`<li>
  <a href="${r.largeImageURL}">
    <img src="${r.webformatURL}" alt="${r.tags}" />
  </a>
  <div>
    <p>Likes: ${r.likes}</p>
    <p>Views: ${r.views}</p>
    <p>Comments: ${r.comments}</p>
    <p>Downloads: ${r.downloads}</p>
  </div>
</li>
  `).join("");i.gallery.innerHTML=o,m.refresh()}function y(){i.gallery.innerHTML=""}function h(){i.loader.classList.add("is-visible")}function g(){i.loader.classList.remove("is-visible")}const c={form:document.querySelector(".form"),inputData:document.querySelector('input[name="search-text"]')};c.form.addEventListener("submit",L);function L(s){s.preventDefault();const o=c.form.elements["search-text"].value.trim();o&&(y(),h(),d(o).then(r=>{const n=r.hits;if(!n.length){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(n)}).catch(()=>{l.error({message:"Something went wrong. Please try again!"})}).finally(()=>{g()}))}
//# sourceMappingURL=index.js.map
