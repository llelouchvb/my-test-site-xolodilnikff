const products = [
  {id:'b1',cat:'burger',name:'Chicken Burger',desc:'Курица, соус и свежие овощи',price:1390,img:'assets/chicken.jpg'},
  {id:'b2',cat:'burger',name:'Chicken Cheese Burger',desc:'Курица + сыр + фирменный соус',price:1490,img:'assets/chicken-cheese.jpg'},
  {id:'b3',cat:'burger',name:'Classic',desc:'Классический сочный бургер',price:1590,img:'assets/classic.jpg'},
  {id:'b4',cat:'burger',name:'Cheeseburger',desc:'Говядина и двойной сыр',price:1690,img:'assets/cheeseburger.jpg'},
  {id:'b5',cat:'burger',name:'Томлёный лук',desc:'Сочный бургер с томлёным луком',price:1990,img:'assets/onion.jpg'},
  {id:'b6',cat:'burger',name:'Вишня',desc:'Авторская комбинация соуса и вишни',price:2050,img:'assets/cherry.jpg'},
  {id:'b7',cat:'burger',name:'Mushrooms',desc:'Бургер с грибами',price:2050,img:'assets/mushrooms.jpg'},
  {id:'b8',cat:'burger',name:'French Burger',desc:'Фирменная версия с французским акцентом',price:1950,img:'assets/french.jpg'},
  {id:'b9',cat:'burger',name:'Mini-Burger',desc:'Небольшой формат — большой вкус',price:1490,img:'assets/mini.jpg'},
  {id:'c1',cat:'combo',name:'Chicken Combo',desc:'Бургер + картофель фри + Coca-Cola',price:2490,img:'assets/menu-combo.png'},
  {id:'c2',cat:'combo',name:'Chicken Cheese Combo',desc:'Бургер + картофель фри + Coca-Cola',price:2590,img:'assets/menu-combo.png'},
  {id:'c3',cat:'combo',name:'Classic Combo',desc:'Бургер + картофель фри + Coca-Cola',price:2690,img:'assets/menu-combo.png'},
  {id:'c4',cat:'combo',name:'Cheeseburger Combo',desc:'Бургер + картофель фри + Coca-Cola',price:2790,img:'assets/menu-combo.png'},
  {id:'s1',cat:'snack',name:'Крылья 5 шт.',desc:'Хрустящие куриные крылья',price:1090,img:'assets/wings.jpg'},
  {id:'s2',cat:'snack',name:'Наггетсы 8 шт.',desc:'Хрустящие куриные наггетсы',price:1590,img:'assets/nuggets.jpg'},
  {id:'s3',cat:'snack',name:'Картофель фри',desc:'Золотистый картофель фри',price:590,img:'assets/fries.jpg'},
  {id:'s4',cat:'snack',name:'Стрипсы 5–6 шт.',desc:'Куриные стрипсы',price:1190,img:'assets/wings.jpg'},
  {id:'s5',cat:'snack',name:'Картофель шарики',desc:'Хрустящие картофельные шарики',price:690,img:'assets/fries.jpg'},
  {id:'s6',cat:'snack',name:'Картофель дольки',desc:'Пряные картофельные дольки',price:690,img:'assets/fries.jpg'},
  {id:'f1',cat:'chef',name:'Chicken Bowl',desc:'Боулинг с курицей и гарниром',price:1590,img:'assets/menu-chef.png'},
  {id:'f2',cat:'chef',name:'Удон с курицей',desc:'Фирменный удон',price:1890,img:'assets/menu-chef.png'},
  {id:'f3',cat:'chef',name:'Удон с креветкой',desc:'Удон с креветкой',price:2390,img:'assets/menu-chef.png'},
  {id:'f4',cat:'chef',name:'Курица с ананасами',desc:'Сочное филе с ананасами',price:2090,img:'assets/menu-chef.png'},
  {id:'f5',cat:'chef',name:'Meat Bowl',desc:'Сытный боул с мясом',price:2490,img:'assets/menu-chef.png'},
  {id:'f6',cat:'chef',name:'Бефстроганов',desc:'Нежное мясо в соусе',price:2990,img:'assets/menu-chef.png'}
];

const CONFIG={whatsappNumber:'', restaurantName:'ХОЛОДИЛЬНИК'};
const state={filter:'all',cart:{}};
const grid=document.getElementById('menuGrid');
const cartCount=document.getElementById('cartCount');
const cartTotal=document.getElementById('cartTotal');
const cartBody=document.getElementById('cartBody');
const overlay=document.getElementById('overlay');
const cartPanel=document.getElementById('cartPanel');
const modal=document.getElementById('menuModal');

const fmt=n=>new Intl.NumberFormat('ru-RU').format(n).replace(/\u00A0/g,' ')+' ₸';

