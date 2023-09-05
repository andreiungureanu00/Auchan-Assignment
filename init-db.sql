DO $$ 
BEGIN 
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'auchan_db') THEN 
      CREATE DATABASE auchan_db;
   END IF;
END $$;