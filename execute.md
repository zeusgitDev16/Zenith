# Taskflow: React + Zustand Learning Execution Plan

## 1. Purpose and end goal

We will build **Taskflow**, a small project and task-management application inspired by Jira Service Management. Its purpose is not to clone Jira; it is to give every React, DOM, rendering, component-composition, CSS, and Zustand concept a practical home.

The finished application will let a user:

- create projects;
- create, edit, move, filter, and delete tasks;
- view a project board and task details;
- assign a task, set priority/status, and add comments;
- persist local demo data; and
- eventually replace the local repository with an API without rewriting the UI.

The learning rule is **one concept, one visible reason**. We only introduce an abstraction when the current implementation gives us a concrete reason to need it.

## 2. The “Lego blocks” separation-of-concerns model

Each level has one job and composes the level below it. A parent coordinates its children; it does not duplicate their internal work.

```text
App shell / route page
  └─ Feature (project board)
       └─ Feature section (board column)
            └─ Domain component (task card)
                 └─ Reusable UI primitive (card, badge, button)
                      └─ Native DOM element (button, article, input)
```

| Lego level | Responsibility | Example | Must not do |
| --- | --- | --- | --- |
| Native DOM | Semantics and browser behavior | `<button>`, `<form>`, `<dialog>` | Know application state |
| UI primitive | Reusable visual/interaction building block | `Button`, `Input`, `Modal`, `Badge` | Know what a “task” is |
| Domain component | Render one business concept | `TaskCard`, `ProjectAvatar` | Fetch/own the whole page state |
| Feature component | Coordinate a user capability | `TaskList`, `TaskEditor`, `BoardColumn` | Become a global component bucket |
| Page | Arrange a screen and route-level data | `ProjectBoardPage` | Contain every small visual detail |
| Store / repository | State transitions and data access | `taskStore`, `taskRepository` | Render JSX |

### Component boundaries checklist

Before making a new component, answer these questions:

1. Does it represent a meaningful UI concept or only a single wrapper? Keep trivial one-off markup in its parent.
2. Can its parent describe it with a short API? Example: `<TaskCard task={task} onOpen={...} />`.
3. Is it reusable outside the current feature? If yes, move it to `shared/ui`; otherwise keep it beside its feature.
4. Who owns the state? Put state at the lowest common parent that needs it. Do not put temporary input/modal state into Zustand by default.
5. Does it need browser semantics? Start with semantic HTML before reaching for `div` and ARIA attributes.

## 3. Target file structure

Start with the folders needed for the first feature. Grow into the full structure below as each milestone earns it.

```text
src/
  app/
    App.jsx                    # app composition and route switch (initially)
    providers.jsx               # future global providers only
    routes.jsx                  # introduced when React Router is added
    styles/
      globals.css
      tokens.css

  pages/
    DashboardPage/
      DashboardPage.jsx
      DashboardPage.module.css
    ProjectBoardPage/
      ProjectBoardPage.jsx
      ProjectBoardPage.module.css

  features/
    projects/
      components/
        ProjectList.jsx
        ProjectForm.jsx
      hooks/
        useProjectActions.js
      project.store.js
      project.selectors.js
      project.types.js           # add when moving to TypeScript
    tasks/
      components/
        TaskCard.jsx
        TaskCard.module.css
        TaskList.jsx
        TaskEditor.jsx
        TaskFilters.jsx
        BoardColumn.jsx
      hooks/
        useTaskFilters.js
      task.store.js
      task.selectors.js
      task.types.js
      task.utils.js

  entities/                     # shared domain concepts, added only when reused
    user/
      components/UserAvatar.jsx
      user.types.js

  shared/
    ui/                         # app-wide, domain-agnostic Lego blocks
      Button/
        Button.jsx
        Button.module.css
      Input/
        Input.jsx
      Modal/
        Modal.jsx
      Badge/
        Badge.jsx
    hooks/
      useLocalStorage.js
    lib/
      id.js
      date.js
      constants.js

  data/
    repositories/
      taskRepository.js         # local persistence/API boundary
      projectRepository.js
    seed/
      initialData.js

  main.jsx
```

### Placement rules

- `features/tasks` owns task-specific UI, task state, selectors, and task behavior.
- `pages` composes features into a screen. It should stay thin.
- `shared/ui` is visual and generic. `TaskCard` never belongs there because it understands a task.
- `entities` is for a domain model shared by multiple features, such as `user`; do not create it pre-emptively.
- `data/repositories` hides whether data is mock, `localStorage`, or an HTTP API.
- Keep a component’s CSS, test, and story next to that component when they exist.
- Avoid a catch-all `components/`, `utils/`, or `stores/` folder at the app root. They obscure ownership as the app grows.

## 4. State architecture: choose the right home

```text
Server / durable data       repository → Zustand store → feature UI
Shared client UI state      Zustand store → relevant feature UI
Page-local UI state         page component → child components via props
Ephemeral component state   component useState/useReducer
Derived values              selector or pure function; never duplicated state
```

Examples:

