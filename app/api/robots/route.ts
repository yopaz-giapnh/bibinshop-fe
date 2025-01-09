import { NextResponse } from 'next/server';

export async function GET() {
  // API URLからステージング環境かどうかを判定
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const isStaging = apiUrl.includes('stg-api');

  // ステージング環境の場合のみクローラーにアクセスを許可
  const content = isStaging
    ? `User-agent: *
Allow: /`
    : `User-agent: *
Disallow: /`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
}
