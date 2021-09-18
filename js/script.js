/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
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

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
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

// Call functions
