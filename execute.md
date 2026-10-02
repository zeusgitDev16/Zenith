# Taskflow: React + Zustand Learning Execution Plan

## 1. Purpose and end goal

We are building **Taskflow**, a small project and task-management app inspired by Jira Service Management. The point is not to clone Jira; it is to make React, the DOM, rendering, component composition, CSS, TypeScript, and Zustand practical.

The finished app will let users create projects and tasks, view a project board, edit/move/filter tasks, assign people, and persist demo data. The learning rule is: **one concept, one visible reason**. Add an abstraction only when the current implementation demonstrates a real need.

## 2. The Lego-block separation-of-concerns model

Each level owns one kind of responsibility and composes the level below it.

```text
App shell / route page
  -> Feature (project board)
       -> Feature section (board column)
            -> Domain component (task card)
                 -> Generic UI primitive (badge, button, input)
                      -> Native DOM element (article, button, form)
```

| Level | Responsibility | Example | Must not do |
| --- | --- | --- | --- |
| Native DOM | Semantics and browser behavior | `button`, `form`, `input` | Know application data |
| UI primitive | Generic visual/interaction building block | `Button`, `Input`, `Modal` | Know what a task is |
| Domain component | Render one business concept | `TaskCard`, `UserAvatar` | Own the full page state |
| Feature component | Coordinate a user capability | `TaskList`, `TaskEditor`, `BoardColumn` | Become a global component bucket |
| Page | Arrange one route/screen | `ProjectBoardPage` | Contain every visual detail |
| Store/repository | State transitions and data access | `task.store`, `taskRepository` | Render JSX |

Before creating a component, ask whether it is a meaningful UI concept, whether it has a small readable API, whether it is generic or domain-specific, what the lowest owner of its state is, and whether semantic HTML handles the need first.

## 3. Current codebase structure and next ownership steps

The repository is already a TypeScript Vite application. Zustand, Tailwind v4, shadcn configuration, Base UI, CVA, and Lucide are installed. The tree below reflects the files that exist now. **Scaffold** means the file is present but empty, ready to be filled when that layer is needed.

```text
src/
  main.tsx                         # mounts <App /> inside StrictMode
  vite-env.d.ts

  app/
    App.tsx                        # current composition: Navbar + LandingPage
    providers.tsx                  # scaffold: future app-wide providers
    routes.tsx                     # scaffold: future routes
    styles/
      globals.css                  # Tailwind import and global styles
      tokens.css                   # scaffold: design tokens

  pages/
    LandingPage/LandingPage.tsx    # current active page
    DashboardPage/DashboardPage.tsx # scaffold
    ProjectBoardPage/ProjectBoardPage.tsx # scaffold

  features/
    landing/components/FeaturesSection.tsx
    tasks/                         # scaffold task feature boundary
      components/
        TaskCard.tsx
        TaskList.tsx
        TaskEditor.tsx
        TaskFilters.tsx
        BoardColumn.tsx
      hooks/useTaskFilters.ts
      task.store.ts
      task.selectors.ts
      task.types.ts
      task.utils.ts
    projects/                      # scaffold project feature boundary
      components/ProjectList.tsx
      components/ProjectForm.tsx
      hooks/useProjectActions.ts
      project.store.ts
      project.selector.ts
      project.types.ts

  entities/user/
    components/UserAvatar.tsx
    user.types.js

  shared/
    ui/                            # generic, domain-agnostic UI blocks
      Button/Button.tsx
      Input/Input.tsx
      Badge/Badge.tsx
      Modal/Modal.tsx
      Sheet/sheet.tsx
      Navbar/Navbar.tsx
      MobileMenu/MobileMenu.tsx
    hooks/
      useLandingAuth.ts            # active LandingPage UI/form state
      useLocalStorage.ts
      useScrollDirection.ts
    lib/id.ts
    lib/date.ts
    lib/constants.ts
    helper/navbarSmoothAnchor/handleScrollTo.ts
    Icons/CheckIcon.tsx

  data/
    content/                       # static landing-page copy/configuration
      landing.data.ts
      navigation.data.ts
      features.data.ts
    seed/initialData.ts             # scaffold
    repositories/
      taskRepository.ts             # scaffold
      projectRepository.ts          # scaffold

  lib/utils.ts                      # shadcn `cn` utility
  store/useAuthStore.ts             # active global auth Zustand store
```

Project-root conventions already in place:

- `tsconfig.json` enables strict TypeScript and maps `@/*` to `src/*`.
- `components.json` maps shadcn aliases to `shared/ui`, `shared/lib`, and `shared/hooks`.
- Styling is Tailwind-first, not CSS-module-first.

