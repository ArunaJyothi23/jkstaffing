import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  try {
    const filename = decodeURIComponent((await params).filename);
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
