
-- =========================================================
-- ROLES
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'nutritionist', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- PATIENT PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  weight NUMERIC,
  height NUMERIC,
  goal TEXT,
  routine_schedule JSONB NOT NULL DEFAULT '{}'::jsonb,
  nutritionist_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  onboarding_complete BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients read own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Patients update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Patients insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Nutritionists read linked patients"
  ON public.profiles FOR SELECT TO authenticated
  USING (nutritionist_id = auth.uid() AND public.has_role(auth.uid(), 'nutritionist'));

CREATE POLICY "Admins manage profiles"
  ON public.profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- NUTRITIONIST PUBLIC PROFILES
-- =========================================================
CREATE TABLE public.nutritionists_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  photo_url TEXT,
  bio TEXT,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  methodology TEXT,
  price NUMERIC,
  is_active_subscriber BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.nutritionists_profiles TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.nutritionists_profiles TO authenticated;
GRANT ALL ON public.nutritionists_profiles TO service_role;

ALTER TABLE public.nutritionists_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view nutritionist profiles"
  ON public.nutritionists_profiles FOR SELECT
  USING (true);

CREATE POLICY "Nutritionists update own public profile"
  ON public.nutritionists_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Nutritionists insert own public profile"
  ON public.nutritionists_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage nutritionist profiles"
  ON public.nutritionists_profiles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- MENUS
-- =========================================================
CREATE TABLE public.menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nutritionist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Cardápio',
  meals_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.menus TO authenticated;
GRANT ALL ON public.menus TO service_role;

ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patient reads own menus"
  ON public.menus FOR SELECT TO authenticated
  USING (auth.uid() = patient_id);

CREATE POLICY "Nutritionist reads own authored menus"
  ON public.menus FOR SELECT TO authenticated
  USING (auth.uid() = nutritionist_id);

CREATE POLICY "Nutritionist manages own authored menus"
  ON public.menus FOR ALL TO authenticated
  USING (auth.uid() = nutritionist_id AND public.has_role(auth.uid(), 'nutritionist'))
  WITH CHECK (auth.uid() = nutritionist_id AND public.has_role(auth.uid(), 'nutritionist'));

CREATE POLICY "Admins manage menus"
  ON public.menus FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- MESSAGES
-- =========================================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own conversations"
  ON public.messages FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users send as themselves"
  ON public.messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- =========================================================
-- updated_at trigger
-- =========================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_nutri_updated BEFORE UPDATE ON public.nutritionists_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_menus_updated BEFORE UPDATE ON public.menus
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- handle_new_user trigger
-- Reads desired role + name from raw_user_meta_data (set during signUp).
-- =========================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role public.app_role;
  _name TEXT;
BEGIN
  _name := COALESCE(NEW.raw_user_meta_data ->> 'name', split_part(NEW.email, '@', 1));
  _role := COALESCE((NEW.raw_user_meta_data ->> 'role')::public.app_role, 'user');

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role)
    ON CONFLICT DO NOTHING;

  IF _role = 'nutritionist' THEN
    INSERT INTO public.nutritionists_profiles (user_id, name, email)
      VALUES (NEW.id, _name, NEW.email)
      ON CONFLICT (user_id) DO NOTHING;
  ELSIF _role = 'user' THEN
    INSERT INTO public.profiles (user_id, name, email)
      VALUES (NEW.id, _name, NEW.email)
      ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
