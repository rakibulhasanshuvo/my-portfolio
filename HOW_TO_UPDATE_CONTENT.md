# How to Update Your Portfolio

I have centralized all the content of your website into one file to make it easy to update.

## The Magic File
📂 **`src/data/profile.ts`**

Everything you see on the screen—text, images, links, projects, testimonials—is in this file.

## How to Edit

1.  Open `src/data/profile.ts` in your editor.
2.  Find the section you want to change (e.g., `about`, `projects`, `social`).
3.  Edit the text inside the quotes.

### Example: Changing your Name
Find this line:
```typescript
name: "Rakibul Hasan Shuvo",
```
Change it to:
```typescript
name: "My New Name",
```

### Example: Adding a Skill
Find the `techStack` section and add a new item:
```typescript
{ name: 'Rust', icon: '🦀' },
```

### Example: Adding a Project
Scroll to the `projects` section and copy-paste an existing project block, then change the details.

## Deployment
Once you save the file, the website updates automatically if you are running it locally.
To publish your changes to the internet, follow the [Deployment Guide](./DEPLOYMENT_GUIDE.md).