### What to keep, fill, and move

| Current area | Current role | Next action |
| --- | --- | --- |
| `app/App.tsx` | Landing screen composition | Keep thin. Use `app/routes.tsx` when at least two real pages can be navigated to. |
| `pages/LandingPage` + `features/landing` | Active landing/sign-in experience | Keep temporary form state in `useLandingAuth`; extract only repeated landing sections. |
| `shared/ui` | Generic visual building blocks | Reuse `Button`, `Input`, `Modal`, `Sheet`, and `Badge`; never put `TaskCard` here. |
| `features/tasks` | Empty task feature boundary | Fill next: types -> seed data -> store/selectors -> components. |
| `features/projects` | Empty project feature boundary | Fill after task types establish the `projectId` relationship. |
| `data/content` | Static display copy | Keep it for copy/configuration, not user-mutable task data. |
| `data/seed` and `data/repositories` | Empty data boundary | Start with seeded in-memory data; add `localStorage` after the in-memory flow works. |
| `store/useAuthStore.ts` | Global auth state outside a feature | Keep it while learning. If auth grows, move it intact to `features/auth/auth.store.ts`; never create a duplicate store. |
| `entities/user/user.types.js` | Shared user model | Rename to `user.types.ts` when next edited, to make domain types consistently TypeScript. |

### Placement rules for this repository

- New task code belongs in the existing `features/tasks` scaffold; project code belongs in `features/projects`.
- A page composes features. `ProjectBoardPage` coordinates the page; `TaskCard` remains task-owned.
- `shared/ui` is domain-free. A component importing `Task`, `Project`, or a task status is not shared UI.
- Follow the existing Tailwind/global-token approach. Do not add CSS modules just because another architecture uses them.
- Keep `project.selector.ts` for now, or rename it to `project.selectors.ts` only in a deliberate cleanup that updates all imports.
- Do not fill all scaffolds at once. A file earns its implementation when its immediately preceding layer needs it.

## 4. State architecture: choose the right home

```text
Durable/demo data          repository -> Zustand feature store -> feature UI
Shared client/UI state     Zustand store -> relevant feature UI
Page-local UI state        page component -> child props/callbacks
Ephemeral component state  useState/useReducer in the component
Derived values             selector or pure function; never duplicated state
```

| State | Best home | Why |
| --- | --- | --- |
| Tasks and projects | Zustand feature stores | Several components/pages will read and update them |
| Authentication | Existing `useAuthStore` | It is global and already implemented |
| Landing email, invite code, selected role tab | `useLandingAuth` | Temporary state used only by the landing screen |
| One card's open menu | `useState` in that card | Global state would add coupling |
| Filtered task list and column counts | Selector/pure function | They are calculated from canonical tasks/filters |
| Selected project ID | URL once routes exist | It enables refresh and deep links |

### Zustand rules

1. Prefer small feature stores over one `useAppStore`.
2. Keep state and intentional actions together: `createTask`, `updateTask`, `moveTask`, `deleteTask`.
3. Subscribe to the smallest selected value needed by a component.
4. Derive filtered lists/counts from source state. Never store duplicates.
5. Do not store JSX, DOM nodes, event objects, or local form drafts.
6. Keep `set` calls in named store actions; components request transitions.
7. Use immutable array/object updates.
8. Add persistence only after in-memory behavior is correct.

## 5. Learning milestones and build order from today

### Completed foundation - Vite, TypeScript, Tailwind, and landing composition

**Current evidence:** `main.tsx` mounts `App` in `StrictMode`; `App` composes `Navbar` and `LandingPage`; static content is separated into `data/content`; local form/tab state is in `useLandingAuth`; the auth store exists.

**Practice now:** Inspect the LandingPage DOM in DevTools. Identify which state update re-renders the role panels, inputs, and button handlers. Notice that `useLandingAuth` is deliberately local rather than global.

### Next slice - model the task domain before rendering it

**Build:** Fill `task.types.ts`, `project.types.ts`, and `data/seed/initialData.ts` with a small typed set of projects and tasks.

**Learn:** Type aliases/interfaces, unions for `TaskStatus` and priority, relationships through `projectId`, arrays, and stable IDs.

**Done when:** Seed tasks type-check and each has a valid project ID, status, priority, title, and ID.

### Task state slice - make the existing Zustand scaffold real

**Build:** Implement `task.store.ts`, `project.store.ts`, and selectors. Initialize them from seed data. Keep the editor's draft local later.

**Learn:** `create`, typed store actions, immutable updates, narrow selectors, and derived state.

**Done when:** Moving one task changes canonical task state; columns and counts derive from it.

