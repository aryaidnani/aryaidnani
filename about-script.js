//Blog Array

const blogs = [
  {
    id: 1,
    dateStr: `12<sup>th</sup> September '24`,
    content: `<p>So yes, today is the day I restart my 100 days of code challenge. The last time I tried to complete this challenge, it ended on day 51. This delivered a huge blow to me. It took me 3 days to get over this in order to start today. So now my challenge gets over on the 20<sup>th</sup> of December. This isn't ideal but sadly thats the way everything is. Ocassionally we all have and will have our share of bad days, it is our response and outlook towards the situation which matter. Growth surely involves minimalization of pitfalls, but whats equally important is learning how to deal with them. By no means am I trying to fend for my broken streak of 50 days, but I have come to realise that, our reaction to such hard situations is what matters most. <br> <br>
    So here I am, after 3 days of regret and brooding, writing this blog after having done some coding today. Today I implemented the option to toggle between light and dark mode on my page. This is cool and I will be trying to learn more about responsive web pages today. I am restarting this challenge with the hope of being able to rebuild my lost momentum, and regain the confidence coding once gave me. </p>`,
  },

  {
    id: 2,
    dateStr: `13<sup>th</sup> September '24`,
    content: `<p>Today was a decently productive day. I managed to learn a little more about responsive web pages and also managed to make this website slightly more responsive. I did this by changing the hardcoded pixel values of elements to rem values. This took some time but the good part was the fact that I was able to balance this with meeting guests who came home for ganpati. Not only did I manage to interact with guests, but also managed to get my work done. On any other day I would've wanted to do more, but considering today's day coupled with college, I'm happy I was able to add/modify this part of my website.</p>`,
  },

  {
    id: 3,
    dateStr: `14<sup>th</sup> September '24`,
    content: `<p>Well this was overwhelming to say the least. Today I attended my weekend Javascript class which was quite overwhelming. Why?Because today we started off with databases, mongodb to be specific. Every part of mongodb, for me atleast was a pain to say the least. Right from configuring mongodb's compass to creating a cluster to even updating it using CRUD, this was quite quite overwhelming. Databases are the next step for this website so I really want to learn them, but at the same time I need to do so slowly.<br><br> There is a clear miss match between what I have learnt through resources on the internet & what I have learnt through this weekend course. Now I need to bridge that gap because both these learning pathways are moving at a different pace. I can learn online however I want and whenever I want, but my weekend class is pretty fast. It is fast because the instructor teaches main concepts over the weekends and expects us to learn more about the subject over the week. Its been 8 weeks and its high time I bridge the gap.This is something I need to figure out, and figure out soon because my college starts in full flow from the coming week. Here's to figuring it out!! </p>`,
  },

  {
    id: 4,
    dateStr: `15<sup>th</sup> September '24`,
    content: `<p>A great day indeed. Today I had an event in college (treasure hunt) which I participated in along with my friends and boy did we have a blast. We also got assigned a senior to guide us during the event and to keep a check on us, and she was so nice to us. She was pretty disinterested in the beginning, but somehow our enthusiasum got to her and by the end she was laughing and having fun just like the three of us were. We couldn't win the thing however running up and down the college, seeing our senior laugh with us, and in general just having fun was what mattered to me. <br><br> After getting home I got some sleep and sat for my Javascript class. Today was a continuation of Mongodb and again, todays class was super interesting. I learnt about hashing, salting, input validation etc using libraries like bcrypt and zod. Again this was a pretty heavy lecture, but one which I really found myself invested in. I then proceeded to learn some terminal commands, using vim and so on. Soon after that I fixed the alignment of elements in the navbar. This was an issue because I recently changed most of the hardcoded pixel values of my page to rem values. As a result of this, it affected the alignment of elements and their sizes. I fixed the obvious ones when I introduced rem, but some minor ones are yet to be fixed. <br>That was a brief summary of today and I'm really really looking forward to maximizing tomorrow.</p>`,
  },

  {
    id: 5,
    dateStr: `16<sup>th</sup> September '24`,
    content: `<p>By far the most productive day since I have restarted my streak. Today I managed to finish a decent part of backlog I had in my Javascript weekend class. The focus of these topics was middlewares and http servers. I have never understood these topics as well as I did today and I'm so glad I did. I also wanted to sort've start with authentication but that will take some time. Anyways I managed to get a hang of these topics fairly well and tried implementing them on a local clone of this website. For some reason I am not able to import the express library, but am trying to figure out why. Other than that you can probably tell I'm very happy with today.<br><br> What makes me happier is the fact that I got my class roll number and it is the most apt number any developer could hope for. It is (drumroll) 64!!!!. This number is drilled into anyone who's into development, tech or both. 64 bit, base 64, 64gb and the list goes on. Couldn't be happier with today's progress and I can't wait to maximise tomorrow.</p>`,
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
  const footerEl = document.createElement("footer");
  footerEl.className = "blog-footer";
  footerEl.innerHTML = `&copy;2024-Arya IdnanI`;
  accordionContainer.append(footerEl);

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