| State | Correct home | Why |
| --- | --- | --- |
| `tasks` and `projects` | Zustand | Multiple features/pages read and update them |
| currently selected project ID | Zustand or URL | It is shared; use URL once routing/deep links matter |
| task-form input values | `useState`/`useReducer` in `TaskEditor` | It is transient and only the form needs it |
| whether one card’s menu is open | `useState` in that card | Global state would add needless coupling |
| filtered task list | selector/pure function | It can be calculated from tasks + filters |
| theme preference | small UI Zustand store + persistence | It is app-wide and durable |

### Zustand rules

1. Prefer **small feature stores**, not one giant `useAppStore`.
2. Store data and intentional actions together: `createTask`, `updateTask`, `moveTask`, `deleteTask`.
3. Components should select the smallest value they need, rather than subscribing to an entire store.
4. Build derived data with selectors. Never save `completedTaskCount` if it can be calculated from `tasks`.
5. Do not put JSX, DOM nodes, event objects, promises, or local form state in a store.
6. Keep `set` calls inside store actions; components request an action rather than manually mutating state shape.
7. Use immutable updates. Existing objects/arrays are replaced, never changed in place.
8. Add `persist` only after the in-memory version works; persist only the serializable fields that should survive reload.
9. Use the `devtools` middleware during learning to inspect each named action.

Illustrative store shape:

```js
// features/tasks/task.store.js
import { create } from 'zustand'

export const useTaskStore = create((set) => ({
  tasks: [],
  createTask: (draft) => set((state) => ({
    tasks: [...state.tasks, { id: crypto.randomUUID(), status: 'todo', ...draft }],
  }), false, 'tasks/create'),
  moveTask: (taskId, status) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task,
    ),
  }), false, 'tasks/move'),
}))
```

The component reads only what it needs:

```js
const moveTask = useTaskStore((state) => state.moveTask)
```

Use a selector for a column’s tasks:

```js
export const selectTasksByProjectAndStatus = (projectId, status) => (state) =>
  state.tasks.filter((task) => task.projectId === projectId && task.status === status)
```

## 5. Learning milestones and build order

### Phase 0 — Foundation: the browser, Vite, and React entry point

**Build:** Replace the Vite demo with one static Taskflow screen.

**Learn:** `index.html`, the root DOM node, `main.jsx`, `createRoot`, JSX compilation, JSX versus HTML attributes, CSS imports, and Vite HMR.

**Practice:** Inspect Elements in browser DevTools. Change markup, then identify the matching DOM nodes. Use semantic landmarks: `header`, `nav`, `main`, `aside`, `section`, and `footer`.

**Done when:** You can explain how `main.jsx` turns `<App />` into browser DOM.

### Phase 1 — Static composition and component contracts

**Build:** A static dashboard with `AppShell`, `Sidebar`, `TopBar`, `ProjectList`, `TaskBoard`, `BoardColumn`, and `TaskCard`.

**Learn:** imports/exports, props, children, arrays of data, `map`, list `key`, one-way data flow, and semantic component boundaries.

**Exercise:** Start with all markup in `App`, then extract in this order: `TaskCard` → `BoardColumn` → `TaskBoard` → shell. Write each component API before extracting it.

**Done when:** `TaskBoard` can render a supplied `tasks` array and has no hard-coded task text.

### Phase 2 — Local interaction and React rendering

**Build:** Add task creation, a task details panel, status filtering, and empty states.

**Learn:** `useState`, controlled inputs, `onSubmit`, `preventDefault`, lifting state, conditional rendering, event bubbling, render snapshots, batching, and immutability.

**Exercise:** Explain why `setTasks([...tasks, task])` causes a re-render but `tasks.push(task)` does not give React a new array reference.

**Done when:** Local state lives in the lowest common component, and a child asks for changes through callbacks instead of mutating props.

### Phase 3 — Forms, accessibility, and browser behavior

**Build:** `TaskEditor` for create/edit, validation messages, accessible modal/drawer, and keyboard-close behavior.

**Learn:** `label` + `htmlFor`, input name/value, focus management, forms vs buttons, native validation, ARIA only where native HTML is insufficient, dialogs, CSS focus states, and portal motivation.

**Exercise:** Navigate the entire form with a keyboard and test it with the browser accessibility tree.

**Done when:** Every input has a label, errors are announced appropriately, and the modal’s focus behavior is intentional.

### Phase 4 — Introduce Zustand for shared task state

**Build:** Move tasks/projects from the page into `task.store.js` and `project.store.js`; keep the editor’s draft local.

**Learn:** `create`, selectors, actions, subscriptions, immutable transitions, store slices by feature, and why Zustand does not replace component state.

**Exercise:** First make the store too broad (`const store = useTaskStore()`), observe re-renders with React DevTools, then replace it with narrow selectors.

**Done when:** Multiple components update/read tasks without prop drilling, while temporary UI state remains local.

### Phase 5 — Derived state, selectors, and rendering performance

**Build:** Project-based filtering, task counts per column, search, sorted tasks, and memoized expensive computations only where measured as useful.

**Learn:** source versus derived state, selector design, referential equality, `useMemo`, `useCallback`, `React.memo`, and avoiding premature optimization.

