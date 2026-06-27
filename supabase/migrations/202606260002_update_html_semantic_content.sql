update public.course_lessons
set
  summary = 'Understand the full HTML document skeleton and why each part exists.',
  objective = 'Build HTML documents that are valid, readable and ready for styling.',
  content = $$
An HTML document is more than a list of visible tags. It has a required structure that helps the browser understand what kind of page it is reading, what language the content uses, what title should appear in the browser tab and how the page should behave on mobile screens.

The first important piece is <!DOCTYPE html>. It tells the browser to use the modern HTML standard. Then the html element wraps the whole document. The lang attribute should describe the page language, for example lang="en". This helps browsers, translation tools and screen readers.

The head element contains information about the page. It usually includes charset, viewport and title. The charset tells the browser how to read characters. The viewport tag makes responsive layouts work correctly on mobile. The title describes the page in the browser tab and search results.

The body element contains what users actually see: headings, paragraphs, links, images, buttons, sections and forms. If content should appear on the page, it usually belongs inside body.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontend Notes</title>
  </head>
  <body>
    <h1>Frontend Notes</h1>
    <p>My first structured HTML document.</p>
  </body>
</html>
```

Mini task: Create a new file named index.html. Add the full HTML skeleton, set the title to "My Learning Journal" and place one h1 plus one paragraph inside body. Open it in the browser and check that the tab title is correct.
$$,
  checklist = array[
    'Use doctype correctly',
    'Add html element with lang attribute',
    'Add charset and viewport meta tags',
    'Set a meaningful title',
    'Place visible content inside body'
  ]
where slug = 'html-document-structure'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use headings and paragraphs to create clear readable text structure.',
  objective = 'Write text content with correct heading hierarchy and readable paragraph blocks.',
  content = $$
Headings and paragraphs are the base of most content pages. A heading tells the user what a section is about. A paragraph gives detail. When they are used well, the page becomes easier to scan, easier to understand and easier for assistive technologies to navigate.

The h1 element should usually describe the main topic of the page. Most simple pages should have one h1. Lower headings, from h2 to h6, create sections and subsections. You should not choose heading levels because of default font size. Choose them because of document structure.

Paragraphs should contain normal text. Keep them focused. A paragraph that explains one idea is easier to read than a huge block that tries to explain everything at once. HTML does not preserve random line breaks inside a paragraph, so use separate p elements for separate ideas.

```html
<h1>My Frontend Journey</h1>

<h2>Why I am learning HTML</h2>
<p>HTML helps me structure content clearly before I add styling or JavaScript.</p>

<h2>My current goal</h2>
<p>I want to build clean pages that are easy to read and maintain.</p>
```

Mini task: Write a short page about your learning plan. Use one h1, two h2 headings and one paragraph under each h2. Do not use headings only to make text bigger.
$$,
  checklist = array[
    'Use one clear h1',
    'Create logical h2 sections',
    'Write focused paragraphs',
    'Avoid skipping heading levels randomly',
    'Choose headings by meaning, not size'
  ]
where slug = 'headings-and-paragraphs'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Create useful links between pages, sections and external resources.',
  objective = 'Use anchor elements, href values and navigation links correctly.',
  content = $$
Links are how users move through the web. In HTML, links are created with the a element. The most important attribute is href, which tells the browser where the link should go.

A link can point to an external website, another page in your project, a file, an email address or a section on the same page. Good link text matters. "Click here" is weak because it gives no context. "Read MDN HTML basics" is better because users know what will happen.

Relative links are important in multi-page projects. If about.html is in the same folder as index.html, you can link to it with href="about.html". If a page is inside a folder, paths need to match the real file structure.

Navigation is often built from links inside a nav element. A common pattern is nav > ul > li > a. You will use this pattern often because navigation is usually a list of destinations.

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="projects.html">Projects</a></li>
  </ul>
</nav>
```

