update public.course_lessons
set
  summary = 'Learn what a website really is, from files and URLs to what the browser finally shows on screen.',
  objective = 'Understand the basic mental model of a website: files stored on a server, requested through a URL, downloaded by the browser and rendered as a page.',
  content = $$
A website is a collection of pages and assets that a browser can load and display. At the most basic level, a website is not magic and it is not a single mysterious object. It is usually a group of files: HTML files, CSS files, JavaScript files, images, fonts and other assets.

When someone enters a URL in the browser, the browser asks a server for a specific resource. The server responds with files. The browser then reads those files and turns them into something visual and interactive. This process is called rendering.

The most important file in a simple website is usually an HTML file. HTML describes the structure and meaning of the page. It tells the browser what content exists: headings, paragraphs, images, links, navigation, sections, forms and buttons.

CSS controls how that structure looks. It decides colors, spacing, typography, layout, borders, backgrounds and responsive behavior. Without CSS, the page may still have content, but it will look very plain.

JavaScript adds behavior. It can react to clicks, update the page, fetch data, validate forms and make the interface interactive. In this course, you focus mainly on HTML and CSS first, because they are the foundation of every frontend interface.

It is also useful to understand the difference between a web page, a website and a web app. A web page is one document, such as a homepage or pricing page. A website is a collection of related pages. A web app is usually more interactive and often lets users log in, save data or perform tasks.

For example, a portfolio can be a website. A dashboard like MindForge AI is closer to a web app because users have accounts, progress, XP and personalized data.