function renderProducts(){
  const list=state.filter==='all'?products:products.filter(p=>p.cat===state.filter);
  grid.innerHTML=list.map(p=>`<article class="product">
    <div class="product-media"><img src="${p.img}" alt="${p.name}" loading="lazy"><span class="tag">${p.cat==='burger'?'BURGER':p.cat==='combo'?'COMBO':p.cat==='snack'?'HOT SNACK':'CHEF'}</span></div>
    <div class="product-info"><div class="product-name">${p.name}</div><div class="product-desc">${p.desc}</div><div class="product-bottom"><div class="price">${fmt(p.price)}</div><button class="add" data-add="${p.id}" aria-label="Добавить ${p.name}">+</button></div></div>
  </article>`).join('');
}

function renderCart(){
  const items=Object.values(state.cart);
  const count=items.reduce((s,i)=>s+i.qty,0);
  const total=items.reduce((s,i)=>s+i.qty*i.price,0);
  cartCount.textContent=count;
  cartTotal.textContent=fmt(total);
  if(!items.length){cartBody.innerHTML='<div class="empty">Корзина пуста.<br>Добавь что-нибудь вкусное.</div>';return;}
  cartBody.innerHTML=items.map(i=>`<div class="cart-item"><img src="${i.img}" alt=""><div><strong>${i.name}</strong><small>${fmt(i.price)} × ${i.qty}</small></div><div class="qty"><button data-dec="${i.id}">−</button><b>${i.qty}</b><button data-inc="${i.id}">+</button></div></div>`).join('');
}

function openCart(){cartPanel.classList.add('open');overlay.classList.add('open');cartPanel.setAttribute('aria-hidden','false')}
function closeCartPanel(){cartPanel.classList.remove('open');overlay.classList.remove('open');cartPanel.setAttribute('aria-hidden','true')}
function openModal(){modal.classList.add('open');overlay.classList.add('open');modal.setAttribute('aria-hidden','false')}
function closeModal(){modal.classList.remove('open');overlay.classList.remove('open');modal.setAttribute('aria-hidden','true')}

document.addEventListener('click',e=>{
  const add=e.target.closest('[data-add]');
  if(add){const p=products.find(x=>x.id===add.dataset.add);state.cart[p.id]=state.cart[p.id]?{...state.cart[p.id],qty:state.cart[p.id].qty+1}:{...p,qty:1};renderCart();openCart();}
  const inc=e.target.closest('[data-inc]'); if(inc){state.cart[inc.dataset.inc].qty++;renderCart();}
  const dec=e.target.closest('[data-dec]'); if(dec){const id=dec.dataset.dec;state.cart[id].qty--;if(state.cart[id].qty<=0)delete state.cart[id];renderCart();}
});

document.getElementById('tabs').addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.filter=b.dataset.filter;renderProducts();});
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('ctaCartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCartPanel;
document.getElementById('menuImagesBtn').onclick=openModal;
document.getElementById('closeModal').onclick=closeModal;
overlay.onclick=()=>{closeCartPanel();closeModal();document.getElementById('orderModal').classList.remove('open')};
document.getElementById('orderBtn').onclick=()=>{
  const items=Object.values(state.cart);
  if(!items.length){alert('Добавьте позиции в корзину.');return;}
  document.getElementById('orderModal').classList.add('open');
  document.getElementById('overlay').classList.add('open');
};

document.getElementById('closeOrderModal').onclick=()=>{
  document.getElementById('orderModal').classList.remove('open');
  overlay.classList.remove('open');
};

document.getElementById('orderForm').addEventListener('submit',(e)=>{
  e.preventDefault();
  const name=document.getElementById('customerName').value.trim();
  const phone=document.getElementById('customerPhone').value.trim();
  const type=document.querySelector('input[name="orderType"]:checked').value;
  const comment=document.getElementById('customerComment').value.trim();
  const items=Object.values(state.cart);
  const total=items.reduce((s,i)=>s+i.qty*i.price,0);
  const lines=items.map(i=>`• ${i.name} × ${i.qty} — ${fmt(i.price*i.qty)}`).join('\n');
  const text=`Здравствуйте! Хочу оформить заказ в ${CONFIG.restaurantName}.\n\n${lines}\n\nИтого: ${fmt(total)}\nСпособ: ${type}\nИмя: ${name}\nТелефон: ${phone}${comment?`\nКомментарий: ${comment}`:''}`;
  if(!CONFIG.whatsappNumber){
    alert('Демо готово. Для реального запуска укажите WhatsApp-номер заведения в app.js:\n\nCONFIG.whatsappNumber = "77XXXXXXXXX"');
    return;
  }
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`,'_blank','noopener');
});

const orderModal=document.getElementById('orderModal');
orderModal.addEventListener('click',e=>{if(e.target===orderModal){orderModal.classList.remove('open');overlay.classList.remove('open')}});


renderProducts();renderCart();
