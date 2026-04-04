import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import BookletClient from './BookletClient';
import { parseContent } from './lib/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const eventsDir = path.join(process.cwd(), 'public/bl9/events');
  if (!fs.existsSync(eventsDir)) return [];

  const entries = fs.readdirSync(eventsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
    .filter((e) => fs.existsSync(path.join(eventsDir, e.name, 'content.json')))
    .map((e) => ({ slug: e.name }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const contentPath = path.join(process.cwd(), 'public/bl9/events', slug, 'content.json');

  if (!fs.existsSync(contentPath)) {
    return { title: 'Event Not Found' };
  }

  try {
    const raw = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    return {
      title: `${raw.meta?.title || 'Event'} | BL9`,
      description: raw.meta?.subtitle || `${raw.meta?.hostClub || 'BL9'} event booklet`,
    };
  } catch {
    return { title: 'Event | BL9' };
  }
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const contentPath = path.join(process.cwd(), 'public/bl9/events', slug, 'content.json');

  if (!fs.existsSync(contentPath)) {
    notFound();
  }

  let rawData: unknown;
  try {
    rawData = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  } catch {
    return <ErrorDisplay errors={['Failed to parse content.json. Check that it is valid JSON.']} />;
  }

  const result = parseContent(rawData);

  if ('error' in result) {
    return <ErrorDisplay errors={result.error} />;
  }

  return <BookletClient content={result} slug={slug} />;
}

function ErrorDisplay({ errors }: { errors: string[] }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] px-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm">
        <h1 className="text-xl font-bold text-red-700 mb-4 font-serif">Content Error</h1>
        <p className="text-sm text-gray-500 mb-4">
          This event booklet could not be rendered due to content issues:
        </p>
        <ul className="space-y-2">
          {errors.map((err) => (
            <li key={err.slice(0, 50)} className="text-sm text-red-600 flex items-start gap-2">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
              {err}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
