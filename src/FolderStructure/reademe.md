## **2️⃣ Folder Structure Conventions**

### ** src folder**

* Main source folder: `src/`
* All React code, assets, and components go here.

```
src/
  components/
  pages/
  hooks/
  services/
  assets/
  styles/
```

---

### ** Components Folder**

* **Folder name:** `components` (lowercase plural)
* **Subfolder for each component:** `PascalCase` (first letter capitalized)

Example:

```
src/components/
  Header/
    Header.jsx
    Header.css
  Footer/
    Footer.jsx
    Footer.css
  MovieCard/
    MovieCard.jsx
    MovieCard.css
```

> **Why PascalCase for component folders/files:**
> React components are always **PascalCase**, and keeping the folder/file names the same makes it easy to locate.

---

### ** Pages Folder**

* **Folder name:** `pages` (lowercase plural)
* **Page component files:** `PascalCase.jsx`

Example:

```
src/pages/
  HomePage.jsx
  MovieDetailsPage.jsx
  AboutUsPage.jsx
```

---

###  Hooks Folder**

* Custom hooks: `hooks/`
* Files: `camelCase` starting with `use`

Example:

```
src/hooks/
  useFetch.jsx
  useFormHandler.jsx
  useDebounce.jsx
```

---

### ** Services / API Folder**

* Folder: `services/` or `api/`
* Files: lowercase with hyphens

Example:

```
src/services/
  movieService.js
  authService.js
```

---

### ** Assets Folder**

* Images, fonts, icons, etc.: `assets/`
* Subfolders by type in lowercase

Example:

```
src/assets/
  images/
    logo.png
    banner.jpg
  icons/
    search.svg
  fonts/
    inter.ttf
```

---

### ** Styles Folder**

* Global styles: `styles/`
* File naming: lowercase or kebab-case

Example:

```
src/styles/
  globals.css
  variables.css
  theme.css
```

---

## **3️⃣ File Naming Conventions**

| File Type        | Convention                    | Example                       |
| ---------------- | ----------------------------- | ----------------------------- |
| React component  | PascalCase                    | `Header.jsx`, `MovieCard.jsx` |
| CSS module       | PascalCase + `.module.css`    | `Header.module.css`           |
| Custom hook      | camelCase starting with `use` | `useFetch.jsx`                |
| Utility function | camelCase                     | `formatDate.js`               |
| Service/API file | lowercase, hyphen-separated   | `auth-service.js`             |
| Constant file    | uppercase                     | `API_URLS.js`                 |

---

## **4️⃣ Example React Project Structure**

```
my-react-app/
├─ public/
│  └─ index.html
├─ src/
│  ├─ assets/
│  │  ├─ images/
│  │  └─ icons/
│  ├─ components/
│  │  ├─ Header/
│  │  │  ├─ Header.jsx
│  │  │  └─ Header.module.css
│  │  └─ Footer/
│  │     ├─ Footer.jsx
│  │     └─ Footer.module.css
│  ├─ pages/
│  │  ├─ HomePage.jsx
│  │  └─ MovieDetailsPage.jsx
│  ├─ hooks/
│  │  ├─ useFetch.jsx
│  │  └─ useFormHandler.jsx
│  ├─ services/
│  │  └─ movieService.js
│  ├─ styles/
│  │  ├─ globals.css
│  │  └─ theme.css
│  ├─ App.jsx
│  └─ index.jsx
├─ package.json
└─ README.md
```

