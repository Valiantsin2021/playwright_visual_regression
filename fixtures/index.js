// document.addEventListener("DOMContentLoaded", () => {
//   fetch('./rick_and_morty_persons.json')
//       .then(res => res.json())
//       .then(data => {
//           const container = document.querySelector('.container');
//           const prevButton = document.getElementById('prev');
//           const nextButton = document.getElementById('next');
//           const pageInfo = document.getElementById('page-info');

//           const itemsPerPage = 20;
//           let currentPage = 1;
//           const totalPages = Math.ceil(Object.keys(data).length / itemsPerPage);

//           function renderPage(page) {
//               container.innerHTML = '';
//               const start = (page - 1) * itemsPerPage;
//               const end = start + itemsPerPage;
//               const items = Object.keys(data).slice(start, end);

//               items.forEach(key => {
//                   const block = `
//                   <div class="block">
//                       <h3>${key}</h3>
//                       <img src="${data[key].image}" alt="${key}">
//                       <p>status: ${data[key].status} - ${data[key].species} - ${data[key].gender}</p>
//                   </div>`;
//                   container.innerHTML += block;
//               });

//               pageInfo.textContent = `Page ${page} of ${totalPages}`;
//               prevButton.disabled = page === 1;
//               nextButton.disabled = page === totalPages;
//           }

//           prevButton.addEventListener('click', () => {
//               if (currentPage > 1) {
//                   currentPage--;
//                   renderPage(currentPage);
//               }
//           });

//           nextButton.addEventListener('click', () => {
//               if (currentPage < totalPages) {
//                   currentPage++;
//                   renderPage(currentPage);
//               }
//           });

//           renderPage(currentPage);
//       })
//       .catch(error => {
//           console.error('Error fetching data:', error);
//       });
// });
document.addEventListener('DOMContentLoaded', () => {
  fetch('./rick_and_morty_persons.json')
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector('.container')

      const itemsPerPage = 20
      let currentPage = 1
      const totalItems = Object.keys(data).length
      const totalPages = Math.ceil(totalItems / itemsPerPage)

      function renderPage(page) {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = Object.keys(data).slice(start, end)

        items.forEach(key => {
          const block = `
                  <div class="block">
                      <h3>${key}</h3>
                      <img src="${data[key].image}" alt="${key}">
                      <p>status: ${data[key].status} - ${data[key].species} - ${data[key].gender}</p>
                  </div>`
          container.innerHTML += block
        })
      }

      function loadMore() {
        if (currentPage < totalPages) {
          currentPage++
          renderPage(currentPage)
        }
      }

      // Initial load
      renderPage(currentPage)

      // Scroll event listener for lazy loading
      window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
          loadMore()
        }
      })
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
})
