"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[532],{7138:function(e,t,r){r.d(t,{default:function(){return i.a}});var n=r(231),i=r.n(n)},6463:function(e,t,r){var n=r(1169);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},4492:function(e,t,r){/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},u=n.useState,a=n.useEffect,o=n.useLayoutEffect,l=n.useDebugValue;function s(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var c="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=u({inst:{value:r,getSnapshot:t}}),i=n[0].inst,c=n[1];return o(function(){i.value=r,i.getSnapshot=t,s(i)&&c({inst:i})},[e,r,t]),a(function(){return s(i)&&c({inst:i}),e(function(){s(i)&&c({inst:i})})},[e]),l(r),r};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:c},554:function(e,t,r){e.exports=r(4492)},9039:function(e,t,r){let n;r.d(t,{J$:function(){return ee},ZP:function(){return et}});var i=r(2265),u=r(554);let a=()=>{},o=a(),l=Object,s=e=>e===o,c=e=>"function"==typeof e,d=(e,t)=>({...e,...t}),f=e=>c(e.then),E=new WeakMap,g=0,v=e=>{let t,r;let n=typeof e,i=e&&e.constructor,u=i==Date;if(l(e)!==e||u||i==RegExp)t=u?e.toJSON():"symbol"==n?e.toString():"string"==n?JSON.stringify(e):""+e;else{if(t=E.get(e))return t;if(t=++g+"~",E.set(e,t),i==Array){for(r=0,t="@";r<e.length;r++)t+=v(e[r])+",";E.set(e,t)}if(i==l){t="#";let n=l.keys(e).sort();for(;!s(r=n.pop());)s(e[r])||(t+=r+":"+v(e[r])+",");E.set(e,t)}}return t},w=new WeakMap,h={},p={},y="undefined",_=typeof window!=y,R=typeof document!=y,m=()=>_&&typeof window.requestAnimationFrame!=y,T=(e,t)=>{let r=w.get(e);return[()=>!s(t)&&e.get(t)||h,n=>{if(!s(t)){let i=e.get(t);t in p||(p[t]=i),r[5](t,d(i,n),i||h)}},r[6],()=>!s(t)&&t in p?p[t]:!s(t)&&e.get(t)||h]},b=!0,[O,S]=_&&window.addEventListener?[window.addEventListener.bind(window),window.removeEventListener.bind(window)]:[a,a],V={initFocus:e=>(R&&document.addEventListener("visibilitychange",e),O("focus",e),()=>{R&&document.removeEventListener("visibilitychange",e),S("focus",e)}),initReconnect:e=>{let t=()=>{b=!0,e()},r=()=>{b=!1};return O("online",t),O("offline",r),()=>{S("online",t),S("offline",r)}}},L=!i.useId,k=!_||"Deno"in window,C=e=>m()?window.requestAnimationFrame(e):setTimeout(e,1),N=k?i.useEffect:i.useLayoutEffect,D="undefined"!=typeof navigator&&navigator.connection,A=!k&&D&&(["slow-2g","2g"].includes(D.effectiveType)||D.saveData),P=e=>{if(c(e))try{e=e()}catch(t){e=""}let t=e;return[e="string"==typeof e?e:(Array.isArray(e)?e.length:e)?v(e):"",t]},x=0,I=()=>++x;var F={ERROR_REVALIDATE_EVENT:3,FOCUS_EVENT:0,MUTATE_EVENT:2,RECONNECT_EVENT:1};async function M(...e){let[t,r,n,i]=e,u=d({populateCache:!0,throwOnError:!0},"boolean"==typeof i?{revalidate:i}:i||{}),a=u.populateCache,l=u.rollbackOnError,E=u.optimisticData,g=e=>"function"==typeof l?l(e):!1!==l,v=u.throwOnError;if(c(r)){let e=[];for(let n of t.keys())!/^\$(inf|sub)\$/.test(n)&&r(t.get(n)._k)&&e.push(n);return Promise.all(e.map(h))}return h(r);async function h(r){let i;let[l]=P(r);if(!l)return;let[d,h]=T(t,l),[p,y,_,R]=w.get(t),m=()=>{let e=p[l];return(c(u.revalidate)?u.revalidate(d().data,r):!1!==u.revalidate)&&(delete _[l],delete R[l],e&&e[0])?e[0](2).then(()=>d().data):d().data};if(e.length<3)return m();let b=n,O=I();y[l]=[O,0];let S=!s(E),V=d(),L=V.data,k=V._c,C=s(k)?L:k;if(S&&h({data:E=c(E)?E(C,L):E,_c:C}),c(b))try{b=b(C)}catch(e){i=e}if(b&&f(b)){if(b=await b.catch(e=>{i=e}),O!==y[l][0]){if(i)throw i;return b}i&&S&&g(i)&&(a=!0,h({data:C,_c:o}))}if(a&&!i&&(c(a)?h({data:a(b,C),error:o,_c:o}):h({data:b,error:o,_c:o})),y[l][1]=I(),Promise.resolve(m()).then(()=>{h({_c:o})}),i){if(v)throw i;return}return b}}let U=(e,t)=>{for(let r in e)e[r][0]&&e[r][0](t)},W=(e,t)=>{if(!w.has(e)){let r=d(V,t),n={},i=M.bind(o,e),u=a,l={},s=(e,t)=>{let r=l[e]||[];return l[e]=r,r.push(t),()=>r.splice(r.indexOf(t),1)},c=(t,r,n)=>{e.set(t,r);let i=l[t];if(i)for(let e of i)e(r,n)},f=()=>{if(!w.has(e)&&(w.set(e,[n,{},{},{},i,c,s]),!k)){let t=r.initFocus(setTimeout.bind(o,U.bind(o,n,0))),i=r.initReconnect(setTimeout.bind(o,U.bind(o,n,1)));u=()=>{t&&t(),i&&i(),w.delete(e)}}};return f(),[e,i,f,u]}return[e,w.get(e)[4]]},[j,$]=W(new Map),q=d({onLoadingSlow:a,onSuccess:a,onError:a,onErrorRetry:(e,t,r,n,i)=>{let u=r.errorRetryCount,a=i.retryCount,o=~~((Math.random()+.5)*(1<<(a<8?a:8)))*r.errorRetryInterval;(s(u)||!(a>u))&&setTimeout(n,o,i)},onDiscarded:a,revalidateOnFocus:!0,revalidateOnReconnect:!0,revalidateIfStale:!0,shouldRetryOnError:!0,errorRetryInterval:A?1e4:5e3,focusThrottleInterval:5e3,dedupingInterval:2e3,loadingTimeout:A?5e3:3e3,compare:(e,t)=>v(e)==v(t),isPaused:()=>!1,cache:j,mutate:$,fallback:{}},{isOnline:()=>b,isVisible:()=>{let e=R&&document.visibilityState;return s(e)||"hidden"!==e}}),J=(e,t)=>{let r=d(e,t);if(t){let{use:n,fallback:i}=e,{use:u,fallback:a}=t;n&&u&&(r.use=n.concat(u)),i&&a&&(r.fallback=d(i,a))}return r},Z=(0,i.createContext)({}),z=_&&window.__SWR_DEVTOOLS_USE__,B=z?window.__SWR_DEVTOOLS_USE__:[],G=e=>c(e[1])?[e[0],e[1],e[2]||{}]:[e[0],null,(null===e[1]?e[2]:e[1])||{}],H=()=>d(q,(0,i.useContext)(Z)),K=B.concat(e=>(t,r,n)=>{let i=r&&((...e)=>{let[n]=P(t),[,,,i]=w.get(j);if(n.startsWith("$inf$"))return r(...e);let u=i[n];return s(u)?r(...e):(delete i[n],u)});return e(t,i,n)}),Q=(e,t,r)=>{let n=t[e]||(t[e]=[]);return n.push(r),()=>{let e=n.indexOf(r);e>=0&&(n[e]=n[n.length-1],n.pop())}};z&&(window.__SWR_DEVTOOLS_REACT__=i);let X=i.use||(e=>{if("pending"===e.status)throw e;if("fulfilled"===e.status)return e.value;if("rejected"===e.status)throw e.reason;throw e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e}),Y={dedupe:!0},ee=l.defineProperty(e=>{let{value:t}=e,r=(0,i.useContext)(Z),n=c(t),u=(0,i.useMemo)(()=>n?t(r):t,[n,r,t]),a=(0,i.useMemo)(()=>n?u:J(r,u),[n,r,u]),l=u&&u.provider,s=(0,i.useRef)(o);l&&!s.current&&(s.current=W(l(a.cache||j),u));let f=s.current;return f&&(a.cache=f[0],a.mutate=f[1]),N(()=>{if(f)return f[2]&&f[2](),f[3]},[]),(0,i.createElement)(Z.Provider,d(e,{value:a}))},"defaultValue",{value:q}),et=(n=(e,t,r)=>{let{cache:n,compare:a,suspense:l,fallbackData:f,revalidateOnMount:E,revalidateIfStale:g,refreshInterval:v,refreshWhenHidden:h,refreshWhenOffline:p,keepPreviousData:y}=r,[_,R,m,b]=w.get(n),[O,S]=P(e),V=(0,i.useRef)(!1),D=(0,i.useRef)(!1),A=(0,i.useRef)(O),x=(0,i.useRef)(t),U=(0,i.useRef)(r),W=()=>U.current,j=()=>W().isVisible()&&W().isOnline(),[$,q,J,Z]=T(n,O),z=(0,i.useRef)({}).current,B=s(f)?r.fallback[O]:f,G=(e,t)=>{for(let r in z)if("data"===r){if(!a(e[r],t[r])&&(!s(e[r])||!a(ea,t[r])))return!1}else if(t[r]!==e[r])return!1;return!0},H=(0,i.useMemo)(()=>{let e=!!O&&!!t&&(s(E)?!W().isPaused()&&!l&&(!!s(g)||g):E),r=t=>{let r=d(t);return(delete r._k,e)?{isValidating:!0,isLoading:!0,...r}:r},n=$(),i=Z(),u=r(n),a=n===i?u:r(i),o=u;return[()=>{let e=r($());return G(e,o)?(o.data=e.data,o.isLoading=e.isLoading,o.isValidating=e.isValidating,o.error=e.error,o):(o=e,e)},()=>a]},[n,O]),K=(0,u.useSyncExternalStore)((0,i.useCallback)(e=>J(O,(t,r)=>{G(r,t)||e()}),[n,O]),H[0],H[1]),ee=!V.current,et=_[O]&&_[O].length>0,er=K.data,en=s(er)?B:er,ei=K.error,eu=(0,i.useRef)(en),ea=y?s(er)?eu.current:er:en,eo=(!et||!!s(ei))&&(ee&&!s(E)?E:!W().isPaused()&&(l?!s(en)&&g:s(en)||g)),el=!!(O&&t&&ee&&eo),es=s(K.isValidating)?el:K.isValidating,ec=s(K.isLoading)?el:K.isLoading,ed=(0,i.useCallback)(async e=>{let t,n;let i=x.current;if(!O||!i||D.current||W().isPaused())return!1;let u=!0,l=e||{},d=!m[O]||!l.dedupe,f=()=>L?!D.current&&O===A.current&&V.current:O===A.current,E={isValidating:!1,isLoading:!1},g=()=>{q(E)},v=()=>{let e=m[O];e&&e[1]===n&&delete m[O]},w={isValidating:!0};s($().data)&&(w.isLoading=!0);try{if(d&&(q(w),r.loadingTimeout&&s($().data)&&setTimeout(()=>{u&&f()&&W().onLoadingSlow(O,r)},r.loadingTimeout),m[O]=[i(S),I()]),[t,n]=m[O],t=await t,d&&setTimeout(v,r.dedupingInterval),!m[O]||m[O][1]!==n)return d&&f()&&W().onDiscarded(O),!1;E.error=o;let e=R[O];if(!s(e)&&(n<=e[0]||n<=e[1]||0===e[1]))return g(),d&&f()&&W().onDiscarded(O),!1;let l=$().data;E.data=a(l,t)?l:t,d&&f()&&W().onSuccess(t,O,r)}catch(r){v();let e=W(),{shouldRetryOnError:t}=e;!e.isPaused()&&(E.error=r,d&&f()&&(e.onError(r,O,e),(!0===t||c(t)&&t(r))&&(!W().revalidateOnFocus||!W().revalidateOnReconnect||j())&&e.onErrorRetry(r,O,e,e=>{let t=_[O];t&&t[0]&&t[0](F.ERROR_REVALIDATE_EVENT,e)},{retryCount:(l.retryCount||0)+1,dedupe:!0})))}return u=!1,g(),!0},[O,n]),ef=(0,i.useCallback)((...e)=>M(n,A.current,...e),[]);if(N(()=>{x.current=t,U.current=r,s(er)||(eu.current=er)}),N(()=>{if(!O)return;let e=ed.bind(o,Y),t=0,r=Q(O,_,(r,n={})=>{if(r==F.FOCUS_EVENT){let r=Date.now();W().revalidateOnFocus&&r>t&&j()&&(t=r+W().focusThrottleInterval,e())}else if(r==F.RECONNECT_EVENT)W().revalidateOnReconnect&&j()&&e();else if(r==F.MUTATE_EVENT)return ed();else if(r==F.ERROR_REVALIDATE_EVENT)return ed(n)});return D.current=!1,A.current=O,V.current=!0,q({_k:S}),eo&&(s(en)||k?e():C(e)),()=>{D.current=!0,r()}},[O]),N(()=>{let e;function t(){let t=c(v)?v($().data):v;t&&-1!==e&&(e=setTimeout(r,t))}function r(){!$().error&&(h||W().isVisible())&&(p||W().isOnline())?ed(Y).then(t):t()}return t(),()=>{e&&(clearTimeout(e),e=-1)}},[v,h,p,O]),(0,i.useDebugValue)(ea),l&&s(en)&&O){if(!L&&k)throw Error("Fallback data is required when using suspense in SSR.");x.current=t,U.current=r,D.current=!1;let e=b[O];if(s(e)||X(ef(e)),s(ei)){let e=ed(Y);s(ea)||(e.status="fulfilled",e.value=!0),X(e)}else throw ei}return{mutate:ef,get data(){return z.data=!0,ea},get error(){return z.error=!0,ei},get isValidating(){return z.isValidating=!0,es},get isLoading(){return z.isLoading=!0,ec}}},function(...e){let t=H(),[r,i,u]=G(e),a=J(t,u),o=n,{use:l}=a,s=(l||[]).concat(K);for(let e=s.length;e--;)o=s[e](o);return o(r,i||a.fetcher||null,a)})}}]);