Mini task: Create three files: index.html, about.html and projects.html. Add navigation links to each file so the user can move between all three pages.
$$,
  checklist = array[
    'Create anchor elements',
    'Use meaningful link text',
    'Use relative links between local pages',
    'Build simple navigation',
    'Avoid unclear click here links'
  ]
where slug = 'links-and-navigation'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Add images with correct paths, sizing habits and useful alt text.',
  objective = 'Use img elements responsibly and write alt text that improves accessibility.',
  content = $$
Images can make a page more useful, personal and visually clear. In HTML, images are added with the img element. The src attribute points to the image file. The alt attribute describes the image for users who cannot see it or when the image fails to load.

Alt text should describe the purpose of the image in context. If the image shows your profile photo on a personal page, alt="Portrait of Kacper" is useful. If the image is only decorative and adds no information, an empty alt attribute can be correct.

File paths matter. If your image is inside assets/images/profile.jpg, the src should match that path. Many beginner image bugs are just wrong file paths or different capitalization.

Avoid huge unoptimized images in real projects. For this course, focus first on correct HTML. Later you will learn sizing and responsive image behavior in more detail with CSS.

```html
<img
  src="assets/images/profile.jpg"
  alt="Portrait of a frontend developer working at a desk"
/>
```

Mini task: Add an image to your profile page. Put the file inside assets/images, write useful alt text and then intentionally break the src path once so you can see how the browser behaves.
$$,
  checklist = array[
    'Use img with src attribute',
    'Write useful alt text',
    'Understand decorative image alt text',
    'Use correct relative image paths',
    'Keep image files organized'
  ]
where slug = 'images-and-alt-text'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use unordered, ordered and nested lists for grouped content.',
  objective = 'Choose the right list type for navigation, skills, steps and grouped information.',
  content = $$
Lists are used when content belongs together. HTML gives you two main list types: unordered lists and ordered lists. An unordered list uses ul and is good for items where order does not matter. An ordered list uses ol and is good for steps, rankings or instructions where order matters.

Each item inside a list must be an li element. A common mistake is placing text directly inside ul or ol without li. The browser may still render something, but the HTML is not structured correctly.

Lists are useful for skills, features, navigation links, instructions, ingredients, project requirements and many other real UI patterns. Navigation menus often start as lists before CSS turns them into horizontal nav bars.

Nested lists are possible, but use them only when the relationship is clear. If a skill has subtopics, a nested list can make sense. If nesting makes the content harder to scan, simplify it.

```html
<h2>Skills I am learning</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<h2>Project steps</h2>
<ol>
  <li>Create files</li>
  <li>Write HTML</li>
  <li>Preview in the browser</li>
</ol>
```

Mini task: Add two lists to your page: one unordered list with at least five skills and one ordered list with four steps for building a simple webpage.
$$,
  checklist = array[
    'Use ul for unordered items',
    'Use ol for ordered steps',
    'Place every item inside li',
    'Use lists for real grouped content',
    'Avoid unnecessary deep nesting'
  ]
where slug = 'lists'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Understand what buttons are for and when they should not replace links.',
  objective = 'Use button elements for actions and clear user interface commands.',
  content = $$
A button represents an action. In real applications, buttons submit forms, open modals, save changes, toggle menus or start a process. A link moves the user somewhere. This difference matters because browsers and assistive technologies treat buttons and links differently.

In plain HTML, a button can be placed inside a form or used as a general interface control. If a button is not meant to submit a form, you should often set type="button". This prevents surprising form submissions later.

Button text should describe the action clearly. "Submit" can be okay in a simple form, but "Create account", "Save changes" or "Start course" is usually better because it tells the user exactly what will happen.

Do not use div elements as fake buttons. A clickable div may look right after CSS, but it lacks normal button behavior by default. Start with the correct HTML element.

```html
<button type="button">Show details</button>

<form>
  <label for="email">Email</label>
  <input id="email" type="email" />
  <button type="submit">Join newsletter</button>
</form>
```

