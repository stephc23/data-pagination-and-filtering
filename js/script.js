/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

// Add a search bar and select search input and button elements
const header = document.querySelector('header');
const searchHTML = 
   `<label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
header.insertAdjacentHTML('beforeend', searchHTML);
const searchInput = document.querySelector('#search');
const searchButton = searchInput.nextElementSibling;

// The `showPage` function displays a page of nine students by creating and inserting the elements needed
function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;  
   const endIndex = page * itemsPerPage;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = list[i];
         const studentHTML =
            `<li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                  <h3>${student.name.first} ${student.name.last}</h3>
                  <span class="email">${student.email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">Joined ${student.registered.date}</span>
               </div>
            </li>
            `
         studentList.insertAdjacentHTML('beforeend', studentHTML);
      }
   }
}

// The `addPagination` function creates pagination buttons and shows the active page when its button is clicked
function addPagination(list) {
   const itemsPerPage = 9;
   const numberOfPages = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('ul.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= numberOfPages; i++) {
      const buttonHTML = 
         `<li>
            <button type="button">${i}</button>
         </li>
         `
      linkList.insertAdjacentHTML('beforeend', buttonHTML);
   }

   const firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = 'active';
   linkList.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
         const activeButton = e.target;
         const activePageNumber = activeButton.textContent;
         const buttonItems = linkList.children;
         for (let i = 0; i < buttonItems.length; i++) {
            const button = buttonItems[i].firstElementChild;
            if (button.className === 'active') {
               button.className = '';
            }
         }
         activeButton.className = 'active';
         showPage(list, activePageNumber);
      }
   });
}

// The `showFilteredList` function creates a filtered list matching search input and shows and paginates the list
function showFilteredList(list) {
   function createFilteredList(fullList) {
      const searchValue = searchInput.value.toLowerCase(); 
      const filteredList = [];
      for (let i = 0; i < fullList.length; i++) { 
         const student = fullList[i];
         const firstName = student.name.first.toLowerCase();
         const lastName = student.name.last.toLowerCase();
         if (firstName.includes(searchValue) || lastName.includes(searchValue)) {
            filteredList.push(student);
         }
      }  
      return filteredList;       
   }

   const newList = createFilteredList(list);
   if (newList.length > 0) {
      showPage(newList, 1);
      addPagination(newList);
   } else {
      const studentList = document.querySelector('ul.student-list');
      studentList.innerHTML = '';
      const linkList = document.querySelector('ul.link-list');
      linkList.innerHTML = '';
      const noResultsHTML = `<li class="no-results">No results found</li>`;
      studentList.insertAdjacentHTML('afterbegin', noResultsHTML);
   }
}

// Call functions using full list of data
showPage(data, 1);
addPagination(data);

// Add event listeners to create, show, and paginate filtered list if search bar is used
searchInput.addEventListener('keyup', () => {
   showFilteredList(data);
});

searchButton.addEventListener('click', () => {
   showFilteredList(data);
});