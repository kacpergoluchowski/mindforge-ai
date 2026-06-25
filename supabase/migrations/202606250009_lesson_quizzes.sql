alter table public.course_lessons
add column if not exists quiz_questions jsonb not null default '[]'::jsonb;

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "website-q1",
    "question": "What is a website at the most basic level?",
    "options": [
      { "id": "a", "text": "A group of files and assets that a browser can load and display" },
      { "id": "b", "text": "Only a single image uploaded to the internet" },
      { "id": "c", "text": "Only a JavaScript program" },
      { "id": "d", "text": "A database table shown in a browser" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "website-q2",
    "question": "What usually happens after a user enters a URL?",
    "options": [
      { "id": "a", "text": "The browser creates a database automatically" },
      { "id": "b", "text": "The browser asks a server for a resource and receives files" },
      { "id": "c", "text": "CSS runs before any file is downloaded" },
      { "id": "d", "text": "The operating system writes HTML for the user" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "website-q3",
    "question": "What does HTML mainly describe?",
    "options": [
      { "id": "a", "text": "Server pricing" },
      { "id": "b", "text": "The structure and meaning of page content" },
      { "id": "c", "text": "Only animations" },
      { "id": "d", "text": "The user's password" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "website-q4",
    "question": "What is the difference between a website and a web app?",
    "options": [
      { "id": "a", "text": "A web app is usually more interactive and often saves user data" },
      { "id": "b", "text": "A website cannot have more than one page" },
      { "id": "c", "text": "A web app never uses HTML" },
      { "id": "d", "text": "There is no practical difference at all" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "website-q5",
    "question": "Why do frontend developers test pages in the browser?",
    "options": [
      { "id": "a", "text": "Because the browser renders the final result users see" },
      { "id": "b", "text": "Because HTML only works in VS Code" },
      { "id": "c", "text": "Because CSS cannot be saved in files" },
      { "id": "d", "text": "Because JavaScript replaces the need for structure" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'what-is-a-website';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "browser-stack-q1",
    "question": "What is HTML responsible for?",
    "options": [
      { "id": "a", "text": "Structure and meaning" },
      { "id": "b", "text": "Only database queries" },
      { "id": "c", "text": "Only color palettes" },
      { "id": "d", "text": "Only server deployment" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "browser-stack-q2",
    "question": "What is CSS responsible for?",
    "options": [
      { "id": "a", "text": "User authentication" },
      { "id": "b", "text": "Presentation, layout, spacing and visual design" },
      { "id": "c", "text": "Creating HTML files automatically" },
      { "id": "d", "text": "Storing user progress" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "browser-stack-q3",
    "question": "What is JavaScript responsible for?",
    "options": [
      { "id": "a", "text": "Behavior and interactivity" },
      { "id": "b", "text": "Replacing HTML structure" },
      { "id": "c", "text": "Only choosing fonts" },
      { "id": "d", "text": "Only naming files" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "browser-stack-q4",
    "question": "What does the browser do after loading CSS?",
    "options": [
      { "id": "a", "text": "Deletes the HTML" },
      { "id": "b", "text": "Applies styles, calculates layout and paints the result" },
      { "id": "c", "text": "Converts CSS into SQL" },
      { "id": "d", "text": "Disables JavaScript permanently" }
    ],
    "correctOptionId": "b"
  },
  {
    "id": "browser-stack-q5",
    "question": "Why is clean HTML important before adding JavaScript?",
    "options": [
      { "id": "a", "text": "It makes styling and behavior easier to manage" },
      { "id": "b", "text": "It removes the need for CSS" },
      { "id": "c", "text": "It makes the browser ignore files" },
      { "id": "d", "text": "It prevents pages from loading" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'how-browser-html-css-javascript-work-together';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "structure-q1",
    "question": "What is index.html commonly used for?",
    "options": [
      { "id": "a", "text": "The default homepage file" },
      { "id": "b", "text": "A font file" },
      { "id": "c", "text": "A database backup" },
      { "id": "d", "text": "A browser extension" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "structure-q2",
    "question": "Why keep CSS in styles.css?",
    "options": [
      { "id": "a", "text": "To separate page structure from presentation" },
      { "id": "b", "text": "To delete the need for HTML" },
      { "id": "c", "text": "To make images load slower" },
      { "id": "d", "text": "To store user passwords" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "structure-q3",
    "question": "What belongs in an assets folder?",
    "options": [
      { "id": "a", "text": "Images, icons, fonts and static files" },
      { "id": "b", "text": "Only database roles" },
      { "id": "c", "text": "Only browser tabs" },
      { "id": "d", "text": "Only Git commits" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "structure-q4",
    "question": "Which file name is the cleanest?",
    "options": [
      { "id": "a", "text": "profile-photo.jpg" },
      { "id": "b", "text": "IMG 999 FINAL COPY.JPG" },
      { "id": "c", "text": "my file with spaces.png" },
      { "id": "d", "text": "random-final-final2.jpeg" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "structure-q5",
    "question": "What is the goal of project structure?",
    "options": [
      { "id": "a", "text": "Make files easy to find and understand" },
      { "id": "b", "text": "Create as many folders as possible" },
      { "id": "c", "text": "Hide HTML from the browser" },
      { "id": "d", "text": "Avoid using CSS" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'files-folders-and-project-structure';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "vscode-q1",
    "question": "What should you usually open in VS Code?",
    "options": [
      { "id": "a", "text": "The whole project folder" },
      { "id": "b", "text": "Only one random image file" },
      { "id": "c", "text": "Only the browser history" },
      { "id": "d", "text": "Only the terminal settings" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "vscode-q2",
    "question": "Why is indentation useful in HTML?",
    "options": [
      { "id": "a", "text": "It makes nested structure easier to read" },
      { "id": "b", "text": "It changes the page title" },
      { "id": "c", "text": "It replaces CSS" },
      { "id": "d", "text": "It uploads the project" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "vscode-q3",
    "question": "What is Live Server useful for?",
    "options": [
      { "id": "a", "text": "Previewing HTML pages in the browser with refresh" },
      { "id": "b", "text": "Writing backend database policies" },
      { "id": "c", "text": "Designing operating systems" },
      { "id": "d", "text": "Replacing all HTML tags" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "vscode-q4",
    "question": "What should beginners avoid?",
    "options": [
      { "id": "a", "text": "Relying blindly on autocomplete without understanding code" },
      { "id": "b", "text": "Creating project files" },
      { "id": "c", "text": "Formatting documents" },
      { "id": "d", "text": "Opening the file tree" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "vscode-q5",
    "question": "What is the Explorer panel used for?",
    "options": [
      { "id": "a", "text": "Creating and navigating project files and folders" },
      { "id": "b", "text": "Buying a domain" },
      { "id": "c", "text": "Changing browser passwords" },
      { "id": "d", "text": "Running SQL migrations only" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'vs-code-basics';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "html-doc-q1",
    "question": "What does <!DOCTYPE html> tell the browser?",
    "options": [
      { "id": "a", "text": "Use modern HTML behavior" },
      { "id": "b", "text": "Load a CSS reset from the internet" },
      { "id": "c", "text": "Create a database" },
      { "id": "d", "text": "Hide the body content" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "html-doc-q2",
    "question": "What does the head element contain?",
    "options": [
      { "id": "a", "text": "Mostly page information, metadata and title" },
      { "id": "b", "text": "Only visible paragraphs" },
      { "id": "c", "text": "Only image pixels" },
      { "id": "d", "text": "Only buttons" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "html-doc-q3",
    "question": "Where does visible page content usually go?",
    "options": [
      { "id": "a", "text": "Inside body" },
      { "id": "b", "text": "Inside doctype" },
      { "id": "c", "text": "Inside the file name" },
      { "id": "d", "text": "Inside the browser tab icon" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "html-doc-q4",
    "question": "What does the title element control?",
    "options": [
      { "id": "a", "text": "Text shown in the browser tab" },
      { "id": "b", "text": "The main page heading automatically" },
      { "id": "c", "text": "The CSS file name" },
      { "id": "d", "text": "The image size" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "html-doc-q5",
    "question": "Why is lang on html useful?",
    "options": [
      { "id": "a", "text": "It tells browsers and assistive tools the page language" },
      { "id": "b", "text": "It makes CSS optional" },
      { "id": "c", "text": "It replaces charset" },
      { "id": "d", "text": "It blocks mobile screens" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'first-html-document';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "devtools-q1",
    "question": "What is Live Server used for?",
    "options": [
      { "id": "a", "text": "Running a local preview server for HTML pages" },
      { "id": "b", "text": "Creating a Supabase table" },
      { "id": "c", "text": "Deleting browser DevTools" },
      { "id": "d", "text": "Writing CSS automatically" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "devtools-q2",
    "question": "What can DevTools help you inspect?",
    "options": [
      { "id": "a", "text": "HTML structure, CSS rules, layout and spacing" },
      { "id": "b", "text": "Only your operating system settings" },
      { "id": "c", "text": "Only Git branches" },
      { "id": "d", "text": "Only payment plans" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "devtools-q3",
    "question": "What does the Elements panel show?",
    "options": [
      { "id": "a", "text": "The browser's live representation of the page structure" },
      { "id": "b", "text": "Only the user's email" },
      { "id": "c", "text": "Only production logs" },
      { "id": "d", "text": "Only file permissions" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "devtools-q4",
    "question": "Why is the box model view useful?",
    "options": [
      { "id": "a", "text": "It helps debug content size, padding, border and margin" },
      { "id": "b", "text": "It replaces the need for HTML" },
      { "id": "c", "text": "It generates images" },
      { "id": "d", "text": "It publishes the site" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "devtools-q5",
    "question": "What is a good debugging habit?",
    "options": [
      { "id": "a", "text": "Inspect and verify instead of guessing" },
      { "id": "b", "text": "Never open the browser" },
      { "id": "c", "text": "Delete CSS when layout is confusing" },
      { "id": "d", "text": "Avoid checking applied rules" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'live-server-and-developer-tools';

update public.course_lessons
set quiz_questions = $$[
  {
    "id": "first-page-q1",
    "question": "Which files should this exercise create?",
    "options": [
      { "id": "a", "text": "index.html and styles.css" },
      { "id": "b", "text": "database.sql and server.log" },
      { "id": "c", "text": "only README.md" },
      { "id": "d", "text": "only package-lock.json" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "first-page-q2",
    "question": "What should the image include?",
    "options": [
      { "id": "a", "text": "Useful alt text" },
      { "id": "b", "text": "A password" },
      { "id": "c", "text": "An SQL query" },
      { "id": "d", "text": "No src attribute" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "first-page-q3",
    "question": "What is clear link text?",
    "options": [
      { "id": "a", "text": "Visit MDN Web Docs" },
      { "id": "b", "text": "click here" },
      { "id": "c", "text": "aaa" },
      { "id": "d", "text": "link link link" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "first-page-q4",
    "question": "What should you verify in the browser?",
    "options": [
      { "id": "a", "text": "CSS loads, image appears, link works and spacing looks intentional" },
      { "id": "b", "text": "Only the file name color" },
      { "id": "c", "text": "Only the desktop wallpaper" },
      { "id": "d", "text": "Only the browser download folder" }
    ],
    "correctOptionId": "a"
  },
  {
    "id": "first-page-q5",
    "question": "What is the main goal of this exercise?",
    "options": [
      { "id": "a", "text": "Practice the full beginner workflow from files to browser preview" },
      { "id": "b", "text": "Build a production SaaS app immediately" },
      { "id": "c", "text": "Skip HTML and only use JavaScript" },
      { "id": "d", "text": "Configure billing settings" }
    ],
    "correctOptionId": "a"
  }
]$$::jsonb
where course_id = '10000000-0000-4000-8000-000000000001'
  and slug = 'exercise-create-your-first-page';
