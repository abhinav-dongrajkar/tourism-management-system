# Tourism Management System (HTML · CSS · JavaScript)

A complete tour-booking website with a user site and an admin panel, built with **only HTML, CSS and JavaScript**.
No server, no PHP, no database to install: all data is stored in the browser's **localStorage**.

Converted from the original PHP/MySQL project. It looks and behaves the same, but runs as a static site, so it deploys anywhere (Vercel, GitHub Pages, Netlify).

## Live demo

Add your Vercel link here after deploying: `https://your-project.vercel.app`

## Demo logins

| Role  | Where | Username / Email | Password |
|-------|-------|------------------|----------|
| User  | Sign In on the home page | `test@gmail.com` | `Test@123` |
| Admin | `/admin/` | `admin` | `Test@123` |

You can also register a new user from the **Sign Up** button.

## Features

**User site**
- Browse tour packages and view details
- Sign up, sign in, forgot/change password, edit profile
- Book a package, view tour history, cancel a booking (not within 24 hours of the trip)
- Raise help tickets and see the admin's replies
- Send enquiries, read About / Privacy / Terms / Contact pages

**Admin panel**
- Dashboard with live counts
- Create, edit, delete packages and upload package images
- Manage users and their bookings, confirm or cancel bookings
- Reply to issue tickets, mark or delete enquiries
- Edit the About / Privacy / Terms / Contact pages with a rich-text editor
- Profile and password settings
- Dashboard "Data tools": download a JSON backup, restore it, or reset to demo data

## How the data works

- The first visit loads demo data from `js/seed.js` (exported from the original `tms.sql`) into localStorage under the key `tms_db_v1`.
- Each visitor has their **own private copy** in their own browser. Changes are not shared between people and are not visible to you after deploying.
- Clearing the browser's site data resets everything to the demo data.
- Uploaded package images are resized and stored in localStorage (browser limit is about 5 MB).
- Passwords are MD5 hashes, matching the original. This is a front-end demo, not secure for real users.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel

1. Push this folder to a GitHub repository (the files must be at the repo root).
2. On [vercel.com](https://vercel.com) choose **Add New → Project** and import the repository.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty, then click **Deploy**.

The admin panel will be at `https://your-project.vercel.app/admin/`.

## Project structure

```
index.html, package-list.html, ...   Public site pages
admin/                               Admin panel (admin/index.html is the login)
css/, admin/css/                     Stylesheets (Bootstrap 3 + original theme)
js/db.js                             localStorage "database" (replaces PHP + MySQL)
js/common.js                         Header, footer and sign-in/up pop-ups for the public site
js/seed.js                           Initial demo data
admin/js/admin.js                    Admin layout and helpers
images/, admin/pacakgeimages/        Images
```

## Tech

HTML5, CSS3, JavaScript (ES5), jQuery 1.12 / 2.1, Bootstrap 3, WOW.js, nicEdit.

## License

For learning and demo use. Original template and sample content belong to their respective authors.
