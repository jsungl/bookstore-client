"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="container text-center">
      <h2>This Page isn't working</h2>
      <p>If the problem is continues, contact the site owner</p>
      <p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
      </p>
      <Link
        href="/"
        className="link-secondary link-underline-opacity-0 link-underline-opacity-75-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