Mini task: Add three buttons to a practice page: "Save profile", "Show skills" and "Contact me". Decide which ones should be inside a form and which should use type="button".
$$,
  checklist = array[
    'Use button for actions',
    'Use links for navigation',
    'Add type button when needed',
    'Write clear button labels',
    'Avoid clickable divs'
  ]
where slug = 'buttons'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use div and span as generic containers without replacing meaningful HTML.',
  objective = 'Understand block and inline generic elements and use them only when they help structure content.',
  content = $$
The div and span elements are generic. They do not describe content by themselves. A div is a block-level container. A span is an inline container. They are useful, but they should not be your first choice when a semantic element would explain the content better.

A div is often used to group elements for layout or styling. For example, a card can be a div if there is no more meaningful element available. Later, CSS can style that card with spacing, border and background.

A span is used inside text when you need to target a small inline piece. For example, you might wrap a label, tag or highlighted word in a span. It should not be used to create large page sections.

The beginner trap is building an entire page with only divs. This works visually after CSS, but the HTML becomes harder to understand and less accessible. Use header, main, nav, section, article and footer when they match the purpose. Use div when you simply need a neutral wrapper.

```html
<div class="profile-card">
  <h2>Kacper</h2>
  <p>Learning <span class="highlight">HTML and CSS</span>.</p>
</div>
```

Mini task: Take a small profile block and wrap it in a div with class="profile-card". Inside the paragraph, wrap one important phrase in a span with class="highlight".
$$,
  checklist = array[
    'Use div as a neutral block wrapper',
    'Use span for inline text targeting',
    'Avoid div-only page structure',
    'Prefer semantic elements when possible',
    'Add classes for future CSS styling'
  ]
where slug = 'divs-and-spans'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Keep HTML readable with indentation, grouping and useful comments.',
  objective = 'Write HTML that another developer can scan, understand and maintain.',
  content = $$
Clean HTML is easier to style, debug and extend. The browser may not care much about indentation, but humans do. You should write HTML so that the nesting is obvious at a glance.

Indent child elements inside their parent. If a nav contains a ul, and the ul contains li elements, the indentation should show that relationship. This makes mistakes easier to spot.

Comments can help explain sections, but they should be used carefully. If every line needs a comment, the structure is probably too confusing. Good naming, semantic elements and clean indentation usually matter more than comments.

Group related content together. A profile card should keep the image, name, bio and links together. A navigation should keep links together. Related content should not be scattered randomly across the file.

```html
<!-- Profile card -->
<div class="profile-card">
  <img src="assets/images/profile.jpg" alt="Portrait of Kacper" />
  <h2>Kacper</h2>
  <p>Frontend developer in progress.</p>
</div>
```

Mini task: Reformat one of your previous HTML files. Fix indentation, group related content and add only one useful comment above the largest section.
$$,
  checklist = array[
    'Indent nested elements',
    'Group related content',
    'Use comments sparingly',
    'Keep class names readable',
    'Make structure easy to scan'
  ]
where slug = 'comments-and-clean-structure'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Build a complete personal profile page using clean HTML structure.',
  objective = 'Combine headings, paragraphs, images, lists and links into one simple profile page.',
  content = $$
This exercise brings together the HTML fundamentals from this module. You will build a personal profile page. The goal is not advanced design yet. The goal is clean, meaningful HTML that will be easy to style later.

Your page should include your name, a short bio, a profile image, a list of skills and social or portfolio links. Use the correct elements for each type of content. Use headings for sections, paragraphs for text, lists for grouped items and links for navigation.

Keep the project organized. Use index.html, styles.css and an assets folder. Even if you do not style much yet, link the CSS file so the project is ready for the next module.

Think like a real developer. The HTML you write now should be understandable when you come back tomorrow. Avoid random divs, unclear link text and missing alt text.

