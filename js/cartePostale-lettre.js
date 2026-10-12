(() => {
 const overlay=document.getElementById("zoomOverlay"), content=document.getElementById("zoomContent"), close=document.getElementById("zoomClose");
 if(!overlay||!content||!close)return;
 let previousFocus=null;
 function openZoom(side){
   const article=document.querySelector(`[data-zoom="${side}"]`)?.closest(".card-side");
   const svg=article?.querySelector("svg.postcard-art"); if(!svg)return;
   previousFocus=document.activeElement; content.replaceChildren(svg.cloneNode(true)); overlay.hidden=false;
   document.body.style.overflow="hidden"; close.focus();
 }
 function closeZoom(){overlay.hidden=true;content.replaceChildren();document.body.style.overflow="";if(previousFocus)previousFocus.focus();}
 document.querySelectorAll("[data-zoom]").forEach(b=>b.addEventListener("click",()=>openZoom(b.dataset.zoom)));
 document.querySelectorAll(".postcard-art").forEach(svg=>svg.addEventListener("click",()=>openZoom(svg.closest(".card-side").querySelector("[data-zoom]").dataset.zoom)));
 close.addEventListener("click",closeZoom);
 overlay.addEventListener("click",e=>{if(e.target===overlay)closeZoom();});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!overlay.hidden)closeZoom();});
 const frontInput=document.getElementById("frontMessage"), backInput=document.getElementById("backMessage");
 const frontText=document.querySelector("[data-front-text]"), backSvg=document.querySelector(".card-side:nth-child(2) svg");
 if(frontInput&&frontText)frontInput.addEventListener("input",()=>frontText.textContent=frontInput.value||"Pour toi, avec amour");
 if(backInput&&backSvg){
   const render=()=>{let group=backSvg.querySelector("[data-user-message]");if(group)group.remove();if(!backInput.value.trim())return;
     const ns="http://www.w3.org/2000/svg";group=document.createElementNS(ns,"g");group.setAttribute("data-user-message","");group.setAttribute("fill","#b58ba0");group.setAttribute("font-family","Courier New, monospace");group.setAttribute("font-size","9");
     backInput.value.split("\\n").slice(0,5).forEach((line,i)=>{const t=document.createElementNS(ns,"text");t.setAttribute("x","285");t.setAttribute("y",String(115+i*16));t.textContent=line.slice(0,28);group.appendChild(t);});backSvg.appendChild(group);
   };
   backInput.addEventListener("input",render);
 }
})();