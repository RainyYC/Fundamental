"use strict";(()=>{var $=(e,r,n=!1)=>{let{stage:s,energy:o,researchesAuto:l,buyToggle:a}=d,{energyType:c,buildingsInfo:g}=u;if(e[r-1].current<g.cost[r]*(n?2:1)){u.screenReader&&!n&&(t("invisibleBought").textContent=`Coudn't buy '${g.name[r]}', because didn't had enough of '${g.name[r-1]}'`);return}if(s===1&&(c[r]=B.energyType[r]*2**d.researches[4]),a.howMany!==1&&l[0]>0||n){let b=e[r-1].current/(n?2:1),i=g.cost[r],C=0,D=n?-1:a.howMany;for(var f=0;b>=i&&f!==D;f++)C+=i,b-=i,i*=g.increase;if(f<D&&D!==-1&&a.strict)return;e[r-1].current-=C,e[r].current+=f,e[r].true+=f,e[r].total+=f,s===1&&(o.current+=c[r]*f,o.total+=c[r]*f,u.screenReader&&!n&&(t("invisibleBought").textContent=`Bought ${y(f)} '${g.name[r]}', gained ${y(c[r]*f)} energy`))}else(a.howMany===1||l[0]===0)&&(e[r-1].current-=g.cost[r],e[r].current++,e[r].true++,e[r].total++,s===1&&(o.current+=c[r],o.total+=c[r],u.screenReader&&(t("invisibleBought").textContent=`Bought 1 '${g.name[r]}', gained ${c[r]} energy`)));v(r),A(),T()},v=e=>{let{stage:r,buildings:n,upgrades:s,researches:o}=d,{buildingsInfo:l,upgradesInfo:a}=u;r===1&&(a.effect[4]=Math.trunc((.2+o[0]*.01)*100)/100,l.increase=Math.trunc((1.4-(s[4]===1?a.effect[4]:0))*100)/100),l.cost[e]=B.buildingsInfo.cost[e]*l.increase**n[e].true,e===1&&s[0]===1&&(l.cost[1]/=10)},P=(e,r)=>{d[r][e]!==u[r+"Info"].max[e]&&(u[r+"Info"].cost[e]=B[r+"Info"].cost[e]+u[r+"Info"].scalling[e]*d[r][e])},E=(e,r)=>{let{stage:n,buildings:s}=d,{buildingsInfo:o}=u,l=s[e].current;if(n===1&&e===3){if(o.producing[3]<=1)return;s[e].current+=Math.log(o.producing[e])*r*12**d.researches[2]*(d.upgrades[7]===1?d.energy.current:1)}else s[e].current+=o.producing[e+1]*r;s[e].total+=s[e].current-l},x=(e,r="normal")=>{let{energy:n,upgrades:s,researches:o,researchesAuto:l}=d,{upgradesInfo:a,researchesInfo:c,researchesAutoInfo:g}=u;switch(u.screenReader&&w(e,r),r){case"normal":if(s[e]===1||n.current<a.cost[e])return;if(s[e]=1,n.current-=a.cost[e],t(`upgrade${e+1}`).style.backgroundColor="green",e===0)v(1);else if(e===3)t("discharge").style.display="";else if(e===4)for(let f=1;f<=3;f++)v(f);u.screenReader&&(t("invisibleBought").textContent=`You have bought upgrade '${a.description[e]}'`);break;case"researches":{if(o[e]===c.max[e]||n.current<c.cost[e])return;let f=t(`research${e+1}Stage1Level`);if(o[e]++,n.current-=c.cost[e],f.textContent=String(o[e]),o[e]!==c.max[e]?f.classList.replace("redText","orchidText"):(f.classList.remove("redText","orchidText"),f.classList.add("greenText")),e===0)for(let b=1;b<=3;b++)v(b);u.screenReader&&(t("invisibleBought").textContent=`You have researched '${c.description[e]}', level is now ${o[e]} ${o[e]===c.max[e]?"maxed":""}`);break}case"researchesAuto":{if(l[e]===g.max[e]||n.current<g.cost[e])return;let f=t(`researchAuto${e+1}Level`);l[e]++,n.current-=g.cost[e],f.textContent=String(l[e]),l[e]!==g.max[e]?f.classList.replace("redText","orchidText"):(f.classList.remove("redText","orchidText"),f.classList.add("greenText")),u.screenReader&&(t("invisibleBought").textContent=`You have researched '${g.description[e]}', level is now ${l[e]} ${l[e]===g.max[e]?"maxed":""}`);break}}T(),r.includes("researches")&&P(e,r),w(e,r)},U=(e,r=!0)=>{var o,l,a,c;let{toggles:n}=d,s=t(`toggle${e}`);r&&(n[e]=!n[e]),s.classList.contains("auto")?n[e]?(s.textContent="Auto ON",s.style.borderColor=""):(s.textContent="Auto OFF",s.style.borderColor="crimson"):n[e]?(s.textContent="ON",s.style.borderColor="",u.screenReader&&(s.ariaLabel=(c=(a=s.ariaLabel)==null?void 0:a.replace(" OFF"," ON"))!=null?c:"")):(s.textContent="OFF",s.style.borderColor="crimson",u.screenReader&&(s.ariaLabel=(l=(o=s.ariaLabel)==null?void 0:o.replace(" ON"," OFF"))!=null?l:""))},k=(e="none")=>{let{buyToggle:r}=d,n=t("buyAnyInput");switch(e){case"1":r.howMany=1;break;case"max":r.howMany=-1;break;case"any":r.input=Math.max(Math.trunc(Number(n.value)),-1),r.input===0&&(r.input=1),r.howMany=r.input;break;case"strict":r.strict=!r.strict;break;default:n.value=String(r.input)}t("buyStrict").style.borderColor=r.strict?"":"crimson",t("buy1x").style.backgroundColor=r.howMany===1?"green":"",t("buyAny").style.backgroundColor=Math.abs(r.howMany)!==1?"green":"",t("buyMax").style.backgroundColor=r.howMany===-1?"green":""},J=async()=>{let{stage:e,buildings:r}=d;e===1&&(r[3].current>=1e21?p("There is nothing past stage 1 for now"):p("There are more molecules in a single drop than that you know"))},Q=async()=>{let{energy:e,discharge:r,buildings:n,upgrades:s,toggles:o}=d,{dischargeInfo:l}=u;if(s[3]===1&&n[1].true>0){let a=!0;if(o[1]&&e.current<l.next?a=await L("This will reset all of your current buildings and energy. You will NOT gain production boost. Continue?"):o[1]&&e.current>=l.next&&(a=await L("You have enough energy to gain boost. Continue?")),a){e.current>=l.next?(l.next*=10,r.current++,u.screenReader&&(t("invisibleBought").textContent="Progress was reset for 4x boost")):u.screenReader&&e.current<l.next&&(t("invisibleBought").textContent="Buildings and energy were reset, no boost"),e.current=0;for(let c=0;c<=3;c++)c===0?n[c].current=3:(n[c].current=0,n[c].true=0,v(c));T()}}};var I=(e="none")=>{if(u.tab!==e){t("stageTab").style.display="none",t("stageTabBtn").style.borderColor="",t("researchTab").style.display="none",t("researchTabBtn").style.borderColor="",t("settingsTab").style.display="none",t("settingsTabBtn").style.borderColor="";let r=["#e3e3e3","#a10000"][u.theme.stage-1],n=t("invisibleTab");t("specialTab").style.display="none",e!=="none"?u.tab=e:u.tab="stage",t(`${u.tab}Tab`).style.display="",t(`${u.tab}TabBtn`).style.borderColor=r,n.textContent=`Current tab: ${u.tab} tab`,j(),T()}},A=()=>{let{stage:e,discharge:r,time:n,upgrades:s,researches:o,researchesAuto:l,buildings:a,toggles:c}=d,{buildingsInfo:g,upgradesInfo:f}=u,b=Date.now()-n.updated,i=b/1e3;if(n.updated=Date.now(),b<0)return console.warn("Negative passed time detected.");switch(u.lastSave+=b,i>3600&&(i=3600,console.log("Max offline progress is 1 hour.")),e){case 1:f.effect[5]=Math.trunc((1.02+.01*o[1])*100)/100,f.effect[3]=4+1*o[3],s[6]===1&&E(3,i),c[6]&&l[1]>=3&&$(a,3,!0),g.producing[3]=.3*a[3].current*f.effect[3]**r.current,s[5]===1&&(g.producing[3]*=f.effect[5]**a[3].true),E(2,i),c[5]&&l[1]>=2&&$(a,2,!0),g.producing[2]=.4*a[2].current*f.effect[3]**r.current,s[2]===1&&(g.producing[2]*=5),s[5]===1&&(g.producing[2]*=f.effect[5]**a[2].true),E(1,i),c[4]&&l[1]>=1&&$(a,1,!0),g.producing[1]=.5*a[1].current*f.effect[3]**r.current,s[1]===1&&(g.producing[1]*=10),s[5]===1&&(g.producing[1]*=f.effect[5]**a[1].true),E(0,i);break}},T=()=>{let{stage:e,energy:r,buildings:n,upgrades:s}=d,{tab:o,lastSave:l,dischargeInfo:a,buildingsInfo:c,upgradesInfo:g}=u;u.footer&&(e===1&&(t("quarks").textContent=`Quarks: ${y(n[0].current)}`),r.total>=9&&e!==2&&(t("energy").textContent=`Energy: ${y(r.current,0)}`)),o==="stage"&&e===1&&(t("building1Cur").textContent=y(n[1].current),t("building1Prod").textContent=y(c.producing[1]),c.cost[1]<=n[0].current?(t("building1Btn").classList.add("availableBuilding"),t("building1Btn").textContent=`Buy for: ${y(c.cost[1])} Quarks`):(t("building1Btn").classList.remove("availableBuilding"),t("building1Btn").textContent=`Need: ${y(c.cost[1])} Quarks`),n[1].total>=11&&(t("building2Cur").textContent=y(n[2].current),t("building2Prod").textContent=y(c.producing[2]),c.cost[2]<=n[1].current?(t("building2Btn").classList.add("availableBuilding"),t("building2Btn").textContent=`Buy for: ${y(c.cost[2])} Particles`):(t("building2Btn").classList.remove("availableBuilding"),t("building2Btn").textContent=`Need: ${y(c.cost[2])} Particles`)),n[2].total>=2&&(t("building3Cur").textContent=y(n[3].current),t("building3Prod").textContent=y(c.producing[3]),c.cost[3]<=n[2].current?(t("building3Btn").classList.add("availableBuilding"),t("building3Btn").textContent=`Buy for: ${y(c.cost[3])} Atoms`):(t("building3Btn").classList.remove("availableBuilding"),t("building3Btn").textContent=`Need: ${y(c.cost[3])} Atoms`)),s[3]===1&&(t("dischargeReset").textContent=`Next goal is ${y(a.next,0)} energy`,t("dischargeEffect").textContent=String(g.effect[3]))),o==="settings"&&(t("isSaved").textContent=`${y(l,0,"time")} ago`)},j=()=>{let{stage:e,energy:r,discharge:n,buildings:s,upgrades:o,researchesAuto:l}=d;if(e===1){t("energyStat").style.display=r.total>=9?"":"none",t("atomsMain").style.display=s[1].total>=11?"":"none",t("moleculesMain").style.display=s[2].total>=2?"":"none",t("discharge").style.display=o[3]>0?"":"none";for(let a=5;a<=8;a++)n.current>=3?t(`upgrade${a}`).style.display="":t(`upgrade${a}`).style.display="none";s[3].current>=1e21&&(t("stageReset").textContent="Enter next stage"),u.screenReader&&(t("invisibleGetBuilding2").style.display=s[2].total>0?"":"none",t("invisibleGetBuilding3").style.display=s[3].total>0?"":"none")}t("upgrades").style.display=r.total>=9||e>1?"":"none",t("resetToggles").style.display=n.current>=1||e>1?"":"none",t("researchTabBtn").style.display=n.current>=4||e!==1?"":"none",t("toggleBuy").style.display=l[0]>0?"":"none";for(let a=1;a<=3;a++)l[1]>=a?t(`toggle${a+3}`).style.display="":t(`toggle${a+3}`).style.display="none";t("stage").style.display=o[7]===1||e>1?"":"none",t("stageToggleReset").style.display=e>1?"":"none",t("themeArea").style.display=e>1?"":"none"},w=(e,r="normal")=>{let{upgrades:n,researches:s,researchesAuto:o}=d,{buildingsInfo:l,upgradesInfo:a,researchesInfo:c,researchesAutoInfo:g}=u;switch(r){case"normal":t("upgradeText").textContent=a.description[e],t("upgradeEffect").textContent=`${a.effectText[e][0]}${a.effect[e]}${a.effectText[e][1]}`,t("upgradeCost").textContent=`${n[e]===1?0:a.cost[e]} Energy.`;break;case"researches":t("researchText").textContent=c.description[e],t("researchEffect").textContent=`${c.effectText[e][0]}${c.effect[e]}${c.effectText[e][1]}`,t("researchCost").textContent=`${s[e]===c.max[e]?0:c.cost[e]} Energy.`;break;case"researchesAuto":t("researchText").textContent=g.description[e],e===1&&(g.effect[1]=l.name[Math.min(o[1]+1,l.name.length-1)]),t("researchEffect").textContent=`${g.effectText[e][0]}${g.effect[e]}${g.effectText[e][1]}`,t("researchCost").textContent=`${o[e]===g.max[e]?0:g.cost[e]} Energy.`;break}},y=(e,r=e<1e3?2:0,n="number")=>{switch(n){case"number":if(r>0&&e<1e6)return String(Math.trunc(e*10**r)/10**r);if(r<=0&&e<1e6)return String(Math.trunc(e));{let s=Math.trunc(Math.log10(e));return`${Math.trunc(e/10**s*100)/100}e${s}`}case"time":return e>=1728e5?`${Math.trunc(e/864e5)} days`:e>=72e5?`${Math.trunc(e/36e5)} hours`:e>=6e5?`${Math.trunc(e/6e4)} minutes`:`${Math.trunc(e/1e3)} seconds`}},V=()=>{let{stage:e,discharge:r,upgrades:n,researches:s,researchesAuto:o}=d,{stageInfo:l,dischargeInfo:a,buildingsInfo:c,researchesInfo:g,researchesAutoInfo:f}=u,b=document.body.style;if(e===1){a.next=10**r.current;for(let i=0;i<m.upgrades.length;i++)n[i]===1?t(`upgrade${[i+1]}`).style.backgroundColor="green":t(`upgrade${[i+1]}`).style.backgroundColor="";for(let i=0;i<m.researches.length;i++)t(`research${i+1}Stage1Level`).textContent=String(s[i]),t(`research${i+1}Stage1Level`).classList.remove("redText","orchidText","greenText"),P(i,"researches"),s[i]===g.max[i]?t(`research${i+1}Stage1Level`).classList.add("greenText"):s[i]===0?t(`research${i+1}Stage1Level`).classList.add("redText"):t(`research${i+1}Stage1Level`).classList.add("orchidText");t("quarkStat").style.display="",t("particlesMain").style.display="",t("dischargeToggleReset").style.display="";for(let i=1;i<=4;i++)t(`upgrade${i}`).style.display=""}for(let i=1;i<c.name.length;i++)v(i);for(let i=0;i<m.researchesAuto.length;i++)t(`researchAuto${i+1}Level`).textContent=String(o[i]),t(`researchAuto${i+1}Level`).classList.remove("redText","orchidText","greenText"),P(i,"researchesAuto"),o[i]===f.max[i]?t(`researchAuto${i+1}Level`).classList.add("greenText"):o[i]===0?t(`researchAuto${i+1}Level`).classList.add("redText"):t(`researchAuto${i+1}Level`).classList.add("orchidText");if(e!==1){t("quarkStat").style.display="none",t("energyStat").style.display="none",t("particlesMain").style.display="none",t("atomsMain").style.display="none",t("moleculesMain").style.display="none",t("discharge").style.display="none",t("dischargeToggleReset").style.display="none";for(let i=1;i<=m.upgrades.length;i++)t(`upgrade${i}`).style.display="none"}t("stageReset").textContent="You are not ready",t("stageWord").textContent=l.word[e-1],t("stageWord").style.color=l.wordColor[e-1],e===1?(b.removeProperty("--border-image"),b.removeProperty("--border-stage")):(b.setProperty("--border-image",`url(Used_art/Stage${e}%20border.png)`),e===2?b.setProperty("--border-stage","#1460a8"):e===3?b.setProperty("--border-stage","#5b5b75"):b.setProperty("--border-stage","#f28100")),u.screenReader&&(t("invisibleBought").textContent=`Current stage is '${l.word[e-1]}'`)};var z=(e,r=!1)=>{let{theme:n}=u;r?(n.default=!0,localStorage.removeItem("theme")):(n.default=!1,n.stage=e,localStorage.setItem("theme",String(e))),G()},G=()=>{let{stage:e}=d,{stageInfo:r,theme:n}=u,s=document.body.style;switch(s.setProperty("--transition","1s"),n.default?(n.stage=e,t("currentTheme").textContent="Default"):t("currentTheme").textContent=r.word[n.stage-1],n.stage){case 1:s.removeProperty("--background-color"),s.removeProperty("--window-color"),s.removeProperty("--window-border"),s.removeProperty("--footer-color"),s.removeProperty("--button-main-color"),s.removeProperty("--button-main-border"),s.removeProperty("--button-main-hover"),s.removeProperty("--button-delete-color"),s.removeProperty("--button-delete-hover"),s.removeProperty("--stage-text-color"),s.removeProperty("--cyan-text-color"),t("upgradeEffect").style.color="";break;case 2:s.setProperty("--background-color","#070026"),s.setProperty("--window-color","#000052"),s.setProperty("--window-border","blue"),s.setProperty("--footer-color","#0000db"),s.setProperty("--button-main-color","blue"),s.setProperty("--button-main-border","#427be1"),s.setProperty("--button-main-hover","#1515cf"),s.setProperty("--button-delete-color","#ce0000"),s.setProperty("--button-delete-hover","firebrick"),s.setProperty("--stage-text-color","dodgerblue"),s.setProperty("--cyan-text-color","cyan"),t("upgradeEffect").style.color="#82cb3b";break}setTimeout(()=>{s.removeProperty("--transition")},1e3)},p=e=>{let r=t("blocker");if(t("blocker").style.display==="block")return console.warn("Wasn't able to show another window (alert)");t("alertText").textContent=e;let n=t("confirmBtn");r.style.display="block";let s=()=>{r.style.display="none",n.removeEventListener("click",s)};n.addEventListener("click",s)},L=async e=>await new Promise(r=>{let n=t("blocker");n.style.display==="block"&&(console.warn("Wasn't able to show another window (confirm)"),r(!1)),t("alertText").textContent=e;let s=t("cancelBtn"),o=t("confirmBtn");n.style.display="block",s.style.display="block";let l=async()=>{n.style.display="none",s.style.display="none",o.removeEventListener("click",l),s.removeEventListener("click",a),r(!0)},a=async()=>{n.style.display="none",s.style.display="none",o.removeEventListener("click",l),s.removeEventListener("click",a),r(!1)};o.addEventListener("click",l),s.addEventListener("click",a)}),Y=async e=>await new Promise(r=>{let n=t("blocker");n.style.display==="block"&&(console.warn("Wasn't able to show another window (prompt)"),r(null)),t("alertText").textContent=e;let s=t("inputArea"),o="",l=t("cancelBtn"),a=t("confirmBtn");n.style.display="block",l.style.display="block",s.style.display="block";let c=()=>{o=s.value},g=async()=>{n.style.display="none",l.style.display="none",s.style.display="none",s.value="",a.removeEventListener("click",g),l.removeEventListener("click",f),s.removeEventListener("blur",c),r(o)},f=async()=>{n.style.display="none",l.style.display="none",s.style.display="none",s.value="",a.removeEventListener("click",g),l.removeEventListener("click",f),s.removeEventListener("blur",c),r(null)};a.addEventListener("click",g),l.addEventListener("click",f),s.addEventListener("blur",c)}),O=()=>{let e=t("footer"),r=t("footerColor"),n=t("hideToggle"),s=t("hideText"),o=t("hideArrow");u.footer=!u.footer,n.removeEventListener("click",O),u.footer?(r.style.display="",o.style.transform="",e.style.animation="hide 1s forwards reverse",o.style.animation="rotate 1s forwards reverse",s.textContent="Hide"):(e.style.animation="hide 1s backwards",o.style.animation="rotate 1s backwards",s.textContent="Show",setTimeout(()=>{r.style.display="none",o.style.transform="rotate(180deg)"},1e3)),setTimeout(()=>{e.style.animation="",o.style.animation="",n.addEventListener("click",O)},1e3)},M=(e=!1,r="toggle",n="building")=>{var s;switch(r){case"toggle":{let o=e,l=Boolean((s=localStorage.getItem("screen reader"))!=null?s:!1),a=t("screenReaderToggle");o&&(l=!l),l?(a.textContent="ON",a.style.borderColor="crimson",a.setAttribute("aria-label","Screen reader support is ON"),localStorage.setItem("screen reader","true"),u.screenReader=!0,d.buyToggle.strict=!1,u.intervals.main=100,u.intervals.numbers=1e3,o&&p(`For full support please refresh page. This will allow to buy upgrades on focus (because I have no idea how to make an image clickable with a keyboard), also you will get a special tab where you can check how much you own and more.
(For non screen readers this will cause issues)`)):(a.textContent="OFF",a.style.borderColor="",a.setAttribute("aria-label","Screen reader support is OFF"),localStorage.removeItem("screen reader"),u.screenReader=!1);break}case"button":{let o=e,{energy:l,buildings:a,upgrades:c,researchesAuto:g,toggles:f}=d,{dischargeInfo:b,buildingsInfo:i}=u,C=t("invisibleBought");n==="building"?o===0?C.textContent=`You have ${y(a[0].current)} ${i.name[0]}`:C.textContent=`You have ${y(a[o].current)} ${i.name[o]}, next one will cost ${y(i.cost[o])} ${i.name[o-1]}, they are producing ${y(i.producing[o])} ${i.name[o-1]} per second${g[1]>=o?`, auto is ${f[o+3]?"on":"off"}`:""}`:C.textContent=`You have ${l.current} Energy${c[3]===1?`, next discharge goal is ${y(b.next)} Energy`:""}`;break}}},R=(e=!1)=>{let r=document.body.style,n=t("customFontSize"),s=localStorage.getItem("fontSize");d.toggles[3]?((s===null||Number(s)<10||Number(s)>32||e)&&(s=String(Math.min(Math.max(Math.trunc(Number(n.value)*10)/10,10),32)),localStorage.setItem("fontSize",s)),r.setProperty("--font-size",`${s}px`),n.value=s):(r.setProperty("--font-size","1em"),localStorage.removeItem("fontSize"))};var d={stage:1,energy:{current:0,total:0},discharge:{current:0},time:{updated:Date.now(),started:Date.now()},buildings:[{current:3,total:3},{current:0,true:0,total:0},{current:0,true:0,total:0},{current:0,true:0,total:0}],upgrades:[],researches:[],researchesAuto:[],toggles:[],buyToggle:{howMany:1,input:10,strict:!0}},u={tab:"stage",footer:!0,screenReader:!1,lastSave:0,energyType:[0,1,5,20],stageInfo:{word:["Microworld","Submerged"],wordColor:["#03d3d3","dodgerblue"]},theme:{stage:1,default:!0},dischargeInfo:{next:1},intervals:{main:50,numbers:50,visual:1,autoSave:180},intervalsId:{main:0,numbers:0,visual:0,autoSave:0},buildingsInfo:{name:["Quarks","Particles","Atoms","Molecules"],cost:[0,3,24,3],increase:1.4,producing:[0,0,0,0]},upgradesInfo:{description:[],effect:[],effectText:[],cost:[]},researchesInfo:{description:[],effect:[],effectText:[],cost:[],scalling:[],max:[]},researchesAutoInfo:{description:[],effect:[],effectText:[],cost:[],scalling:[],max:[]}};function H(e,r,n,s,o,l=[],a=[]){Object.assign(d,{[e]:_(r.length)}),String(e).includes("researches")?Object.assign(u,{[e+"Info"]:{description:s,effect:n,effectText:o,cost:r,scalling:l,max:a}}):Object.assign(u,{[e+"Info"]:{description:s,effect:n,effectText:o,cost:r}})}var _=(e,r="number")=>{let n=[];for(let s=0;s<e;s++)r==="number"?n.push(0):s===4||s===5||s===6?n.push(!1):n.push(!0);return n},K=document.getElementsByClassName("toggle").length;Object.assign(d,{toggles:_(K,"toggles")});H("upgrades",[9,12,36,300,800,5e3,15e3,36e3],[10,10,5,4,.2,1.01,"",""],["Bigger electrons. Particles cost decreased.","Stronger protons. Particles produce more.","More neutrons. Increased particle gain.","Superposition. Unlocks new reset tier.","Protium. Basic.","Deuterium. Heavy.","Tritium. Radioactive.","Nuclear fusion. More energy."],[["Particle cost is "," times cheaper."],["Particles produce "," times more quarks."],["Atoms produce "," times more particles."],["Abbility to reset at any time and boost production for all buildings "," times, if had enough energy."],["Cost scalling is decreased by ","."],["Buildings (only bought one's) boost themselfs by "," times."],["Molecules produce molecules. At a reduced rate.",""],["Unspent energy boost molecules production of themselfs 1 to 1.",""]]);H("researches",[2e3,6500,2e4,12e3,42e3],[.01,.01,12,1,2],["Effect of 'Protium' upgrade is stronger.","Effect of 'Deuterium' upgrade is bigger.","Effect of 'Tritium' upgrade is better.","Discharge bonus improved.","Gain more energy from buying a building."],[["Cost scalling is "," smaller for each level."],["Each bought building boost each other by additional ","."],["Molecules now produce themselfs "," times quicker."],["Discharge is now gives extra +"," bonus per reached goal."],["A single building now gives "," times more energy."]],[300,1500,1800,0,38e3],[9,3,9,1,2]);H("researchesAuto",[300,3e3],["","Particles"],["Buy toggles.","Automatization for buying upgrades."],[["Unlock abbility to buy multiple buildings at same time.",""],["Will automatically buy "," for you."]],[0,5e3],[1,3]);var m=structuredClone(d),B=structuredClone(u),N=e=>{let r;return e==="p"?r=structuredClone(m):r=structuredClone(B),r},W=e=>{if(Object.prototype.hasOwnProperty.call(e,"player")&&Object.prototype.hasOwnProperty.call(e,"global")){let r=N("p");for(let n in m)Object.prototype.hasOwnProperty.call(e.player,n)||(e.player[n]=r[n]);if(m.upgrades.length>e.player.upgrades.length)for(let n=e.player.upgrades.length;n<m.upgrades.length;n++)e.player.upgrades[n]=0;if(m.researches.length>e.player.researches.length)for(let n=e.player.researches.length;n<m.researches.length;n++)e.player.researches[n]=0;if(m.researchesAuto.length>e.player.researchesAuto.length)for(let n=e.player.researchesAuto.length;n<m.researchesAuto.length;n++)e.player.researchesAuto[n]=0;if(m.toggles.length>e.player.toggles.length)for(let n=e.player.toggles.length;n<m.toggles.length;n++)e.player.toggles[n]=r.toggles[n];Object.assign(d,e.player),u.intervals=e.global.intervals}else p("Save file coudn't be loaded as its missing important info.")};var t=e=>{let r=document.getElementById(e);if(r!==null)return r;throw p("Some ID failed to load, game won't be working properly. Please refresh."),new TypeError(`ID "${e}" not found.`)},q=async(e=!1)=>{if(e){let s=localStorage.getItem("save"),o=localStorage.getItem("theme");if(s!==null){let l=JSON.parse(atob(s));W(l),d.toggles[0]&&p(`Welcome back, you were away for ${y(Date.now()-d.time.updated,0,"time")}.`)}else p("Welcome. This is a test-project. Since I don't expect anyone to play this, save file can get corrupted with a new version.");o!==null&&(u.theme.default=!1,u.theme.stage=Number(o))}let{time:r,toggles:n}=d;M(),I(),R(),V();for(let s=0;s<m.toggles.length;s++)U(s,!1);k(),G(),e&&!n[0]&&await L(`Welcome back, you were away for ${y(Date.now()-r.updated,0,"time")}. Game was set to have offline time disabled. Press confirm to NOT to gain offline time.`)&&(r.updated=Date.now()),h(!1,"all")};q(!0);var{screenReader:F}=u;for(let e=0;e<m.toggles.length;e++)t(`toggle${e}`).addEventListener("click",()=>U(e));for(let e=1;e<m.buildings.length;e++)t(`building${e}Btn`).addEventListener("click",()=>$(d.buildings,e));for(let e=0;e<m.upgrades.length;e++)t(`upgrade${e+1}`).addEventListener("mouseover",()=>w(e)),t(`upgrade${e+1}`).addEventListener("click",()=>x(e)),F&&t(`upgrade${e+1}`).addEventListener("focus",()=>x(e));t("dischargeReset").addEventListener("click",async()=>await Q());t("stageReset").addEventListener("click",async()=>await J());t("buy1x").addEventListener("click",()=>k("1"));t("buyAny").addEventListener("click",()=>k("any"));t("buyAnyInput").addEventListener("blur",()=>k("any"));t("buyMax").addEventListener("click",()=>k("max"));t("buyStrict").addEventListener("click",()=>k("strict"));for(let e=0;e<m.researches.length;e++)t(`research${e+1}Stage1Image`).addEventListener("mouseover",()=>w(e,"researches")),t(`research${e+1}Stage1Image`).addEventListener("click",()=>x(e,"researches")),F&&t(`research${e+1}Stage1Image`).addEventListener("focus",()=>x(e,"researches"));for(let e=0;e<m.researchesAuto.length;e++)t(`researchAuto${e+1}Image`).addEventListener("mouseover",()=>w(e,"researchesAuto")),t(`researchAuto${e+1}Image`).addEventListener("click",()=>x(e,"researchesAuto")),F&&t(`researchAuto${e+1}Image`).addEventListener("focus",()=>x(e,"researchesAuto"));t("save").addEventListener("click",async()=>await S("save"));t("file").addEventListener("change",async()=>await S("load"));t("export").addEventListener("click",async()=>await S("export"));t("delete").addEventListener("click",async()=>await S("delete"));t("switchTheme0").addEventListener("click",()=>z(0,!0));for(let e=1;e<=u.stageInfo.word.length;e++)t(`switchTheme${e}`).addEventListener("click",()=>z(e));t("mainInterval").addEventListener("blur",()=>h(!1,"main"));t("numbersInterval").addEventListener("blur",()=>h(!1,"numbers"));t("visualInterval").addEventListener("blur",()=>h(!1,"visual"));t("autoSaveInterval").addEventListener("blur",()=>h(!1,"autoSave"));t("pauseGame").addEventListener("click",async()=>await X());t("toggle3").addEventListener("click",()=>R());t("customFontSize").addEventListener("blur",()=>R(!0));t("screenReaderToggle").addEventListener("click",()=>M(!0));if(F){for(let e=0;e<m.buildings.length;e++)t(`invisibleGetBuilding${e}`).addEventListener("click",()=>M(e,"button"));t("invisibleGetResource1").addEventListener("click",()=>M(0,"button","resource")),t("specialTabBtn").addEventListener("click",()=>I("special"))}else t("specialTabBtn").style.display="none";t("hideToggle").addEventListener("click",O);t("stageTabBtn").addEventListener("click",()=>I("stage"));t("researchTabBtn").addEventListener("click",()=>I("research"));t("settingsTabBtn").addEventListener("click",()=>I("settings"));function h(e=!1,r=""){let{intervals:n,intervalsId:s}=u;if(r!==""){let o=t("mainInterval"),l=t("numbersInterval"),a=t("visualInterval"),c=t("autoSaveInterval");if(r==="main")n.main=Math.min(Math.max(Math.trunc(Number(o.value)),20),1e3),n.main>n.numbers&&(n.numbers=n.main);else if(r==="numbers"){let g=Math.min(Math.max(Math.trunc(Number(l.value)),20),1e3);n.numbers=Math.max(g,n.main)}else r==="visual"?n.visual=Math.min(Math.max(Math.trunc(Number(a.value)*10)/10,.5),10):r==="autoSave"&&(n.autoSave=Math.min(Math.max(Math.trunc(Number(c.value)),60),1800));o.value=String(n.main),l.value=String(n.numbers),a.value=String(n.visual),c.value=String(n.autoSave)}clearInterval(s.main),clearInterval(s.numbers),clearInterval(s.visual),clearInterval(s.autoSave),e||(s.main=setInterval(A,n.main),s.numbers=setInterval(T,n.numbers),s.visual=setInterval(j,n.visual*1e3),s.autoSave=setInterval(S,n.autoSave*1e3,"save"))}async function S(e){switch(e){case"load":{let r=t("file"),n=r.files;if(n===null)return p("Loaded file wasn't found.");let s=await n[0].text();try{let o=JSON.parse(atob(s));h(!0),W(o),await L(`This save file was set to have offline progress disabled (currently ${y(Date.now()-d.time.updated,0,"time")}). Press confirm to NOT to gain offline time.`)&&(d.time.updated=Date.now()),q()}catch(o){p("Incorrect save file format.")}finally{r.value=""}break}case"save":{let r=btoa(`{"player":${JSON.stringify(d)},"global":{"intervals":${JSON.stringify(u.intervals)}}}`);localStorage.setItem("save",r),t("isSaved").textContent="Saved",u.lastSave=0;break}case"export":{await S("save");let r=localStorage.getItem("save");if(r===null)return p("Save file wasn't found. Even though game was saved just now...");let n=document.createElement("a");n.href="data:text/plain;charset=utf-8,"+r,n.download="Fundamental.txt",n.click();break}case"delete":{let r=await Y(`This will truly delete your save file!
Type 'delete' to confirm.`);(r==null?void 0:r.toLowerCase())==="delete"?(h(!0),localStorage.clear(),Object.assign(d,N("p")),Object.assign(u,N("g")),d.time.started=Date.now(),d.time.updated=d.time.started,q()):r!==null&&p(`You wrote '${r}', so save file wasn't deleted.`);break}}}var X=async()=>{h(!0);let e=await Y("Game is currently paused. Press any button bellow to unpause it. If you want you can enter 'NoOffline' to NOT to gain offline time.");(e==null?void 0:e.toLowerCase())==="nooffline"?d.time.updated=Date.now():e!==null&&p(`You wrote '${e}', so you gained offline time.`),h()};})();