```html
<main>
  <h1>Kacper Goluch</h1>
  <p>I am learning frontend development with HTML and CSS.</p>

  <h2>Skills</h2>
  <ul>
    <li>HTML structure</li>
    <li>CSS basics</li>
    <li>Browser DevTools</li>
  </ul>
</main>
```

Mini task: Build the full profile page from scratch. Include name, bio, profile image, skills list and at least three links. After finishing, inspect the page in DevTools and check whether the structure is easy to read.
$$,
  checklist = array[
    'Create a complete profile page',
    'Add name and bio',
    'Add profile image with alt text',
    'Add skills list',
    'Add social or portfolio links',
    'Keep HTML readable'
  ]
where slug = 'exercise-build-a-personal-profile-page'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Understand why semantic HTML is one of the first signs of professional frontend work.',
  objective = 'Choose HTML elements by meaning instead of visual appearance.',
  content = $$
Semantic HTML means using elements that describe the meaning of the content. A heading should use a heading element. Navigation should use nav. The main content should live inside main. A standalone article should use article when that meaning fits.

Non-semantic HTML often uses div for everything. A page made only of divs can still be styled to look good, but the structure is harder for developers, browsers, search engines and assistive technologies to understand.

Semantic HTML improves accessibility because screen readers can understand landmarks and structure. It improves maintainability because developers can see what each part of the page is meant to be. It also supports SEO because search engines can better understand content hierarchy.

The key idea is simple: choose the element that communicates purpose. If no meaningful element fits, then use a div. Semantic HTML does not mean never using div. It means not using div as a replacement for everything.

```html
<main>
  <section>
    <h2>Course benefits</h2>
    <p>Learn HTML and CSS through practical projects.</p>
  </section>
</main>
```

Mini task: Take a div-only layout and rewrite it using at least main, section and footer. Keep the visual content the same, but improve the meaning of the structure.
$$,
  checklist = array[
    'Define semantic HTML',
    'Explain why div-only markup is weak',
    'Use elements based on meaning',
    'Understand accessibility benefits',
    'Use div only when a neutral wrapper is needed'
  ]
where slug = 'why-semantic-html-matters'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use header, main, section, article and footer to organize real pages.',
  objective = 'Build page layouts with semantic landmarks and content sections.',
  content = $$
Semantic layout elements help describe the major regions of a page. They do not automatically create a visual design. Their job is meaning. CSS will handle the design later.

The header element usually contains introductory content for a page or section. It often includes a logo, heading or navigation. The main element contains the primary content of the page. A page should usually have one main element.

The section element groups related content under a theme, usually with a heading. The article element is for content that can stand on its own, such as a blog post, news item, comment or card that represents independent content.

The footer element contains closing or supporting information. It can appear at the page level or inside sections and articles. Common footer content includes copyright, links and metadata.

```html
<header>
  <h1>Frontend Journal</h1>
</header>

<main>
  <section>
    <h2>Latest notes</h2>
    <article>
      <h3>Learning semantic HTML</h3>
      <p>Semantic elements make pages easier to understand.</p>
    </article>
  </section>
</main>

<footer>
  <p>Created by Kacper.</p>
</footer>
```

Mini task: Create a page skeleton for a small blog homepage. Use header, main, section, at least two article elements and footer.
$$,
  checklist = array[
    'Use header for introductory content',
    'Use one main element',
    'Use section for themed groups',
    'Use article for standalone content',
    'Use footer for closing information'
  ]
where slug = 'semantic-layout-elements'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Create navigation that is meaningful, readable and accessible.',
  objective = 'Use nav, clear link text and simple navigation structure.',
  content = $$
Navigation helps users understand where they are and where they can go next. In HTML, important groups of navigation links should be wrapped in a nav element. This tells browsers and assistive technologies that the links are navigation, not random links inside content.

A nav element does not need to wrap every link on the page. Use it for major navigation areas, such as the main site menu, footer navigation or table of contents.

Link text should be clear on its own. A screen reader user may navigate through a list of links without surrounding paragraphs, so each link should communicate destination or purpose.