**Exercise:** Deliberately store a derived count, observe it become stale, then remove it and calculate it from the source tasks.

**Done when:** A task update only re-renders UI that subscribed to changed data, as verified in React DevTools’ profiler.

### Phase 6 — Navigation and page composition

**Build:** Dashboard and project board pages; introduce React Router when there are at least two screens. Place the selected project in the URL.

**Learn:** routes, params, nested layouts, links vs buttons, loading/not-found states, URL state, and page-level composition.

**Done when:** Refreshing `/projects/:projectId` opens the same project and the page remains a thin composer.

### Phase 7 — Persistence and data boundary

**Build:** A repository backed by `localStorage`, seed data, loading/error states, and Zustand persistence where appropriate.

**Learn:** serialization, hydration, async actions, repository pattern, data migration, error handling, and the separation of server state from UI state.

**Done when:** Replacing `localStorage` with `fetch` requires changing the repository, not `TaskCard` or `TaskBoard`.

### Phase 8 — System hardening

**Build:** Design tokens, reusable primitives, dark mode, tests, error boundaries, optimistic update discussion, and an optional mock API.

**Learn:** CSS custom properties, responsive layout, test pyramid, unit/component/integration tests, stable IDs, linting, formatting, and production build inspection.

**Done when:** The app is explainable: every file has clear ownership, every state value has a justified home, and core user flows are tested.

## 6. How a large component is built safely

Build `ProjectBoardPage` using this progression:

```text
ProjectBoardPage
  ├─ ProjectHeader
  │   ├─ Breadcrumbs
  │   └─ ProjectActions
  ├─ BoardToolbar
  │   ├─ SearchInput
  │   └─ TaskFilters
  └─ TaskBoard
      └─ BoardColumn (repeated for each status)
          ├─ ColumnHeader
          ├─ TaskCard (repeated for each task)
          │   ├─ PriorityBadge
          │   └─ UserAvatar
          └─ AddTaskButton
```

1. Implement it once as static markup.
2. Replace repeated markup with data + `.map`; give each sibling a stable ID-based `key`, never an array index for mutable task lists.
3. Extract the smallest repeated or conceptually independent unit (`TaskCard`).
4. Give the extracted unit data props and event callbacks; never let it reach upward into its parent’s local state.
5. Extract the repeated container (`BoardColumn`).
6. Add behavior locally first. Lift only state truly shared by siblings.
7. Move cross-feature state to Zustand only after it crosses the component tree or page boundary.
8. Test the smallest blocks, then the feature composition, then the whole flow.

## 7. Naming and API conventions

- Use `PascalCase` for React components and component folders: `TaskCard/TaskCard.jsx`.
- Use `camelCase` for hooks, utilities, selectors, and actions: `useTaskStore`, `formatDate`, `selectTaskById`.
- Name handlers by intent: `handleSubmit`, `handleClose`, `onTaskOpen`, not `clickHandler`.
- Components receive nouns/data and callbacks: `task`, `projectId`, `onSave`; stores expose verbs: `createTask`, `archiveProject`.
- Prefer explicit props over “magic” context. Use context for stable cross-tree dependencies such as theme or router, not as a replacement for all props.
- Keep one primary exported component per component file. Co-locate private helper components when they are genuinely private.

## 8. Deliberate anti-patterns to recognize

| Avoid | Better direction |
| --- | --- |
| A mega `App.jsx` | Extract by responsibility as repetition/complexity appears |
| One global store for everything | Feature stores and local state |
| Copying props into state | Derive it, or make a deliberate editable draft |
| Storing filtered lists/counts | Derive from canonical state with selectors |
| Index keys in reorderable task lists | Stable task IDs |
| `div` buttons and clickable cards without keyboard handling | Native buttons/links and semantic structure |
| Reusable component with dozens of boolean props | Compose smaller primitives or use focused variants |
| `useMemo`/`React.memo` everywhere | Measure first; keep render logic simple |
| Direct `localStorage` calls in UI components | Repository or persistence boundary |
| CSS files that style unrelated features | Co-located styles plus global tokens/reset only |

## 9. Definition of done for every increment

- The new behavior works at narrow and mobile widths.
- Keyboard interaction and focus make sense.
- State has one source of truth and is immutable.
- The component’s input/output contract is understandable from its props.
- No domain component is placed in `shared/ui`.
- No duplicated derived state was added.
- Empty, loading, and error states are considered when data is asynchronous.
- `npm run lint` and `npm run build` pass before considering the increment complete.

## 10. First implementation slice

Do this before installing Zustand or a router:

1. Replace the Vite demo in `App.jsx` with static Taskflow markup.
2. Create `features/tasks/components/TaskCard.jsx` and render it from a hard-coded task array.
3. Extract `BoardColumn`, then `TaskBoard`.
4. Add a small `shared/ui/Button` only after two parts of the screen need the same button behavior/style.
5. Add a controlled “Create task” form with `useState` in the closest suitable parent.
6. Only then install Zustand and migrate the shared task collection into `features/tasks/task.store.js`.

At each step, pause to inspect the DOM and React DevTools. The goal is to understand what React renders and why, not merely to make the screen look complete.
