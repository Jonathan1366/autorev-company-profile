import Link from "next/link";

export default function NotFound() {
  return <section className="not-found"><span>404</span><h1>Jalan ini belum tersedia.</h1><p>The route you are looking for does not exist.</p><Link className="button button--primary" href="/id">Kembali ke AutoRev</Link></section>;
}