Keyboard access matters. Real anchor links are naturally keyboard accessible. If you use fake clickable elements, you lose built-in browser behavior and create extra work.

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="articles.html">Articles</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

Mini task: Build a navigation menu with four links. Use nav, ul, li and a. Then tab through the page with your keyboard and check that every link can receive focus.
$$,
  checklist = array[
    'Wrap major navigation in nav',
    'Use clear link text',
    'Use list structure for menus',
    'Keep links keyboard accessible',
    'Add aria-label when there are multiple nav areas'
  ]
where slug = 'nav-and-accessible-navigation'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Build accessible form foundations with form, label and input.',
  objective = 'Connect labels to inputs and avoid placeholder-only form fields.',
  content = $$
Forms are how users send information. Login pages, register pages, search bars, contact forms and settings screens all depend on form structure. Good forms start with correct HTML.

The form element groups fields that belong to one submission. The label element describes a field. The input element lets the user enter data. A label should be connected to its input using for and id.

Placeholders are not replacements for labels. Placeholder text disappears when the user types and can be hard to read. A real label remains available and improves accessibility.

Input type matters. Use type="email" for email addresses, type="password" for passwords and type="text" for normal text. Correct types help browsers show better keyboards, validation and autofill behavior.

```html
<form>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" />

  <button type="submit">Create account</button>
</form>
```

Mini task: Create a simple register form with full name, email and password fields. Every input must have a connected label.
$$,
  checklist = array[
    'Use form to group fields',
    'Connect label for with input id',
    'Avoid placeholder-only labels',
    'Choose useful input types',
    'Add a submit button'
  ]
where slug = 'forms-and-labels'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use common form controls for different kinds of user input.',
  objective = 'Choose between input, textarea and select based on the data users need to provide.',
  content = $$
Different form controls exist because users enter different kinds of information. A short value, a longer message and a fixed choice should not all use the same element.

The input element is best for short values. Different input types communicate different intent: text, email, password, number, checkbox and radio are common examples.

The textarea element is for longer multi-line text, such as a message, bio or project description. It has an opening and closing tag, unlike input.

The select element gives users a list of predefined options. It is useful when choices are limited and predictable, such as experience level or preferred learning path.

```html
<label for="bio">Short bio</label>
<textarea id="bio" name="bio"></textarea>

<label for="level">Current level</label>
<select id="level" name="level">
  <option value="beginner">Beginner</option>
  <option value="intermediate">Intermediate</option>
</select>
```

Mini task: Build a profile settings form with username input, bio textarea and level select. Add at least three options to the select.
$$,
  checklist = array[
    'Use input for short values',
    'Use textarea for longer text',
    'Use select for fixed choices',
    'Add name attributes',
    'Label every control'
  ]
where slug = 'inputs-textarea-select'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Choose links for navigation and buttons for actions.',
  objective = 'Avoid confusing users and assistive technology by choosing the correct interactive element.',
  content = $$
Links and buttons can both be clicked, but they do different jobs. A link moves the user to another page, another section, a file or an external resource. A button performs an action on the current interface.

This distinction affects accessibility and future JavaScript behavior. A link has URL behavior. Users can open it in a new tab, copy its address or see the destination. A button does not have a destination. It triggers something.

Use an anchor when the result is navigation. Use a button when the result is an action: submitting a form, opening a modal, saving settings, starting a quiz or toggling a menu.

Avoid clickable divs and spans. They do not have the same keyboard and semantic behavior by default. If something acts like a button, use button.

```html
<a href="courses.html">View courses</a>

<button type="button">Open menu</button>
<button type="submit">Save profile</button>
```

Mini task: Write five UI labels and decide whether each one should be a link or a button: "Go to dashboard", "Save changes", "Open settings", "Read article", "Start quiz".
$$,
  checklist = array[
    'Use links for navigation',
    'Use buttons for actions',
    'Avoid clickable divs',
    'Use type button outside forms',
    'Use type submit for form submission'
  ]
