/* ===== Instant estimate settings: edit these ===== */
var EST_CONFIG={
  ratePerMile:1.20,        // £ per mile, collection to delivery
  minimum:40,              // £ minimum job price
  showExVat:true,          // true: prices shown "ex VAT" (B2B); false: no VAT label
  vatLabel:'ex VAT',
  smallPrint:'Estimate only. Price excludes VAT and is confirmed by phone/WhatsApp. Large/heavy loads, waiting time, tolls/congestion or out-of-hours may change the price.',
  smallPrintIncVat:'Estimate only. Price is confirmed by phone/WhatsApp. Large/heavy loads, waiting time, tolls/congestion or out-of-hours may change the price.',
  straightLineFactor:1.25, // fallback when the routing service is unavailable
  whatsapp:'447883777217'
};
(function(){var b=document.querySelector('.menu-btn'),n=document.getElementById('nav');if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('open');b.setAttribute('aria-expanded','false')}})}
var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();})();
(function(){
var f=document.getElementById('est-form');if(!f)return;
var C=EST_CONFIG,out=document.getElementById('est-out'),btn=document.getElementById('e-calc');
var RE=/^([A-Z]{1,2}[0-9][A-Z0-9]?) ?([0-9][A-Z]{2})$/;
function norm(v){v=(v||'').toUpperCase().replace(/\s+/g,'');var m=v.match(/^([A-Z]{1,2}[0-9][A-Z0-9]?)([0-9][A-Z]{2})$/);return m?m[1]+' '+m[2]:null}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function setErr(id,msg){var i=document.getElementById(id),e=document.getElementById(id+'-err');e.textContent=msg||'';if(msg)i.setAttribute('aria-invalid','true');else i.removeAttribute('aria-invalid')}
function geo(pc){return fetch('https://api.postcodes.io/postcodes/'+encodeURIComponent(pc)).then(function(r){if(r.status===404)throw{pc:pc};if(!r.ok)throw new Error('net');return r.json()}).then(function(j){if(!j.result||j.result.longitude==null)throw{pc:pc};return j.result})}
function hav(a,b){var R=3958.8,t=Math.PI/180,dl=(b.latitude-a.latitude)*t,dn=(b.longitude-a.longitude)*t,x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a.latitude*t)*Math.cos(b.latitude*t)*Math.sin(dn/2)*Math.sin(dn/2);return 2*R*Math.asin(Math.sqrt(x))}
function route(a,b){var ctl=new AbortController(),tm=setTimeout(function(){ctl.abort()},8000);
 return fetch('https://router.project-osrm.org/route/v1/driving/'+a.longitude+','+a.latitude+';'+b.longitude+','+b.latitude+'?overview=false',{signal:ctl.signal}).then(function(r){clearTimeout(tm);if(!r.ok)throw 0;return r.json()}).then(function(j){if(j.code!=='Ok'||!j.routes||!j.routes.length)throw 0;return{miles:j.routes[0].distance/1609.344,approx:false}})
 .catch(function(){return{miles:hav(a,b)*C.straightLineFactor,approx:true}})}
function money(v){return '£'+v.toLocaleString('en-GB')}
f.addEventListener('submit',function(ev){ev.preventDefault();
 var a=norm(f.from.value),b=norm(f.to.value);setErr('e-from',a?'':'Enter a valid UK postcode, e.g. WF4 5DR');setErr('e-to',b?'':'Enter a valid UK postcode, e.g. LS1 4DY');
 if(!a||!b){(a?f.to:f.from).focus();return}
 f.from.value=a;f.to.value=b;btn.disabled=true;btn.textContent='Calculating…';out.innerHTML='<p class="small">Working out the driving distance…</p>';
 Promise.all([geo(a),geo(b)]).then(function(r){return route(r[0],r[1])}).then(function(d){
  var miles=Math.round(d.miles*10)/10,price=Math.max(C.minimum,Math.round(miles*C.ratePerMile)),hitMin=miles*C.ratePerMile<C.minimum;
  var vat=C.showExVat?' <span class="vat">'+esc(C.vatLabel)+'</span>':'';
  var when=f.when.value?new Date(f.when.value).toLocaleString('en-GB',{weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'';
  var mtxt=(d.approx?'approx. ':'')+miles+' miles';
  var msg='Hi Enclave Logistics, I\'d like to book a job.\nCollection: '+a+'\nDelivery: '+b+(when?'\nWhen: '+when:'')+'\nDistance: '+mtxt+'\nEstimate: '+money(price)+(C.showExVat?' '+C.vatLabel:'');
  out.innerHTML='<div class="est-res"><p class="est-route">'+esc(a)+' → '+esc(b)+'</p>'+
   '<p class="est-miles">'+(d.approx?'<strong>Approximate</strong> distance (route service unavailable): ':'Driving distance: ')+'<strong>'+esc(mtxt)+'</strong></p>'+
   '<p class="est-price">'+money(price)+vat+'</p>'+(hitMin?'<p class="small">Minimum job price applies.</p>':'')+
   '<p class="small">'+esc(C.showExVat?C.smallPrint:C.smallPrintIncVat)+'</p>'+
   '<div class="cta-row"><a class="btn btn-accent" href="#quote" id="e-book">Book this job</a><a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/'+C.whatsapp+'?text='+encodeURIComponent(msg)+'">WhatsApp this estimate</a></div></div>';
  document.getElementById('e-book').addEventListener('click',function(){
   var s=function(id,v){var e=document.getElementById(id);if(e)e.value=v};
   s('q-from',a);s('q-to',b);if(f.when.value)s('q-when',f.when.value);s('q-miles',mtxt);s('q-est',money(price)+(C.showExVat?' '+C.vatLabel:''));
   setTimeout(function(){var n=document.getElementById('q-name');if(n)n.focus({preventScroll:true})},400)});
 }).catch(function(e){
  if(e&&e.pc){var id=e.pc===a?'e-from':'e-to';setErr(id,'We couldn\'t find '+e.pc+'. Please check it.');out.innerHTML='';document.getElementById(id).focus()}
  else out.innerHTML='<p class="err">Sorry, we couldn\'t reach the postcode service. Please try again, or call or WhatsApp us for a price.</p>';
 }).then(function(){btn.disabled=false;btn.textContent='Calculate'})});
})();
