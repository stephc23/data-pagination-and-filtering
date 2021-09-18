/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;  
   const endIndex = page * 9;
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



// Call functions
