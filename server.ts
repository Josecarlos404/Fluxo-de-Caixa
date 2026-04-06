import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Cash Flow API is running' });
  });

  /**
   * FUTURE PERSISTENCE SCHEMA
   * 
   * POST /api/transactions
   * GET /api/transactions
   * PUT /api/transactions/:id
   * DELETE /api/transactions/:id
   * 
   * Database Schema (PostgreSQL/MongoDB):
   * - id: UUID
   * - description: String
   * - amount: Decimal/Float
   * - date: Date
   * - category: String (Foreign Key to Categories)
   * - type: Enum ('income', 'expense')
   * - userId: UUID (Auth integration)
   */

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