where slug = 'buttons-vs-links'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Apply beginner accessibility habits while writing HTML.',
  objective = 'Use semantic structure, labels, alt text and keyboard-friendly elements.',
  content = $$
Accessibility means making websites usable by as many people as possible. It is not only about screen readers. It also includes keyboard users, low vision users, people with temporary injuries, slow networks and different devices.

HTML gives you many accessibility features for free if you use the correct elements. Real buttons can be focused and activated with the keyboard. Real links are understood as navigation. Labels tell users what form fields mean.

Alt text helps users understand images. Heading structure helps users scan content. Semantic landmarks like header, nav, main and footer help users jump around the page.

Color contrast matters too. HTML alone will not solve contrast, but your structure should not depend only on color. For example, an error message should include text, not only a red border.

```html
<label for="email">Email address</label>
<input id="email" type="email" />

<p id="email-error">Please enter a valid email address.</p>
```

Mini task: Review one page you already built. Check labels, alt text, heading order and keyboard navigation. Fix at least three accessibility issues.
$$,
  checklist = array[
    'Use semantic elements',
    'Label every form field',
    'Write useful alt text',
    'Keep heading order logical',
    'Test keyboard navigation'
  ]
where slug = 'basic-accessibility'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Use HTML foundations that help search engines understand your pages.',
  objective = 'Write titles, headings, links and content that support basic SEO.',
  content = $$
SEO means search engine optimization. At this stage, you do not need advanced SEO tactics. You need solid HTML foundations that make the page understandable.

The title element is important because it appears in browser tabs and often in search results. It should describe the page clearly. A title like "Home" is weak. A title like "Frontend Learning Journal" is more useful.

Heading structure also matters. The h1 should describe the main topic. H2 headings should divide important sections. Search engines and users both benefit from clear structure.

Link text should describe destinations. Meaningful links help search engines understand relationships between pages. They also help users know what they are opening.

Meta descriptions can summarize the page. They do not guarantee ranking, but they can influence how your page appears in search results.

```html
<head>
  <title>Frontend Learning Journal</title>
  <meta
    name="description"
    content="Notes and projects from my HTML, CSS and frontend learning path."
  />
</head>
```

Mini task: Add a strong title and meta description to your profile page. Then review your h1 and h2 headings to make sure they describe the content clearly.
$$,
  checklist = array[
    'Write descriptive page titles',
    'Use one clear h1',
    'Use meaningful section headings',
    'Write descriptive link text',
    'Add a useful meta description'
  ]
where slug = 'seo-basics'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

update public.course_lessons
set
  summary = 'Build a semantic blog article page with real page regions.',
  objective = 'Combine semantic layout, navigation, article content and accessibility basics.',
  content = $$
In this exercise, you will build a semantic blog article page. This project is important because it looks simple, but it uses many professional HTML decisions.

Your page should include a header with the site name, a nav with links, a main area, an article, an author section, related posts and a footer. Each region should use an element that matches its purpose.

The article should include a clear h1, several h2 sections and paragraphs. Add a publication date if you want extra realism. The author section can include a name, short bio and image with alt text.

Related posts should be a list of links or small article cards. Do not use vague link text. Write titles that describe the destination.

```html
<main>
  <article>
    <h1>How I started learning frontend development</h1>
    <p>Learning HTML first helped me understand page structure.</p>
  </article>
</main>
```

Mini task: Build the full blog article page from scratch. Use header, nav, main, article, section and footer. Add at least three related post links and test the page with keyboard navigation.
$$,
  checklist = array[
    'Add header and nav',
    'Create main article content',
    'Add author section',
    'Add related posts',
    'Add footer',
    'Use semantic structure throughout',
    'Check headings and link text'
  ]
where slug = 'exercise-build-a-blog-article-page'
  and exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.slug = 'html-css-foundations'
  );

