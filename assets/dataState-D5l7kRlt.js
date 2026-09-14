import{a as w,g as b,r as k,u as S,j as s,s as R,c as $,b as j,m as U,S as M,a1 as f,a2 as g,e as u,T as A}from"./index-X7iHgVPa.js";function T(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function D(t){return parseFloat(t)}function X(t){return w("MuiSkeleton",t)}b("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:e,variant:a,animation:n,hasChildren:i,width:o,height:r}=t;return j({root:["root",a,n,i&&"withChildren",i&&!o&&"fitContent",i&&!r&&"heightAuto"]},X,e)},l=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,p=g`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,E=typeof l!="string"?f`
        animation: ${l} 2s ease-in-out 0.5s infinite;
      `:null,F=typeof p!="string"?f`
        &::after {
          animation: ${p} 2s linear 0.5s infinite;
        }
      `:null,I=R("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(U(({theme:t})=>{const e=T(t.shape.borderRadius)||"px",a=D(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:M(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:E||{animation:`${l} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:F||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}}]}})),m=k.forwardRef(function(e,a){const n=S({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:o,component:r="span",height:d,style:y,variant:x="text",width:v,...h}=n,c={...n,animation:i,component:r,variant:x,hasChildren:!!h.children},C=B(c);return s.jsx(I,{as:r,ref:a,className:$(C.root,o),ownerState:c,...h,style:{width:v,height:d,...y}})}),N=({loading:t,error:e,children:a})=>t?s.jsxs(u,{sx:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:3,py:2},children:[s.jsx(m,{variant:"text",width:"45%",height:44}),s.jsx(u,{sx:{width:"100%",display:"grid",gridTemplateColumns:{xs:"1fr",sm:"repeat(2, 1fr)",md:"repeat(3, 1fr)"},gap:3},children:[0,1,2].map(n=>s.jsx(m,{variant:"rounded",height:220},n))})]}):e?s.jsx(A,{align:"center",color:"error",sx:{py:4},children:"Failed to load content. Please try again later."}):a;export{N as D};
