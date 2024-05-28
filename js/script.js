const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('.btn-open');
const closeModalBtn = document.querySelector('.btn-close');

const openModal = function () {
 modal.classList.remove('hidden');
 overlay.classList.remove('hidden');
};

openModalBtn.addEventListener('click', openModal);

const closeModal = function () {
 modal.classList.add('hidden');
 overlay.classList.add('hidden');
};
closeModalBtn.addEventListener('click', closeModal);

overlay.addEventListener("click", closeModal);




/* ====================================== */

document.addEventListener('DOMContentLoaded', function () {
	const productInfo = [
	  { id: 1, name: 'Суші',dataid:1,opus: 'Finest fish and veggies',count: 0, price: 22.99, imageSrc: "img/sushi-6715579_1280.jpg" },
	  { id: 2, name: 'Шніцель', dataid:2,opus: 'A german specialty!',count: 0, price: 16.50, imageSrc: "img/shnicel1.jpg" },
	  { id: 3, name: 'Бургер',dataid:3,opus: 'American, raw, meaty',count: 0, price: 12.99, imageSrc: "img/p_O.jpg" },
	];
 // функція яка візьме produсt info , пройдеться for
 const itemCatalog = document.querySelector('.catalog__items')
 itemCatalog.textContent = '';

 for( const product of productInfo) {
	 const productElement = document.createElement('article');
	 productElement.classList.add('foot__item');
	  
	 const footTitle = document.createElement('div');
	 footTitle.classList.add('foot__title');

	 const nameElement = document.createElement('a');
	 nameElement.textContent = product.name;
	 nameElement.classList.add('foot__name');
	 footTitle.appendChild(nameElement);
	 
	 const imageElement = document.createElement('img');
	 imageElement.src = product.imageSrc;
	 imageElement.classList.add('foot__foto');
	 footTitle.appendChild(imageElement);

	 



	 const infoElement = document.createElement('div');
	 infoElement.classList.add('foot__info')

	 const opusElement = document.createElement('a');
	 opusElement.textContent = product.opus;
	 opusElement.classList.add('foot__opus');
	 infoElement.appendChild(opusElement);

	 const priceElement = document.createElement('a');
	 priceElement.textContent = product.price + '$';
	 priceElement.classList.add('foot__price');
	 infoElement.appendChild(priceElement);

	 const footNumber = document.createElement('div');
	 footNumber.classList.add('foot__number');
 

	 const footnumNumber = document.createElement('div');
	 footnumNumber.classList.add('foot-num__number');
	 footNumber.appendChild(footnumNumber);

	 const footMinus = document.createElement('div');
	 footMinus.classList.add('foot-num__minus');
	 footMinus.textContent = '-'
	 footnumNumber.appendChild(footMinus);


	 const numOn = document.createElement('div');
	 numOn.classList.add('foot-num__on');
	 numOn.textContent = '0';
	 footnumNumber.appendChild(numOn);

	 const footPlus = document.createElement('div');
	 footPlus.classList.add('foot-num__plus');
	 footPlus.textContent = '+'
	 footnumNumber.appendChild(footPlus);

	 const buttonAdd = document.createElement('button');
	 buttonAdd.classList.add('foot__add');
	 buttonAdd.setAttribute('data-id', product.id);
	 buttonAdd.textContent = '+Add';
 



 
	 productElement.appendChild(footTitle);
	 productElement.appendChild(infoElement);
	 productElement.appendChild(footNumber);
	 footNumber.appendChild(footnumNumber);
	 footnumNumber.appendChild(footMinus); 
	 footnumNumber.appendChild(numOn);
	 footnumNumber.appendChild(footPlus); 
	 footNumber.appendChild(buttonAdd)
 
	 itemCatalog.appendChild(productElement);
 }




	let cartItems = [];
 
	const addButtonCart = document.querySelectorAll('.foot__add');
	const numberProducts = document.querySelectorAll('.foot-num__on');
	const numberMinusList = document.querySelectorAll('.foot-num__minus');
	const numberPlusList = document.querySelectorAll('.foot-num__plus');
 

	numberPlusList.forEach(function (numberPlus, index) {
	  numberPlus.addEventListener('click', function () {
		 let currentProduct = numberProducts[index];
		 let currentValue = parseInt(currentProduct.textContent);
 
		 currentValue += 1;
		 currentProduct.textContent = currentValue;
	  });
	});
 
	numberMinusList.forEach(function (numberMinus, index) {
	  numberMinus.addEventListener('click', function () {
		 let currentProduct = numberProducts[index];
		 let currentValue = parseInt(currentProduct.textContent);
 
		 if (currentValue > 0) {
			currentValue -= 1;
		 }
 
		 currentProduct.textContent = currentValue;
	  });
	});
 
	function updateCartView() {
	  const cartContainer = document.querySelector('.flex');
	  const totalPriceElement = document.querySelector('#total-price');
	  let totalPrice = 0;
 
	  cartContainer.innerHTML = '';
 
	  cartItems.forEach(function (item) {
		 const itemDiv = document.createElement('div');
		 itemDiv.classList.add('cart-item');
 
		 const itemImage = document.createElement('img');
		 itemImage.classList.add('foto__koshukk');
		 itemImage.src = item.imageSrc;
		 itemImage.style.width = '150px';
		 itemImage.style.height = '100px';
		 itemDiv.appendChild(itemImage);
 
		 const itemDetails = document.createElement('div');
		 itemDetails.classList.add('product-koshuk__info')
 
		 const itemName = document.createElement('span');
		 itemName.textContent = item.name;
		 itemDetails.append(itemName)
 
		 const itemPrice = document.createElement('span');
		 itemPrice.textContent = `$${(item.price * item.count).toFixed(2)}`
		 itemDetails.append(itemPrice);
 
		 const itemNumber = document.createElement('span');
		 itemNumber.textContent = `Кількість: ${item.count}`
		 itemDetails.appendChild(itemNumber);
 
		 itemDiv.appendChild(itemDetails);
 
		 let deleteButton = document.createElement('button');
		 deleteButton.classList.add('btn-x');
		 deleteButton.textContent = 'X';
		 deleteButton.addEventListener('click', function () {
			removeItemFromCart(item.id);
		 });
		 itemDiv.appendChild(deleteButton);
 
		 cartContainer.appendChild(itemDiv);
 
		 totalPrice += item.price * item.count;
	  });
 
	  totalPriceElement.textContent = 'Загальна сума $' + totalPrice.toFixed(2);
 
	  updateCartQuantity();
	}
 


	addButtonCart.forEach(function (button, index) {
		button.addEventListener('click', function () {
		  const productId = button.dataset.id;
		  const selectedProduct = productInfo.find(product => product.id == productId);
		  const currentValue = parseInt(numberProducts[index].textContent);
	
		  if (selectedProduct && currentValue > 0) {
			 const existingIndex = cartItems.findIndex(item => item.id === productId);
	
			 if (existingIndex !== -1) {
				cartItems[existingIndex].count += currentValue;
			 } else {
				cartItems.push({ ...selectedProduct, count: currentValue });
			 }
	
		
			 numberProducts[index].textContent = 0;
	
			 updateCartView();
		  }
		});
	 });
	
	function updateCartQuantity() {
	  const koshukNumber = document.querySelector('.cart-header__quantity');
	  koshukNumber.textContent = cartItems.reduce((total, item) => total + item.count, 0);
	}
 
	function removeItemFromCart(productId) {
	  const index = cartItems.findIndex(function (item) {
		 return item.id == productId;
	  });
	  if (index !== -1) {
		 const removedItem = cartItems.splice(index, 1)[0];
		 updateCartView();
	  }
	}
 
 });



 

