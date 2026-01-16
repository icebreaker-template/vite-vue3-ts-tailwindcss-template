# Design: useTemplateRef examples

## Goal

Create a dedicated page that showcases multiple useTemplateRef usage patterns with small, focused Vue components.

## Non-goals

- No production feature logic beyond the examples.
- No global state or shared services.

## Architecture

- Add a new page at `src/pages/template-ref.vue` (auto-routes will expose `/template-ref`).
- Add a container component `src/components/TemplateRefExamples.vue` to organize the layout.
- Add 5 example components under `src/components/template-ref/`, one per use case.

## Components

- DomFocusExample: focus or scroll an element referenced by useTemplateRef.
- MeasureBoxExample: read `getBoundingClientRect()` on mount and display size.
- ExposeChildExample: parent uses useTemplateRef to call child `defineExpose` methods.
- ListRefsExample: `v-for` refs with array access and guarded operations.
- ConditionalRefExample: `v-if` toggling where ref becomes null when hidden.

## Data Flow and Behavior

Each example uses `useTemplateRef('key')` with a matching `ref="key"` in the template. The returned readonly ref is only read, never assigned. Event handlers guard against `null` before using DOM APIs or component methods. The measurement example reads values after mount (and optionally after `nextTick`) and stores them in local reactive state for display. The list example treats the ref value as an array and checks length before indexing. The conditional example toggles `v-if` and shows how ref availability changes.

## Error Handling

- Guard all handlers with null checks.
- For ResizeObserver usage (if added), check availability and clean up on unmount.

## Testing

Optional. If added, use Vue Test Utils + Vitest to assert that handlers update local state and do not throw when refs are null. Avoid asserting exact pixel values in JSDOM.

## Open Questions

- Add navigation link from `src/pages/index.vue` to `/template-ref`?
