-- 1. Genel Sistem Logları Tablosu
CREATE TABLE IF NOT EXISTS public.sistem_loglari (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT,
    islem TEXT, -- 'LOGIN', 'LOGOUT', 'EXAM_START' vb.
    detay TEXT,
    cihaz JSONB -- IP, Tarayıcı vb.
);

-- 2. Güvenlik (RLS) Aç
ALTER TABLE public.sistem_loglari ENABLE ROW LEVEL SECURITY;

-- 3. Yazma İzni Ver (Anonim kullanıcılar log atabilsin)
CREATE POLICY "Log Insert" 
ON public.sistem_loglari 
FOR INSERT 
TO anon 
WITH CHECK (true);

ALTER TABLE public.sinav_log 
ADD COLUMN IF NOT EXISTS il TEXT,
ADD COLUMN IF NOT EXISTS ilce TEXT,
ADD COLUMN IF NOT EXISTS okul TEXT;