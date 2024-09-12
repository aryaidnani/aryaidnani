//Blog Array

const blogs = [
  {
    id: 1,
    dateStr: `12<sup>th</sup> September '24`,
    content: `<p>So yes, today is the day I restart my 100 days of code challenge. The last time I tried to complete this challenge, it ended on day 51. This delivered a huge blow to me. It took me 3 days to get over this in order to start today. So now my challenge gets over on the 20<sup>th</sup> of December. This isn't ideal but sadly thats the way everything is. Ocassionally we all have and will have our share of bad days, it is our response and outlook towards the situation which matter. Growth surely involves minimalization of pitfalls, but whats equally important is learning how to deal with them. By no means am I trying to fend for my broken streak of 50 days, but I have come to realise that, our reaction to such hard situations is what matters most. <br> <br>
    So here I am, after 3 days of regret and brooding, writing this blog after having done some coding today. Today I implemented the option to toggle between light and dark mode on my page. This is cool and I will be trying to learn more about responsive web pages today. I am restarting this challenge with the hope of being able to rebuild my lost momentum, and regain the confidence coding once gave me. </p>`,
  },
];

//Rendering Function to implement dynamic doms

function blogRender(blogArray) {
  const accordionContainer = document.querySelector(".accordion");
  accordionContainer.innerHTML = "";

  blogArray.forEach((blog) => {
    const blogElement = document.createElement("div");
    blogElement.className = `item item-${blog.id}`;

    blogElement.innerHTML = `
    <h2 class = "day-number">${`Day ${blog.id}`}</h2>
    <h2 class = "date-number hidden">${blog.dateStr}</h2>
    <svg xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon downwards">
            
             <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="icon upwards hidden"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
          
          <div class = "content hidden"> ${blog.content}
          <h4>${blog.dateStr.replaceAll(" ", "")}</h4>
          </div>
          `;

    accordionContainer.appendChild(blogElement);
  });
  // const footerEl = document.createElement("footer");
  // footerEl.className = "blog-footer";
  // footerEl.innerHTML = `&copy;2024-Arya IdnanI`;
  // accordionContainer.append(footerEl);

  pageLoad();
}

function blogSort(order = "latest") {
  blogs.sort((a, b) => {
    if (order === "latest") {
      return b.id - a.id;
    } else if (order === "oldest") {
      return a.id - b.id;
    }
  });
  console.log("workss");
  blogRender(blogs);
}

blogRender(blogs); //Rendering
blogSort("latest"); //Initial Sorting

const sortBtn = document.querySelector(".sort-btn");

sortBtn.addEventListener("click", () => {
  sortBtn.classList.toggle("oldest");
  sortBtn.classList.toggle("latest");

  if (!sortBtn.classList.contains("latest")) {
    sortBtn.textContent = "Oldest";
    blogSort("oldest");
  } else if (!sortBtn.classList.contains("oldest")) {
    sortBtn.textContent = "Latest";
    blogSort("latest");
  }
});

//Accordion Functionality

function pageLoad() {
  const itemSelector = document.querySelectorAll(".item");
  const daySelector = document.querySelectorAll(".day-number");
  const dateSelector = document.querySelectorAll(".date-number");
  const downIcon = document.querySelectorAll(".downwards");
  const upIcon = document.querySelectorAll(".upwards");

  for (let i = 0; i < itemSelector.length; i++) {
    itemSelector[i].addEventListener("click", function () {
      itemSelector[i].classList.toggle("active");
      downIcon[i].classList.toggle("hidden");
      upIcon[i].classList.toggle("hidden");
    });

    itemSelector[i].addEventListener("mouseenter", function () {
      daySelector[i].classList.toggle("hidden");
      dateSelector[i].classList.toggle("hidden");
    });

    itemSelector[i].addEventListener("mouseleave", function () {
      dateSelector[i].classList.toggle("hidden");
      daySelector[i].classList.toggle("hidden");
    });
  }
}

document.querySelector(".screen-theme").addEventListener("click", () => {
  document.querySelector(".moon-icon").classList.toggle("hidden");
  document.querySelector(".sun-icon").classList.toggle("hidden");
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("body").classList.toggle("light");
});