As a frontend developer, your job starts with understanding what the browser needs in order to show a good page. You write structured HTML, connect CSS, organize assets and test the result in the browser. This simple workflow is the base for everything that comes later.
$$,
  checklist = array[
    'Explain what files can make up a website',
    'Describe what happens after entering a URL',
    'Understand the difference between a web page, website and web app',
    'Explain the role of HTML in a page',
    'Explain the role of CSS in a page',
    'Explain why JavaScript is learned after HTML and CSS foundations'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'what-is-a-website';

update public.course_lessons
set
  summary = 'Understand how the browser combines HTML, CSS and JavaScript into one working user interface.',
  objective = 'Clearly understand the role of each core frontend technology and how the browser uses them together.',
  content = $$
HTML, CSS and JavaScript work together to create the frontend experience. Each technology has a different responsibility. Understanding this separation is one of the most important foundations for becoming a frontend developer.

HTML is responsible for structure and meaning. It defines what exists on the page. A heading is a heading. A paragraph is a paragraph. A navigation area contains links. A form contains fields. Good HTML makes the content understandable before any styling is added.

CSS is responsible for presentation. It controls how the HTML looks. CSS can turn a simple list of links into a navigation bar, arrange cards in a grid, make a page responsive on mobile and desktop, and create a visual design that feels professional.

JavaScript is responsible for behavior. It can open menus, validate forms, update counters, fetch data from an API, show notifications or change the UI after user actions. JavaScript becomes much easier to write when the HTML structure is clean and the CSS is organized.

The browser has a specific workflow. First, it downloads the HTML. Then it parses the HTML and creates a document structure. While reading the HTML, it discovers linked CSS files, images, scripts and other assets. It downloads them as needed.

After loading CSS, the browser applies styles to the HTML elements. It calculates layout: how wide elements should be, where they should appear, how much space they need and how they respond to the screen size. Then it paints the result on the screen.

JavaScript can run during or after this process. It can read elements, change text, add classes, respond to events and communicate with servers. But if the base HTML and CSS are weak, JavaScript often becomes harder to manage.

A useful mental model is this: HTML is the skeleton, CSS is the visual design and JavaScript is the behavior layer. Real frontend work combines all three, but a strong developer does not mix their responsibilities randomly.

In this course, you will first build a strong HTML and CSS foundation. Later, when you add JavaScript or frameworks like React, you will understand what those tools are building on top of.
$$,
  checklist = array[
    'Explain what HTML is responsible for',
    'Explain what CSS is responsible for',
    'Explain what JavaScript is responsible for',
    'Describe the basic browser rendering flow',
    'Understand why clean HTML helps CSS and JavaScript',
    'Use the structure, style and behavior mental model'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'how-browser-html-css-javascript-work-together';

update public.course_lessons
set
  summary = 'Learn how to organize a beginner HTML/CSS project so it stays readable as it grows.',
  objective = 'Create a clean project structure with HTML, CSS and assets separated in a way that feels professional from the start.',
  content = $$
Good project structure makes development easier. Even a small HTML and CSS project should be organized clearly, because messy files quickly become hard to understand.

A beginner project usually starts with a main folder. Inside that folder, you often create an index.html file. This is the default homepage file. When a browser or server looks for the main page of a simple website, index.html is the common convention.

You should also create a CSS file, often named styles.css. This file contains the styles for your page. Keeping CSS in a separate file is better than writing all styles directly inside the HTML because it keeps structure and presentation separate.

For images, icons and other static files, create an assets folder. Inside assets, you can create subfolders like images, icons or fonts if the project grows. This prevents your main project folder from becoming cluttered.

A simple project can look like this:

project-folder/
index.html
styles.css
assets/
assets/images/

Names matter. Use lowercase file names, avoid spaces and prefer clear names. For example, profile-photo.jpg is better than IMG_1234.JPG. Clear names make it easier to understand what each file is for.

Paths also matter. If index.html and styles.css are in the same folder, you can link CSS with href="styles.css". If an image is inside assets/images, you might use src="assets/images/profile-photo.jpg". Understanding paths will save you a lot of debugging time.

As projects become bigger, structure becomes even more important. Later, frameworks like Next.js introduce more folders and conventions, but the basic idea is the same: files should be easy to find, names should be meaningful and related assets should be grouped together.

Your goal is not to create complicated architecture. Your goal is to make the project understandable at a glance.
$$,
  checklist = array[
    'Create a main project folder',
    'Create index.html',
    'Create styles.css',
    'Create an assets folder',
    'Use clear lowercase file names',
    'Understand relative paths between files',
    'Keep structure simple and readable'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'files-folders-and-project-structure';

update public.course_lessons
set
  summary = 'Set up the basic VS Code workflow you will use for every HTML and CSS project.',
  objective = 'Use VS Code comfortably to open folders, create files, edit code, format documents and move through a project.',
  content = $$
VS Code is one of the most common editors used by frontend developers. You do not need to know every feature at the beginning, but you should be comfortable with the basic workflow.

The most important habit is opening the whole project folder, not only a single file. When you open the full folder, VS Code shows your file tree, lets you create new files easily and helps extensions understand your project.

You will use the Explorer panel to create files and folders. For this course, you will often create index.html, styles.css and assets folders. Creating them inside VS Code keeps your workflow fast and focused.

Formatting matters. Clean indentation makes HTML much easier to read. Nested elements should be indented so you can quickly see what belongs inside what. VS Code can format documents automatically, which helps you keep code consistent.

Useful shortcuts are not required, but they save time. You can use quick open to jump between files, multi-cursor editing for repeated changes and search to find text in your project. Learn these slowly as you need them.

Extensions can help, but do not overload your editor. For this course, Live Server is useful because it lets you preview HTML files in the browser and refresh changes quickly. You may also use formatting support, but the core skill is still understanding the code yourself.

A beginner mistake is relying too much on autocomplete without understanding what is being written. Autocomplete is helpful, but you should still know what each tag, attribute and CSS property means.

Treat your editor as a workspace. Keep files organized, format regularly and use the file tree intentionally. This will make every later project easier.
$$,
  checklist = array[
    'Open the full project folder in VS Code',
    'Create files from the Explorer panel',
    'Use clean indentation',
    'Format HTML and CSS documents',
    'Install Live Server if needed',
    'Avoid relying blindly on autocomplete'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'vs-code-basics';

update public.course_lessons
set
  summary = 'Write a valid first HTML document and understand what each main part does.',
  objective = 'Create the basic HTML skeleton and understand doctype, html, head, title and body.',
  content = $$
Every HTML page starts with a document structure. This structure tells the browser what kind of document it is reading and where to find important page information.

The first line is usually <!DOCTYPE html>. This tells the browser to use modern HTML behavior. Without it, browsers may use older compatibility modes, which can cause strange layout behavior.

The html element wraps the entire document. It is the root element of the page. You will usually add a lang attribute, such as lang="en", so browsers and assistive technologies know the language of the page.

Inside html, there are two main parts: head and body. The head contains information about the page. This information is mostly not visible directly on the page. The body contains the visible content users see in the browser.

The head often includes meta tags. A charset meta tag tells the browser which character encoding to use. A viewport meta tag helps the page behave correctly on mobile screens. The title element controls the text shown in the browser tab.

The body is where you place headings, paragraphs, images, links, sections, forms and other visible elements. If you want something to appear on the page, it usually belongs inside body.

A basic HTML document looks like this:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <p>This is my first HTML page.</p>
  </body>
</html>

At first, this structure may feel repetitive. That is normal. With practice, you will write it quickly and understand why each part exists.
$$,
  checklist = array[
    'Add <!DOCTYPE html>',
    'Add html element with lang attribute',
    'Add head and body',
    'Add charset meta tag',
    'Add viewport meta tag',
    'Set a page title',
    'Place visible content inside body'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'first-html-document';

update public.course_lessons
set
  summary = 'Use Live Server and browser developer tools to preview, inspect and debug your work.',
  objective = 'Preview local HTML files in the browser and inspect page structure and styles with DevTools.',
  content = $$
Frontend development happens in the browser. Writing code is only one part of the workflow. You also need to preview, inspect and debug what the browser actually renders.

Live Server is a VS Code extension that starts a small local development server. Instead of opening an HTML file directly from your file system, you run it through a local address. This better matches how websites are normally served.

With Live Server, you can right-click index.html and choose Open with Live Server. Your browser opens the page, often at an address like http://127.0.0.1:5500. When you save changes, the browser refreshes automatically.

Developer tools, usually called DevTools, are built into browsers. You can open them with right click and Inspect, or with keyboard shortcuts. DevTools let you see the HTML structure, applied CSS, layout dimensions, network requests and console messages.

The Elements panel is especially important for HTML and CSS. It shows the DOM, which is the browser's live representation of your HTML. You can click elements, see their styles and temporarily edit CSS to test ideas.

The Styles panel shows which CSS rules apply to the selected element. You can turn rules on and off, change values and immediately see the effect. This is one of the fastest ways to understand why something looks the way it does.

The box model view helps you debug spacing. It shows content size, padding, border and margin. When a layout looks wrong, this view often explains the problem quickly.

Do not treat DevTools as an advanced optional tool. It is part of normal frontend work. Good developers inspect and verify instead of guessing.
$$,
  checklist = array[
    'Open a page with Live Server',
    'Refresh changes by saving files',
    'Open browser DevTools',
    'Inspect an HTML element',
    'View applied CSS rules',
    'Use the box model panel to inspect spacing'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'live-server-and-developer-tools';

update public.course_lessons
set
  summary = 'Build your first connected HTML and CSS page with text, image and link.',
  objective = 'Practice the full beginner workflow: create files, write HTML, connect CSS, add content and preview the result.',
  content = $$
In this exercise, you will create your first small page using both HTML and CSS. The goal is not to create a perfect design. The goal is to practice the complete workflow from files to browser preview.

Start by creating a new project folder. Inside it, create index.html and styles.css. Also create an assets folder for images. If you have a local image, place it inside assets/images. If not, you can use a temporary image URL for now.

In index.html, create the basic HTML document structure. Add a meaningful title in the head. Link your CSS file with a link element so the browser loads styles.css.

Inside body, add a main heading with h1. This heading should describe the page, for example "My First Web Page". Add a paragraph below it that explains what the page is about.

Next, add an image. Make sure the image has alt text. The alt text should describe the image in a useful way. If the image is decorative, you can use an empty alt attribute, but for this exercise write a real description.

Add a link to a website you use often, such as MDN Web Docs. The link text should be clear. Avoid link text like "click here". Instead, write something like "Visit MDN Web Docs".

In styles.css, add basic styles. Set a font family for the body, change the background color, adjust text color, add spacing around the main content and style the image so it does not overflow the page.

Open the page with Live Server. Inspect the page in DevTools. Check that the CSS file is loaded, the image appears, the link works and the spacing looks intentional.

When you finish, you should have a small but complete page. More importantly, you should understand how HTML, CSS, files and the browser connect together.
$$,
  checklist = array[
    'Create project folder',
    'Create index.html',
    'Create styles.css',
    'Link CSS file in HTML',
    'Add heading',
    'Add paragraph',
    'Add image with alt text',
    'Add clear link text',
    'Add basic CSS styling',
    'Preview with Live Server',
    'Inspect page in DevTools'
  ]
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'exercise-create-your-first-page';
