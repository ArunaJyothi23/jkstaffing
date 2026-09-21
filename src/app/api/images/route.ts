import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      return NextResponse.json({ urls: [] });
    }

    const files = fs.readdirSync(uploadDir);
    
    // Filter only image files (basic check)
    const imageFiles = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
    );

    // Return full URLs or absolute paths relative to root
    const urls = imageFiles.map(file => `/uploads/${file}`);

    // Optionally sort by newest (we prepended Date.now() to filename)
    urls.sort((a, b) => b.localeCompare(a));

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
