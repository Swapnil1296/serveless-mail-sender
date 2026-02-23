# FormattedText Component

A React component that renders structured text with colored headings, labels, code blocks, and decorative HTML. Used for displaying interview question answers and educational content in a user-friendly, visually organized way.

---

## Props

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | The content to render. Supports special formatting patterns (see below). |
| `contentType` | `"html"` \| `undefined` | When `"html"`, extracts and renders code blocks from `<code class="language-XXX">...</code>`. Otherwise uses default text processing. |

---

## Formatting Patterns

### When to Use What

| Use Case | Pattern | Visual Result |
|----------|---------|---------------|
| **Section headings** | Line ending with `:` | **Cyan**, bold, larger margin |
| **Questions** | Line ending with `?` | **Amber** |
| **Numbered items with labels** | `1.   Label  :` | Number (emoji on desktop) + **green** label |
| **Bullet items with labels** | `   -   Label  :` | Bullet + **emerald** label |
| **Emphasis / key terms** | `<b>`, `<mark>`, `<strong>`, etc. | Bold, highlight, italic, etc. |
| **Code blocks** | Wrapped in triple backticks ` ``` ` | Syntax-highlighted code block |
| **Standalone digits** | Single digits `1`–`9` | Emoji numbers (desktop only) |

---

## 1. Section Headings

Any line that **ends with a colon** (`:`) is styled as a heading.

**Style:** Cyan, semibold, monospace, extra top margin

**Example:**
```
       Architecture (The How):
Web servers spend most of their time waiting...
```

Or:
```
Why Event-Driven, Non-Blocking I/O?
Traditional blocking I/O would tie one thread per connection...
```

---

## 2. Questions

Lines ending with `?` are styled as questions.

**Style:** Amber

**Example:**
```
What is the difference between API Gateway and Load Balancer?
```

---

## 3. Numbered Subtopics

Format: `N.   Label  :` (number, spaces, label, spaces, colon)

**Regex:** `^(\d+\.)(\s*)([^:]+)(:)(.*)`

**Style:** The **label** part (before the colon) is rendered in **green** (text-green-400). On desktop, standalone digits in the number become emoji (1️⃣, 2️⃣, etc.).

**Example:**
```
1.   Purpose  :
   - Primarily used to manage, route, and secure API requests.

2.   Functions  :
   -   Request Routing  : Directs API calls to appropriate backend services.
```

---

## 4. Bullet Subtopics

Format: `   -   Label  : Description` (spaces, hyphen, spaces, label, colon, description)

**Regex:** `^(-\s*)([a-zA-Z\s]+)(:)(.*)`

**Style:** The **label** part (letters and spaces before the colon) is rendered in **emerald** (text-emerald-500).

**Example:**
```
   -   Request Routing  : Directs API calls to appropriate backend services.
   -   Authentication and Authorization  : Enforces security policies.
   -   Rate Limiting and Throttling  : Controls the rate at which consumers can call the APIs.
```

---

## 5. Decorative HTML Tags

Use inline HTML for emphasis. Supported tags:

| Tag | Use For | Result |
|-----|---------|--------|
| `<b>`, `<strong>` | Bold | **Bold text** |
| `<i>`, `<em>` | Italic | *Italic text* |
| `<mark>` | Highlight | <mark>Highlighted</mark> |
| `<u>` | Underline | Underlined |
| `<s>`, `<del>` | Strikethrough | ~~Strikethrough~~ |
| `<ins>` | Inserted | Underlined |
| `<sub>` | Subscript | Subscript |
| `<sup>` | Superscript | Superscript |
| `<small>` | Smaller text | Smaller text |

**Example:**
```
Node.js embeds Google's <b>V8</b>—Chrome's JavaScript engine.
It's a <mark>single-threaded loop</mark> that continuously checks for work.
Use <strong>Worker Threads</strong> for CPU-intensive tasks.
```

---

## 6. Code Blocks

Wrap code in triple backticks. Optionally specify language on the first line.

**Format:**
````
```
javascript
const x = 42;
console.log(x);
```
````

**Supported languages:** `javascript`, `typescript`, `json`, `bash`, etc. (passed to CodeBlock). Default is `javascript` if omitted.

**Example:**
```
Here's how to use it:

```
const crypto = require('crypto');
crypto.pbkdf2('password', 'salt', 100000, 64, 'sha512', (err, key) => {
  console.log('Done');
});
```
```

---

## 7. Standalone Digits (Desktop Only)

Single digits `0`–`9` as whole words are converted to emoji numbers on desktop (e.g., 1 → 1️⃣). Skipped on mobile for performance.

---

## 8. Paragraph and Line Structure

- **Paragraphs:** Split by `\n\n` (blank line).
- **Lines within a paragraph:** Split by `\n`.
- Use `\r\n` or `\n` for line breaks in JSON/string content.

---

## Full Example (JSON Answer Format)

```json
{
  "answer": "API Gateways and Load Balancers are both critical components. Here's a breakdown:\r\n\r\n       API Gateway\r\n1.   Purpose  :\r\n   - Primarily used to manage, route, and secure API requests.\r\n   - Handles request routing, protocol translation, rate limiting.\r\n\r\n2.   Functions  :\r\n   -   Request Routing  : Directs API calls to appropriate backend services.\r\n   -   Authentication and Authorization  : Enforces security policies.\r\n\r\n       Load Balancer\r\n1.   Purpose  :\r\n   - Distributes incoming traffic across multiple servers.\r\n\r\n       Key Differences\r\n   -   Scope  : API Gateways focus on API management. Load Balancers focus on traffic distribution."
}
```

**Rendered:**
- "API Gateway" and "Load Balancer" as section headers
- "1. Purpose" and "2. Functions" with green labels
- "Request Routing", "Authentication and Authorization" in emerald
- "Scope" in emerald under Key Differences

---

## contentType="html"

When `contentType="html"`, FormattedText extracts code blocks from HTML:

```html
Some text here.
<code class="language-javascript">const x = 1;</code>
More text.
```

Code blocks are rendered via `CodeBlock`; surrounding HTML is rendered as-is.

---

## Usage

```jsx
import FormattedText from './helpers/FormattedText';

<FormattedText
  text={question?.answer}
  contentType={question?.contentType}
/>
```