### Board composition slice - fill feature components bottom-up

**Build in this exact order:** `TaskCard` -> `BoardColumn` -> `TaskList` -> `ProjectBoardPage`.

**Learn:** props, callback contracts, `.map`, stable keys, parent-child data flow, conditional rendering, semantic `article`/`button`/`section` choices, and empty states.

**Done when:** `ProjectBoardPage` is a thin composer and task components do not import the project page.

### Form slice - create and edit tasks

**Build:** Fill `TaskEditor.tsx`; render it in the existing `Modal` or `Sheet` primitive.

**Learn:** controlled forms, `onSubmit`, `preventDefault`, validation, labels, focus, local `useState` versus Zustand state, and callback ownership.

**Done when:** A form draft is local and only successful submission calls the task-store action.

### Project/navigation/persistence slice

**Build:** Fill `ProjectList`, `ProjectForm`, and `DashboardPage`; then add routes to the dashboard and `/projects/:projectId`. Finally fill repositories with local persistence and add loading/error states.

**Done when:** Refreshing a project URL keeps the user on the same board, and replacing `localStorage` with an API changes repository/store code rather than task UI.

## 6. How the future ProjectBoardPage should nest components

```text
ProjectBoardPage
  -> ProjectHeader
  -> BoardToolbar
       -> TaskFilters
       -> Button (open TaskEditor)
  -> TaskList
       -> BoardColumn (one per status)
            -> TaskCard (one per task)
                 -> Badge
                 -> UserAvatar
  -> Modal or Sheet
       -> TaskEditor
```

Build it safely:

1. Start with typed seed data, not hard-coded JSX task text.
2. Render repeated data with `.map` and stable ID keys, never indexes for mutable task lists.
3. Implement the smallest domain block, `TaskCard`, before its container.
4. Give children data props and callbacks. A child never mutates a parent prop.
5. Extract the repeated container, `BoardColumn`, then let `TaskList` coordinate its repeated columns.
6. Put cross-column task transitions in the task store, but keep modal-open and form-draft state local until genuinely shared.
7. Test a block, then feature composition, then the full task-creation/move flow.

## 7. Naming and API conventions

- Use `PascalCase` for components and folders: `TaskCard/TaskCard.tsx`.
- Use `camelCase` for hooks, utilities, selectors, and store actions: `useTaskStore`, `formatDate`, `selectTaskById`.
- Name handlers by intent: `handleSubmit`, `handleClose`, `onTaskOpen`.
- Components receive nouns/data and callbacks: `task`, `projectId`, `onSave`; stores expose verbs: `createTask`, `archiveProject`.
- Prefer explicit props over context. Context is suitable for stable cross-tree dependencies, not as a replacement for every prop.

## 8. Anti-patterns to recognize

| Avoid | Better direction |
| --- | --- |
| A mega `App.tsx` | Keep it as thin application composition |
| A task component in `shared/ui` | Keep it under `features/tasks` |
| One global store for all state | Feature stores plus local state |
| Copying props into state | Derive it, or create an explicit editable draft |
| Storing filtered lists/counts | Derive with selectors |
| Index keys for tasks | Stable task IDs |
| Clickable `div` elements | Native buttons/links and semantic structure |
| Direct persistence calls in UI components | Repository boundary |
| Filling empty architectural files before need | Implement in dependency order |

## 9. Definition of done for every increment

- The behavior works at narrow and wide widths.
- Keyboard interaction and focus behavior are intentional.
- Each state value has one source of truth and is immutable.
- The component contract is understandable from its props.
- Domain components stay out of `shared/ui`.
- No duplicated derived state is added.
- Empty, loading, and error states are considered for asynchronous work.
- `npm run lint` and `npm run build` pass.

## 10. Immediate implementation checklist

Do not reinstall Zustand or create a second Vite/React structure: both the dependency and the intended task/project scaffolds already exist.

1. Define task and project types in the existing `features/*/*.types.ts` files.
2. Add a minimal typed project/task fixture to `data/seed/initialData.ts`.
3. Implement `task.store.ts` with read, create, update, move, and delete actions.
4. Add task selectors in `task.selectors.ts`; keep filtering/counts derived.
5. Build `TaskCard`, `BoardColumn`, then `TaskList` from the existing task components.
6. Compose them in `ProjectBoardPage` using existing generic UI primitives.
7. Add `TaskEditor` with local draft state and submit to the task store.
8. Only after this flow works, fill the project store/dashboard and introduce routes.

At every step, inspect the browser DOM and React DevTools. The goal is to understand why React rendered something, not only to make the screen appear complete.
