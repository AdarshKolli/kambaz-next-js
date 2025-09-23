import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <ul>
        <li>
          <Link href="/Labs/Lab1">Lab 1</Link>
        </li>
        <li>
          <Link href="/Labs/Lab2">Lab 2</Link>
        </li>
        <li>
          <Link href="/Labs/Lab3">Lab 3</Link>
        </li>
      </ul>
    </div>
  );
}
